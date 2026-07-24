#!/usr/bin/env node

import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import User from './server/models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lamane_launge';

async function debugAuth() {
  try {
    console.log('\n🔄 Connecting to MongoDB...\n');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    // Test 1: Find admin user
    console.log('═══════════════════════════════════════════════════════');
    console.log('TEST 1: Finding Admin User');
    console.log('═══════════════════════════════════════════════════════\n');
    
    const adminUser = await User.findOne({ email: 'admin@lamane.com' });
    
    if (!adminUser) {
      console.log('❌ Admin user NOT found in database!');
      console.log('   Email searched: admin@lamane.com\n');
      process.exit(1);
    }
    
    console.log('✅ Admin user found!');
    console.log(`   Name: ${adminUser.name}`);
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Role: ${adminUser.role}`);
    console.log(`   Hashed Password: ${adminUser.password.substring(0, 20)}...\n`);
    
    // Test 2: Test password comparison
    console.log('═══════════════════════════════════════════════════════');
    console.log('TEST 2: Testing Password Comparison');
    console.log('═══════════════════════════════════════════════════════\n');
    
    const testPassword = 'admin123';
    console.log(`Testing password: "${testPassword}"\n`);
    
    const isPasswordValid = await adminUser.comparePassword(testPassword);
    
    if (isPasswordValid) {
      console.log('✅ Password comparison SUCCESSFUL!');
      console.log('   The password "admin123" matches the hashed password\n');
    } else {
      console.log('❌ Password comparison FAILED!');
      console.log('   The password "admin123" does NOT match\n');
      
      // Try to manually hash and compare
      console.log('🔍 Debugging password hashing...\n');
      
      const manualHash = await bcryptjs.hash('admin123', 10);
      console.log(`   New hash of "admin123": ${manualHash.substring(0, 30)}...`);
      console.log(`   Stored hash:            ${adminUser.password.substring(0, 30)}...\n`);
      
      const manualCompare = await bcryptjs.compare('admin123', adminUser.password);
      console.log(`   Manual bcrypt.compare result: ${manualCompare}\n`);
    }
    
    // Test 3: Test with demo user
    console.log('═══════════════════════════════════════════════════════');
    console.log('TEST 3: Testing Demo User');
    console.log('═══════════════════════════════════════════════════════\n');
    
    const demoUser = await User.findOne({ email: 'demo@example.com' });
    
    if (!demoUser) {
      console.log('❌ Demo user NOT found in database!\n');
    } else {
      console.log('✅ Demo user found!');
      console.log(`   Name: ${demoUser.name}`);
      console.log(`   Email: ${demoUser.email}`);
      console.log(`   Role: ${demoUser.role}\n`);
      
      const isDemoPasswordValid = await demoUser.comparePassword('password123');
      
      if (isDemoPasswordValid) {
        console.log('✅ Demo password comparison SUCCESSFUL!\n');
      } else {
        console.log('❌ Demo password comparison FAILED!\n');
      }
    }
    
    // Test 4: List all users
    console.log('═══════════════════════════════════════════════════════');
    console.log('TEST 4: All Users in Database');
    console.log('═══════════════════════════════════════════════════════\n');
    
    const allUsers = await User.find({});
    console.log(`Total users: ${allUsers.length}\n`);
    
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Hash: ${user.password.substring(0, 20)}...\n`);
    });
    
    // Summary
    console.log('═══════════════════════════════════════════════════════');
    console.log('SUMMARY');
    console.log('═══════════════════════════════════════════════════════\n');
    
    if (isPasswordValid) {
      console.log('✅ Everything looks good!');
      console.log('   Admin user exists and password is correct.');
      console.log('   Try logging in with:');
      console.log('   Email: admin@lamane.com');
      console.log('   Password: admin123\n');
      console.log('   If login still fails, check:');
      console.log('   1. Backend is running (npm run dev:all)');
      console.log('   2. MongoDB is running (mongod)');
      console.log('   3. Browser console for errors (F12)\n');
    } else {
      console.log('❌ Password verification failed!');
      console.log('   The admin user password is not correct.');
      console.log('   Need to recreate the user.\n');
    }
    
    await mongoose.connection.close();
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

debugAuth();
