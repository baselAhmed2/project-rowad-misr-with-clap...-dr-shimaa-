// Store the products data
let productsData = [];
let currentDisplayedCount = 8;
const productsPerPage = 8;

// Function to fetch products from API
async function fetchProducts() {
  try {
    const response = await fetch('https://your-api-endpoint.com/products');
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    productsData = data;
    
    // Update the initial 8 products
    updateProductsDisplay();
    
    return data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return null;
  }
}

// Function to update the products display
function updateProductsDisplay() {
  // If there's no data from API, we keep the original HTML
  if (!productsData || productsData.length === 0) {
    return;
  }
  
  const productCards = document.querySelectorAll('.product-card');
  
  // Only update the existing cards (max 8 initially)
  const cardsToUpdate = Math.min(productCards.length, productsData.length);
  
  for (let i = 0; i < cardsToUpdate; i++) {
    updateProductCard(productCards[i], productsData[i]);
  }
}

// Function to update a single product card
function updateProductCard(card, productData) {
  // Update image
  const image = card.querySelector('.product-image img');
  if (image && productData.image) {
    image.src = productData.image;
    image.alt = productData.name;
  }
  
  // Update product name
  const nameElement = card.querySelector('.product-name');
  if (nameElement) {
    nameElement.textContent = productData.name;
  }
  
  // Update product price
  const priceElement = card.querySelector('.product-price');
  if (priceElement) {
    priceElement.textContent = `$${productData.price}`;
  }
  
  // Update rating stars
  const stars = card.querySelectorAll('.stars i');
  if (stars.length > 0 && productData.rating) {
    const fullStars = Math.floor(productData.rating);
    
    // Reset all stars first
    stars.forEach(star => {
      star.className = 'far fa-star'; // Empty star
    });
    
    // Set full stars
    for (let i = 0; i < fullStars && i < 5; i++) {
      stars[i].className = 'fas fa-star'; // Filled star
    }
  }
  
  // Update reviews count
  const reviewCount = card.querySelector('.review-count');
  if (reviewCount && productData.reviewCount) {
    reviewCount.textContent = `(${productData.reviewCount})`;
  }
  
  // Update color options if available
  const colorOptionsContainer = card.querySelector('.color-options');
  if (colorOptionsContainer && productData.colors && productData.colors.length > 0) {
    // Clear existing color options
    colorOptionsContainer.innerHTML = '';
    
    // Add new color options
    productData.colors.forEach(color => {
      const colorOption = document.createElement('div');
      colorOption.className = 'color-option';
      colorOption.style.backgroundColor = color;
      colorOptionsContainer.appendChild(colorOption);
    });
  }
  
  // Add "NEW" tag if product is new
  const existingTag = card.querySelector('.product-tag');
  if (productData.isNew) {
    if (!existingTag) {
      const newTag = document.createElement('div');
      newTag.className = 'product-tag';
      newTag.textContent = 'NEW';
      card.querySelector('.product-image').prepend(newTag);
    }
  } else if (existingTag) {
    existingTag.remove();
  }
}

// Function to load more products
function loadMoreProducts() {
  const productsGrid = document.querySelector('.products-grid');
  
  // Calculate how many more products we can show
  const remaining = productsData.length - currentDisplayedCount;
  const toLoad = Math.min(remaining, productsPerPage);
  
  if (toLoad <= 0) {
    // No more products to load
    return;
  }
  
  // Create and append new product cards
  for (let i = 0; i < toLoad; i++) {
    const productIndex = currentDisplayedCount + i;
    const productData = productsData[productIndex];
    
    // Create a new product card
    const newCard = createProductCard(productData);
    productsGrid.appendChild(newCard);
  }
  
  // Update the count of displayed products
  currentDisplayedCount += toLoad;
  
  // Hide the "View All Products" button if we've shown all products
  if (currentDisplayedCount >= productsData.length) {
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
      viewAllBtn.style.display = 'none';
    }
  }
}

// Function to create a new product card
function createProductCard(productData) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  // Create product image section
  const imageSection = document.createElement('div');
  imageSection.className = 'product-image';
  
  // Add NEW tag if product is new
  if (productData.isNew) {
    const newTag = document.createElement('div');
    newTag.className = 'product-tag';
    newTag.textContent = 'NEW';
    imageSection.appendChild(newTag);
  }
  
  // Add product image
  const img = document.createElement('img');
  img.src = productData.image || 'https://via.placeholder.com/200x200';
  img.alt = productData.name;
  imageSection.appendChild(img);
  
  // Add product actions
  const actions = document.createElement('div');
  actions.className = 'product-actions';
  
  // Add heart icon
  const heartAction = document.createElement('div');
  heartAction.className = 'action-icon';
  const heartIcon = document.createElement('i');
  heartIcon.className = 'far fa-heart';
  heartAction.appendChild(heartIcon);
  actions.appendChild(heartAction);
  
  // Add eye icon
  const eyeAction = document.createElement('div');
  eyeAction.className = 'action-icon';
  const eyeIcon = document.createElement('i');
  eyeIcon.className = 'far fa-eye';
  eyeAction.appendChild(eyeIcon);
  actions.appendChild(eyeAction);
  
  imageSection.appendChild(actions);
  card.appendChild(imageSection);
  
  // Create product info section
  const infoSection = document.createElement('div');
  infoSection.className = 'product-info';
  
  // Add product name
  const name = document.createElement('div');
  name.className = 'product-name';
  name.textContent = productData.name;
  infoSection.appendChild(name);
  
  // Add product price
  const price = document.createElement('span');
  price.className = 'product-price';
  price.textContent = `$${productData.price}`;
  infoSection.appendChild(price);
  
  // Add rating section
  const rating = document.createElement('div');
  rating.className = 'product-rating';
  
  // Add stars
  const stars = document.createElement('div');
  stars.className = 'stars';
  
  // Calculate full stars
  const fullStars = Math.floor(productData.rating || 0);
  
  // Add filled stars
  for (let i = 0; i < fullStars && i < 5; i++) {
    const star = document.createElement('i');
    star.className = 'fas fa-star';
    stars.appendChild(star);
  }
  
  // Add empty stars
  for (let i = fullStars; i < 5; i++) {
    const star = document.createElement('i');
    star.className = 'far fa-star';
    stars.appendChild(star);
  }
  
  rating.appendChild(stars);
  
  // Add review count
  const reviews = document.createElement('span');
  reviews.className = 'review-count';
  reviews.textContent = `(${productData.reviewCount || 0})`;
  rating.appendChild(reviews);
  
  infoSection.appendChild(rating);
  
  // Add color options if available
  if (productData.colors && productData.colors.length > 0) {
    const colorOptions = document.createElement('div');
    colorOptions.className = 'color-options';
    
    productData.colors.forEach(color => {
      const colorOption = document.createElement('div');
      colorOption.className = 'color-option';
      colorOption.style.backgroundColor = color;
      colorOptions.appendChild(colorOption);
    });
    
    infoSection.appendChild(colorOptions);
  }
  
  card.appendChild(infoSection);
  
  return card;
}

// Event listener for "View All Products" button
document.addEventListener('DOMContentLoaded', function() {
  const viewAllBtn = document.querySelector('.view-all-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', function(e) {
      e.preventDefault();
      loadMoreProducts();
    });
  }
  
  // Initialize by fetching products from API
  fetchProducts();
});


