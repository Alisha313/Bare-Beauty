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
        
        // All filters start collapsed by default
        
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
        image: 'img/Skincare/GentleFoanCleanser.png',
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
        image: 'img/Skincare/VitaminCBrighteningSerum.png',
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
        image: 'img/Skincare/BalancingRoseToner.png',
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
        image: 'img/Skincare/SPF30DayCream.png',
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
        image: 'img/Skincare/RevitalizingEyeCream.png',
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
        image: 'img/Skincare/HyfratingSheetMaskSet.png',
        rating: 5.0,
        reviews: 167,
        description: 'A set of 5 hydrating sheet masks infused with hyaluronic acid and botanical extracts for an instant moisture boost.',
        skinType: 'Dry Skin',
        ingredients: ['Hyaluronic Acid', 'Aloe Vera', 'Centella Asiatica', 'Green Tea']
    },
    'serum-2': {
        id: 'serum-2',
        name: 'Hyaluronic Acid Serum',
        category: 'Serum',
        categoryPage: 'shop-skincare.html',
        price: 64.00,
        image: 'img/Skincare/HyaluronicAcidSerum.png',
        rating: 5.0,
        reviews: 215,
        description: 'A deeply hydrating serum with multiple weights of hyaluronic acid to plump and smooth skin at every level.',
        skinType: 'All Skin Types',
        ingredients: ['Hyaluronic Acid', 'Vitamin B5', 'Aloe Vera', 'Glycerin']
    },
    'cleanser-2': {
        id: 'cleanser-2',
        name: 'Oil Control Gel Cleanser',
        category: 'Cleanser',
        categoryPage: 'shop-skincare.html',
        price: 26.00,
        image: 'img/Skincare/OilControlGelCleanser.png',
        rating: 4.0,
        reviews: 94,
        description: 'A lightweight gel cleanser that controls excess oil and deeply cleanses pores without over-drying.',
        skinType: 'Oily Skin',
        ingredients: ['Salicylic Acid', 'Tea Tree Oil', 'Niacinamide', 'Zinc']
    },
    'moisturizer-2': {
        id: 'moisturizer-2',
        name: 'Rich Night Cream',
        category: 'Moisturizer',
        categoryPage: 'shop-skincare.html',
        price: 38.00,
        originalPrice: 48.00,
        image: 'img/Skincare/RichNightCream.png',
        rating: 4.5,
        reviews: 142,
        description: 'A rich, nourishing night cream that repairs and hydrates skin while you sleep. Wake up to soft, glowing skin.',
        skinType: 'Dry Skin',
        ingredients: ['Shea Butter', 'Ceramides', 'Peptides', 'Squalane']
    },
    'serum-3': {
        id: 'serum-3',
        name: 'Retinol Night Serum',
        category: 'Serum',
        categoryPage: 'shop-skincare.html',
        price: 72.00,
        image: 'img/Skincare/RetinolNighSerum.png',
        rating: 5.0,
        reviews: 287,
        description: 'A powerful retinol serum that reduces fine lines, evens skin tone, and boosts cell turnover overnight.',
        skinType: 'Sensitive Skin',
        ingredients: ['Retinol', 'Vitamin E', 'Squalane', 'Bakuchiol']
    },
    'toner-2': {
        id: 'toner-2',
        name: 'Niacinamide Pore Toner',
        category: 'Toner',
        categoryPage: 'shop-skincare.html',
        price: 34.00,
        image: 'img/Skincare/NiacinamidePoreToner.png',
        rating: 4.5,
        reviews: 118,
        description: 'A pore-refining toner with niacinamide that minimizes pores, controls oil, and brightens skin.',
        skinType: 'Combination Skin',
        ingredients: ['Niacinamide', 'Zinc PCA', 'Hyaluronic Acid', 'Green Tea']
    },
    'mask-2': {
        id: 'mask-2',
        name: 'Clay Detox Mask',
        category: 'Face Mask',
        categoryPage: 'shop-skincare.html',
        price: 22.00,
        image: 'img/Skincare/ClayDetoxMask.png',
        rating: 4.0,
        reviews: 76,
        description: 'A deep-cleansing clay mask that draws out impurities and excess oil for a clearer, smoother complexion.',
        skinType: 'All Skin Types',
        ingredients: ['Kaolin Clay', 'Bentonite', 'Charcoal', 'Tea Tree Oil']
    },
    
    // NAILS
    'nails-french-1': {
        id: 'nails-french-1',
        name: 'Classic French Tips',
        category: 'Press-on Nails',
        categoryPage: 'shop-nails.html',
        price: 24.00,
        image: 'img/Nails/ClassicFrenchTip.png',
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
        image: 'img/Nails/ChampageGlitterSet.png',
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
        image: 'img/Nails/GlossyPinkSet.png',
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
        image: 'img/Nails/Medicure:PedicureSet.png',
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
        image: 'img/Nails/CuticleOil.png',
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
        image: 'img/Nails/FloralNailArtSticker.png',
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
        image: 'img/Nails/MiniUVNailLamp.png',
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
        image: 'img/Nails/NudeOmbreSet.png',
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
        image: 'img/Tools%20%26%20Brushes/16PieceBrushSet.png',
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
        image: 'img/Tools%20%26%20Brushes/JadeFacialRoller.png',
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
        image: 'img/Tools%20%26%20Brushes/Redlightwand.png',
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
        image: 'img/Tools%20%26%20Brushes/FoundationBrush.png',
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
        image: 'img/Tools%20%26%20Brushes/JadeFacialRoller.png',
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
        image: 'img/Tools%20%26%20Brushes/EssentialTravelSet.png',
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
        image: 'img/skintint.jpg',
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
        image: 'img/concealer.jpg',
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
        image: 'img/primer.jpg',
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
        image: 'img/cloud-paint-blush.jpg',
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
        image: 'img/liquid-glow-highlighter.jpg',
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
        image: 'img/Makeup/Lip Products/Lip Gloss Rosy Sparkle.png',
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
        image: 'img/lash-lift.jpg',
        image: 'img/Makeup/Eye Products/Lash Lift Volumizing Mascara Magenta.png',
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
        image: 'img/nude-palette.jpg',
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
        image: 'img/rose-palette.jpg',
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
        image: 'img/cleansing-balm.jpg',
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
        image: 'img/Makeup/Lip Products/Peptide Plumping Gloss Mauve Rose.png',
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
        image: 'img/Makeup/Lip Products/Nourishing Lip Oil Rose Nude.png',
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
        image: 'img/Makeup/Lip Products/Precision Lip Liner Rosy Mauve.png',
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
        image: 'img/tip-liner.jpg',
        image: 'img/Makeup/Eye Products/Precision Felt Tip Liner Blue.png',
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
        image: 'img/brow-pencil.jpg',
        image: 'img/Makeup/Eye Products/Brow Sculpting Pencil Brown.png',
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
        image: 'img/lashes.jpg',
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
        image: 'img/brow-gel.jpg',
        rating: 5.0,
        reviews: 234,
        description: 'A tinted brow gel that adds color and holds brows in place all day. Natural-looking finish.',
        ingredients: ['Castor Oil', 'Vitamin E', 'Panthenol']
    },
    
    // HAIR
    'shampoo-1': {
        id: 'shampoo-1',
        name: 'Hydrating Honey Shampoo',
        category: 'Shampoo',
        categoryPage: 'shop-hair.html',
        price: 28.00,
        image: 'img/Hair/Deep%20Moisture%20Shampoo.png',
        rating: 5.0,
        reviews: 342,
        description: 'A sulfate-free hydrating shampoo enriched with raw honey and argan oil. Gently cleanses while restoring moisture and shine.',
        ingredients: ['Raw Honey', 'Argan Oil', 'Aloe Vera', 'Vitamin B5']
    },
    'shampoo-2': {
        id: 'shampoo-2',
        name: 'Clarifying Tea Tree Shampoo',
        category: 'Shampoo',
        categoryPage: 'shop-hair.html',
        price: 24.00,
        image: 'img/Hair/Clarifying%20%20%26%20Hydrating%20Scalp%20Shampoo.png',
        rating: 4.5,
        reviews: 198,
        description: 'A deep-cleansing shampoo with tea tree oil that removes buildup and soothes the scalp. Perfect for oily hair.',
        ingredients: ['Tea Tree Oil', 'Peppermint', 'Salicylic Acid', 'Biotin']
    },
    'conditioner-1': {
        id: 'conditioner-1',
        name: 'Deep Moisture Conditioner',
        category: 'Conditioner',
        categoryPage: 'shop-hair.html',
        price: 30.00,
        image: 'img/Hair/Deep%20Moisture%20Conditioner.png',
        rating: 5.0,
        reviews: 287,
        description: 'An ultra-hydrating conditioner that detangles and softens hair. Leaves locks silky smooth without weighing them down.',
        ingredients: ['Shea Butter', 'Coconut Oil', 'Keratin', 'Vitamin E']
    },
    'conditioner-2': {
        id: 'conditioner-2',
        name: 'Color Protect Conditioner',
        category: 'Conditioner',
        categoryPage: 'shop-hair.html',
        price: 32.00,
        originalPrice: 38.00,
        image: 'img/Hair/Color%20Protect%20Conditioner.png',
        rating: 4.5,
        reviews: 156,
        description: 'A color-safe conditioner that locks in vibrancy while deeply nourishing color-treated hair.',
        ingredients: ['Quinoa Protein', 'Sunflower Seed Oil', 'Vitamin C', 'UV Filters']
    },
    'leave-in-1': {
        id: 'leave-in-1',
        name: '10-in-1 Leave-In Treatment',
        category: 'Leave-In Treatment',
        categoryPage: 'shop-hair.html',
        price: 26.00,
        image: 'img/Hair/10-in-1%20Leave-In%20Treatment.png',
        rating: 5.0,
        reviews: 423,
        description: 'A lightweight leave-in spray that detangles, smooths frizz, adds shine, and protects against heat up to 450°F.',
        ingredients: ['Argan Oil', 'Silk Amino Acids', 'Heat Protectant Complex', 'Vitamin E']
    },
    'leave-in-2': {
        id: 'leave-in-2',
        name: 'Curl Defining Cream',
        category: 'Leave-In Treatment',
        categoryPage: 'shop-hair.html',
        price: 24.00,
        image: 'img/Hair/Curl%20Defining%20Cream.png',
        rating: 4.5,
        reviews: 267,
        description: 'A rich curl-defining cream that enhances natural texture, reduces frizz, and provides all-day hold without crunch.',
        ingredients: ['Shea Butter', 'Coconut Milk', 'Flaxseed Gel', 'Jojoba Oil']
    },
    'hair-mask-1': {
        id: 'hair-mask-1',
        name: 'Overnight Repair Hair Mask',
        category: 'Hair Mask',
        categoryPage: 'shop-hair.html',
        price: 36.00,
        image: 'img/Hair/Overnight%20Repair%20Hair%20Mask.png',
        rating: 5.0,
        reviews: 389,
        description: 'An intensive overnight hair mask that repairs damage, restores elasticity, and transforms dry, brittle hair while you sleep.',
        ingredients: ['Keratin Complex', 'Avocado Oil', 'Biotin', 'Silk Proteins']
    },
    'hair-mask-2': {
        id: 'hair-mask-2',
        name: 'Protein Bond Repair Mask',
        category: 'Hair Mask',
        categoryPage: 'shop-hair.html',
        price: 42.00,
        image: 'img/Hair/Protein%20Bond%20Repair%20Mask.png',
        rating: 4.5,
        reviews: 201,
        description: 'A bond-building treatment mask that reconstructs damaged hair from the inside out. Salon-level results at home.',
        ingredients: ['Bond Repair Complex', 'Hydrolyzed Protein', 'Ceramides', 'Panthenol']
    },
    'hair-oil-1': {
        id: 'hair-oil-1',
        name: 'Moroccan Argan Hair Oil',
        category: 'Hair Oil',
        categoryPage: 'shop-hair.html',
        price: 34.00,
        image: 'img/Hair/Moroccan%20Argon%20Hair%20Oil.png',
        rating: 5.0,
        reviews: 512,
        description: 'A luxurious argan oil that instantly tames frizz, adds brilliant shine, and nourishes without greasy residue.',
        ingredients: ['100% Pure Argan Oil', 'Vitamin E', 'Essential Fatty Acids']
    },
    'hair-serum-1': {
        id: 'hair-serum-1',
        name: 'Biotin Growth Serum',
        category: 'Hair Serum',
        categoryPage: 'shop-hair.html',
        price: 38.00,
        image: 'img/Hair/Biotin%20Growth%20Serum.png',
        rating: 4.5,
        reviews: 234,
        description: 'A targeted scalp serum with biotin and caffeine that stimulates hair growth and reduces thinning.',
        ingredients: ['Biotin', 'Caffeine', 'Saw Palmetto', 'Niacinamide']
    },
    'hair-serum-2': {
        id: 'hair-serum-2',
        name: 'Frizz Control Silk Serum',
        category: 'Hair Serum',
        categoryPage: 'shop-hair.html',
        price: 28.00,
        image: 'img/Hair/Frizz%20Control%20Silk%20Serum.png',
        rating: 5.0,
        reviews: 178,
        description: 'A silicone-free serum that smooths flyaways and adds a glass-like shine. Lightweight enough for daily use.',
        ingredients: ['Silk Amino Acids', 'Jojoba Oil', 'Vitamin E', 'Rice Bran Extract']
    },
    'dry-shampoo-1': {
        id: 'dry-shampoo-1',
        name: 'Invisible Dry Shampoo',
        category: 'Dry Shampoo',
        categoryPage: 'shop-hair.html',
        price: 18.00,
        image: 'img/Hair/Freshen%20Up%20Invisible%20Dry%20Shampoo.png',
        rating: 5.0,
        reviews: 567,
        description: 'A translucent dry shampoo that absorbs excess oil and adds volume without leaving white residue. Works on all hair colors.',
        ingredients: ['Rice Starch', 'Tapioca Starch', 'Charcoal', 'Essential Oils']
    },
    'dry-shampoo-2': {
        id: 'dry-shampoo-2',
        name: 'Volumizing Dry Shampoo Foam',
        category: 'Dry Shampoo',
        categoryPage: 'shop-hair.html',
        price: 22.00,
        image: 'img/Hair/Dry%20Shampoo%20Powder%20for%20Oil%20Control%20%2B%20Volume.png',
        rating: 4.0,
        reviews: 145,
        description: 'A lightweight foam dry shampoo that refreshes roots and adds incredible volume between washes.',
        ingredients: ['Rice Protein', 'Bamboo Extract', 'Vitamin B5', 'Witch Hazel']
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
function initQuickView() {
    // Create modal HTML and append to body
    const modalHTML = `
    <div class="quick-view-overlay" id="quickViewOverlay">
        <div class="quick-view-modal">
            <button class="quick-view-close" id="quickViewClose">&times;</button>
            <div class="quick-view-content">
                <div class="quick-view-image">
                    <img src="" alt="" id="quickViewImage">
                </div>
                <div class="quick-view-info">
                    <span class="product-category-tag" id="quickViewCategory"></span>
                    <h2 id="quickViewName"></h2>
                    <div class="product-rating-detail">
                        <div class="stars" id="quickViewStars"></div>
                        <span class="rating-text" id="quickViewRating"></span>
                        <span class="review-count" id="quickViewReviews"></span>
                    </div>
                    <div class="product-price-detail">
                        <span class="original-price" id="quickViewOriginalPrice" style="display:none;"></span>
                        <span class="current-price" id="quickViewPrice"></span>
                    </div>
                    <p class="product-short-desc" id="quickViewDesc"></p>
                    <a href="#" class="quick-view-detail-link" id="quickViewDetailLink">View Full Details →</a>
                    <button class="add-to-cart-btn-large quick-view-add-cart" id="quickViewAddCart">
                        <i class="fa-solid fa-shopping-bag"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const overlay = document.getElementById('quickViewOverlay');
    const closeBtn = document.getElementById('quickViewClose');

    // Close modal handlers
    closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') overlay.classList.remove('active');
    });

    // Quick View - click on product card (not Add to Cart button)
    document.querySelectorAll('.product-card-shop').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open quick view if clicking Add to Cart button
            if (e.target.closest('.add-to-cart-btn')) return;

            e.preventDefault();
            e.stopPropagation();

            // Get product info from the card
            const link = card.querySelector('a[href*="product-detail"]');
            const productId = link ? new URLSearchParams(link.href.split('?')[1]).get('id') : null;
            const imgEl = card.querySelector('.product-image img');
            const imageSrc = imgEl ? imgEl.src : '';
            const imageAlt = imgEl ? imgEl.alt : '';
            const name = card.querySelector('.product-name')?.textContent || '';
            const category = card.querySelector('.product-category')?.textContent || '';
            const currentPrice = card.querySelector('.current-price')?.textContent || '';
            const originalPrice = card.querySelector('.original-price')?.textContent || '';
            const ratingCount = card.querySelector('.rating-count')?.textContent || '';
            const starsHTML = card.querySelector('.stars')?.innerHTML || '';

            // Look up from products database for description, or use a fallback
            const productData = productId && products[productId] ? products[productId] : null;
            const description = productData ? productData.description : 'Click "View Full Details" to learn more about this product.';
            const rating = productData ? productData.rating.toFixed(1) : '';

            // Populate modal
            document.getElementById('quickViewImage').src = imageSrc;
            document.getElementById('quickViewImage').alt = imageAlt;
            document.getElementById('quickViewName').textContent = name;
            document.getElementById('quickViewCategory').textContent = category;
            document.getElementById('quickViewPrice').textContent = currentPrice;
            document.getElementById('quickViewStars').innerHTML = starsHTML;
            document.getElementById('quickViewRating').textContent = rating;
            document.getElementById('quickViewReviews').textContent = ratingCount;
            document.getElementById('quickViewDesc').textContent = description;

            const origPriceEl = document.getElementById('quickViewOriginalPrice');
            if (originalPrice) {
                origPriceEl.textContent = originalPrice;
                origPriceEl.style.display = 'inline';
            } else {
                origPriceEl.style.display = 'none';
            }

            const detailLink = document.getElementById('quickViewDetailLink');
            detailLink.href = link ? link.getAttribute('href') : '#';

            // Add to cart from modal
            const addCartBtn = document.getElementById('quickViewAddCart');
            addCartBtn.onclick = () => {
                addToCart({
                    id: productId || Date.now(),
                    name: name,
                    price: parseFloat(currentPrice.replace('$', '')) || 0,
                    image: imageSrc,
                    quantity: 1
                });
                overlay.classList.remove('active');
            };

            // Show modal
            overlay.classList.add('active');
        });
    });
}

// Quick View Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
  const quickViewBtns = document.querySelectorAll('.quick-view-btn');

  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productCard = btn.closest('.product-card-shop');
      
      // Get the image element inside the card
      const imgElement = productCard.querySelector('.product-image img');
      
      if (!imgElement) {
        console.error("No image found in this product card");
        return;
      }

      // getAttribute('src') gets the exact string in the HTML (e.g., "img/file.jpg")
      // img.src gets the full URL (e.g., "http://localhost.../img/file.jpg")
      // We generally want the src property for the modal image.
      const productImageSrc = imgElement.src; 
      
      const productName = productCard.querySelector('.product-name').innerText; // use innerText to avoid hidden spacing
      
      // Check if price exists, handle sales prices
      let productPrice = '';
      const salePrice = productCard.querySelector('.current-price.sale');
      const regularPrice = productCard.querySelector('.current-price');
      
      if (salePrice) {
        productPrice = salePrice.innerText;
      } else if (regularPrice) {
        productPrice = regularPrice.innerText;
      }

      const productCategory = productCard.querySelector('.product-category').innerText;

      console.log("Opening Quick View:", productName, productImageSrc); // Debug log

      showQuickViewModal(productImageSrc, productName, productCategory, productPrice);
    });
  });

  function showQuickViewModal(image, name, category, price) {
    let modal = document.getElementById('quickViewModal');
    
    // Create modal if it doesn't exist
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'quickViewModal';
      modal.className = 'quick-view-modal';
      modal.innerHTML = `
        <div class="quick-view-overlay"></div>
        <div class="quick-view-content">
          <button class="quick-view-close">&times;</button>
          <div class="quick-view-image">
            <img src="" alt="Product" id="quickViewImage">
          </div>
          <div class="quick-view-details">
            <span class="qv-category"></span>
            <h2 class="qv-name"></h2>
            <p class="qv-price"></p>
            <button class="qv-add-to-cart">Add to Cart</button>
            <button class="qv-view-details">View Full Details</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('.quick-view-close').addEventListener('click', () => {
        modal.classList.remove('active');
      });
      modal.querySelector('.quick-view-overlay').addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    // Update content
    const modalImg = modal.querySelector('#quickViewImage');
    modalImg.src = image;
    modalImg.alt = name;
    
    modal.querySelector('.qv-name').innerText = name;
    modal.querySelector('.qv-category').innerText = category;
    modal.querySelector('.qv-price').innerText = price;

    // Show modal
    modal.classList.add('active');
  }
});

