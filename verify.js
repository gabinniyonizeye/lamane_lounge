#!/usr/bin/env node

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

console.log('\n🔍 LAMANE BAKERY & COFFEE - SYSTEM VERIFICATION\n');
console.log('=' .repeat(50));

async function verify() {
  let allGood = true;

  // 1. Check .env file
  console.log('\n1️⃣  Checking .env file...');
  if (fs.existsSync('.env')) {
    console.log('   ✅ .env file exists');
    console.log(`   ✅ MongoDB URI: ${process.env.MONGODB_URI}`);
    console.log(`   ✅ Port: ${process.env.PORT}`);
  } else {
    console.log('   ❌ .env file not found');
    allGood = false;
  }

  // 2. Check models
  console.log('\n2️⃣  Checking database models...');
  const modelsDir = './server/models';
  const models = fs.readdirSync(modelsDir).filter(f => f.endsWith('.js'));
  console.log(`   ✅ Found ${models.length} models:`);
  models.forEach(m => console.log(`      - ${m}`));

  // 3. Check routes
  console.log('\n3️⃣  Checking API routes...');
  const routesDir = './server/routes';
  const routes = fs.readdirSync(routesDir).filter(f => f.endsWith('.js'));
  console.log(`   ✅ Found ${routes.length} route files:`);
  routes.forEach(r => console.log(`      - ${r}`));

  // 4. Check frontend components
  console.log('\n4️⃣  Checking frontend components...');
  const componentsDir = './src/components';
  const components = fs.readdirSync(componentsDir).filter(f => f.endsWith('.vue'));
  console.log(`   ✅ Found ${components.length} components`);

  const adminDir = './src/components/admin';
  if (fs.existsSync(adminDir)) {
    const adminComponents = fs.readdirSync(adminDir).filter(f => f.endsWith('.vue'));
    console.log(`   ✅ Found ${adminComponents.length} admin components`);
  }

  // 5. Check pages
  console.log('\n5️⃣  Checking pages...');
  const pagesDir = './src/pages';
  const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.vue'));
  console.log(`   ✅ Found ${pages.length} pages:`);
  pages.forEach(p => console.log(`      - ${p}`));

  // 6. Check MongoDB connection
  console.log('\n6️⃣  Checking MongoDB connection...');
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('   ✅ Connected to MongoDB');

    // Check collections
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(`   ✅ Found ${collections.length} collections:`);
    collections.forEach(c => console.log(`      - ${c.name}`));

    // Check products
    const Product = require('./server/models/Product');
    const productCount = await Product.countDocuments();
    console.log(`   ✅ Products in database: ${productCount}`);

    if (productCount === 0) {
      console.log('   ⚠️  No products found! Run: node seed.js');
      allGood = false;
    }

    await mongoose.disconnect();
  } catch (error) {
    console.log('   ❌ MongoDB connection failed');
    console.log(`   Error: ${error.message}`);
    console.log('   Make sure MongoDB is running: mongod');
    allGood = false;
  }

  // 7. Check package.json scripts
  console.log('\n7️⃣  Checking npm scripts...');
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  const scripts = Object.keys(packageJson.scripts);
  console.log(`   ✅ Found ${scripts.length} scripts:`);
  scripts.forEach(s => console.log(`      - npm run ${s}`));

  // 8. Summary
  console.log('\n' + '='.repeat(50));
  if (allGood) {
    console.log('\n✅ SYSTEM VERIFICATION PASSED!\n');
    console.log('Next steps:');
    console.log('1. Make sure MongoDB is running: mongod');
    console.log('2. Seed database: node seed.js');
    console.log('3. Start backend: npm run dev:backend');
    console.log('4. Start frontend: npm run dev:frontend');
    console.log('5. Open: http://localhost:5173\n');
  } else {
    console.log('\n⚠️  SOME ISSUES FOUND - SEE ABOVE\n');
  }
}

verify().catch(console.error);
