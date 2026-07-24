#!/usr/bin/env node

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lamane_launge';

const categories = [
  { name: 'coffee', slug: 'coffee', description: 'Fresh brewed coffee' },
  { name: 'pastries', slug: 'pastries', description: 'Delicious pastries' },
  { name: 'cakes', slug: 'cakes', description: 'Custom cakes' },
  { name: 'bread', slug: 'bread', description: 'Fresh bread' },
  { name: 'donuts', slug: 'donuts', description: 'Sweet donuts' },
  { name: 'cookies', slug: 'cookies', description: 'Homemade cookies' },
  { name: 'drinks', slug: 'drinks', description: 'Hot and cold drinks' }
];

const products = [
  // Coffee
  { name: 'Espresso', price: 2500, stock: 50, description: 'Strong espresso shot', availability: true, image: 'https://via.placeholder.com/300x300?text=Espresso', ingredients: ['Coffee beans', 'Water'], category: 'coffee' },
  { name: 'Cappuccino', price: 4000, stock: 40, description: 'Creamy cappuccino', availability: true, image: 'https://via.placeholder.com/300x300?text=Cappuccino', ingredients: ['Coffee', 'Milk', 'Foam'], category: 'coffee' },
  { name: 'Latte', price: 4500, stock: 35, description: 'Smooth latte', availability: true, image: 'https://via.placeholder.com/300x300?text=Latte', ingredients: ['Coffee', 'Milk'], category: 'coffee' },
  { name: 'Americano', price: 3000, stock: 45, description: 'Classic americano', availability: true, image: 'https://via.placeholder.com/300x300?text=Americano', ingredients: ['Coffee', 'Water'], category: 'coffee' },
  
  // Pastries
  { name: 'Croissant', price: 3500, stock: 30, description: 'Buttery croissant', availability: true, image: 'https://via.placeholder.com/300x300?text=Croissant', ingredients: ['Flour', 'Butter', 'Yeast'], category: 'pastries' },
  { name: 'Danish Pastry', price: 4000, stock: 25, description: 'Sweet danish pastry', availability: true, image: 'https://via.placeholder.com/300x300?text=Danish', ingredients: ['Flour', 'Butter', 'Sugar'], category: 'pastries' },
  { name: 'Muffin', price: 3000, stock: 40, description: 'Chocolate muffin', availability: true, image: 'https://via.placeholder.com/300x300?text=Muffin', ingredients: ['Flour', 'Chocolate', 'Eggs'], category: 'pastries' },
  
  // Cakes
  { name: 'Chocolate Cake', price: 15000, stock: 10, description: 'Rich chocolate cake', availability: true, image: 'https://via.placeholder.com/300x300?text=Chocolate+Cake', ingredients: ['Flour', 'Chocolate', 'Eggs', 'Sugar'], category: 'cakes' },
  { name: 'Vanilla Cake', price: 12000, stock: 12, description: 'Classic vanilla cake', availability: true, image: 'https://via.placeholder.com/300x300?text=Vanilla+Cake', ingredients: ['Flour', 'Vanilla', 'Eggs', 'Sugar'], category: 'cakes' },
  { name: 'Strawberry Cake', price: 14000, stock: 8, description: 'Fresh strawberry cake', availability: true, image: 'https://via.placeholder.com/300x300?text=Strawberry+Cake', ingredients: ['Flour', 'Strawberry', 'Cream', 'Sugar'], category: 'cakes' },
  
  // Bread
  { name: 'Whole Wheat Bread', price: 5000, stock: 20, description: 'Healthy whole wheat bread', availability: true, image: 'https://via.placeholder.com/300x300?text=Wheat+Bread', ingredients: ['Whole wheat flour', 'Yeast', 'Salt'], category: 'bread' },
  { name: 'White Bread', price: 4500, stock: 25, description: 'Soft white bread', availability: true, image: 'https://via.placeholder.com/300x300?text=White+Bread', ingredients: ['Flour', 'Yeast', 'Salt'], category: 'bread' },
  { name: 'Sourdough', price: 6000, stock: 15, description: 'Tangy sourdough', availability: true, image: 'https://via.placeholder.com/300x300?text=Sourdough', ingredients: ['Flour', 'Sourdough starter', 'Salt'], category: 'bread' },
  
  // Donuts
  { name: 'Glazed Donut', price: 2500, stock: 50, description: 'Classic glazed donut', availability: true, image: 'https://via.placeholder.com/300x300?text=Glazed+Donut', ingredients: ['Flour', 'Sugar', 'Glaze'], category: 'donuts' },
  { name: 'Chocolate Donut', price: 3000, stock: 45, description: 'Chocolate covered donut', availability: true, image: 'https://via.placeholder.com/300x300?text=Chocolate+Donut', ingredients: ['Flour', 'Chocolate', 'Sugar'], category: 'donuts' },
  { name: 'Sprinkle Donut', price: 3000, stock: 40, description: 'Donut with sprinkles', availability: true, image: 'https://via.placeholder.com/300x300?text=Sprinkle+Donut', ingredients: ['Flour', 'Sugar', 'Sprinkles'], category: 'donuts' },
  
  // Cookies
  { name: 'Chocolate Chip Cookie', price: 2000, stock: 60, description: 'Classic chocolate chip cookie', availability: true, image: 'https://via.placeholder.com/300x300?text=Choco+Cookie', ingredients: ['Flour', 'Chocolate chips', 'Butter'], category: 'cookies' },
  { name: 'Oatmeal Cookie', price: 2000, stock: 55, description: 'Healthy oatmeal cookie', availability: true, image: 'https://via.placeholder.com/300x300?text=Oatmeal+Cookie', ingredients: ['Oats', 'Flour', 'Butter'], category: 'cookies' },
  { name: 'Sugar Cookie', price: 1500, stock: 70, description: 'Sweet sugar cookie', availability: true, image: 'https://via.placeholder.com/300x300?text=Sugar+Cookie', ingredients: ['Flour', 'Sugar', 'Butter'], category: 'cookies' },
  
  // Drinks
  { name: 'Iced Coffee', price: 3500, stock: 50, description: 'Refreshing iced coffee', availability: true, image: 'https://via.placeholder.com/300x300?text=Iced+Coffee', ingredients: ['Coffee', 'Ice', 'Milk'], category: 'drinks' },
  { name: 'Hot Chocolate', price: 3500, stock: 40, description: 'Warm hot chocolate', availability: true, image: 'https://via.placeholder.com/300x300?text=Hot+Chocolate', ingredients: ['Chocolate', 'Milk', 'Sugar'], category: 'drinks' },
  { name: 'Smoothie', price: 4500, stock: 30, description: 'Fresh fruit smoothie', availability: true, image: 'https://via.placeholder.com/300x300?text=Smoothie', ingredients: ['Fruits', 'Yogurt', 'Milk'], category: 'drinks' }
];

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('\n🔄 Connecting to MongoDB...');
    console.log(`   URI: ${MONGODB_URI}\n`);
    
    await client.connect();
    const db = client.db();
    
    console.log('✅ Connected to MongoDB\n');
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await db.collection('categories').deleteMany({});
    await db.collection('products').deleteMany({});
    console.log('   ✅ Cleared categories');
    console.log('   ✅ Cleared products\n');
    
    // Add categories
    console.log('📦 Adding 7 categories...');
    const categoryResult = await db.collection('categories').insertMany(categories);
    console.log(`   ✅ Added ${categoryResult.insertedCount} categories\n`);
    
    // Add products
    console.log('📦 Adding 24 products...');
    const productResult = await db.collection('products').insertMany(products);
    console.log(`   ✅ Added ${productResult.insertedCount} products\n`);
    
    // Verify
    const productCount = await db.collection('products').countDocuments();
    const categoryCount = await db.collection('categories').countDocuments();
    
    console.log('✅ Database seeded successfully!');
    console.log(`   - Categories: ${categoryCount}`);
    console.log(`   - Products: ${productCount}\n`);
    
    console.log('🎉 You can now see products in the shop!');
    console.log('   Go to: http://localhost:5173/shop\n');
    
  } catch (error) {
    console.error('\n❌ Error seeding database:');
    console.error(`   ${error.message}\n`);
    console.log('💡 Make sure:');
    console.log('   1. MongoDB is running (mongod)');
    console.log('   2. .env file has correct MONGODB_URI');
    console.log('   3. You are in the project directory\n');
    process.exit(1);
  } finally {
    await client.close();
    process.exit(0);
  }
}

seedDatabase().catch(console.error);