// Smooth scroll for quick view link in reviews
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

// ============================================
// VISUAL EFFECTS ENGINE - Makes BareBeauty Unique
// ============================================

// ===== FLOATING BEAUTY PARTICLES =====
(function initParticles() {
  // Only show floating makeup icons on the home page
  const isHomePage = window.location.pathname.endsWith('index.html') || 
                     window.location.pathname.endsWith('/') ||
                     window.location.pathname === '';

  const container = document.createElement('div');
  container.className = 'particles-container';
  container.setAttribute('aria-hidden', 'true');
  document.body.prepend(container);

  if (isHomePage) {
    // Makeup-themed icons for the home page
    const icons = [
      'fa-solid fa-pump-soap',       // skincare bottle
      'fa-solid fa-spray-can-sparkles', // spray
      'fa-solid fa-droplet',         // serum drop
      'fa-solid fa-heart',           // love/beauty
      'fa-solid fa-star',            // star
      'fa-solid fa-spa',             // spa/face mask
      'fa-solid fa-gem',             // gem/luxury
      'fa-solid fa-wand-magic-sparkles', // magic wand
      'fa-solid fa-hand-sparkles',   // sparkle hands
      'fa-solid fa-paintbrush',      // brush
      'fa-solid fa-eye',             // eye makeup
      'fa-solid fa-leaf',            // natural/clean
      'fa-solid fa-flask',           // serum flask
      'fa-solid fa-sun',             // SPF
    ];

    const colors = [
      'rgba(179, 155, 125, 0.18)',  // gold
      'rgba(228, 213, 195, 0.22)',  // beige
      'rgba(245, 230, 224, 0.25)',  // pink
      'rgba(168, 144, 128, 0.15)', // rose
      'rgba(201, 190, 179, 0.20)', // mocha
    ];

    for (let i = 0; i < 22; i++) {
      const particle = document.createElement('i');
      const iconClass = icons[Math.floor(Math.random() * icons.length)];
      particle.className = `makeup-icon-particle ${iconClass}`;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.fontSize = (Math.random() * 18 + 14) + 'px';
      particle.style.animationDuration = (Math.random() * 18 + 14) + 's';
      particle.style.animationDelay = (Math.random() * 12) + 's';
      // Randomize horizontal drift direction
      particle.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
      container.appendChild(particle);
    }
  } else {
    // Subtle dot particles for other pages
    const colors = [
      'rgba(228, 213, 195, 0.4)',
      'rgba(179, 155, 125, 0.25)',
      'rgba(245, 230, 224, 0.5)',
      'rgba(201, 190, 179, 0.3)',
      'rgba(221, 213, 202, 0.35)',
    ];

    for (let i = 0; i < 18; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 10 + 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.animationDuration = (Math.random() * 15 + 12) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      container.appendChild(particle);
    }
  }
})();

