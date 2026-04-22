/**
 * AI Beauty Advisor - Recommendation Engine
 * Analyzes user's skin characteristics and provides personalized product recommendations
 */

// ===== USER PROFILE STATE =====
let userProfile = {
    skinType: null,
    skinTone: null,
    undertone: null,
    concerns: [],
    preferences: [],
    analysisMethod: null // 'camera' or 'manual'
};

// ===== CAMERA FUNCTIONALITY =====
let videoStream = null;
let capturedImage = null;

const cameraElements = {
    video: document.getElementById('cameraFeed'),
    canvas: document.getElementById('cameraCanvas'),
    container: document.getElementById('cameraContainer'),
    overlay: document.getElementById('cameraOverlay'),
    placeholder: document.getElementById('cameraPlaceholder'),
    startBtn: document.getElementById('startCameraBtn'),
    captureBtn: document.getElementById('captureBtn'),
    retakeBtn: document.getElementById('retakeBtn')
};

// Start camera
async function startCamera() {
    try {
        videoStream = await navigator.mediaDevices.getUserMedia({
            video: { 
                facingMode: 'user',
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        });
        
        cameraElements.video.srcObject = videoStream;
        cameraElements.video.style.display = 'block';
        cameraElements.placeholder.style.display = 'none';
        cameraElements.overlay.style.display = 'flex';
        
        cameraElements.startBtn.style.display = 'none';
        cameraElements.captureBtn.style.display = 'inline-flex';
        
    } catch (error) {
        console.error('Camera access error:', error);
        showAdvisorNotification('Unable to access camera. Please use manual input instead.', 'error');
    }
}

// Capture photo and analyze
function captureAndAnalyze() {
    const canvas = cameraElements.canvas;
    const video = cameraElements.video;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    capturedImage = canvas.toDataURL('image/jpeg');
    
    // Show captured image
    cameraElements.video.style.display = 'none';
    canvas.style.display = 'block';
    
    cameraElements.overlay.innerHTML = `
        <div class="analyzing-overlay">
            <div class="analyzing-spinner"></div>
            <p>Analyzing your skin...</p>
        </div>
    `;
    
    cameraElements.captureBtn.style.display = 'none';
    cameraElements.retakeBtn.style.display = 'inline-flex';
    
    // Stop camera stream
    stopCamera();
    
    // Simulate AI analysis (in production, this would call a real ML model)
    setTimeout(() => {
        performCameraAnalysis();
    }, 2000);
}

// Stop camera stream
function stopCamera() {
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        videoStream = null;
    }
}

// Retake photo
function retakePhoto() {
    cameraElements.canvas.style.display = 'none';
    cameraElements.overlay.innerHTML = `
        <div class="face-guide">
            <div class="face-outline"></div>
            <p>Position your face within the frame</p>
        </div>
    `;
    cameraElements.retakeBtn.style.display = 'none';
    capturedImage = null;
    startCamera();
}

// Simulated camera-based skin analysis
function performCameraAnalysis() {
    // In a real implementation, this would use TensorFlow.js or a similar ML library
    // For demo purposes, we'll generate realistic random results
    
    const skinTypes = ['dry', 'oily', 'combination', 'sensitive'];
    const skinTones = ['fair', 'light', 'medium', 'tan', 'deep', 'rich'];
    const undertones = ['warm', 'cool', 'neutral'];
    const possibleConcerns = ['dryness', 'dullness', 'pores', 'dark-circles'];
    
    userProfile.skinType = skinTypes[Math.floor(Math.random() * skinTypes.length)];
    userProfile.skinTone = skinTones[Math.floor(Math.random() * skinTones.length)];
    userProfile.undertone = undertones[Math.floor(Math.random() * undertones.length)];
    userProfile.concerns = possibleConcerns.slice(0, Math.floor(Math.random() * 3) + 1);
    userProfile.analysisMethod = 'camera';
    
    showResults();
}

