#!/usr/bin/env node

import { MongoClient } from 'mongodb';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lamane_launge';

async function createDemoUser() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('\n🔄 Connecting to MongoDB...');
    await client.connect();
    const db = client.db();
    
    console.log('✅ Connected to MongoDB\n');
    
    // Hash password
    const hashedPassword = await bcryptjs.hash('password123', 10);
    
    // Create demo user
    const demoUser = {
      name: 'Demo User',
      email: 'demo@example.com',
      password: hashedPassword,
      phone: '+1 (555) 000-0000',
      address: '123 Main St, City, State',
      role: 'customer',
      loyaltyPoints: 0,
      createdAt: new Date()
    };
    
    // Delete existing demo user if exists
    await db.collection('users').deleteOne({ email: 'demo@example.com' });
    
    // Insert demo user
    const result = await db.collection('users').insertOne(demoUser);
    
    console.log('✅ Demo user created successfully!');
    console.log('\n📧 Login Credentials:');
    console.log('   Email: demo@example.com');
    console.log('   Password: password123\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    process.exit(0);
  }
}

createDemoUser();
