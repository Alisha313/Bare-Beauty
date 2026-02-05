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

// ===== COLLAPSIBLE FILTER DROPDOWNS =====
function initFilterDropdowns() {
    const filterGroups = document.querySelectorAll('.filter-group');
    
    filterGroups.forEach((group, index) => {
        const heading = group.querySelector('h4');
        const options = group.querySelectorAll('.filter-option');
        
        // Wrap filter options in a container div if not already wrapped
        if (options.length > 0 && !group.querySelector('.filter-options')) {
            const optionsWrapper = document.createElement('div');
            optionsWrapper.className = 'filter-options';
            options.forEach(option => {
                optionsWrapper.appendChild(option);
            });
            group.appendChild(optionsWrapper);
        }
        
        // Open first filter by default
        if (index === 0) {
            group.classList.add('active');
        }
        
        // Add click handler to heading
        heading?.addEventListener('click', () => {
            // Toggle current group
            group.classList.toggle('active');
        });
    });
    
    // Clear filters button functionality
    const clearBtn = document.querySelector('.clear-filters');
    clearBtn?.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    });
}

// Initialize filter dropdowns when DOM is loaded
document.addEventListener('DOMContentLoaded', initFilterDropdowns);

// ===== PAGINATION SYSTEM =====
const PRODUCTS_PER_PAGE = 10;

function initPagination() {
    const productGrid = document.querySelector('.product-grid-shop');
    const paginationContainer = document.querySelector('.pagination');
    
    if (!productGrid || !paginationContainer) return;
    
    const allProducts = Array.from(productGrid.querySelectorAll('.product-card-shop'));
    const totalProducts = allProducts.length;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    let currentPage = 1;
    
    // Update results count
    const resultsCount = document.querySelector('.results-count');
    if (resultsCount) {
        resultsCount.textContent = `${totalProducts} Products`;
    }
    
    function showPage(page) {
        currentPage = page;
        const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        
        allProducts.forEach((product, index) => {
            if (index >= startIndex && index < endIndex) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
        
        updatePaginationButtons();
        
        // Scroll to top of products
        productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    function updatePaginationButtons() {
        paginationContainer.innerHTML = '';
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = `page-btn prev-btn${currentPage === 1 ? ' disabled' : ''}`;
        prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i> Previous';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) showPage(currentPage - 1);
        });
        paginationContainer.appendChild(prevBtn);
        
        // Page number buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn${i === currentPage ? ' active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => showPage(i));
            paginationContainer.appendChild(pageBtn);
        }
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = `page-btn next-btn${currentPage === totalPages ? ' disabled' : ''}`;
        nextBtn.innerHTML = 'Next <i class="fa-solid fa-chevron-right"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) showPage(currentPage + 1);
        });
        paginationContainer.appendChild(nextBtn);
    }
    
    // Initialize - show first page
    showPage(1);
}

// Initialize pagination when DOM is loaded
document.addEventListener('DOMContentLoaded', initPagination);

