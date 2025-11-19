// Dummy data for Furnivora furniture store
export const categories = [
  'Living Room',
  'Bedroom',
  'Dining Room',
  'Office',
  'Kitchen',
  'Bathroom',
  'Outdoor',
  'Kids Room',
  'Home Decor',
  'Storage',
  'Lighting',
  'Rugs & Carpets',
  'Mattresses',
  'Chairs',
  'Tables',
  'Cabinets',
  'Shelves',
  'Beds',
  'Sofas',
  'Desks',
  'Bookcases',
  'Wardrobes',
  'Dressers',
  'Nightstands',
  'Ottomans'
];

const brands = ['ComfortHome', 'StyleLiving', 'ModernFurnish', 'ElegantDesign', 'CozyNest', 'UrbanDecor', 'RusticCharm', 'Minimalist', 'LuxuryLiving', 'BudgetFriendly'];

const generateProducts = () => {
  const products = [];
  let id = 1;

  categories.forEach(category => {
    for (let i = 1; i <= 40; i++) {
      // const brand = brands[Math.floor(Math.random() * brands.length)];
      const brand = brands[(i - 1) % brands.length];
      const name = `${category} ${brand} Model ${i}`;
      // const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0 to 5.0
      const rating = (Math.random() * 2 + 3).toFixed(1);
      // const price = Math.floor(Math.random() * 2000 + 100); // $100 to $2100
      const price = Math.floor(Math.random() * 2000 + 100);
      const slug = `${category.toLowerCase().replace(/\s+/g, '-')}-${brand.toLowerCase()}-${i}`;

      products.push({
        id: id++,
        name,
        brand,
        category,
        price,
        rating: parseFloat(rating),
        slug,
        thumbnail: '', // Blank for now
        description: `Beautiful ${category.toLowerCase()} furniture piece from ${brand}. Perfect for modern homes.`,
        dimensions: `${Math.floor(Math.random() * 100 + 20)}" x ${Math.floor(Math.random() * 50 + 10)}" x ${Math.floor(Math.random() * 40 + 10)}"`,
        material: ['Wood', 'Metal', 'Fabric', 'Leather', 'Glass'][Math.floor(Math.random() * 5)],
        color: ['Brown', 'Black', 'White', 'Gray', 'Blue', 'Red', 'Green'][Math.floor(Math.random() * 7)],
        inStock: Math.random() > 0.1, // 90% in stock
        reviews: Math.floor(Math.random() * 100 + 1)
      });
    }
  });

  return products;
};

export const products = generateProducts();

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const getProductBySlug = (slug) => {
  return products.find(product => product.slug === slug);
};