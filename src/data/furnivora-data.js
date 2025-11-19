
export const categories = [
  { name: "Sofas & Couches", slug: "sofas-couches" },
  { name: "Sectionals", slug: "sectionals" },
  { name: "Living Room Sets", slug: "living-room-sets" },
  { name: "Chairs & Recliners", slug: "chairs-recliners" },
  { name: "Coffee & Accent Tables", slug: "coffee-accent-tables" },
  { name: "TV Stands & Entertainment Centers", slug: "tv-stands-entertainment-centers" },
  { name: "Beds & Headboards", slug: "beds-headboards" },
  { name: "Dressers & Chests", slug: "dressers-chests" },
  { name: "Nightstands", slug: "nightstands" },
  { name: "Bedroom Sets", slug: "bedroom-sets" },
  { name: "Dining Tables", slug: "dining-tables" },
  { name: "Dining Chairs", slug: "dining-chairs" },
  { name: "Dining Room Sets", slug: "dining-room-sets" },
  { name: "Bar Stools & Counter Stools", slug: "bar-stools-counter-stools" },
  { name: "Desks", slug: "desks" },
  { name: "Office Chairs", slug: "office-chairs" },
  { name: "Bookcases & Shelving", slug: "bookcases-shelving" },
  { name: "File Cabinets", slug: "file-cabinets" },
  { name: "Patio Furniture Sets", slug: "patio-furniture-sets" },
  { name: "Outdoor Seating", slug: "outdoor-seating" },
  { name: "Outdoor Dining", slug: "outdoor-dining" },
  { name: "Kids' Beds", slug: "kids-beds" },
  { name: "Kids' Storage & Organization", slug: "kids-storage-organization" },
  { name: "Entryway Furniture", slug: "entryway-furniture" },
  { name: "Mattresses", slug: "mattresses" },
];

const brands = ["FurniCo", "ModaFurnish", "EcoHome", "UrbanWood", "ClassicComfort"];
const adjectives = ["Modern", "Classic", "Rustic", "Minimalist", "Elegant", "Cozy", "Stylish", "Functional", "Compact", "Spacious"];
const materials = ["Wood", "Metal", "Fabric", "Leather", "Glass", "Rattan", "Velvet", "Linen", "Oak", "Pine"];

export const products = categories.flatMap((category) => {
  const productList = [];
  for (let i = 1; i <= 40; i++) {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const material = materials[Math.floor(Math.random() * materials.length)];
    const productName = `${adjective} ${category.name.slice(0, -1)} (${material})`;
    
    productList.push({
      id: `${category.slug}-${i}`,
      name: productName,
      slug: `${adjective.toLowerCase()}-${category.name.slice(0, -1).toLowerCase().replace(/ /g, '-')}-${i}`,
      brand: brands[Math.floor(Math.random() * brands.length)],
      category: category.name,
      categorySlug: category.slug,
      rating: (Math.random() * (5 - 3) + 3).toFixed(1),
      price: (Math.random() * (1500 - 100) + 100).toFixed(2),
      thumbnail: "https://via.placeholder.com/300x300.png?text=Furnivora",
      description: `A high-quality ${productName}. Perfect for any home, combining style and comfort. Made from the finest ${material.toLowerCase()}.`,
      images: [
        "https://via.placeholder.com/600x600.png?text=Furnivora+View+1",
        "https://via.placeholder.com/600x600.png?text=Furnivora+View+2",
        "https://via.placeholder.com/600x600.png?text=Furnivora+View+3",
      ]
    });
  }
  return productList;
});

export const getProductsByCategory = (categorySlug) => {
  return products.filter(p => p.categorySlug === categorySlug);
};

export const getProductBySlug = (productSlug) => {
  return products.find(p => p.slug === productSlug);
};