// ===== SCROLL REVEAL ANIMATIONS =====
(function initScrollReveal() {
  // Auto-tag elements for reveal animations
  const selectors = [
    { sel: '.category-row', cls: 'reveal' },
    { sel: '.featured h2, .featured h3', cls: 'reveal' },
    { sel: '.product-grid', cls: 'reveal-stagger' },
    { sel: '.product-grid-shop', cls: 'reveal-stagger' },
    { sel: '.category-showcase', cls: 'reveal-stagger' },
    { sel: '.shop-by-category > h3', cls: 'reveal' },
    { sel: '.filters-sidebar', cls: 'reveal-left' },
    { sel: '.results-bar', cls: 'reveal' },
    { sel: '.footer-section', cls: 'reveal' },
    { sel: '.advisor-step', cls: 'reveal' },
    { sel: '.feedback-card', cls: 'reveal-scale' },
  ];

  selectors.forEach(({ sel, cls }) => {
    document.querySelectorAll(sel).forEach(el => {
      if (!el.classList.contains('reveal') && 
          !el.classList.contains('reveal-left') && 
          !el.classList.contains('reveal-right') && 
          !el.classList.contains('reveal-scale') && 
          !el.classList.contains('reveal-stagger')) {
        el.classList.add(cls);
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Add staggered delays to children of reveal-stagger containers
        if (entry.target.classList.contains('reveal-stagger')) {
          Array.from(entry.target.children).forEach((child, i) => {
            child.style.transitionDelay = (i * 0.06) + 's';
          });
        }
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger')
    .forEach(el => observer.observe(el));
})();

// ===== BACK-TO-TOP BUTTON =====
(function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ===== NAVBAR SHRINK ON SCROLL =====
(function initNavbarShrink() {
  const siteHeader = document.querySelector('.site-header');
  if (!siteHeader) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });
})();

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== SCROLL TO TOP ON PAGE LOAD =====
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});
// Also handle back/forward navigation
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// ===== SPIN THE WHEEL POPUP SYSTEM (global — all pages) =====
document.addEventListener('DOMContentLoaded', function() {
  // Skip on login page
  if (window.location.pathname.includes('login.html')) return;

  // Inject popup HTML into the page
  const popupHTML = `
    <div class="popup-overlay" id="spinPopupOverlay" role="dialog" aria-modal="true" style="display:none;">
      <div class="spin-popup-content">
        <button class="close-x" id="closePopupX" aria-label="Close popup">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="spin-step" id="spinStepWheel">
          <h2>Spin & Win!</h2>
          <p class="spin-subtitle">Try your luck for exclusive rewards</p>
          <div class="wheel-container">
            <div class="wheel-pointer"><i class="fa-solid fa-caret-down"></i></div>
            <canvas id="spinCanvas" width="420" height="420"></canvas>
          </div>
          <button class="cta-button spin-btn" id="spinBtn">
            <i class="fa-solid fa-rotate"></i> SPIN NOW
          </button>
          <button class="close-btn" id="maybeLater">No thanks, I'll pass</button>
        </div>
        <div class="spin-step" id="spinStepResult" style="display:none;">
          <div class="result-confetti" aria-hidden="true">\u{1F389}</div>
          <h2>Congratulations!</h2>
          <p class="result-prize" id="resultPrize"></p>
          <p class="result-claim-label">Enter your email to claim your reward:</p>
          <input type="email" placeholder="Enter your email" class="email-input" id="spinEmail" aria-label="Email address">
          <button class="cta-button" id="claimRewardBtn">
            <i class="fa-solid fa-gift"></i> Claim My Reward
          </button>
        </div>
        <div class="spin-step" id="spinStepCode" style="display:none;">
          <div class="result-confetti" aria-hidden="true">\u2728</div>
          <h2>Your Reward</h2>
          <p class="result-prize" id="finalPrize"></p>
          <p class="result-code-label">Use code at checkout:</p>
          <div class="result-code" id="resultCode"></div>
          <button class="cta-button" id="resultShopBtn">Start Shopping <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    </div>
    <button class="popup-mini-trigger" id="popupMiniTrigger" aria-label="Spin to win!" title="Spin the wheel for exclusive offers">
      <i class="fa-solid fa-gift"></i>
      <span class="trigger-badge">Spin!</span>
    </button>
  `;
  document.body.insertAdjacentHTML('afterbegin', popupHTML);

  // References
  const popup = document.getElementById('spinPopupOverlay');
  const closeXBtn = document.getElementById('closePopupX');
  const maybeLaterBtn = document.getElementById('maybeLater');
  const miniTrigger = document.getElementById('popupMiniTrigger');
  const spinEmail = document.getElementById('spinEmail');
  const spinBtn = document.getElementById('spinBtn');
  const claimRewardBtn = document.getElementById('claimRewardBtn');
  const resultShopBtn = document.getElementById('resultShopBtn');

  let wonSegment = null;

  // Segments & weights
  const segments = [
    { label: '10% OFF',   color: '#b39b7d', code: 'GLOW10' },
    { label: 'Free Ship', color: '#d4c4a8', code: 'FREESHIP' },
    { label: '15% OFF',   color: '#8b7355', code: 'BARE15' },
    { label: '$5 OFF',    color: '#e8ddd4', code: 'SAVE5' },
    { label: '20% OFF',   color: '#a08060', code: 'BEAUTY20' },
    { label: 'Gift Set',  color: '#c9b99e', code: 'GIFTSET' },
    { label: '25% OFF',   color: '#6d5a45', code: 'VIP25' },
    { label: 'Try Again', color: '#f0e6da', code: null }
  ];
  const weights = [25, 20, 18, 15, 8, 5, 2, 7];

  let currentAngle = 0;
  let isSpinning = false;

  function drawWheel() {
    const canvas = document.getElementById('spinCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = cx - 4;
    const segAngle = (2 * Math.PI) / segments.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    segments.forEach((seg, i) => {
      const startAngle = currentAngle + i * segAngle;
      const endAngle = startAngle + segAngle;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startAngle + segAngle / 2);
      ctx.fillStyle = (seg.color === '#e8ddd4' || seg.color === '#f0e6da' || seg.color === '#d4c4a8' || seg.color === '#c9b99e') ? '#5a4a3a' : '#fff';
      ctx.font = 'bold 17px Montserrat, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(seg.label, r - 18, 0);
      ctx.restore();
    });
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#b39b7d';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#b39b7d';
    ctx.fill();
  }

  function pickSegment() {
    const total = weights.reduce((s, w) => s + w, 0);
    let rand = Math.random() * total;
    for (let i = 0; i < weights.length; i++) {
      rand -= weights[i];
      if (rand <= 0) return i;
    }
    return 0;
  }

  function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    spinBtn.disabled = true;
    const winIndex = pickSegment();
    const segAngle = 360 / segments.length;
    const segCenter = winIndex * segAngle + segAngle / 2;
    // Pointer is at top (270°). Rotate so the winning segment's center lands at 270°.
    const totalSpin = 360 * 6 + ((270 - segCenter + 360) % 360);
    const startAngle = currentAngle;
    const startTime = performance.now();
    const duration = 4500;
    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const angleDeg = startAngle * (180 / Math.PI) + totalSpin * ease;
      currentAngle = (angleDeg % 360) * (Math.PI / 180);
      drawWheel();
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        isSpinning = false;
        showResult(segments[winIndex]);
      }
    }
    requestAnimationFrame(animate);
  }

  function showResult(seg) {
    wonSegment = seg;
    document.getElementById('spinStepWheel').style.display = 'none';
    document.getElementById('spinStepResult').style.display = 'block';
    if (seg.code) {
      document.getElementById('resultPrize').textContent = 'You won ' + seg.label + '!';
      document.querySelector('.result-claim-label').style.display = '';
      spinEmail.style.display = '';
      claimRewardBtn.style.display = '';
      claimRewardBtn.innerHTML = '<i class="fa-solid fa-gift"></i> Claim My Reward';
      claimRewardBtn.onclick = null;
    } else {
      document.getElementById('resultPrize').textContent = 'So close! Try again next time.';
      document.querySelector('.result-claim-label').style.display = 'none';
      spinEmail.style.display = 'none';
      claimRewardBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Close';
      claimRewardBtn.style.display = '';
      claimRewardBtn.onclick = function() { hidePopup(); };
    }
  }

  function showPopup() {
    document.getElementById('spinStepWheel').style.display = 'block';
    document.getElementById('spinStepResult').style.display = 'none';
    document.getElementById('spinStepCode').style.display = 'none';
    spinBtn.disabled = false;
    isSpinning = false;
    popup.style.display = 'flex';
    popup.classList.add('popup-visible');
    popup.classList.remove('popup-hiding');
    drawWheel();
  }

  function hidePopup() {
    popup.classList.remove('popup-visible');
    popup.classList.add('popup-hiding');
    setTimeout(() => {
      popup.style.display = 'none';
      popup.classList.remove('popup-hiding');
    }, 300);
  }

  // Claim reward (email)
  claimRewardBtn.addEventListener('click', () => {
    if (claimRewardBtn.onclick) return; // "Close" handler takes priority
    const email = spinEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      spinEmail.classList.add('input-error');
      spinEmail.placeholder = 'Please enter a valid email';
      setTimeout(() => {
        spinEmail.classList.remove('input-error');
        spinEmail.placeholder = 'Enter your email';
      }, 2000);
      return;
    }
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userSignedUp', 'true');
    localStorage.setItem('spinCompleted', 'true');
    if (wonSegment && wonSegment.code) localStorage.setItem('spinReward', wonSegment.code);
    document.getElementById('spinStepResult').style.display = 'none';
    document.getElementById('spinStepCode').style.display = 'block';
    document.getElementById('finalPrize').textContent = 'You won ' + wonSegment.label + '!';
    document.getElementById('resultCode').textContent = wonSegment.code;
  });

  spinBtn.addEventListener('click', spinWheel);
  resultShopBtn.addEventListener('click', () => { hidePopup(); miniTrigger.style.display = 'none'; });
  closeXBtn.addEventListener('click', hidePopup);
  maybeLaterBtn.addEventListener('click', hidePopup);
  popup.addEventListener('click', (e) => { if (e.target === popup) hidePopup(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && popup.style.display === 'flex') hidePopup(); });
  spinEmail.addEventListener('keypress', (e) => { if (e.key === 'Enter') claimRewardBtn.click(); });
  miniTrigger.addEventListener('click', () => showPopup());

  // Init visibility — always show mini trigger
  miniTrigger.style.display = '';
  setTimeout(() => miniTrigger.classList.add('trigger-visible'), 1000);

  // Auto-show popup on first visit per session (sessionStorage resets when browser closes)
  if (!sessionStorage.getItem('spinPopupShown')) {
    setTimeout(() => {
      sessionStorage.setItem('spinPopupShown', 'true');
      showPopup();
    }, 4000);
  }
});