// ===== PRODUCT DATABASE =====
const products = {
    // SKINCARE
    'cleanser-1': {
        id: 'cleanser-1',
        name: 'Gentle Foam Cleanser',
        category: 'Cleanser',
        categoryPage: 'shop-skincare.html',
        price: 32.00,
        image: 'img/pexels-cottonbro-studio-4612139.jpg',
        rating: 4.5,
        reviews: 128,
        description: 'A gentle, pH-balanced foam cleanser that removes impurities without stripping your skin. Perfect for daily use on all skin types.',
        skinType: 'All Skin Types',
        ingredients: ['Glycerin', 'Aloe Vera', 'Green Tea Extract', 'Chamomile']
    },
    'serum-1': {
        id: 'serum-1',
        name: 'Vitamin C Brightening Serum',
        category: 'Serum',
        categoryPage: 'shop-skincare.html',
        price: 58.00,
        image: 'img/pexels-cottonbro-studio-4612123.jpg',
        rating: 5.0,
        reviews: 89,
        description: 'A potent 20% Vitamin C serum that brightens, firms, and protects your skin from environmental damage. Lightweight, fast-absorbing formula suitable for all skin types.',
        skinType: 'All Skin Types',
        ingredients: ['20% Vitamin C', 'Hyaluronic Acid', 'Vitamin E', 'Ferulic Acid']
    },
    'toner-1': {
        id: 'toner-1',
        name: 'Balancing Rose Toner',
        category: 'Toner',
        categoryPage: 'shop-skincare.html',
        price: 28.00,
        image: 'img/pexels-cottonbro-studio-4612154.jpg',
        rating: 4.0,
        reviews: 56,
        description: 'A gentle, alcohol-free toner with rose water that balances skin pH and prepares your skin for the next steps in your routine.',
        skinType: 'Oily Skin',
        ingredients: ['Rose Water', 'Witch Hazel', 'Niacinamide', 'Aloe Vera']
    },
    'moisturizer-1': {
        id: 'moisturizer-1',
        name: 'SPF 30 Day Cream',
        category: 'SPF Moisturizer',
        categoryPage: 'shop-skincare.html',
        price: 45.00,
        originalPrice: 55.00,
        image: 'img/pexels-engin-akyurt-3331486.jpg',
        rating: 5.0,
        reviews: 203,
        description: 'A lightweight daily moisturizer with SPF 30 protection. Hydrates while protecting your skin from harmful UV rays.',
        skinType: 'Combination Skin',
        ingredients: ['SPF 30', 'Hyaluronic Acid', 'Ceramides', 'Vitamin E']
    },
    'eye-cream-1': {
        id: 'eye-cream-1',
        name: 'Revitalizing Eye Cream',
        category: 'Under-Eye Cream',
        categoryPage: 'shop-skincare.html',
        price: 42.00,
        image: 'img/product-4.jpg',
        rating: 4.5,
        reviews: 74,
        description: 'A rich eye cream that targets dark circles, puffiness, and fine lines for a refreshed, youthful look.',
        skinType: 'All Skin Types',
        ingredients: ['Caffeine', 'Peptides', 'Retinol', 'Vitamin K']
    },
    'mask-1': {
        id: 'mask-1',
        name: 'Hydrating Sheet Mask Set',
        category: 'Face Mask',
        categoryPage: 'shop-skincare.html',
        price: 38.00,
        image: 'img/pexels-antoni-shkraba-5178008.jpg',
        rating: 5.0,
        reviews: 167,
        description: 'A set of 5 hydrating sheet masks infused with hyaluronic acid and botanical extracts for an instant moisture boost.',
        skinType: 'Dry Skin',
        ingredients: ['Hyaluronic Acid', 'Aloe Vera', 'Centella Asiatica', 'Green Tea']
    },
    
    // NAILS
    'nails-french-1': {
        id: 'nails-french-1',
        name: 'Classic French Tips',
        category: 'Press-on Nails',
        categoryPage: 'shop-nails.html',
        price: 24.00,
        image: 'https://img.kwcdn.com/product/aisc_image/algo/opt/bac3b038-2e57-4bf2-83a8-72fcb012e2ec.jpg?imageView2/2/w/1300/q/90/format/avif',
        rating: 5.0,
        reviews: 428,
        description: 'Timeless French tip press-on nails for an elegant, salon-quality manicure at home. Includes 24 nails in various sizes.',
        ingredients: ['Adhesive Tabs Included', 'Nail File', '24 Pieces']
    },
    'nails-glitter-1': {
        id: 'nails-glitter-1',
        name: 'Champagne Glitter Set',
        category: 'Press-on Nails',
        categoryPage: 'shop-nails.html',
        price: 28.00,
        image: 'https://img.kwcdn.com/product/fancy/ff8ca917-6e08-4e66-bc4d-a126576f7f17.jpg?imageView2/2/w/1300/q/90/format/avif',
        rating: 4.5,
        reviews: 67,
        description: 'Sparkling champagne glitter press-on nails perfect for special occasions. Long-lasting and easy to apply.',
        ingredients: ['Adhesive Tabs Included', 'Nail File', '24 Pieces']
    },
    'nails-glossy-pink-1': {
        id: 'nails-glossy-pink-1',
        name: 'Glossy Pink Set',
        category: 'Press-on Nails',
        categoryPage: 'shop-nails.html',
        price: 28.00,
        image: 'https://img.kwcdn.com/product/fancy/1538af57-fd20-4fa2-91bb-c8dd0226b9fa.jpg?imageView2/2/w/1300/q/90/format/avif',
        rating: 4.5,
        reviews: 67,
        description: 'Beautiful glossy pink press-on nails for a classic, feminine look. Easy to apply and long-lasting.',
        ingredients: ['Adhesive Tabs Included', 'Nail File', '24 Pieces']
    },
    'nails-manicure-pedicure-1': {
        id: 'nails-manicure-pedicure-1',
        name: 'Manicure/Pedicure Set',
        category: 'Nail Care',
        categoryPage: 'shop-nails.html',
        price: 28.00,
        image: 'https://img.kwcdn.com/product/fancy/7db3a2e5-8565-4aa0-b195-97d16f5a0bd8.jpg?imageView2/2/w/1300/q/90/format/avif',
        rating: 4.5,
        reviews: 67,
        description: 'Complete professional manicure and pedicure set with all the tools you need for salon-quality nails at home.',
        ingredients: ['Nail Clippers', 'Cuticle Pusher', 'Nail File', 'Buffer']
    },
    'cuticle-oil-1': {
        id: 'cuticle-oil-1',
        name: 'Nourishing Cuticle Oil',
        category: 'Nail Care',
        categoryPage: 'shop-nails.html',
        price: 18.00,
        image: 'https://shopnailboo.com/cdn/shop/files/cross_cuticleoil_5.jpg?v=1709223131&width=1445',
        rating: 5.0,
        reviews: 234,
        description: 'A nourishing cuticle oil with jojoba and vitamin E to hydrate and strengthen your nails and cuticles.',
        ingredients: ['Jojoba Oil', 'Vitamin E', 'Sweet Almond Oil', 'Lavender']
    },
    'nails-artistic-1': {
        id: 'nails-artistic-1',
        name: 'Abstract Art Collection',
        category: 'Press-on Nails',
        categoryPage: 'shop-nails.html',
        price: 32.00,
        image: 'img/pexels-laura-garcia-4006699 (1).jpg',
        rating: 4.0,
        reviews: 156,
        description: 'Unique hand-painted abstract art press-on nails. Each set is a wearable masterpiece.',
        ingredients: ['Adhesive Tabs Included', 'Nail File', '24 Pieces']
    },
    'nail-strengthener-1': {
        id: 'nail-strengthener-1',
        name: 'Keratin Nail Strengthener',
        category: 'Nail Care',
        categoryPage: 'shop-nails.html',
        price: 22.00,
        originalPrice: 28.00,
        image: 'img/product-3.jpg',
        rating: 4.5,
        reviews: 189,
        description: 'A powerful keratin treatment that strengthens weak, brittle nails and promotes healthy growth.',
        ingredients: ['Keratin', 'Biotin', 'Calcium', 'Vitamin E']
    },
    'nails-nude-1': {
        id: 'nails-nude-1',
        name: 'Everyday Nude Set',
        category: 'Press-on Nails',
        categoryPage: 'shop-nails.html',
        price: 26.00,
        image: 'img/pexels-nripen-kumar-roy-725462.jpg',
        rating: 5.0,
        reviews: 312,
        description: 'Versatile nude press-on nails perfect for everyday wear. Natural-looking and comfortable.',
        ingredients: ['Adhesive Tabs Included', 'Nail File', '24 Pieces']
    },
    
    // TOOLS
    'brush-set-1': {
        id: 'brush-set-1',
        name: 'Complete 12-Piece Brush Set',
        category: 'Brush Set',
        categoryPage: 'shop-tools.html',
        price: 68.00,
        image: 'img/pexels-freestocksorg-457701.jpg',
        rating: 5.0,
        reviews: 245,
        description: 'A complete set of 12 professional-quality makeup brushes for face, eyes, and lips. Vegan and cruelty-free.',
        ingredients: ['Synthetic Bristles', 'Bamboo Handles', 'Carrying Case']
    },
    'gua-sha-1': {
        id: 'gua-sha-1',
        name: 'Rose Quartz Gua Sha Stone',
        category: 'Gua Sha',
        categoryPage: 'shop-tools.html',
        price: 32.00,
        image: 'img/pexels-arina-krasnikova-6663393.jpg',
        rating: 4.5,
        reviews: 89,
        description: 'A genuine rose quartz gua sha stone for facial massage. Helps reduce puffiness and promote lymphatic drainage.',
        ingredients: ['100% Rose Quartz', 'Velvet Pouch']
    },
    'red-light-1': {
        id: 'red-light-1',
        name: 'LED Red Light Therapy Wand',
        category: 'Red Light Therapy',
        categoryPage: 'shop-tools.html',
        price: 189.00,
        image: 'img/pexels-anna-shvets-5217926.jpg',
        rating: 5.0,
        reviews: 312,
        description: 'Professional-grade LED red light therapy wand for at-home anti-aging treatments. Stimulates collagen production.',
        ingredients: ['Red LED 630nm', 'Near-Infrared 850nm', 'USB Rechargeable']
    },
    'foundation-brush-1': {
        id: 'foundation-brush-1',
        name: 'Seamless Foundation Brush',
        category: 'Makeup Brush',
        categoryPage: 'shop-tools.html',
        price: 24.00,
        image: 'img/pexels-pixabay-458766.jpg',
        rating: 4.0,
        reviews: 156,
        description: 'A densely packed foundation brush for seamless, airbrushed application. Works with liquid and cream formulas.',
        ingredients: ['Synthetic Bristles', 'Wooden Handle']
    },
    'jade-roller-1': {
        id: 'jade-roller-1',
        name: 'Jade Facial Roller',
        category: 'Gua Sha',
        categoryPage: 'shop-tools.html',
        price: 28.00,
        image: 'img/product-5.jpeg',
        rating: 4.5,
        reviews: 203,
        description: 'A dual-ended jade facial roller for depuffing and relaxing facial massage. Store in fridge for extra cooling effect.',
        ingredients: ['100% Jade Stone', 'Zinc Alloy Frame']
    },
    'eye-brush-set-1': {
        id: 'eye-brush-set-1',
        name: 'Essential Eye Brush Set',
        category: 'Brush Set',
        categoryPage: 'shop-tools.html',
        price: 42.00,
        originalPrice: 55.00,
        image: 'img/product-6.jpg',
        rating: 5.0,
        reviews: 178,
        description: 'A 6-piece eye brush set with everything you need for stunning eye looks. Includes blending, detail, and liner brushes.',
        ingredients: ['Synthetic Bristles', 'Rose Gold Handles', 'Travel Case']
    },
    
    // MAKEUP
    'tinted-moisturizer-1': {
        id: 'tinted-moisturizer-1',
        name: 'Skin Tint Glow SPF 30',
        category: 'Tinted Moisturizer',
        categoryPage: 'shop-makeup.html',
        price: 34.00,
        image: 'img/pexels-cottonbro-studio-3997354.jpg',
        rating: 5.0,
        reviews: 312,
        description: 'A lightweight tinted moisturizer with SPF 30 and a natural, dewy finish. Buildable coverage for everyday wear.',
        ingredients: ['SPF 30', 'Hyaluronic Acid', 'Vitamin E', 'Squalane']
    },
    'concealer-1': {
        id: 'concealer-1',
        name: 'Radiant Creamy Concealer',
        category: 'Concealer',
        categoryPage: 'shop-makeup.html',
        price: 26.00,
        image: 'img/pexels-cottonbro-studio-4046420.jpg',
        rating: 4.5,
        reviews: 189,
        description: 'A creamy, buildable concealer that brightens under-eyes and covers imperfections with a natural finish.',
        ingredients: ['Vitamin E', 'Caffeine', 'Light-Reflecting Pigments']
    },
    'primer-1': {
        id: 'primer-1',
        name: 'Pore Perfecting Primer',
        category: 'Primer',
        categoryPage: 'shop-makeup.html',
        price: 38.00,
        image: 'img/product-2.jpeg',
        rating: 4.0,
        reviews: 156,
        description: 'A silky primer that blurs pores and creates a smooth canvas for makeup. Extends wear time up to 12 hours.',
        ingredients: ['Silica', 'Niacinamide', 'Vitamin C']
    },
    'blush-1': {
        id: 'blush-1',
        name: 'Cloud Paint Liquid Blush',
        category: 'Blush',
        categoryPage: 'shop-makeup.html',
        price: 28.00,
        image: 'img/pexels-andrea-piacquadio-3783110.jpg',
        rating: 5.0,
        reviews: 428,
        description: 'A gel-cream blush that blends seamlessly for a natural, flushed look. Buildable and long-lasting.',
        ingredients: ['Plant-Derived Squalane', 'Vitamin E']
    },
    'highlighter-1': {
        id: 'highlighter-1',
        name: 'Liquid Glow Highlighter',
        category: 'Highlighter',
        categoryPage: 'shop-makeup.html',
        price: 32.00,
        image: 'img/gallery-img-1.jpeg',
        rating: 4.5,
        reviews: 234,
        description: 'A liquid highlighter that gives skin a lit-from-within glow. Can be worn alone or mixed with foundation.',
        ingredients: ['Coconut Oil', 'Vitamin E', 'Pearl Pigments']
    },
    'lip-gloss-1': {
        id: 'lip-gloss-1',
        name: 'Crystal Clear Lip Gloss',
        category: 'Lip Gloss',
        categoryPage: 'shop-makeup.html',
        price: 18.00,
        image: 'img/gallery-img-3.jpeg',
        rating: 5.0,
        reviews: 567,
        description: 'A non-sticky, high-shine lip gloss that can be worn alone or over lipstick for extra dimension.',
        ingredients: ['Vitamin E', 'Jojoba Oil', 'Hyaluronic Acid']
    },
    'mascara-1': {
        id: 'mascara-1',
        name: 'Lash Lift Volumizing Mascara',
        category: 'Mascara',
        categoryPage: 'shop-makeup.html',
        price: 26.00,
        image: 'img/home-bg-1.jpg',
        rating: 5.0,
        reviews: 623,
        description: 'A volumizing and lengthening mascara with a buildable formula. Smudge-proof and flake-free all day.',
        ingredients: ['Beeswax', 'Carnauba Wax', 'Vitamin E', 'Keratin']
    },
    'eyeshadow-palette-1': {
        id: 'eyeshadow-palette-1',
        name: 'Nude Neutrals 12-Pan Palette',
        category: 'Eyeshadow Palette',
        categoryPage: 'shop-makeup.html',
        price: 48.00,
        image: 'img/blog-2.jpg',
        rating: 5.0,
        reviews: 412,
        description: 'A versatile 12-pan eyeshadow palette with matte, shimmer, and metallic finishes in beautiful nude tones.',
        ingredients: ['Highly Pigmented', 'Blendable Formula', 'Cruelty-Free']
    },
    'eyeshadow-palette-2': {
        id: 'eyeshadow-palette-2',
        name: 'Rose Gold Dreams Palette',
        category: 'Eyeshadow Palette',
        categoryPage: 'shop-makeup.html',
        price: 42.00,
        originalPrice: 52.00,
        image: 'img/blog-3.jpg',
        rating: 4.5,
        reviews: 298,
        description: 'A stunning rose gold palette with warm pinks, coppers, and burgundies. Perfect for romantic looks.',
        ingredients: ['Highly Pigmented', 'Blendable Formula', 'Cruelty-Free']
    },
    'makeup-remover-1': {
        id: 'makeup-remover-1',
        name: 'Melting Cleansing Balm',
        category: 'Makeup Remover',
        categoryPage: 'shop-makeup.html',
        price: 24.00,
        image: 'img/gallery-img-2.jpeg',
        rating: 5.0,
        reviews: 287,
        description: 'A rich cleansing balm that melts away makeup and sunscreen. Leaves skin soft and hydrated.',
        ingredients: ['Shea Butter', 'Jojoba Oil', 'Vitamin E']
    },
    'lip-plumper-1': {
        id: 'lip-plumper-1',
        name: 'Peptide Plumping Gloss',
        category: 'Lip Plumper',
        categoryPage: 'shop-makeup.html',
        price: 24.00,
        image: 'img/gallery-img-4.jpeg',
        rating: 4.5,
        reviews: 198,
        description: 'A peptide-infused lip plumper that gives instant volume and shine without irritation.',
        ingredients: ['Peptides', 'Hyaluronic Acid', 'Vitamin E']
    },
    'lip-oil-1': {
        id: 'lip-oil-1',
        name: 'Nourishing Lip Oil',
        category: 'Lip Balms & Treatments',
        categoryPage: 'shop-makeup.html',
        price: 22.00,
        image: 'img/gallery-img-5.jpeg',
        rating: 5.0,
        reviews: 342,
        description: 'A luxurious lip oil that nourishes and adds a glossy, non-sticky shine.',
        ingredients: ['Jojoba Oil', 'Rosehip Oil', 'Vitamin E']
    },
    'lip-liner-1': {
        id: 'lip-liner-1',
        name: 'Precision Lip Liner',
        category: 'Lip Liner',
        categoryPage: 'shop-makeup.html',
        price: 16.00,
        image: 'img/gallery-img-6.jpeg',
        rating: 4.0,
        reviews: 145,
        description: 'A creamy lip liner that glides on smoothly for precise definition. Long-wearing formula.',
        ingredients: ['Vitamin E', 'Jojoba Esters']
    },
    'eyeliner-1': {
        id: 'eyeliner-1',
        name: 'Precision Felt Tip Liner',
        category: 'Eyeliner',
        categoryPage: 'shop-makeup.html',
        price: 22.00,
        image: 'img/home-bg-2.jpg',
        rating: 4.5,
        reviews: 278,
        description: 'A felt-tip eyeliner with ultra-precise application. Waterproof and smudge-proof for all-day wear.',
        ingredients: ['Water-Resistant Formula', 'Quick-Dry']
    },
    'brow-pencil-1': {
        id: 'brow-pencil-1',
        name: 'Brow Sculpting Pencil',
        category: 'Eyebrows',
        categoryPage: 'shop-makeup.html',
        price: 24.00,
        image: 'img/home-bg-3.jpg',
        rating: 5.0,
        reviews: 189,
        description: 'An ultra-fine brow pencil that creates natural, hair-like strokes. Includes spoolie brush.',
        ingredients: ['Vitamin E', 'Castor Oil']
    },
    'lashes-1': {
        id: 'lashes-1',
        name: 'Natural Wispy Faux Lashes',
        category: 'Eyelashes',
        categoryPage: 'shop-makeup.html',
        price: 18.00,
        image: 'img/blog-1.jpg',
        rating: 4.0,
        reviews: 156,
        description: 'Lightweight, natural-looking faux lashes perfect for everyday glam. Reusable up to 15 times.',
        ingredients: ['Synthetic Fibers', 'Flexible Band']
    },
    'brow-gel-1': {
        id: 'brow-gel-1',
        name: 'Tinted Brow Gel',
        category: 'Eyebrows',
        categoryPage: 'shop-makeup.html',
        price: 20.00,
        image: 'img/about-img.jpg',
        rating: 5.0,
        reviews: 234,
        description: 'A tinted brow gel that adds color and holds brows in place all day. Natural-looking finish.',
        ingredients: ['Castor Oil', 'Vitamin E', 'Panthenol']
    }
};

