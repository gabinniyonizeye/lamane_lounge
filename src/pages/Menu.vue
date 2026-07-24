<template>
  <div class="min-h-screen bg-white dark:bg-black">
    <section class="bg-gradient-to-br from-gray-900 to-black dark:from-black dark:to-gray-900 text-white py-16">
      <div class="container">
        <p class="text-amber-400 font-semibold uppercase tracking-widest text-sm">LAMANE Lounge & Coffee</p>
        <div class="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] items-start">
          <div>
            <h1 class="text-5xl sm:text-6xl font-extrabold leading-tight text-white">Menu made for cravings, crafted with fresh ingredients.</h1>
            <p class="mt-4 max-w-2xl text-gray-300 text-lg">Explore vibrant lounge favorites, breakfast classics, hearty meals, and refreshing drinks with ingredient-driven photos and easy ordering.</p>
            <div class="mt-8 flex flex-wrap gap-3">
              <router-link to="/shop" class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-semibold text-white transition hover:from-amber-600 hover:to-amber-700">Order Now · Free Delivery</router-link>
              <router-link to="#menu-search" class="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">Jump to menu</router-link>
            </div>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-[2rem] border border-amber-500/30 bg-amber-500/10 p-6 backdrop-blur-sm">
              <p class="text-xs uppercase tracking-[0.3em] text-amber-300">Chef's pick</p>
              <h2 class="mt-4 text-2xl font-bold text-white">Lamané Pizza</h2>
              <p class="mt-3 text-gray-300">Rich tomato sauce, mozzarella, and roasted vegetables for a bold shareable flavor.</p>
            </div>
            <div class="rounded-[2rem] border border-amber-500/30 bg-amber-500/10 p-6 backdrop-blur-sm">
              <p class="text-xs uppercase tracking-[0.3em] text-amber-300">Fresh & wholesome</p>
              <h2 class="mt-4 text-2xl font-bold text-white">Avocado Salad</h2>
              <p class="mt-3 text-gray-300">Creamy avocado, crisp greens, and citrus for a refreshing healthy bite.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-amber-500/20 shadow-sm">
      <div class="container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div class="flex gap-3 overflow-x-auto">
          <a v-for="section in filteredMenu" :key="section.title" :href="`#${slug(section.title)}`" class="whitespace-nowrap rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-900 dark:text-white transition hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white">{{ section.title }}</a>
        </div>
        <label id="menu-search" class="relative w-full max-w-sm">
          <span class="sr-only">Search menu</span>
          <input v-model="searchQuery" type="search" placeholder="Search menu items or ingredients" class="w-full rounded-full border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 py-3 pl-12 pr-4 text-sm text-gray-900 dark:text-white shadow-sm outline-none transition focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20" />
          <i class="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600"></i>
        </label>
      </div>
    </div>

    <main class="container py-10">
      <div class="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p class="font-semibold text-green-900 dark:text-green-300">Free delivery on orders placed through LAMANE.</p>
        <router-link to="/shop" class="font-bold text-green-800 dark:text-green-300 underline">Start your order →</router-link>
      </div>

      <section v-if="filteredMenu.length === 0" class="rounded-3xl border border-gray-200 dark:border-amber-500/20 bg-white dark:bg-gray-900 p-10 text-center text-gray-600 dark:text-gray-400 shadow-sm">
        <p class="text-lg font-semibold">No items match your search.</p>
        <p class="mt-2 text-sm">Try a different ingredient or menu name.</p>
      </section>

      <section v-for="section in filteredMenu" :id="slug(section.title)" :key="section.title" class="mb-12 scroll-mt-20">
        <div class="flex items-center gap-4 mb-5">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ section.title }}</h2>
          <span class="h-px bg-gray-300 dark:bg-amber-500/20 flex-1"></span>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="item in section.items" :key="item.name" class="group flex flex-col overflow-hidden rounded-3xl border border-gray-200 dark:border-amber-500/20 bg-white dark:bg-gray-900 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div class="relative overflow-hidden">
              <img
                :src="menuImageFor(item)"
                :alt="`Photo of ${item.name}`"
                class="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <span class="absolute top-3 right-3 rounded-full bg-white/95 dark:bg-gray-900/95 px-3 py-1 text-sm font-bold text-amber-600 dark:text-amber-400 shadow-sm">{{ money(item.price) }}</span>
            </div>
            <div class="flex flex-1 flex-col gap-4 p-5">
              <div>
                <p class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">{{ section.title }}</p>
                <h3 class="mt-2 text-xl font-bold text-gray-900 dark:text-white">{{ item.name }}</h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed min-h-[3rem]">{{ item.description || 'Prepared fresh to order with local ingredients.' }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in item.tags" :key="tag" class="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">{{ tag }}</span>
              </div>
              <router-link :to="{ path: '/shop', query: { search: item.name } }" class="mt-auto inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-sm font-semibold text-white transition hover:from-amber-600 hover:to-amber-700">Order Now</router-link>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { menuImageFor } from '@/utils/menuImages'