// ===== TRACKER FUNCTIONALITY =====

// Image upload preview handler
function initImageUpload(inputId, previewId, uploadAreaId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  const uploadArea = document.getElementById(uploadAreaId);
  
  if (!input || !preview) return;
  
  input.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
        if (uploadArea) {
          const placeholder = uploadArea.querySelector('.upload-placeholder');
          if (placeholder) placeholder.style.display = 'none';
        }
      };
      reader.readAsDataURL(file);
    }
  });
}

// Tab switching for trackers
function initTrackerTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tracker-tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(tabId + '-tab').classList.add('active');
    });
  });
}

// Skincare Tracker
function initSkincareTracker() {
  if (!document.getElementById('morning-form')) return;
  
  // Set today's date as default
  const today = new Date().toISOString().split('T')[0];
  const morningDateInput = document.getElementById('morning-date');
  const eveningDateInput = document.getElementById('evening-date');
  const symptomsDateInput = document.getElementById('symptoms-date');
  
  if (morningDateInput) morningDateInput.value = today;
  if (eveningDateInput) eveningDateInput.value = today;
  if (symptomsDateInput) symptomsDateInput.value = today;
  
  // Initialize image uploads
  initImageUpload('morning-photo', 'morning-preview', 'morning-upload-area');
  initImageUpload('evening-photo', 'evening-preview', 'evening-upload-area');
  
  // Tab switching
  initTrackerTabs();
  
  // Morning form submission
  const morningForm = document.getElementById('morning-form');
  morningForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(morningForm);
    const products = formData.getAll('products');
    const photoFile = document.getElementById('morning-photo').files[0];
    
    const entry = {
      id: Date.now(),
      type: 'morning',
      date: formData.get('date'),
      products: products,
      notes: formData.get('notes'),
      photo: photoFile ? awaitFileReader(photoFile) : null,
      timestamp: new Date().toISOString()
    };
    
    saveSkincareEntry(entry);
    morningForm.reset();
    document.getElementById('morning-preview').style.display = 'none';
    if (morningDateInput) morningDateInput.value = today;
    showToast();
  });
  
  // Evening form submission
  const eveningForm = document.getElementById('evening-form');
  eveningForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(eveningForm);
    const products = formData.getAll('products');
    const photoFile = document.getElementById('evening-photo').files[0];
    
    const entry = {
      id: Date.now(),
      type: 'evening',
      date: formData.get('date'),
      products: products,
      notes: formData.get('notes'),
      photo: photoFile ? awaitFileReader(photoFile) : null,
      timestamp: new Date().toISOString()
    };
    
    saveSkincareEntry(entry);
    eveningForm.reset();
    document.getElementById('evening-preview').style.display = 'none';
    if (eveningDateInput) eveningDateInput.value = today;
    showToast();
  });
  
  // Symptoms form submission
  const symptomsForm = document.getElementById('symptoms-form');
  symptomsForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(symptomsForm);
    const symptoms = formData.getAll('symptoms');
    
    const entry = {
      id: Date.now(),
      type: 'symptoms',
      date: formData.get('date'),
      symptoms: symptoms,
      severity: formData.get('severity'),
      notes: formData.get('notes'),
      timestamp: new Date().toISOString()
    };
    
    saveSkincareEntry(entry);
    symptomsForm.reset();
    if (symptomsDateInput) symptomsDateInput.value = today;
    showToast();
  });
  
  // History filter
  const historyFilter = document.getElementById('history-filter');
  historyFilter?.addEventListener('change', () => {
    loadSkincareHistory(historyFilter.value);
  });
  
  // Clear history
  const clearHistoryBtn = document.getElementById('clear-history');
  clearHistoryBtn?.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all skincare history?')) {
      localStorage.removeItem('skincareTracker');
      loadSkincareHistory('all');
    }
  });
  
  // Load initial history
  loadSkincareHistory('all');
}

