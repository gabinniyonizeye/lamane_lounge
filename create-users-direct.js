#!/usr/bin/env node

import { MongoClient } from 'mongodb';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lamane_launge';

async function createUsersDirectly() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('\n🔄 Connecting to MongoDB...\n');
    await client.connect();
    const db = client.db();
    
    console.log('✅ Connected to MongoDB\n');
    
    // Hash passwords ONCE
    console.log('🔐 Hashing passwords...\n');
    const demoPasswordHash = await bcryptjs.hash('password123', 10);
    const adminPasswordHash = await bcryptjs.hash('admin123', 10);
    
    console.log('   ✅ Demo password hashed');
    console.log('   ✅ Admin password hashed\n');
    
    // Delete existing users
    console.log('🗑️  Clearing existing users...\n');
    const deleteResult = await db.collection('users').deleteMany({ 
      email: { $in: ['demo@example.com', 'admin@lamane.com'] }
    });
    console.log(`   ✅ Deleted ${deleteResult.deletedCount} existing users\n`);
    
    // Create users with pre-hashed passwords
    console.log('👤 Creating users...\n');
    
    const demoUser = {
      name: 'Demo User',
      email: 'demo@example.com',
      password: demoPasswordHash,
      phone: '+1 (555) 000-0000',
      address: '123 Main St, City, State',
      role: 'customer',
      loyaltyPoints: 0,
      createdAt: new Date()
    };
    
    const adminUser = {
      name: 'Admin User',
      email: 'admin@lamane.com',
      password: adminPasswordHash,
      phone: '+250 788 123 456',
      address: 'LAMANE Headquarters, Kigali, Rwanda',
      role: 'admin',
      loyaltyPoints: 0,
      createdAt: new Date()
    };
    
    const insertResult = await db.collection('users').insertMany([demoUser, adminUser]);
    console.log(`   ✅ Created ${insertResult.insertedCount} users\n`);
    
    // Verify users
    console.log('🔍 Verifying users in database...\n');
    
    const demoCheck = await db.collection('users').findOne({ email: 'demo@example.com' });
    const adminCheck = await db.collection('users').findOne({ email: 'admin@lamane.com' });
    
    if (demoCheck) {
      console.log('   ✅ Demo user verified');
      console.log(`      Email: ${demoCheck.email}`);
      console.log(`      Role: ${demoCheck.role}`);
      console.log(`      Password hash: ${demoCheck.password.substring(0, 20)}...\n`);
    }
    
    if (adminCheck) {
      console.log('   ✅ Admin user verified');
      console.log(`      Email: ${adminCheck.email}`);
      console.log(`      Role: ${adminCheck.role}`);
      console.log(`      Password hash: ${adminCheck.password.substring(0, 20)}...\n`);
    }
    
    // Test password verification
    console.log('🧪 Testing password verification...\n');
    
    const demoPasswordValid = await bcryptjs.compare('password123', demoCheck.password);
    const adminPasswordValid = await bcryptjs.compare('admin123', adminCheck.password);
    
    console.log(`   Demo password test: ${demoPasswordValid ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   Admin password test: ${adminPasswordValid ? '✅ PASS' : '❌ FAIL'}\n`);
    
    // Display credentials
    console.log('═══════════════════════════════════════════════════════');
    console.log('📧 CUSTOMER LOGIN CREDENTIALS');
    console.log('═══════════════════════════════════════════════════════');
    console.log('   Email:    demo@example.com');
    console.log('   Password: password123');
    console.log('   Role:     Customer\n');
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('👨💼 ADMIN LOGIN CREDENTIALS');
    console.log('═══════════════════════════════════════════════════════');
    console.log('   Email:    admin@lamane.com');
    console.log('   Password: admin123');
    console.log('   Role:     Admin\n');
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ USERS CREATED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════════════════════\n');
    
    console.log('🚀 Next steps:');
    console.log('   1. Make sure backend is running: npm run dev:all');
    console.log('   2. Go to: http://localhost:5174/login');
    console.log('   3. Try logging in with credentials above\n');
    
    await client.close();
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Make sure MongoDB is running: mongod');
    console.error('   2. Check .env file has correct MONGODB_URI');
    console.error('   3. Verify MongoDB connection\n');
    process.exit(1);
  }
}

createUsersDirectly();
