#!/usr/bin/env node

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './server/models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lamane_launge';

async function setupUsers() {
  try {
    console.log('\n🔄 Connecting to MongoDB...');
    console.log(`   URI: ${MONGODB_URI}\n`);
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    // Delete existing users
    console.log('🗑️  Clearing existing users...');
    await User.deleteOne({ email: 'demo@example.com' });
    await User.deleteOne({ email: 'admin@lamane.com' });
    console.log('   ✅ Cleared demo user');
    console.log('   ✅ Cleared admin user\n');
    
    // Create demo user (password will be hashed by pre-save hook)
    console.log('👤 Creating users...');
    const demoUser = new User({
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'password123',
      phone: '+1 (555) 000-0000',
      address: '123 Main St, City, State',
      role: 'customer',
      loyaltyPoints: 0
    });
    await demoUser.save();
    console.log('   ✅ Demo user created');
    
    // Create admin user (password will be hashed by pre-save hook)
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@lamane.com',
      password: 'admin123',
      phone: '+250 788 123 456',
      address: 'LAMANE Headquarters, Kigali, Rwanda',
      role: 'admin',
      loyaltyPoints: 0
    });
    await adminUser.save();
    console.log('   ✅ Admin user created\n');
    
    // Verify users
    console.log('🔍 Verifying users...');
    const demoCheck = await User.findOne({ email: 'demo@example.com' });
    const adminCheck = await User.findOne({ email: 'admin@lamane.com' });
    
    if (demoCheck) {
      console.log('   ✅ Demo user verified in database');
    } else {
      console.log('   ❌ Demo user NOT found in database');
    }
    
    if (adminCheck) {
      console.log('   ✅ Admin user verified in database\n');
    } else {
      console.log('   ❌ Admin user NOT found in database\n');
    }
    
    // Display credentials
    console.log('═══════════════════════════════════════════════════════');
    console.log('📧 CUSTOMER LOGIN CREDENTIALS');
    console.log('═══════════════════════════════════════════════════════');
    console.log('   Email:    demo@example.com');
    console.log('   Password: password123');
    console.log('   Role:     Customer');
    console.log('   URL:      http://localhost:5174/login\n');
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('👨💼 ADMIN LOGIN CREDENTIALS');
    console.log('═══════════════════════════════════════════════════════');
    console.log('   Email:    admin@lamane.com');
    console.log('   Password: admin123');
    console.log('   Role:     Admin');
    console.log('   URL:      http://localhost:5174/login');
    console.log('   Dashboard: http://localhost:5174/admin\n');
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ SETUP COMPLETE!');
    console.log('═══════════════════════════════════════════════════════\n');
    
    console.log('🚀 Next steps:');
    console.log('   1. Run: node seed-direct.js');
    console.log('   2. Run: npm run dev:all');
    console.log('   3. Visit: http://localhost:5174\n');
    
    await mongoose.connection.close();
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

setupUsers();
