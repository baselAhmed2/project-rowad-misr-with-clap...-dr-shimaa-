// جلب المنتجات من الواجهة الخلفية
async function fetchFlashProducts() {
    try {
        const response = await fetch('/api/products/flash-deals');
        if (!response.ok) {
            throw new Error('حدث خطأ في جلب البيانات');
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('خطأ:', error);
        return []; // إرجاع مصفوفة فارغة في حالة حدوث خطأ
    }
}

// عرض المنتجات في الواجهة
async function renderProducts() {
    const productsContainer = document.getElementById('flash-products');
    
    // إفراغ الحاوية قبل إضافة المنتجات
    productsContainer.innerHTML = '';
    
    // جلب المنتجات من الواجهة الخلفية
    const flashProducts = await fetchFlashProducts();
    
    // عرض المنتجات
    flashProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        // تنسيق السعر بإضافة علامة الدولار
        const currentPrice = `$${product.currentPrice.toFixed(2)}`;
        const originalPrice = `$${product.originalPrice.toFixed(2)}`;
        
        // إنشاء المحتوى HTML لبطاقة المنتج
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.imageUrl}" alt="${product.name}" style="max-width: 100%; max-height: 100%;">
                <div class="product-badge">${product.discount}</div>
                <div class="product-actions">
                    <div class="action-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="action-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="add-to-cart" data-product-id="${product.id}">Add To Cart</div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="price-current">${currentPrice}</span>
                    <span class="price-original">${originalPrice}</span>
                </div>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-value">(${product.reviews})</span>
                </div>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });

    // إضافة المستمعين للأزرار
    addCartEventListeners();
}

// إضافة مستمعي الحدث لأزرار "أضف إلى السلة"
function addCartEventListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            addToCart(productId);
        });
    });
}

// إضافة منتج إلى سلة التسوق
async function addToCart(productId) {
    try {
        const response = await fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: productId, quantity: 1 })
        });
        
        if (!response.ok) {
            throw new Error('فشل في إضافة المنتج إلى السلة');
        }
        
        const result = await response.json();
        // يمكنك هنا إظهار رسالة نجاح أو تحديث عداد السلة
        alert('تمت إضافة المنتج إلى السلة');
    } catch (error) {
        console.error('خطأ:', error);
        alert('حدث خطأ أثناء إضافة المنتج');
    }
}