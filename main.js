let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menu?.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

window.onscroll = () => {
    menu?.classList.remove('fa-times');
    navbar?.classList.remove('active');
};

let slides = document.querySelectorAll('.home .slide');
let index = 0;

function next() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev() {
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

// ===== CART FUNCTIONALITY =====
let cart = JSON.parse(localStorage.getItem('bareBeautyCart')) || [];

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        cart.push({ ...product, quantity: product.quantity || 1 });
    }
    localStorage.setItem('bareBeautyCart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Added to cart!');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Add to cart button listeners
document.querySelectorAll('.add-to-cart-btn, .add-to-cart-btn-large').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.product-card-shop') || btn.closest('.product-info-detail')?.parentElement;
        const product = {
            id: Date.now(),
            name: card?.querySelector('.product-name, .product-title')?.textContent || 'Product',
            price: parseFloat(card?.querySelector('.current-price')?.textContent?.replace('$', '')) || 0,
            quantity: parseInt(document.getElementById('quantity')?.value) || 1
        };
        addToCart(product);
    });
});

// Initialize cart count on page load
updateCartCount();

// ===== PRODUCT DETAIL PAGE FUNCTIONS =====

// Image Gallery
function changeImage(src, thumbnail) {
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.src = src;
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        thumbnail?.classList.add('active');
    }
}

// Quantity Controls
function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (qtyInput && qtyInput.value < 10) {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    }
}

function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (qtyInput && qtyInput.value > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
    }
}

// Product Tabs
function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabName)?.classList.add('active');
    event.target.classList.add('active');
}

// Size Selection
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ===== FILTER FUNCTIONALITY =====
const filterCheckboxes = document.querySelectorAll('.filter-option input');
const productCards = document.querySelectorAll('.product-card-shop');

filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
});

function filterProducts() {
    const activeFilters = {};
    
    filterCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const filterType = checkbox.name;
            if (!activeFilters[filterType]) {
                activeFilters[filterType] = [];
            }
            activeFilters[filterType].push(checkbox.value);
        }
    });

    productCards.forEach(card => {
        let show = true;
        
        for (const [filterType, values] of Object.entries(activeFilters)) {
            const cardValue = card.dataset[filterType];
            if (cardValue && !values.includes(cardValue)) {
                show = false;
                break;
            }
        }
        
        card.style.display = show ? 'block' : 'none';
    });

    updateResultsCount();
}

function updateResultsCount() {
    const visibleProducts = document.querySelectorAll('.product-card-shop[style*="display: block"], .product-card-shop:not([style*="display"])');
    const resultsCount = document.querySelector('.results-count');
    if (resultsCount) {
        resultsCount.textContent = `${visibleProducts.length} Products`;
    }
}

// Clear Filters
document.querySelector('.clear-filters')?.addEventListener('click', () => {
    filterCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    productCards.forEach(card => {
        card.style.display = 'block';
    });
    updateResultsCount();
});

// ===== SORT FUNCTIONALITY =====
document.getElementById('sort')?.addEventListener('change', (e) => {
    const grid = document.querySelector('.product-grid-shop');
    const cards = Array.from(productCards);
    
    cards.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price) || 0;
        const priceB = parseFloat(b.dataset.price) || 0;
        
        switch(e.target.value) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            default:
                return 0;
        }
    });
    
    cards.forEach(card => grid?.appendChild(card));
});

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.querySelector('.search-input');
searchInput?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
        const category = card.querySelector('.product-category')?.textContent.toLowerCase() || '';
        if (productName.includes(searchTerm) || category.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    updateResultsCount();
});

// ===== REVIEW FUNCTIONALITY =====
document.querySelectorAll('.helpful-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.background = '#fdf8f3';
        btn.style.borderColor = '#c4a077';
        btn.style.color = '#c4a077';
    });
});

// Review Filters
document.querySelectorAll('.filter-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
    });
});

// ===== QUICK VIEW MODAL =====
document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Quick view modal functionality would go here
        showNotification('Quick view coming soon!');
    });
});

// ===== SMOOTH SCROLL FOR REVIEW LINK =====
document.querySelector('.review-count')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
});

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);