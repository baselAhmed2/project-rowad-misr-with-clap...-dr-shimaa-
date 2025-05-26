

// Function to fetch products from the C# API
async function fetchProducts() {
    try {
        const response = await fetch('/api/products'); // Replace with your actual API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Function to organize products into nested array if needed
function organizeProducts(products) {
    // You can modify this function based on how you want to organize your products
    // For example, you might want to group them by category
    return {
        bestSelling: products.filter(product => product.isBestSelling),
        allProducts: products
    };
}

// Function to create product cards based on the products data
function createProductCards(products) {
    const productsGrid = document.querySelector('.products-grid');
    
    // Clear existing content
    productsGrid.innerHTML = '';
    
    // Create a card for each product
    products.forEach(product => {
        // Create product card
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Set the inner HTML of the product card
        productCard.innerHTML = `
            <img src="${product.imageUrl || '/api/placeholder/300/300'}" alt="${product.name}" class="product-image">
            <div class="product-actions">
                <button class="action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="black" stroke-width="1.5"/>
                    </svg>
                </button>
                <button class="action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6Z" stroke="black" stroke-width="1.5"/>
                        <path d="M12 22C13.1046 22 14 21.1046 14 20C14 18.8954 13.1046 18 12 18C10.8954 18 10 18.8954 10 20C10 21.1046 10.8954 22 12 22Z" stroke="black" stroke-width="1.5"/>
                        <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="black" stroke-width="1.5"/>
                    </svg>
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.currentPrice}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                </div>
                <div class="product-rating">
                    ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))} <span>(${product.reviewCount})</span>
                </div>
            </div>
        `;
        
        // Add the product card to the grid
        productsGrid.appendChild(productCard);
    });
}

// Main function to initialize the page
async function initProductsPage() {
    // Show loading state if needed
    document.querySelector('.products-grid').innerHTML = '<div class="loading">Loading products...</div>';
    
    // Fetch products from API
    const productsData = await fetchProducts();
    
    // Organize products into structure if needed
    const organizedProducts = organizeProducts(productsData);
    
    // Display best selling products
    createProductCards(organizedProducts.bestSelling);
    
    // Add event listener to "View All" button
    document.querySelector('.view-all-btn').addEventListener('click', () => {
        createProductCards(organizedProducts.allProducts);
    });
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initProductsPage);