// Helper: Read file as data URL
function awaitFileReader(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

// Save skincare entry
function saveSkincareEntry(entry) {
  const entries = JSON.parse(localStorage.getItem('skincareTracker') || '[]');
  entries.push(entry);
  localStorage.setItem('skincareTracker', JSON.stringify(entries));
}

// Load and display skincare history
function loadSkincareHistory(filter = 'all') {
  const entries = JSON.parse(localStorage.getItem('skincareTracker') || '[]');
  const container = document.getElementById('history-entries');
  
  if (!container) return;
  
  let filteredEntries = entries;
  if (filter !== 'all') {
    filteredEntries = entries.filter(e => e.type === filter);
  }
  
  filteredEntries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  if (filteredEntries.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-clipboard-list"></i>
        <p>No entries yet. Start tracking your skincare routine!</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filteredEntries.map(entry => {
    let content = '';
    
    if (entry.type === 'symptoms') {
      const symptomLabels = {
        'dryness': 'Dryness', 'oiliness': 'Oiliness', 'redness': 'Redness',
        'breakouts': 'Breakouts', 'sensitivity': 'Sensitivity', 'itching': 'Itching',
        'dark-circles': 'Dark Circles', 'puffiness': 'Puffiness', 'fine-lines': 'Fine Lines',
        'none': 'No Symptoms'
      };
      content = `
        <div class="history-entry-products">
          ${entry.symptoms?.map(s => `<span class="history-product-tag">${symptomLabels[s] || s}</span>`).join('') || ''}
        </div>
        <p><strong>Severity:</strong> ${entry.severity || 'N/A'}/5</p>
      `;
    } else {
      content = `
        <div class="history-entry-products">
          ${entry.products?.map(p => `<span class="history-product-tag">${p}</span>`).join('') || ''}
        </div>
        ${entry.photo ? `<img src="${entry.photo}" class="history-entry-image" alt="Skin photo">` : ''}
      `;
    }
    
    return `
      <div class="history-entry ${entry.type}">
        <div class="history-entry-header">
          <span class="history-entry-date">${formatDate(entry.date)}</span>
          <span class="history-entry-type ${entry.type}">${entry.type}</span>
        </div>
        ${content}
        ${entry.notes ? `<p class="history-entry-notes">${entry.notes}</p>` : ''}
      </div>
    `;
  }).join('');
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

// Haircare Tracker
function initHaircareTracker() {
  if (!document.getElementById('treatment-form')) return;
  
  // Set today's date
  const today = new Date().toISOString().split('T')[0];
  const treatmentDateInput = document.getElementById('treatment-date');
  if (treatmentDateInput) treatmentDateInput.value = today;
  
  // Initialize image uploads
  initImageUpload('before-photo', 'before-preview', 'before-upload-area');
  initImageUpload('after-photo', 'after-preview', 'after-upload-area');
  
  // Tab switching
  initTrackerTabs();
  
  // Treatment form submission
  const treatmentForm = document.getElementById('treatment-form');
  treatmentForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(treatmentForm);
    const products = formData.getAll('products');
    
    const beforeFile = document.getElementById('before-photo').files[0];
    const afterFile = document.getElementById('after-photo').files[0];
    
    const entry = {
      id: Date.now(),
      type: 'treatment',
      date: formData.get('date'),
      products: products,
      notes: formData.get('notes'),
      beforePhoto: beforeFile ? awaitFileReader(beforeFile) : null,
      afterPhoto: afterFile ? awaitFileReader(afterFile) : null,
      timestamp: new Date().toISOString()
    };
    
    saveHaircareEntry(entry);
    treatmentForm.reset();
    document.getElementById('before-preview').style.display = 'none';
    document.getElementById('after-preview').style.display = 'none';
    if (treatmentDateInput) treatmentDateInput.value = today;
    showToast();
  });
  
  // Clear history
  const clearHistoryBtn = document.getElementById('clear-history');
  clearHistoryBtn?.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all haircare history?')) {
      localStorage.removeItem('haircareTracker');
      loadHaircareHistory();
    }
  });
  
  // Load initial history
  loadHaircareHistory();
}