// ===== MANUAL INPUT FUNCTIONALITY =====
function initManualInput() {
    // Skin type buttons
    document.querySelectorAll('#skinTypeOptions .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#skinTypeOptions .option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            userProfile.skinType = btn.dataset.value;
        });
    });
    
    // Skin tone picker
    document.querySelectorAll('#skinTonePicker .tone-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#skinTonePicker .tone-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            userProfile.skinTone = btn.dataset.value;
        });
    });
    
    // Undertone buttons
    document.querySelectorAll('#undertoneOptions .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#undertoneOptions .option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            userProfile.undertone = btn.dataset.value;
        });
    });
    
    // Skin concerns checkboxes
    document.querySelectorAll('#skinConcerns input').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            userProfile.concerns = Array.from(document.querySelectorAll('#skinConcerns input:checked'))
                .map(cb => cb.value);
        });
    });
    
    // Preferences checkboxes
    document.querySelectorAll('#preferences input').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            userProfile.preferences = Array.from(document.querySelectorAll('#preferences input:checked'))
                .map(cb => cb.value);
        });
    });
    
    // Manual analyze button
    document.getElementById('manualAnalyzeBtn')?.addEventListener('click', () => {
        if (!userProfile.skinType) {
            showAdvisorNotification('Please select your skin type', 'error');
            return;
        }
        userProfile.analysisMethod = 'manual';
        showResults();
    });
}

// ===== RESULTS DISPLAY =====
function showResults() {
    // Hide camera section, show results
    document.getElementById('step-camera').classList.add('hidden');
    document.getElementById('step-results').classList.remove('hidden');
    document.getElementById('step-recommendations').classList.remove('hidden');
    document.getElementById('step-feedback').classList.remove('hidden');
    
    // Populate results
    document.getElementById('resultSkinType').textContent = capitalizeFirst(userProfile.skinType || 'Not specified');
    document.getElementById('resultSkinTone').textContent = capitalizeFirst(userProfile.skinTone || 'Not specified');
    document.getElementById('resultUndertone').textContent = capitalizeFirst(userProfile.undertone || 'Not specified');
    
    const concernsList = document.getElementById('resultConcerns');
    if (userProfile.concerns.length > 0) {
        concernsList.innerHTML = userProfile.concerns.map(c => `<li>${formatConcern(c)}</li>`).join('');
    } else {
        concernsList.innerHTML = '<li>General maintenance</li>';
    }
    
    // Generate recommendations
    generateRecommendations();
    
    // Scroll to results
    document.getElementById('step-results').scrollIntoView({ behavior: 'smooth' });
}

// ===== RECOMMENDATION ENGINE =====
function generateRecommendations() {
    const skincareProducts = getSkincareRecommendations();
    const makeupProducts = getMakeupRecommendations();
    const toolProducts = getToolRecommendations();
    const hairProducts = getHairRecommendations();
    const nailProducts = getNailRecommendations();
    const dealsProducts = getDealsRecommendations();
    
    renderSkincareRoutine(skincareProducts);
    renderProductGrid('makeupRecommendations', makeupProducts);
    renderProductGrid('toolRecommendations', toolProducts);
    renderProductGrid('hairRecommendations', hairProducts);
    renderProductGrid('nailRecommendations', nailProducts);
    renderProductGrid('dealsRecommendations', dealsProducts);
}

function getSkincareRecommendations() {
    const routine = [];
    
    // Step 1: Cleanser
    routine.push({
        step: 1,
        name: 'Cleanse',
        icon: 'fa-droplet',
        product: products['cleanser-1'],
        reason: `Perfect for ${userProfile.skinType || 'all'} skin - gentle yet effective`
    });
    
    // Step 2: Toner (for oily/combination)
    if (userProfile.skinType === 'oily' || userProfile.skinType === 'combination') {
        routine.push({
            step: 2,
            name: 'Tone',
            icon: 'fa-spray-can-sparkles',
            product: products['toner-1'],
            reason: 'Balances oil production and minimizes pores'
        });
    }
    
    // Step 3: Serum
    let serumReason = 'Brightens and protects your skin';
    if (userProfile.concerns.includes('dark-spots') || userProfile.concerns.includes('dullness')) {
        serumReason = 'Targets dark spots and brightens dull skin';
    }
    routine.push({
        step: routine.length + 1,
        name: 'Treat',
        icon: 'fa-flask',
        product: products['serum-1'],
        reason: serumReason
    });
    
    // Step 4: Eye Cream (if dark circles concern)
    if (userProfile.concerns.includes('dark-circles') || userProfile.concerns.includes('aging')) {
        routine.push({
            step: routine.length + 1,
            name: 'Eye Care',
            icon: 'fa-eye',
            product: products['eye-cream-1'],
            reason: 'Reduces dark circles and fine lines around eyes'
        });
    }
    
    // Step 5: Moisturizer with SPF
    routine.push({
        step: routine.length + 1,
        name: 'Moisturize & Protect',
        icon: 'fa-sun',
        product: products['moisturizer-1'],
        reason: 'Hydrates and protects from UV damage'
    });
    
    // Step 6: Face Mask (weekly)
    if (userProfile.concerns.includes('dryness') || userProfile.skinType === 'dry') {
        routine.push({
            step: routine.length + 1,
            name: 'Weekly Treatment',
            icon: 'fa-spa',
            product: products['mask-1'],
            reason: 'Deep hydration boost for dry skin'
        });
    }
    
    return routine;
}

