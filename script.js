// Sample product data
const products = [
    {
        id: 1,
        title: "iPhone 15 Pro Max",
        description: "O mais avançado iPhone com chip A17 Pro e câmera profissional",
        currentPrice: 8999.99,
        originalPrice: 9999.99,
        image: "/placeholder.svg?height=250&width=280",
        badge: "Novo",
        category: "smartphones"
    },
    {
        id: 2,
        title: "MacBook Pro M3",
        description: "Notebook profissional com chip M3 e tela Retina de 14 polegadas",
        currentPrice: 15999.99,
        originalPrice: 17999.99,
        image: "/placeholder.svg?height=250&width=280",
        badge: "Oferta",
        category: "laptops"
    },
    {
        id: 3,
        title: "AirPods Pro 2",
        description: "Fones sem fio com cancelamento ativo de ruído",
        currentPrice: 1899.99,
        originalPrice: 2299.99,
        image: "/placeholder.svg?height=250&width=280",
        badge: "Desconto",
        category: "audio"
    },
    {
        id: 4,
        title: "iPad Air M2",
        description: "Tablet poderoso com chip M2 e tela Liquid Retina",
        currentPrice: 4999.99,
        originalPrice: 5499.99,
        image: "/placeholder.svg?height=250&width=280",
        badge: "Popular",
        category: "tablets"
    },
    {
        id: 5,
        title: "Apple Watch Ultra 2",
        description: "Smartwatch resistente para aventuras extremas",
        currentPrice: 6999.99,
        originalPrice: 7499.99,
        image: "/placeholder.svg?height=250&width=280",
        badge: "Novo",
        category: "wearables"
    },
    {
        id: 6,
        title: "Mac Studio M2",
        description: "Desktop profissional com performance excepcional",
        currentPrice: 12999.99,
        originalPrice: 14999.99,
        image: "/placeholder.svg?height=250&width=280",
        badge: "Pro",
        category: "desktops"
    }
];

const featuredProducts = products.slice(0, 4);

// Cart functionality
let cart = [];
let cartCount = 0;

// DOM elements
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartCountElement = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadFeaturedProducts();
    startCountdown();
    setupEventListeners();
});

// Load products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Load featured products
function loadFeaturedProducts() {
    const featuredGrid = document.getElementById('featuredGrid');
    featuredGrid.innerHTML = '';
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}">
            <div class="product-badge">${product.badge}</div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">
                <span class="current-price">R$ ${product.currentPrice.toFixed(2).replace('.', ',')}</span>
                <span class="original-price">R$ ${product.originalPrice.toFixed(2).replace('.', ',')}</span>
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho
            </button>
        </div>
    `;
    
    return card;
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        
        updateCartUI();
        showCartAnimation();
    }
}

// Update cart UI
function updateCartUI() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartCount;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">R$ ${item.currentPrice.toFixed(2).replace('.', ',')} x ${item.quantity}</div>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #ff4444; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2).replace('.', ',');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Show cart animation
function showCartAnimation() {
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

// Setup event listeners
function setupEventListeners() {
    // Cart modal
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });
    
    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
    
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // Mobile menu
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        alert(`Obrigado por se inscrever com o email: ${email}`);
        e.target.reset();
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Countdown timer
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    let hours = 23;
    let minutes = 59;
    let seconds = 45;
    
    setInterval(() => {
        seconds--;
        
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        
        if (minutes < 0) {
            minutes = 59;
            hours--;
        }
        
        if (hours < 0) {
            hours = 23;
            minutes = 59;
            seconds = 45;
        }
        
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        countdownElement.textContent = formattedTime;
    }, 1000);
}

// Search functionality
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #999;">Nenhum produto encontrado</p>';
    } else {
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});