const menu = [
  {
    title: 'Snacks & Bakery',
    items: [
      { name: 'Lamane Meatballs', price: 6500, description: 'One piece, French fries & salad', tags: ['beef', 'fries', 'salad'] },
      { name: 'Lamane Sambusas', price: 6500, description: 'One piece, French fries & salad', tags: ['beef', 'spices', 'pastry'] },
      { name: 'Sausage Cuts', price: 6500, description: 'White sausage, French fries & salad', tags: ['sausage', 'fries', 'salad'] },
      { name: 'Cheese Cuts', price: 6000, description: 'Quarter Gouda cheese', tags: ['cheese', 'dairy'] },
      { name: 'Croissant', price: 1500, description: 'Freshly baked', tags: ['butter', 'pastry'] },
      { name: 'Muffin', price: 600, description: 'Soft bakery muffin', tags: ['cake', 'pastry'] },
      { name: 'Sambusas', price: 350, description: 'Crispy pastry with savory filling', tags: ['pastry', 'spices'] },
      { name: 'Banana Cake', price: 450, description: 'Moist banana cake with cinnamon', tags: ['banana', 'cake'] },
      { name: 'Cupcake', price: 1200, description: 'Light cupcake with cream topping', tags: ['cake', 'cream'] },
      { name: 'Custard', price: 1700, description: 'Smooth vanilla custard', tags: ['custard', 'vanilla'] },
      { name: 'Kebabs', price: 1000, description: 'Grilled meat skewers', tags: ['beef', 'grill'] },
      { name: 'Donut Plain', price: 1000, description: 'Classic glazed donut', tags: ['donut', 'sweet'] },
      { name: 'Donut Chocolate', price: 1000, description: 'Chocolate coated donut', tags: ['donut', 'chocolate'] },
    ],
  },
  {
    title: 'Breakfast',
    items: [
      { name: 'Plain Omelette', price: 4000, description: 'Fluffy eggs with butter', tags: ['eggs', 'butter'] },
      { name: 'Fried Eggs', price: 3000, description: 'Three fried eggs', tags: ['eggs', 'oil'] },
      { name: 'Scrambled Eggs', price: 4000, description: 'Soft scrambled eggs', tags: ['eggs', 'cream'] },
      { name: 'Spanish Omelette', price: 4500, description: 'Eggs, green pepper, tomato & onion', tags: ['eggs', 'tomato', 'pepper'] },
      { name: 'Boiled Eggs', price: 3000, description: 'Three eggs with cheese', tags: ['eggs', 'cheese'] },
      { name: 'Cheese Omelette', price: 3000, description: 'Melted cheese and eggs', tags: ['eggs', 'cheese'] },
      { name: 'Lamané Special Omelette', price: 6500, description: 'Eggs, French fries, tomato & olive', tags: ['eggs', 'fries', 'olive'] },
      { name: 'Ham & Cheese Omelette', price: 5000, description: 'Savory ham, cheese and eggs', tags: ['eggs', 'ham', 'cheese'] },
      { name: 'Chapatri Rolex', price: 4500, description: 'Rolled omelette with flatbread', tags: ['eggs', 'bread'] },
      { name: 'Croissant Omelette', price: 5000, description: 'Eggs folded inside a croissant', tags: ['eggs', 'pastry'] },
    ],
  },
  {
    title: 'Burgers & Pizza',
    items: [
      { name: 'Lamané Beef Burger', price: 5000, description: 'Beef, cheese, lettuce & tomatoes', tags: ['beef', 'cheese', 'lettuce'] },
      { name: 'Fish Burger', price: 5000, description: 'Crispy fish filet with sauce', tags: ['fish', 'bread'] },
      { name: 'Chicken Burger', price: 5000, description: 'Grilled chicken, lettuce and mayo', tags: ['chicken', 'lettuce'] },
      { name: 'Vegetarian Burger', price: 5000, description: 'Veggie patty with fresh greens', tags: ['vegetarian', 'lettuce'] },
      { name: 'King Burger', price: 5000, description: 'Double beef with cheese', tags: ['beef', 'cheese'] },
      { name: 'King Burger Chicken', price: 8500, description: 'Double chicken with extra toppings', tags: ['chicken', 'cheese'] },
      { name: 'Lamané Pizza', price: 10000, description: 'Tomato, cheese, mushrooms and peppers', tags: ['pizza', 'cheese', 'tomato'] },
      { name: 'Margarita Pizza', price: 9000, description: 'Tomato, basil, and mozzarella', tags: ['pizza', 'tomato', 'basil'] },
      { name: 'Vegetarian Pizza', price: 9000, description: 'Seasonal vegetables and melted cheese', tags: ['pizza', 'vegetables'] },
      { name: 'Chicken Pizza', price: 9000, description: 'Chicken, mushrooms and cheese', tags: ['pizza', 'chicken'] },
      { name: '4 Seasons Pizza', price: 10000, description: 'Four topping pizza with mixed meats and vegetables', tags: ['pizza', 'mixed'] },
    ],
  },
  {
    title: 'Sandwiches & Wraps',
    items: [
      { name: 'Creque Monsieur', price: 5500, description: 'Cheese, ham & bread', tags: ['ham', 'cheese'] },
      { name: 'Creque Madame', price: 5500, description: 'Cheese, ham & fried egg', tags: ['ham', 'cheese', 'egg'] },
      { name: 'Cheese and Ham Sandwich', price: 5000, description: 'Classic cheese and ham sandwich', tags: ['ham', 'cheese'] },
      { name: 'Omelette Sandwich', price: 4000, description: 'Egg omelette in a toasted sandwich', tags: ['egg', 'bread'] },
      { name: 'Vegetable Sandwich', price: 3500, description: 'Fresh veggies and seasoning', tags: ['vegetables'] },
      { name: 'Club Sandwich', price: 7500, description: 'Turkey, bacon, lettuce and tomato', tags: ['turkey', 'bacon', 'lettuce'] },
      { name: 'Chicken Sandwich', price: 7500, description: 'Grilled chicken and crunchy greens', tags: ['chicken', 'lettuce'] },
      { name: 'Hot Dog Sandwich', price: 6000, description: 'Sausage, bun, and house sauce', tags: ['sausage', 'bread'] },
      { name: 'Chicken Wrap', price: 7500, description: 'Chicken, salad and creamy sauce in a wrap', tags: ['chicken', 'wrap'] },
      { name: 'Vegetable Wrap', price: 6500, description: 'Crisp vegetables wrapped in flatbread', tags: ['vegetables', 'wrap'] },
      { name: 'Jambo & Vegetable Wrap', price: 7000, description: 'Mixed vegetables and spices in a wrap', tags: ['vegetables', 'wrap'] },
      { name: 'Beef Wrap', price: 8000, description: 'Seasoned beef and salad in a wrap', tags: ['beef', 'wrap'] },
    ],
  },
  {
    title: 'Pasta & Desserts',
    items: [
      { name: 'Spaghetti Carbonara', price: 6500, description: 'Creamy sauce with bacon and parmesan', tags: ['pasta', 'bacon'] },
      { name: 'Spaghetti Napolitana', price: 6500, description: 'Tomato sauce with herbs and parmesan', tags: ['pasta', 'tomato'] },
      { name: 'Spaghetti Bolognese', price: 6500, description: 'Rich meat sauce with parmesan', tags: ['pasta', 'beef'] },
      { name: 'Spaghetti Mongolian', price: 6500, description: 'Spicy beef and vegetables in pasta', tags: ['pasta', 'beef'] },
      { name: 'Chicken Spaghetti', price: 6000, description: 'Tender chicken with tomato sauce', tags: ['pasta', 'chicken'] },
      { name: 'Fruits Plate', price: 7000, description: 'Seasonal fresh fruit plate', tags: ['fruit', 'healthy'] },
      { name: 'Fruits Salad', price: 6000, description: 'Fresh fruit salad with honey', tags: ['fruit', 'healthy'] },
      { name: 'Lamane Muffin Cake', price: 6000, description: 'Moist cake with muffin crumb topping', tags: ['cake', 'muffin'] },
      { name: 'Lamane Chocolate', price: 3500, description: 'Rich chocolate dessert', tags: ['chocolate', 'dessert'] },
      { name: 'French Toast', price: 3500, description: 'Golden toast with cinnamon and syrup', tags: ['bread', 'cinnamon'] },
    ],
  },
  {
    title: 'Fish, Beef & Chicken',
    items: [
      { name: 'Fish Fingers', price: 8000, description: 'Crispy fish fingers with dipping sauce', tags: ['fish', 'crispy'] },
      { name: 'Fish Fillet', price: 10000, description: 'Lemon butter & accompaniment', tags: ['fish', 'lemon'] },
      { name: 'Fish Fillet with Mushroom Sauce', price: 10000, description: 'Fish fillet topped with mushroom sauce', tags: ['fish', 'mushroom'] },
      { name: 'Signature Fish Curry', price: 10000, description: 'Spiced fish curry served with rice', tags: ['fish', 'spices'] },
      { name: 'Beef Stroganoff', price: 9000, description: 'Creamy beef with mushrooms and rice', tags: ['beef', 'mushroom'] },
      { name: 'Beef Fillet with Green Pepper Sauce', price: 9000, description: 'Beef fillet with vibrant green pepper sauce', tags: ['beef', 'pepper'] },
      { name: 'Beef Cordon Bleu', price: 10000, description: 'Breaded beef stuffed with cheese', tags: ['beef', 'cheese'] },
      { name: 'Beef Brochette', price: 7500, description: 'Grilled skewers with French fries', tags: ['beef', 'grill'] },
      { name: 'Chicken Wings', price: 7000, description: 'Spicy grilled chicken wings', tags: ['chicken', 'spicy'] },
      { name: 'Chicken Breast', price: 3000, description: 'Grilled chicken breast', tags: ['chicken', 'grill'] },
      { name: 'Chicken Cordon Bleu', price: 10000, description: 'Breaded chicken with cheese filling', tags: ['chicken', 'cheese'] },
      { name: 'Whole Chicken with Rice', price: 30000, description: 'Roasted whole chicken served with rice', tags: ['chicken', 'rice'] },
    ],
  },
  {
    title: 'Soups, Salads & Healthy Food',
    items: [
      { name: 'Mushroom Soup', price: 4000, description: 'Creamy mushroom soup', tags: ['mushroom', 'soup'] },
      { name: 'Chicken Soup', price: 5000, description: 'Comforting chicken broth soup', tags: ['chicken', 'soup'] },
      { name: 'Fish Soup', price: 5000, description: 'Light fish broth with herbs', tags: ['fish', 'soup'] },
      { name: 'Vegetable Soup', price: 4000, description: 'Mixed vegetables simmered in broth', tags: ['vegetables', 'soup'] },
      { name: 'Cream of Tomato Soup', price: 5000, description: 'Smooth tomato soup with cream', tags: ['tomato', 'soup'] },
      { name: 'Chicken Salad', price: 6000, description: 'Grilled chicken on mixed greens', tags: ['chicken', 'salad'] },
      { name: 'Avocado Salad', price: 4000, description: 'Avocado, greens and citrus dressing', tags: ['avocado', 'salad'] },
      { name: 'Mixed Salad', price: 5000, description: 'Seasonal greens with fresh toppings', tags: ['vegetables', 'salad'] },
      { name: 'Fish Salad', price: 7000, description: 'Flaked fish over salad greens', tags: ['fish', 'salad'] },
      { name: 'Boiled Beef with Rice', price: 10000, description: 'Tender beef served with rice', tags: ['beef', 'rice'] },
      { name: 'Baked Fish with Rice', price: 10000, description: 'Baked fish fillet with rice', tags: ['fish', 'rice'] },
      { name: 'Vegetarian Plate', price: 5500, description: 'Healthy vegetarian selection', tags: ['vegetarian', 'healthy'] },
    ],
  },
  {
    title: 'Hot Coffee',
    items: [
      { name: 'Lamacina Coffee', price: 4000, description: 'Rich brewed coffee', tags: ['coffee'] },
      { name: 'Cappuccino', price: 3500, description: 'Espresso with steamed milk foam', tags: ['coffee', 'milk'] },
      { name: 'Regular Coffee', price: 3000, description: 'Classic morning coffee', tags: ['coffee'] },
      { name: 'Café au Lait', price: 4000, description: 'Coffee with hot milk', tags: ['coffee', 'milk'] },
      { name: 'French Press', price: 4000, description: 'Fresh pressed coffee', tags: ['coffee'] },
      { name: 'Espresso', price: 1500, description: 'Single shot', tags: ['coffee', 'espresso'] },
      { name: 'Double Espresso', price: 2000, description: 'Double shot of espresso', tags: ['coffee', 'espresso'] },
      { name: 'Espresso Macchiato', price: 3000, description: 'Espresso with a dollop of milk foam', tags: ['coffee', 'milk'] },
      { name: 'Americano', price: 3000, description: 'Espresso diluted with hot water', tags: ['coffee'] },
      { name: 'Café Latte', price: 3500, description: 'Creamy espresso latte', tags: ['coffee', 'milk'] },
      { name: 'Café Mocha', price: 4000, description: 'Chocolate espresso latte', tags: ['coffee', 'chocolate'] },
      { name: 'Flat White Coffee', price: 3500, description: 'Velvety microfoam espresso', tags: ['coffee', 'milk'] },
    ],
  },
  {
    title: 'Juices, Shakes & Drinks',
    items: [
      { name: 'Pineapple Juice', price: 5000, description: 'Fresh pineapple blended juice', tags: ['pineapple', 'juice'] },
      { name: 'Apple Juice', price: 6000, description: 'Fresh apple juice', tags: ['apple', 'juice'] },
      { name: 'Detox Juice', price: 6000, description: 'Green juice with vegetables', tags: ['juice', 'healthy'] },
      { name: 'Mojito', price: 7000, description: 'Mint, lime and soda', tags: ['mint', 'lime'] },
      { name: 'Passion Fruit Juice', price: 5000, description: 'Tangy passion fruit juice', tags: ['fruit', 'juice'] },
      { name: 'Mango Juice', price: 6000, description: 'Fresh mango juice', tags: ['mango', 'juice'] },
      { name: 'Orange Juice', price: 7000, description: 'Fresh squeezed orange juice', tags: ['orange', 'juice'] },
      { name: 'Avocado Juice', price: 4000, description: 'Creamy avocado juice', tags: ['avocado', 'juice'] },
      { name: 'Vanilla Milkshake', price: 5000, description: 'Vanilla milkshake with cream', tags: ['milkshake', 'vanilla'] },
      { name: 'Strawberry Milkshake', price: 5000, description: 'Strawberry milkshake', tags: ['milkshake', 'strawberry'] },
      { name: 'Chocolate Milkshake', price: 5000, description: 'Chocolate milkshake', tags: ['milkshake', 'chocolate'] },
      { name: 'Banana Smoothie', price: 5000, description: 'Banana smoothie with milk', tags: ['banana', 'smoothie'] },
      { name: 'Small Fanta', price: 1200, description: 'Refreshing soda', tags: ['soda'] },
      { name: 'Water', price: 1000, description: 'Bottled water', tags: ['water'] },
      { name: 'African Tea', price: 3000, description: 'Warm spiced tea', tags: ['tea'] },
      { name: 'Hot Chocolate', price: 2000, description: 'Warm chocolate drink', tags: ['chocolate', 'hot'] },
    ],
  },
]

const searchQuery = ref('')
const normalizedQuery = computed(() => searchQuery.value.trim().toLowerCase())
const filteredMenu = computed(() => {
  if (!normalizedQuery.value) return menu
  return menu
    .map(section => ({
      title: section.title,
      items: section.items.filter(item => {
        const content = [item.name, item.description, ...(item.tags || [])].join(' ').toLowerCase()
        return content.includes(normalizedQuery.value)
      }),
    }))
    .filter(section => section.items.length)
})

const money = (price) => `${price.toLocaleString()} RWF`
const slug = (value) => value.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
</script>
