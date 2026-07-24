#!/usr/bin/env node

import axios from 'axios';
import { MongoClient } from 'mongodb';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lamane_launge';
const API_URL = 'http://localhost:5000/api';

async function testAuthentication() {
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('🧪 AUTHENTICATION TEST SUITE');
  console.log('═══════════════════════════════════════════════════════\n');
  
  try {
    // Test 1: Check MongoDB connection
    console.log('TEST 1: MongoDB Connection');
    console.log('───────────────────────────────────────────────────────\n');
    
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db();
    
    console.log('✅ MongoDB connected\n');
    
    // Test 2: Check users in database
    console.log('TEST 2: Users in Database');
    console.log('───────────────────────────────────────────────────────\n');
    
    const users = await db.collection('users').find({}).toArray();
    console.log(`Found ${users.length} users:\n`);
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Password Hash: ${user.password.substring(0, 20)}...\n`);
    });
    
    // Test 3: Verify password hashes
    console.log('TEST 3: Password Hash Verification');
    console.log('───────────────────────────────────────────────────────\n');
    
    const demoUser = users.find(u => u.email === 'demo@example.com');
    const adminUser = users.find(u => u.email === 'admin@lamane.com');
    
    if (demoUser) {
      const demoPasswordValid = await bcryptjs.compare('password123', demoUser.password);
      console.log(`Demo user password test: ${demoPasswordValid ? '✅ PASS' : '❌ FAIL'}`);
      console.log(`   Stored hash: ${demoUser.password.substring(0, 30)}...`);
      console.log(`   Password: password123\n`);
    } else {
      console.log('❌ Demo user not found\n');
    }
    
    if (adminUser) {
      const adminPasswordValid = await bcryptjs.compare('admin123', adminUser.password);
      console.log(`Admin user password test: ${adminPasswordValid ? '✅ PASS' : '❌ FAIL'}`);
      console.log(`   Stored hash: ${adminUser.password.substring(0, 30)}...`);
      console.log(`   Password: admin123\n`);
    } else {
      console.log('❌ Admin user not found\n');
    }
    
    await client.close();
    
    // Test 4: Test API connection
    console.log('TEST 4: Backend API Connection');
    console.log('───────────────────────────────────────────────────────\n');
    
    try {
      const testResponse = await axios.get(`${API_URL}/test`, { timeout: 5000 });
      console.log('✅ Backend API is responding');
      console.log(`   Response: ${JSON.stringify(testResponse.data)}\n`);
    } catch (error) {
      console.log('❌ Backend API is NOT responding');
      console.log(`   Error: ${error.message}`);
      console.log('   Make sure: npm run dev:all is running\n');
      process.exit(1);
    }
    
    // Test 5: Test login API
    console.log('TEST 5: Login API Test');
    console.log('───────────────────────────────────────────────────────\n');
    
    console.log('Testing Demo User Login...\n');
    try {
      const demoLoginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: 'demo@example.com',
        password: 'password123'
      }, { timeout: 5000 });
      
      console.log('✅ Demo user login SUCCESSFUL!');
      console.log(`   Token: ${demoLoginResponse.data.token.substring(0, 20)}...`);
      console.log(`   User: ${demoLoginResponse.data.user.name}`);
      console.log(`   Role: ${demoLoginResponse.data.user.role}\n`);
    } catch (error) {
      console.log('❌ Demo user login FAILED!');
      console.log(`   Status: ${error.response?.status}`);
      console.log(`   Error: ${error.response?.data?.message || error.message}\n`);
    }
    
    console.log('Testing Admin User Login...\n');
    try {
      const adminLoginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: 'admin@lamane.com',
        password: 'admin123'
      }, { timeout: 5000 });
      
      console.log('✅ Admin user login SUCCESSFUL!');
      console.log(`   Token: ${adminLoginResponse.data.token.substring(0, 20)}...`);
      console.log(`   User: ${adminLoginResponse.data.user.name}`);
      console.log(`   Role: ${adminLoginResponse.data.user.role}\n`);
    } catch (error) {
      console.log('❌ Admin user login FAILED!');
      console.log(`   Status: ${error.response?.status}`);
      console.log(`   Error: ${error.response?.data?.message || error.message}\n`);
    }
    
    // Summary
    console.log('═══════════════════════════════════════════════════════');
    console.log('📋 SUMMARY');
    console.log('═══════════════════════════════════════════════════════\n');
    
    console.log('✅ All tests completed. Check results above.\n');
    console.log('If login tests failed:');
    console.log('1. Check backend terminal for errors');
    console.log('2. Verify .env file has correct JWT_SECRET');
    console.log('3. Check MongoDB is running\n');
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
    process.exit(1);
  }
}

testAuthentication();