// Function to load product details from URL
function loadProductFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId && products[productId]) {
        const product = products[productId];
        
        // Update page title
        document.title = `${product.name} | Bare Beauty`;
        
        // Update breadcrumb
        const breadcrumbCategoryLink = document.getElementById('breadcrumb-category-link');
        const breadcrumbProduct = document.getElementById('breadcrumb-product');
        if (breadcrumbCategoryLink) {
            breadcrumbCategoryLink.href = product.categoryPage;
            breadcrumbCategoryLink.textContent = getCategoryName(product.categoryPage);
        }
        if (breadcrumbProduct) {
            breadcrumbProduct.textContent = product.name;
        }
        
        // Update main image
        const mainImage = document.getElementById('mainProductImage');
        if (mainImage) {
            mainImage.src = product.image;
            mainImage.alt = product.name;
        }
        
        // Update product info
        const categoryTag = document.querySelector('.product-category-tag');
        if (categoryTag) categoryTag.textContent = product.category;
        
        const title = document.querySelector('.product-title');
        if (title) title.textContent = product.name;
        
        // Update rating
        const ratingText = document.querySelector('.rating-text');
        if (ratingText) ratingText.textContent = product.rating.toFixed(1);
        
        const reviewCount = document.querySelector('.review-count');
        if (reviewCount) reviewCount.textContent = `(${product.reviews} Reviews)`;
        
        // Update stars
        const starsContainer = document.querySelector('.product-rating-detail .stars');
        if (starsContainer) {
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(product.rating)) {
                    starsHTML += '<i class="fa-solid fa-star"></i>';
                } else if (i - 0.5 <= product.rating) {
                    starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
                } else {
                    starsHTML += '<i class="fa-regular fa-star"></i>';
                }
            }
            starsContainer.innerHTML = starsHTML;
        }
        
        // Update price
        const currentPrice = document.querySelector('.product-price-detail .current-price');
        if (currentPrice) currentPrice.textContent = `$${product.price.toFixed(2)}`;
        
        // Update original price if on sale
        const originalPrice = document.getElementById('product-original-price');
        if (originalPrice && product.originalPrice) {
            originalPrice.textContent = `$${product.originalPrice.toFixed(2)}`;
            originalPrice.style.display = 'inline';
            originalPrice.style.textDecoration = 'line-through';
            originalPrice.style.color = '#999';
            originalPrice.style.marginLeft = '10px';
        }
        
        // Update description
        const description = document.querySelector('.product-short-desc');
        if (description) description.textContent = product.description;
        
        // Update features/ingredients list
        const featuresList = document.getElementById('features-list');
        if (featuresList && product.ingredients) {
            featuresList.innerHTML = product.ingredients.map(item => `<li>${item}</li>`).join('');
        }
        
        // Update badge (new, sale, etc.)
        const badge = document.getElementById('product-badge');
        if (badge) {
            if (product.originalPrice) {
                badge.className = 'badge badge-sale';
                badge.textContent = 'Sale';
            } else {
                badge.className = 'badge badge-new';
                badge.textContent = 'New';
            }
        }
    } else {
        // Product not found - show error
        const title = document.querySelector('.product-title');
        if (title) title.textContent = 'Product Not Found';
        const description = document.querySelector('.product-short-desc');
        if (description) description.textContent = 'Sorry, this product could not be found.';
    }
}

// Helper function to get category name from page
function getCategoryName(categoryPage) {
    const categoryMap = {
        'shop-skincare.html': 'Skincare',
        'shop-makeup.html': 'Makeup',
        'shop-tools.html': 'Tools & Brushes',
        'shop-nails.html': 'Nails'
    };
    return categoryMap[categoryPage] || 'Shop';
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