// Save haircare entry
function saveHaircareEntry(entry) {
  const entries = JSON.parse(localStorage.getItem('haircareTracker') || '[]');
  entries.push(entry);
  localStorage.setItem('haircareTracker', JSON.stringify(entries));
}

// Load and display haircare history
function loadHaircareHistory() {
  const entries = JSON.parse(localStorage.getItem('haircareTracker') || '[]');
  const container = document.getElementById('history-entries');
  
  if (!container) return;
  
  entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  if (entries.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-clipboard-list"></i>
        <p>No entries yet. Start tracking your haircare treatments!</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = entries.map(entry => `
    <div class="history-entry">
      <div class="history-entry-header">
        <span class="history-entry-date">${formatDate(entry.date)}</span>
        <span class="history-entry-type" style="background: #e8f5e9; color: #2e7d32;">Treatment</span>
      </div>
      <div class="history-entry-products">
        ${entry.products?.map(p => `<span class="history-product-tag">${p}</span>`).join('') || ''}
      </div>
      <div class="treatment-comparison" style="margin-top: 12px;">
        ${entry.beforePhoto ? `<div class="treatment-section before"><h4>Before</h4><img src="${entry.beforePhoto}" class="history-entry-image" style="width:100%;height:150px;object-fit:cover;"></div>` : ''}
        ${entry.afterPhoto ? `<div class="treatment-section after"><h4>After</h4><img src="${entry.afterPhoto}" class="history-entry-image" style="width:100%;height:150px;object-fit:cover;"></div>` : ''}
      </div>
      ${entry.notes ? `<p class="history-entry-notes">${entry.notes}</p>` : ''}
    </div>
  `).join('');
}

// Show toast message
function showToast() {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
}

// Initialize trackers on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initSkincareTracker();
  initHaircareTracker();
});
