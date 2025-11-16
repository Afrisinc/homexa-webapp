import { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "prod-1",
    title: "Apple iPhone 15 Pro Max 256GB",
    description:
      "The latest iPhone with titanium design, A17 Pro chip, and advanced camera system. Features include ProMotion display, Action button, and USB-C connectivity.",
    price: 1199,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
      "https://images.unsplash.com/photo-1696446702183-cbd0c957cc8b?w=800",
    ],
    rating: 4.8,
    reviewCount: 1247,
    categoryId: "electronics",
    brand: "Apple",
    model: "iPhone 15 Pro Max",
    sellerId: "seller-1",
    stock: 45,
    createdAt: "2024-11-10T10:00:00Z",
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: 2,
    },
  },
  {
    id: "prod-2",
    title: "Samsung Galaxy S24 Ultra 512GB",
    description:
      "Premium Android flagship with S Pen, 200MP camera, and AI features. Includes Snapdragon 8 Gen 3 processor and stunning AMOLED display.",
    price: 1299,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800",
    ],
    rating: 4.7,
    reviewCount: 892,
    categoryId: "electronics",
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    sellerId: "seller-2",
    stock: 32,
    createdAt: "2024-11-08T14:30:00Z",
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: 3,
    },
  },
  {
    id: "prod-3",
    title: "Sony WH-1000XM5 Wireless Headphones",
    description:
      "Industry-leading noise cancellation with premium sound quality. 30-hour battery life, multipoint connection, and comfortable design.",
    price: 399,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800",
    ],
    rating: 4.9,
    reviewCount: 2341,
    categoryId: "electronics",
    brand: "Sony",
    model: "WH-1000XM5",
    sellerId: "seller-1",
    stock: 78,
    createdAt: "2024-11-05T09:15:00Z",
    condition: "new",
    shipping: {
      free: false,
      estimatedDays: 5,
    },
  },
  {
    id: "prod-4",
    title: "Apple MacBook Pro 14-inch M3 Pro",
    description:
      "Powerful laptop with M3 Pro chip, Liquid Retina XDR display, and up to 18 hours battery life. Perfect for professionals and creators.",
    price: 1999,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800",
    ],
    rating: 4.8,
    reviewCount: 567,
    categoryId: "electronics",
    brand: "Apple",
    model: "MacBook Pro 14",
    sellerId: "seller-2",
    stock: 23,
    createdAt: "2024-11-12T16:45:00Z",
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: 2,
    },
  },
  {
    id: "prod-5",
    title: "Nike Air Max 270 Running Shoes",
    description:
      "Comfortable running shoes with Max Air cushioning and breathable mesh upper. Available in multiple colors and sizes.",
    price: 150,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
    ],
    rating: 4.6,
    reviewCount: 3421,
    categoryId: "fashion",
    brand: "Nike",
    model: "Air Max 270",
    sellerId: "seller-3",
    stock: 156,
    createdAt: "2024-11-01T08:20:00Z",
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: 4,
    },
  },
  {
    id: "prod-6",
    title: "Levi's 501 Original Fit Jeans",
    description:
      "Classic straight leg jeans with button fly. Made from premium denim with the iconic Levi's quality and style.",
    price: 79,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    ],
    rating: 4.5,
    reviewCount: 1876,
    categoryId: "fashion",
    brand: "Levi's",
    model: "501 Original",
    sellerId: "seller-3",
    stock: 234,
    createdAt: "2024-10-28T12:00:00Z",
    condition: "new",
    shipping: {
      free: false,
      estimatedDays: 6,
    },
  },
  {
    id: "prod-7",
    title: "Dyson V15 Detect Cordless Vacuum",
    description:
      "Advanced cordless vacuum with laser detection and LCD screen showing particle count. Powerful suction and up to 60 minutes runtime.",
    price: 699,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800",
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800",
    ],
    rating: 4.7,
    reviewCount: 934,
    categoryId: "home",
    brand: "Dyson",
    model: "V15 Detect",
    sellerId: "seller-4",
    stock: 41,
    createdAt: "2024-11-09T11:30:00Z",
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: 3,
    },
  },
  {
    id: "prod-8",
    title: "KitchenAid Stand Mixer Classic",
    description:
      "Iconic stand mixer with 10-speed control and tilt-head design. Includes wire whip, flat beater, and dough hook attachments.",
    price: 379,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800",
    ],
    rating: 4.9,
    reviewCount: 4567,
    categoryId: "home",
    brand: "KitchenAid",
    model: "Classic Series",
    sellerId: "seller-4",
    stock: 67,
    createdAt: "2024-10-30T15:45:00Z",
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: 5,
    },
  },
  {
    id: "prod-9",
    title: "Adidas Yoga Mat Premium 6mm",
    description:
      "Extra thick yoga mat with non-slip surface and carrying strap. Made from eco-friendly materials, perfect for all yoga styles.",
    price: 45,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800",
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a3?w=800",
    ],
    rating: 4.4,
    reviewCount: 876,
    categoryId: "sports",
    brand: "Adidas",
    model: "Premium Mat",
    sellerId: "seller-5",
    stock: 198,
    createdAt: "2024-11-03T09:00:00Z",
    condition: "new",
    shipping: {
      free: false,
      estimatedDays: 7,
    },
  },
  {
    id: "prod-10",
    title: "Garmin Forerunner 265 GPS Watch",
    description:
      "Advanced running watch with AMOLED display, training readiness, and HRV status. Includes maps, music, and 13-day battery life.",
    price: 449,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800",
    ],
    rating: 4.8,
    reviewCount: 1234,
    categoryId: "sports",
    brand: "Garmin",
    model: "Forerunner 265",
    sellerId: "seller-5",
    stock: 52,
    createdAt: "2024-11-11T13:20:00Z",
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: 4,
    },
  },
  {
    id: "prod-11",
    title: "Canon EOS R6 Mark II Mirrorless Camera",
    description:
      "Professional mirrorless camera with 24.2MP sensor, 40fps burst shooting, and advanced autofocus. Perfect for photography and video.",
    price: 2499,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800",
      "https://images.unsplash.com/photo-1606980631777-5ee3e6ea1fa7?w=800",
    ],
    rating: 4.9,
    reviewCount: 423,
    categoryId: "electronics",
    brand: "Canon",
    model: "EOS R6 Mark II",
    sellerId: "seller-2",
    stock: 18,
    createdAt: "2024-11-07T10:15:00Z",
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: 2,
    },
  },
  {
    id: "prod-12",
    title: "Dell XPS 15 Laptop",
    description:
      "Premium laptop with 15.6-inch 4K OLED display, Intel Core i7, 16GB RAM, and 512GB SSD. Sleek design with powerful performance.",
    price: 1799,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
    ],
    rating: 4.7,
    reviewCount: 678,
    categoryId: "electronics",
    brand: "Dell",
    model: "XPS 15",
    sellerId: "seller-2",
    stock: 29,
    createdAt: "2024-11-04T14:00:00Z",
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: 3,
    },
  },
  {
    id: "prod-13",
    title: "Instant Pot Duo Plus 6 Quart",
    description:
      "9-in-1 electric pressure cooker with 15 smart programs. Replaces multiple kitchen appliances and makes cooking effortless.",
    price: 119,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800",
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
    ],
    rating: 4.8,
    reviewCount: 8934,
    categoryId: "home",
    brand: "Instant Pot",
    model: "Duo Plus",
    sellerId: "seller-4",
    stock: 143,
    createdAt: "2024-10-25T11:45:00Z",
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: 4,
    },
  },
  {
    id: "prod-14",
    title: "Ray-Ban Wayfarer Classic Sunglasses",
    description:
      "Iconic sunglasses with crystal green lenses and acetate frame. Timeless style with 100% UV protection.",
    price: 154,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800",
    ],
    rating: 4.6,
    reviewCount: 2134,
    categoryId: "fashion",
    brand: "Ray-Ban",
    model: "Wayfarer Classic",
    sellerId: "seller-3",
    stock: 287,
    createdAt: "2024-10-22T09:30:00Z",
    condition: "new",
    shipping: {
      free: false,
      estimatedDays: 5,
    },
  },
  {
    id: "prod-15",
    title: "Bose SoundLink Flex Bluetooth Speaker",
    description:
      "Portable waterproof speaker with powerful sound and 12-hour battery. Rugged design perfect for outdoor adventures.",
    price: 149,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800",
    ],
    rating: 4.7,
    reviewCount: 1567,
    categoryId: "electronics",
    brand: "Bose",
    model: "SoundLink Flex",
    sellerId: "seller-1",
    stock: 91,
    createdAt: "2024-11-06T16:20:00Z",
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: 3,
    },
  },
  {
    id: "prod-16",
    title: "The North Face Nuptse Jacket",
    description:
      "Iconic insulated jacket with 700-fill down and water-repellent finish. Warm, comfortable, and stylish for cold weather.",
    price: 329,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800",
    ],
    rating: 4.8,
    reviewCount: 1923,
    categoryId: "fashion",
    brand: "The North Face",
    model: "Nuptse",
    sellerId: "seller-3",
    stock: 64,
    createdAt: "2024-10-20T12:15:00Z",
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: 5,
    },
  },
  {
    id: "prod-17",
    title: "PlayStation 5 Console",
    description:
      "Next-gen gaming console with ultra-high-speed SSD, ray tracing, and 4K gaming. Includes DualSense wireless controller.",
    price: 499,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800",
      "https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800",
    ],
    rating: 4.9,
    reviewCount: 5678,
    categoryId: "electronics",
    brand: "Sony",
    model: "PlayStation 5",
    sellerId: "seller-1",
    stock: 12,
    createdAt: "2024-11-13T17:00:00Z",
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: 2,
    },
  },
  {
    id: "prod-18",
    title: "Hydro Flask Water Bottle 32oz",
    description:
      "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and durable.",
    price: 44,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800",
    ],
    rating: 4.7,
    reviewCount: 3421,
    categoryId: "sports",
    brand: "Hydro Flask",
    model: "Wide Mouth",
    sellerId: "seller-5",
    stock: 312,
    createdAt: "2024-10-18T10:00:00Z",
    condition: "new",
    shipping: {
      free: false,
      estimatedDays: 6,
    },
  },
  {
    id: "prod-19",
    title: "iRobot Roomba j7+ Robot Vacuum",
    description:
      "Smart robot vacuum with obstacle avoidance and automatic dirt disposal. Works with Alexa and Google Assistant.",
    price: 799,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800",
      "https://images.unsplash.com/photo-1583956226689-88c084f42c95?w=800",
    ],
    rating: 4.6,
    reviewCount: 2341,
    categoryId: "home",
    brand: "iRobot",
    model: "Roomba j7+",
    sellerId: "seller-4",
    stock: 38,
    createdAt: "2024-11-02T13:40:00Z",
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: 4,
    },
  },
  {
    id: "prod-20",
    title: "Kindle Paperwhite (16GB)",
    description:
      "Waterproof e-reader with 6.8-inch glare-free display and adjustable warm light. Holds thousands of books with weeks of battery life.",
    price: 139,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1592422002554-b18f6f5c2aa3?w=800",
      "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800",
    ],
    rating: 4.8,
    reviewCount: 7654,
    categoryId: "electronics",
    brand: "Amazon",
    model: "Paperwhite",
    sellerId: "seller-1",
    stock: 145,
    createdAt: "2024-10-15T08:30:00Z",
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: 3,
    },
  },
];

// Helper to get unique brands
export const getBrands = (): string[] => {
  return Array.from(new Set(products.map((p) => p.brand))).sort();
};

// Helper to get models for a brand
export const getModelsByBrand = (brand: string): string[] => {
  return Array.from(
    new Set(products.filter((p) => p.brand === brand).map((p) => p.model))
  ).sort();
};

// Helper to get price range for a specific currency
export const getPriceRangeByCurrency = (currency?: string): { min: number; max: number; step: number } => {
  const filteredProducts = currency
    ? products.filter((p) => p.currency === currency)
    : products;

  if (filteredProducts.length === 0) {
    return { min: 0, max: 1000, step: 10 };
  }

  const prices = filteredProducts.map((p) => p.price);
  const min = Math.floor(Math.min(...prices));
  const max = Math.ceil(Math.max(...prices));

  // Calculate adaptive step based on price range
  const range = max - min;
  let step: number;

  if (range <= 100) {
    step = 5;
  } else if (range <= 500) {
    step = 10;
  } else if (range <= 2000) {
    step = 50;
  } else {
    step = 100;
  }

  return { min, max, step };
};

// Helper to get unique currencies
export const getCurrencies = (): string[] => {
  return Array.from(new Set(products.map((p) => p.currency))).sort();
};