function getMakeupRecommendations() {
    const recommendations = [];
    
    // Foundation/Tinted Moisturizer based on skin type
    recommendations.push(products['tinted-moisturizer-1']);
    
    // Concealer for dark circles
    if (userProfile.concerns.includes('dark-circles')) {
        recommendations.push(products['concealer-1']);
    }
    
    // Primer for oily skin / large pores
    if (userProfile.skinType === 'oily' || userProfile.concerns.includes('pores')) {
        recommendations.push(products['primer-1']);
    }
    
    // Blush based on undertone
    recommendations.push(products['blush-1']);
    
    // Lip products
    recommendations.push(products['lip-gloss-1']);
    recommendations.push(products['lip-oil-1']);
    
    // Mascara & eye products
    recommendations.push(products['mascara-1']);
    
    // Eyeshadow based on undertone
    if (userProfile.undertone === 'warm') {
        recommendations.push(products['eyeshadow-palette-2']); // Rose gold
    } else {
        recommendations.push(products['eyeshadow-palette-1']); // Nude neutrals
    }
    
    return recommendations.filter(p => p); // Remove undefined
}

function getToolRecommendations() {
    const recommendations = [];
    
    // Brush set
    recommendations.push(products['brush-set-1']);
    
    // Gua Sha / Jade Roller for puffiness & circulation
    if (userProfile.concerns.includes('dark-circles') || userProfile.concerns.includes('dullness')) {
        recommendations.push(products['gua-sha-1']);
        recommendations.push(products['jade-roller-1']);
    }
    
    // Red Light Therapy for aging concerns
    if (userProfile.concerns.includes('aging')) {
        recommendations.push(products['red-light-1']);
    }
    
    // Foundation brush
    recommendations.push(products['foundation-brush-1']);
    
    // Eye brush set
    recommendations.push(products['eye-brush-set-1']);
    
    return recommendations.filter(p => p).slice(0, 4);
}

function getHairRecommendations() {
    const recommendations = [];
    
    // Shampoo
    recommendations.push(products['shampoo-1']);
    
    // Conditioner
    recommendations.push(products['conditioner-1']);
    
    // Hair Oil
    recommendations.push(products['hair-oil-1']);
    
    // Hair Mask for dry concerns
    if (userProfile.concerns.includes('dryness')) {
        recommendations.push(products['hair-mask-1']);
    }
    
    // Leave-In Treatment
    recommendations.push(products['leave-in-1']);
    
    // Hair Serum
    recommendations.push(products['hair-serum-1']);
    
    return recommendations.filter(p => p).slice(0, 4);
}

function getNailRecommendations() {
    const recommendations = [];
    
    // Classic French Tips
    recommendations.push(products['nails-french-1']);
    
    // Cuticle Oil
    recommendations.push(products['cuticle-oil-1']);
    
    // Glossy Pink Set
    recommendations.push(products['nails-glossy-pink-1']);
    
    // Holographic Set
    recommendations.push(products['nails-holographic-1']);
    
    return recommendations.filter(p => p).slice(0, 4);
}

function getDealsRecommendations() {
    // Get products with originalPrice (on sale)
    const saleProducts = Object.values(products).filter(p => p.originalPrice);
    return saleProducts;
}

