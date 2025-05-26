// بيانات المنتجات للعروض
    // Product data for flash sales
    const flashProducts = [
        {
            id: 1,
            name: "HAVIT HV-G92 Gamepad",
            currentPrice: "$120",
            originalPrice: "$160",
            discount: "-25%",
            rating: 4.8,
            reviews: 88,
            image: "/photos/iphone.png"
        },
        {
            id: 2,
            name: "AK-900 Wired Keyboard",
            currentPrice: "$960",
            originalPrice: "$1160",
            discount: "-35%",
            rating: 4.7,
            reviews: 75,
            image: "https://via.placeholder.com/300x300"
        },
        {
            id: 3,
            name: "IPS LCD Gaming Monitor",
            currentPrice: "$370",
            originalPrice: "$400",
            discount: "-30%",
            rating: 4.9,
            reviews: 99,
            image: "https://via.placeholder.com/300x300"
        },
        {
            id: 4,
            name: "S-Series Comfort Chair",
            currentPrice: "$375",
            originalPrice: "$400",
            discount: "-25%",
            rating: 4.6,
            reviews: 65,
            image: "https://via.placeholder.com/300x300"
        }
    ];

    // إضافة المنتجات إلى الواجهة
    // Adding products to the interface
    function renderProducts() {
        const productsContainer = document.getElementById('flash-products');
        
        // إفراغ الحاوية قبل إضافة المنتجات
        // Empty the container before adding products
        productsContainer.innerHTML = '';
        
        // عرض المنتجات
        // Display products
        flashProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            
            // إنشاء المحتوى HTML لبطاقة المنتج
            // Create HTML content for product card
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 100%;">
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
                    <div class="add-to-cart">Add To Cart</div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">
                        <span class="price-current">${product.currentPrice}</span>
                        <span class="price-original">${product.originalPrice}</span>
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
    }

    // إنشاء نجوم التقييم بناءً على القيمة
    // Generate rating stars based on the value
    function generateStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars += `<svg width="16" height="16" viewBox="0 0 20 20" fill="#FFAD33" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1L13 7L19 8L14.5 13L16 19L10 16L4 19L5.5 13L1 8L7 7L10 1Z" stroke="#FFAD33" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
        }
        
        if (hasHalfStar) {
            stars += `<svg width="16" height="16" viewBox="0 0 20 20" fill="#FFAD33" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1V16L4 19L5.5 13L1 8L7 7L10 1Z" fill="#FFAD33" stroke="#FFAD33" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 1L13 7L19 8L14.5 13L16 19L10 16" fill="none" stroke="#FFAD33" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += `<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1L13 7L19 8L14.5 13L16 19L10 16L4 19L5.5 13L1 8L7 7L10 1Z" stroke="#FFAD33" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
        }
        
        return stars;
    }

    // وظيفة العد التنازلي
    // Countdown function
    function startCountdown() {
        // تحديد وقت انتهاء العرض - مثال: بعد 2 يوم و 23 ساعة و 19 دقيقة
        // Set offer end time - example: after 2 days, 23 hours, and 19 minutes
        const now = new Date();
        const endTime = new Date(now.getTime() + (2*24*60*60*1000) + (23*60*60*1000) + (19*60*1000));
        
        // تحديث العداد كل ثانية
        // Update the counter every second
        const timer = setInterval(function() {
            const now = new Date();
            const diff = endTime - now;
            
            if (diff <= 0) {
                clearInterval(timer);
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // تحديث القيم في واجهة المستخدم
            // Update values in the user interface
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    }

    // وظائف أزرار التنقل
    // Navigation button functions
    let currentPage = 0;
    const totalPages = 2; // على سبيل المثال، يمكن أن يكون هناك صفحتان من المنتجات
                          // For example, there could be two pages of products

    document.querySelector('.prev-button').addEventListener('click', function() {
        if (currentPage > 0) {
            currentPage--;
            // هنا يمكنك تحديث المنتجات المعروضة
            // Here you can update the displayed products
            renderProducts();
        }
    });

    document.querySelector('.next-button').addEventListener('click', function() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            // هنا يمكنك تحديث المنتجات المعروضة
            // Here you can update the displayed products
            renderProducts();
        }
    });

    // تشغيل الوظائف عند تحميل الصفحة
    // Run functions when the page loads
    document.addEventListener('DOMContentLoaded', function() {
        renderProducts();
        startCountdown();
    });


    // 
    
    // Back to top functionality
    // متغير لتتبع حالة الزر (لأعلى أم لأسفل)
    // Variable to track button state (up or down)
let isScrollingUp = true;

// وظيفة العودة لأعلى أو لأسفل
// Function to go back to top or bottom
document.querySelector('.back-to-top').addEventListener('click', function() {
    // نقوم بتدوير الأيقونة 360 درجة
    // Rotate the icon 360 degrees
    this.style.transition = 'transform 0.6s';
    this.style.transform = 'rotate(360deg)';
    
    // بعد انتهاء التدوير، نعيد تعيين التدوير ليكون جاهزًا للنقرة التالية
    // After rotation completes, reset rotation to be ready for the next click
    setTimeout(() => {
        this.style.transform = 'rotate(0deg)';
    }, 600);
    
    if (isScrollingUp) {
        // التمرير لأعلى الصفحة
        // Scroll to top of page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        // التمرير لأسفل الصفحة
        // Scroll to bottom of page
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
    
    // تبديل الحالة للنقرة التالية
    // Toggle state for next click
    isScrollingUp = !isScrollingUp;
    
    // تغيير شكل الزر أو نص الزر (اختياري)
    // Change button appearance or text (optional)
    // يمكنك تعديل هذا الجزء حسب الأيقونة التي تستخدمها
    // You can modify this part according to the icon you are using
    if (isScrollingUp) {
        this.innerHTML = '↑'; // أو تغيير الكلاس لأيقونة تشير لأعلى
                              // or change class to an up-pointing icon
    } else {
        this.innerHTML = '↓'; // أو تغيير الكلاس لأيقونة تشير لأسفل
                              // or change class to a down-pointing icon
    }
});

// وظيفة تبديل أيقونة القلب
// Function to toggle heart icon
document.querySelectorAll('.fa-heart').forEach(function(heart) {
    heart.addEventListener('click', function() {
        this.classList.toggle('far');
        this.classList.toggle('fas');
    });
});