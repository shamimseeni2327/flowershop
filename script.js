/* ============================================================
   BLOOMÉ — Luxury Flowers & Gifts
   Vanilla JavaScript Interactions
   ============================================================ */

(function () {
  'use strict';

  /* -------------------- Product Data -------------------- */
  const products = [
    {
      id: 1,
      name: 'The Eternal Rose',
      price: 2499,
      rating: 4.9,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
      description: 'A single, perfectly preserved rose in a hand-blown glass dome. Timeless elegance that lasts for years — a symbol of enduring love.',
      category: 'roses',
      tags: ['rose', 'eternal', 'preserved', 'romantic']
    },
    {
      id: 2,
      name: 'Blush Garden',
      price: 3299,
      rating: 4.8,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=80',
      description: 'Soft blush peonies, garden roses and delicate eucalyptus. A romantic arrangement that whispers quiet beauty.',
      category: 'garden',
      tags: ['blush', 'peony', 'garden', 'romantic', 'pink']
    },
    {
      id: 3,
      name: 'Midnight Bloom',
      price: 4199,
      rating: 5.0,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1455659817273-f96807726504?w=600&q=80',
      description: 'Deep burgundy roses, black calla lilies and dark foliage. Dramatic and sophisticated — for moments that demand intensity.',
      category: 'luxury',
      tags: ['midnight', 'burgundy', 'dramatic', 'luxury', 'dark']
    },
    {
      id: 4,
      name: 'Golden Peony',
      price: 3799,
      rating: 4.9,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1525310072745-f81672f6681c?w=600&q=80',
      description: 'Lush golden peonies paired with cream roses and champagne-toned foliage. Radiant warmth in every petal.',
      category: 'peonies',
      tags: ['peony', 'golden', 'luxury', 'celebration']
    },
    {
      id: 5,
      name: 'Wildflower Story',
      price: 2899,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=80',
      description: 'A free-spirited mix of seasonal wildflowers, meadow grasses and soft pastels. Natural beauty, unconstrained.',
      category: 'wild',
      tags: ['wildflower', 'seasonal', 'natural', 'organic']
    },
    {
      id: 6,
      name: 'Rose & Lily Symphony',
      price: 3999,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80',
      description: 'Classic white roses and fragrant oriental lilies in perfect harmony. An arrangement of pure, refined elegance.',
      category: 'classic',
      tags: ['rose', 'lily', 'white', 'classic', 'elegant']
    }
  ];

  /* -------------------- State -------------------- */
  let cart = JSON.parse(localStorage.getItem('bloome_cart')) || [];
  let wishlist = JSON.parse(localStorage.getItem('bloome_wishlist')) || [];
  let currentModalProduct = null;
  let modalQty = 1;
  let testimonialIndex = 0;
  let testimonialInterval = null;

  /* -------------------- DOM References -------------------- */
  const preloader = document.getElementById('preloader');
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const cartBtn = document.getElementById('cartBtn');
  const cartPanel = document.getElementById('cartPanel');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const wishlistBtn = document.getElementById('wishlistBtn');
  const wishlistCount = document.getElementById('wishlistCount');
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notificationText');
  const backToTop = document.getElementById('backToTop');
  const productsGrid = document.getElementById('productsGrid');
  const modalOverlay = document.getElementById('modalOverlay');
  const productModal = document.getElementById('productModal');
  const modalClose = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');
  const modalRating = document.getElementById('modalRating');
  const modalAddBtn = document.getElementById('modalAddBtn');
  const qtyValue = document.getElementById('qtyValue');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const builderPrice = document.getElementById('builderPrice');
  const builderSelection = document.getElementById('builderSelection');
  const addCustomBtn = document.getElementById('addCustomBtn');
  const testimonialsTrack = document.getElementById('testimonialsTrack');
  const testimonialPrev = document.getElementById('testimonialPrev');
  const testimonialNext = document.getElementById('testimonialNext');
  const testimonialDots = document.getElementById('testimonialDots');
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterMessage = document.getElementById('newsletterMessage');
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
  const hero = document.querySelector('.hero');

  /* -------------------- Utility -------------------- */
  function formatPrice(n) {
    return '₹' + n.toLocaleString('en-IN');
  }

  function saveCart() {
    localStorage.setItem('bloome_cart', JSON.stringify(cart));
  }

  function saveWishlist() {
    localStorage.setItem('bloome_wishlist', JSON.stringify(wishlist));
  }

  function showNotification(text) {
    notificationText.textContent = text;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 2800);
  }

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalItems;
    cartCount.classList.toggle('visible', totalItems > 0);

    if (cart.length === 0) {
      cartItems.innerHTML = '<div class="cart-empty"><p>Your bag is empty</p><p style="font-size:0.85rem;margin-top:0.5rem;opacity:0.7">Discover our collections</p></div>';
      cartSubtotal.textContent = formatPrice(0);
      return;
    }

    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="cart-item-price">${formatPrice(item.price)}</p>
          <div class="cart-item-qty">
            <button class="cart-qty-minus" data-id="${item.id}" aria-label="Decrease">−</button>
            <span>${item.qty}</span>
            <button class="cart-qty-plus" data-id="${item.id}" aria-label="Increase">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    cartSubtotal.textContent = formatPrice(subtotal);

    // Bind cart item events
    cartItems.querySelectorAll('.cart-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => updateCartQty(+btn.dataset.id, -1));
    });
    cartItems.querySelectorAll('.cart-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => updateCartQty(+btn.dataset.id, 1));
    });
    cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(+btn.dataset.id));
    });
  }

  function updateWishlistUI() {
    wishlistCount.textContent = wishlist.length;
    wishlistCount.classList.toggle('visible', wishlist.length > 0);
  }

  function addToCart(product, qty = 1) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty
      });
    }
    saveCart();
    updateCartUI();
    showNotification('Added to your bag ✨');
  }

  function updateCartQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    saveCart();
    updateCartUI();
  }

  function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartUI();
    showNotification('Removed from bag');
  }

  function toggleWishlist(id) {
    const idx = wishlist.indexOf(id);
    if (idx === -1) {
      wishlist.push(id);
      showNotification('Added to wishlist ❤️');
    } else {
      wishlist.splice(idx, 1);
      showNotification('Removed from wishlist');
    }
    saveWishlist();
    updateWishlistUI();
    renderProducts();
  }

  /* -------------------- Render Products -------------------- */
  function renderProducts() {
    productsGrid.innerHTML = products.map(p => {
      const inWishlist = wishlist.includes(p.id);
      const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '');
      return `
        <article class="product-card reveal" data-id="${p.id}">
          <div class="product-image">
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            <button class="product-wishlist ${inWishlist ? 'active' : ''}" data-id="${p.id}" aria-label="Add to wishlist">
              <i class="fa-${inWishlist ? 'solid' : 'regular'} fa-heart"></i>
            </button>
            <div class="product-quick">
              <button class="btn quick-view-btn" data-id="${p.id}">Quick View</button>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-name">${p.name}</h3>
            <div class="product-rating">
              <span>${stars}</span>
              <span>(${p.reviews})</span>
            </div>
            <p class="product-price">${formatPrice(p.price)}</p>
            <button class="product-add" data-id="${p.id}">Add to Bag</button>
          </div>
        </article>
      `;
    }).join('');

    // Bind events
    productsGrid.querySelectorAll('.product-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(+btn.dataset.id);
      });
    });

    productsGrid.querySelectorAll('.product-add').forEach(btn => {
      btn.addEventListener('click', () => {
        const product = products.find(p => p.id === +btn.dataset.id);
        if (!product) return;
        btn.classList.add('adding');
        setTimeout(() => {
          btn.classList.remove('adding');
          addToCart(product);
        }, 400);
      });
    });

    productsGrid.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(+btn.dataset.id);
      });
    });

    productsGrid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        openModal(+card.dataset.id);
      });
    });

    // Re-observe for scroll reveal
    observeReveals();
  }

  /* -------------------- Modal -------------------- */
  function openModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    currentModalProduct = product;
    modalQty = 1;
    qtyValue.textContent = '1';

    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalTitle.textContent = product.name;
    modalPrice.textContent = formatPrice(product.price);
    modalDesc.textContent = product.description;
    modalRating.innerHTML = '★'.repeat(Math.floor(product.rating)) +
      ` <span style="color:var(--color-soft-charcoal)">(${product.reviews} reviews)</span>`;

    modalOverlay.classList.add('open');
    productModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    productModal.classList.remove('open');
    document.body.style.overflow = '';
    currentModalProduct = null;
  }

  /* -------------------- Bouquet Builder -------------------- */
  const builderState = {
    flower: { value: 'roses', price: 0, label: 'Roses' },
    color: { value: 'white', price: 0, label: 'White' },
    size: { value: 'classic', price: 0, label: 'Classic' },
    wrapping: { value: 'ivory', price: 0, label: 'Ivory' }
  };

  const BASE_PRICE = 2999;

  function updateBuilder() {
    const total = BASE_PRICE +
      builderState.flower.price +
      builderState.color.price +
      builderState.size.price +
      builderState.wrapping.price;

    builderPrice.textContent = formatPrice(total);
    builderSelection.innerHTML = `<li>${builderState.flower.label} · ${builderState.color.label} · ${builderState.size.label} · ${builderState.wrapping.label}</li>`;
  }

  function initBuilder() {
    document.querySelectorAll('.option-pills').forEach(group => {
      const groupName = group.dataset.group;
      group.querySelectorAll('.option-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          group.querySelectorAll('.option-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          builderState[groupName] = {
            value: pill.dataset.value,
            price: +pill.dataset.price,
            label: pill.textContent.trim()
          };
          updateBuilder();
        });
      });
    });

    addCustomBtn.addEventListener('click', () => {
      const total = BASE_PRICE +
        builderState.flower.price +
        builderState.color.price +
        builderState.size.price +
        builderState.wrapping.price;

      const customProduct = {
        id: Date.now(),
        name: `Custom ${builderState.flower.label} Bouquet`,
        price: total,
        image: document.getElementById('builderImage').src,
        qty: 1
      };

      const existing = cart.find(i => i.name === customProduct.name && i.price === customProduct.price);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push(customProduct);
      }
      saveCart();
      updateCartUI();
      showNotification('Custom bouquet added ✨');
      openCart();
    });
  }

  /* -------------------- Testimonials -------------------- */
  function initTestimonials() {
    const slides = testimonialsTrack.querySelectorAll('.testimonial-slide');
    const total = slides.length;

    // Create dots
    testimonialDots.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
      dot.addEventListener('click', () => goToTestimonial(i));
      testimonialDots.appendChild(dot);
    }

    function goToTestimonial(index) {
      slides[testimonialIndex].classList.remove('active');
      testimonialDots.children[testimonialIndex].classList.remove('active');
      testimonialIndex = (index + total) % total;
      slides[testimonialIndex].classList.add('active');
      testimonialDots.children[testimonialIndex].classList.add('active');
    }

    testimonialPrev.addEventListener('click', () => goToTestimonial(testimonialIndex - 1));
    testimonialNext.addEventListener('click', () => goToTestimonial(testimonialIndex + 1));

    // Auto-play
    function startAutoplay() {
      testimonialInterval = setInterval(() => goToTestimonial(testimonialIndex + 1), 5000);
    }

    function stopAutoplay() {
      clearInterval(testimonialInterval);
    }

    testimonialsTrack.addEventListener('mouseenter', stopAutoplay);
    testimonialsTrack.addEventListener('mouseleave', startAutoplay);
    startAutoplay();
  }

  /* -------------------- Search -------------------- */
  function initSearch() {
    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('open');
      setTimeout(() => searchInput.focus(), 100);
      document.body.style.overflow = 'hidden';
    });

    searchClose.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) closeSearch();
    });

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
      }

      const results = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.tags.some(t => t.includes(query)) ||
        p.description.toLowerCase().includes(query)
      );

      if (results.length === 0) {
        searchResults.innerHTML = '<p style="padding:1rem 0;color:var(--color-soft-charcoal)">No flowers found. Try “rose”, “peony” or “garden”.</p>';
        return;
      }

      searchResults.innerHTML = results.map(p => `
        <div class="search-result-item" data-id="${p.id}">
          <img src="${p.image}" alt="${p.name}">
          <div class="search-result-info">
            <h4>${p.name}</h4>
            <p>${formatPrice(p.price)}</p>
          </div>
        </div>
      `).join('');

      searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          closeSearch();
          openModal(+item.dataset.id);
        });
      });
    });
  }

  function closeSearch() {
    searchOverlay.classList.remove('open');
    searchInput.value = '';
    searchResults.innerHTML = '';
    document.body.style.overflow = '';
  }

  /* -------------------- Cart Panel -------------------- */
  function openCart() {
    cartPanel.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartPanel.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* -------------------- Navigation -------------------- */
  function initNav() {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Sticky header
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Back to top
      if (scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }

      lastScroll = scrollY;
    }, { passive: true });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY + 120;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
          if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    }, { passive: true });
  }

  /* -------------------- Scroll Reveal -------------------- */
  function observeReveals() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      observer.observe(el);
    });
  }

  /* -------------------- Custom Cursor -------------------- */
  function initCursor() {
    if (window.matchMedia('(max-width: 1024px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      cursor.classList.add('active');
      cursorFollower.classList.add('active');
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    const hoverTargets = 'a, button, .product-card, .collection-card, .occasion-card, .gallery-item, .option-pill';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
    });
  }

  /* -------------------- Parallax (subtle) -------------------- */
  function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroImg = document.querySelector('.hero-image');
    if (!heroImg) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImg.style.transform = `scale(1.08) translateY(${scrolled * 0.15}px)`;
      }
    }, { passive: true });
  }

  /* -------------------- Newsletter -------------------- */
  function initNewsletter() {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newsletterMessage.textContent = 'Please enter a valid email address.';
        newsletterMessage.style.color = '#e8a0a0';
        return;
      }
      newsletterMessage.textContent = 'Welcome to the bloom ✨ You’re subscribed.';
      newsletterMessage.style.color = 'var(--color-champagne)';
      newsletterEmail.value = '';
      setTimeout(() => {
        newsletterMessage.textContent = '';
      }, 4000);
    });
  }

  /* -------------------- Preloader & Hero -------------------- */
  function initPreloader() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
          preloader.style.display = 'none';
          if (hero) hero.classList.add('loaded');
        }, 600);
      }, 1800);
    });

    // Fallback if load already fired
    if (document.readyState === 'complete') {
      setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
          preloader.style.display = 'none';
          if (hero) hero.classList.add('loaded');
        }, 600);
      }, 1800);
    }
  }

  /* -------------------- Event Bindings -------------------- */
  function bindEvents() {
    cartBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    qtyMinus.addEventListener('click', () => {
      if (modalQty > 1) {
        modalQty--;
        qtyValue.textContent = modalQty;
      }
    });

    qtyPlus.addEventListener('click', () => {
      modalQty++;
      qtyValue.textContent = modalQty;
    });

    modalAddBtn.addEventListener('click', () => {
      if (currentModalProduct) {
        addToCart(currentModalProduct, modalQty);
        closeModal();
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Checkout placeholder
    document.getElementById('checkoutBtn').addEventListener('click', () => {
      if (cart.length === 0) {
        showNotification('Your bag is empty');
        return;
      }
      showNotification('Proceeding to checkout…');
      setTimeout(closeCart, 800);
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSearch();
        closeCart();
        closeModal();
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* -------------------- Init -------------------- */
  function init() {
    initPreloader();
    renderProducts();
    updateCartUI();
    updateWishlistUI();
    initNav();
    initSearch();
    initBuilder();
    initTestimonials();
    initNewsletter();
    initCursor();
    initParallax();
    bindEvents();
    observeReveals();
    updateBuilder();
  }

  // Run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();