// ===== RENDER FUNCTIONS =====
function renderSkincareRoutine(routine) {
    const container = document.getElementById('skincareRoutine');
    if (!container) return;
    
    container.innerHTML = routine.map(item => `
        <div class="routine-step-card">
            <div class="routine-step-number">
                <span>${item.step}</span>
            </div>
            <div class="routine-step-icon">
                <i class="fa-solid ${item.icon}"></i>
            </div>
            <div class="routine-step-info">
                <h4>${item.name}</h4>
                <div class="routine-product">
                    <img src="${item.product.image}" alt="${item.product.name}" onerror="this.src='img/placeholder.jpg'">
                    <div class="routine-product-details">
                        <h5>${item.product.name}</h5>
                        <p class="routine-reason">${item.reason}</p>
                        <div class="routine-product-price">
                            <span class="price">$${item.product.price.toFixed(2)}</span>
                            ${item.product.originalPrice ? `<span class="original-price">$${item.product.originalPrice.toFixed(2)}</span>` : ''}
                        </div>
                        <a href="product-detail.html?id=${item.product.id}" class="routine-btn">View Product</a>
                        <button class="routine-btn add-btn" onclick="addAdvisorProductToCart('${item.product.id}')">
                            <i class="fa-solid fa-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderProductGrid(containerId, productList) {
    const container = document.getElementById(containerId);
    if (!container || !productList) return;
    
    container.innerHTML = productList.map(product => `
        <div class="advisor-product-card">
            ${product.originalPrice ? '<span class="sale-badge">Sale</span>' : ''}
            <div class="advisor-product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='img/placeholder.jpg'">
            </div>
            <div class="advisor-product-info">
                <span class="advisor-product-category">${product.category}</span>
                <h4>${product.name}</h4>
                <div class="advisor-product-rating">
                    ${renderStars(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
                <div class="advisor-product-price">
                    <span class="current">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    ${product.originalPrice ? `<span class="discount">${Math.round((1 - product.price/product.originalPrice) * 100)}% off</span>` : ''}
                </div>
                <div class="advisor-product-actions">
                    <a href="product-detail.html?id=${product.id}" class="view-btn">View Details</a>
                    <button class="add-btn" onclick="addAdvisorProductToCart('${product.id}')">
                        <i class="fa-solid fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fa-solid fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            stars += '<i class="fa-regular fa-star"></i>';
        }
    }
    return stars;
}

// ===== CART INTEGRATION =====
function addAdvisorProductToCart(productId) {
    const product = products[productId];
    if (product) {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        showAdvisorNotification(`${product.name} added to cart!`, 'success');
    }
}

// ===== FEEDBACK FUNCTIONALITY =====
function initFeedback() {
    const stars = document.querySelectorAll('#feedbackRating i');
    let selectedRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.dataset.rating);
            highlightStars(rating);
        });
        
        star.addEventListener('mouseleave', () => {
            highlightStars(selectedRating);
        });
        
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.dataset.rating);
            highlightStars(selectedRating);
        });
    });
    
    document.getElementById('submitFeedbackBtn')?.addEventListener('click', () => {
        const feedbackText = document.getElementById('feedbackText').value;
        
        // In production, this would send to a backend
        console.log('Feedback submitted:', { rating: selectedRating, text: feedbackText, profile: userProfile });
        
        showAdvisorNotification('Thank you for your feedback! 💖', 'success');
        
        // Hide feedback section
        document.getElementById('step-feedback').innerHTML = `
            <div class="feedback-thanks">
                <i class="fa-solid fa-heart"></i>
                <h3>Thank You!</h3>
                <p>Your feedback helps us improve your experience.</p>
            </div>
        `;
    });
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('#feedbackRating i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('fa-regular');
            star.classList.add('fa-solid');
        } else {
            star.classList.remove('fa-solid');
            star.classList.add('fa-regular');
        }
    });
}

// ===== UTILITY FUNCTIONS =====
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatConcern(concern) {
    const concernMap = {
        'acne': 'Acne & Blemishes',
        'aging': 'Fine Lines & Wrinkles',
        'dark-spots': 'Dark Spots',
        'dryness': 'Dryness',
        'redness': 'Redness',
        'pores': 'Large Pores',
        'dark-circles': 'Dark Circles',
        'dullness': 'Dullness'
    };
    return concernMap[concern] || concern;
}

function showAdvisorNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `advisor-notification ${type}`;
    notification.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize camera controls
    cameraElements.startBtn?.addEventListener('click', startCamera);
    cameraElements.captureBtn?.addEventListener('click', captureAndAnalyze);
    cameraElements.retakeBtn?.addEventListener('click', retakePhoto);
    
    // Initialize manual input
    initManualInput();
    
    // Initialize feedback
    initFeedback();
    
    // Reanalyze button
    document.getElementById('reanalyzeBtn')?.addEventListener('click', () => {
        // Reset profile
        userProfile = {
            skinType: null,
            skinTone: null,
            undertone: null,
            concerns: [],
            preferences: [],
            analysisMethod: null
        };
        
        // Reset UI
        document.querySelectorAll('.option-btn.selected, .tone-btn.selected').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelectorAll('#skinConcerns input, #preferences input').forEach(cb => {
            cb.checked = false;
        });
        
        // Show camera section, hide others
        document.getElementById('step-camera').classList.remove('hidden');
        document.getElementById('step-results').classList.add('hidden');
        document.getElementById('step-recommendations').classList.add('hidden');
        document.getElementById('step-feedback').classList.add('hidden');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Update cart count
    updateCartCount();
});
