/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // DRINKS
  {
    id: 'k01',
    name: 'Kopi O',
    localName: 'Traditional Black Coffee',
    price: 'RM 6.50',
    category: 'drinks',
    description: 'Robusta beans locally roasted with sugar and butter, hand-filtered through a cotton flannel sock. Robust, earthy, with dynamic burnt sugar notes.',
    ingredients: ['Local Robusta Beans', 'Roasted Sugar coating', 'Cane Sugar', 'Boiling Water'],
    isLocal: true
  },
  {
    id: 'k02',
    name: 'Kopi C',
    localName: 'Coffee with Evaporated Milk',
    price: 'RM 7.00',
    category: 'drinks',
    description: 'Robust charcoal-roasted local beans sweetened with a balanced touch of cane sugar and diluted with velvety evaporated milk for a silky finish.',
    ingredients: ['Local Robusta Beans', 'Evaporated Milk', 'Cane Sugar'],
    isLocal: true,
    signature: true
  },
  {
    id: 'k03',
    name: 'Kopi Peng',
    localName: 'Iced Sweet Coffee',
    price: 'RM 7.50',
    category: 'drinks',
    description: 'Our standard robust pour pulled back and forth to aerate, cooled quickly over crushed ice and sweetened heavily with premium condensed milk.',
    ingredients: ['Local Robusta Beans', 'Sweetened Condensed Milk', 'Evaporated float', 'Chilled Ice'],
    isLocal: true
  },
  {
    id: 'k04',
    name: 'V60 Pour Over',
    localName: 'Artisan Filter Coffee',
    price: 'RM 16.00',
    category: 'drinks',
    description: 'Slow-extracted pour over using seasonally sourced, light-roasted single origin beans. Clean body, bright acidity, and structured tasting notes.',
    ingredients: ['Seasonally Sourced arabica beans', 'Filtered water @ 92°C', 'Slow circular hand pour'],
    signature: true
  },
  {
    id: 'k05',
    name: 'Aeropress Brew',
    localName: 'Immersion Extraction',
    price: 'RM 14.50',
    category: 'drinks',
    description: 'A quick immersion extraction method producing a cup with rich, complex body and clarified acidity. Highly consistent and vibrant expression of single origin beans.',
    ingredients: ['Micro-lot Single Origin beans', 'Rapid immersion pressure', 'Metal-free paper filter']
  },
  {
    id: 'k06',
    name: 'Flat White',
    localName: 'Espresso with Microfoam',
    price: 'RM 12.00',
    category: 'drinks',
    description: 'A double ristretto shot of our signature house espresso blend, integrated smoothly with hot, velvety steamed microfoam milk for a sweet, creamy balance.',
    ingredients: ['House Espresso Blend (Brazil/Sumatra)', 'Steamed whole milk', 'Microfoam (0.5cm layer)']
  },

  // PASTRIES
  {
    id: 'p01',
    name: 'Kaya Butter Toast',
    localName: 'Roti Bakar Kaya Butter',
    price: 'RM 8.00',
    category: 'pastries',
    description: 'Traditional thick-cut fluffy brioche toast crust-charred over open heat, sandwiching a generous spread of aromatic pandan kaya and double slabs of cold salted butter.',
    ingredients: ['Handmade Pandan Kaya custard', 'Cold Salted SCS Butter', 'Thick-cut sweet brioche bread'],
    isLocal: true,
    signature: true
  },
  {
    id: 'p02',
    name: 'Pandan Gula Melaka Canelé',
    localName: 'Malayan-French Canelé',
    price: 'RM 10.00',
    category: 'pastries',
    description: 'A classical French pastry given a local whisper. Hard caramelized outer wax shell, containing a rich, moist, custardy heart scented with fresh screwpine and high-fat dark coconut palm sugar.',
    ingredients: ['Gula Melaka (Malacca palm sugar)', 'Fresh Pandan leaf extract', 'Dark Rum', 'Caramelized beeswax crust'],
    signature: true
  },
  {
    id: 'p03',
    name: 'Salted Egg Lava Croissant',
    localName: 'Salted Egg Croissant',
    price: 'RM 14.00',
    category: 'pastries',
    description: 'Flaky, buttery 24-layer standard French croissant filled with a velvety, flowing sweet-and-savory warm salted duck egg yolk emulsion.',
    ingredients: ['AOP French Butter pastry', 'Cured Salted Egg Yolks', 'Custard cream fill'],
  },

  // SANDWICHES
  {
    id: 's01',
    name: 'Sambal Grilled Cheese',
    localName: 'Spicy Sambal Sourdough Toastie',
    price: 'RM 18.00',
    category: 'sandwiches',
    description: 'Crisply pan-grilled sourdough sandwich containing layered mature white cheddar, sharp gruyère, and a thin, highly potent layer of our house-cooked dried-shrimp caramelised sambal paste.',
    ingredients: ['Sourdough slices', 'Aged white Cheddar', 'Gruyère cheese', 'House savory dried-shrimp sambal'],
    signature: true
  },
  {
    id: 's02',
    name: 'Lemongrass Chicken Sando',
    localName: 'Serai Fried Chicken Sando',
    price: 'RM 22.00',
    category: 'sandwiches',
    description: 'Panko-crusted chicken thigh marinated with fresh ground lemongrass and ginger, deep-fried to a golden shatter, served between toasted charcoal brioche with kaffir lime aioli and sliced cucumber.',
    ingredients: ['Charcoal brioche buns', 'Lemongrass chicken thigh', 'Crispy Panko crust', 'Kaffir lime aioli', 'Fresh cucumber ribbons']
  },
  {
    id: 's03',
    name: 'Miso Kampung Egg Toast',
    localName: 'Miso Smashed Egg Salad',
    price: 'RM 16.00',
    category: 'sandwiches',
    description: 'Open-faced toasted rustic boule topped with pasture-raised kampung eggs boiled to a soft jam state, smashed lightly with sweet white shiro miso, classic Japanese kewpie, and toasted furikake grains.',
    ingredients: ['Kampung soft-boiled eggs', 'Shiro Miso paste', 'Kewpie mayonnaise', 'Sourdough boule', 'Nori furikake dust']
  }
];
