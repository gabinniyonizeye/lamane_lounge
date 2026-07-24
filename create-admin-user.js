#!/usr/bin/env node

import { MongoClient } from 'mongodb';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lamane_launge';

async function createAdminUser() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('\n🔄 Connecting to MongoDB...');
    await client.connect();
    const db = client.db();
    
    console.log('✅ Connected to MongoDB\n');
    
    // Hash password
    const hashedPassword = await bcryptjs.hash('admin123', 10);
    
    // Create admin user
    const adminUser = {
      name: 'Admin User',
      email: 'admin@lamane.com',
      password: hashedPassword,
      phone: '+250 788 123 456',
      address: 'LAMANE Headquarters, Kigali, Rwanda',
      role: 'admin',
      loyaltyPoints: 0,
      createdAt: new Date()
    };
    
    // Delete existing admin user if exists
    await db.collection('users').deleteOne({ email: 'admin@lamane.com' });
    
    // Insert admin user
    const result = await db.collection('users').insertOne(adminUser);
    
    console.log('✅ Admin user created successfully!');
    console.log('\n📧 Admin Login Credentials:');
    console.log('   Email: admin@lamane.com');
    console.log('   Password: admin123\n');
    console.log('🔗 Admin Dashboard: http://localhost:5174/admin\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    process.exit(0);
  }
}

createAdminUser();
