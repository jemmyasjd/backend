const axios = require('axios');

const products = [
  {
    name: 'Strawberry',
    price: 120,
    imageUrl: 'IMG/Product-C7.jpg'
  },
];

async function insertProducts() {
  try {
    const response = await axios.post('http://localhost:5000/product', products);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error inserting products:', error);
  }
}

insertProducts();
