const mockData = {
  artworks: [
    {
      id: '1', title: 'Cosmic Dreams', 
      artist: { name: 'Alex Rivers', avatar: 'https://picsum.photos/seed/alex/100/100', verified: true, id: 'a1' },
      price: { eth: 2.5, usd: 4500 },
      image: 'https://picsum.photos/seed/cosmic/400/400',
      category: 'Digital Art', likes: 120, views: 1500,
      description: 'A journey through the cosmic abstract. This artwork represents the infinite possibilities of the digital universe, blending vibrant colors with ethereal forms to create a mesmerizing visual experience.',
      reviews: [
        { user: 'CryptoKing', avatar: 'https://picsum.photos/seed/user1/50/50', rating: 5, comment: 'Absolutely breathtaking piece! The colors are mesmerizing.', date: '2024-01-15' },
        { user: 'ArtLover22', avatar: 'https://picsum.photos/seed/user2/50/50', rating: 4, comment: 'Beautiful work, truly unique vision.', date: '2024-01-10' },
        { user: 'NFTCollector', avatar: 'https://picsum.photos/seed/user3/50/50', rating: 5, comment: 'One of the best NFTs I have purchased. Amazing detail.', date: '2024-01-05' }
      ],
      createdAt: '2024-01-01', edition: '1/1',
      details: { dimensions: '4000x4000px', fileType: 'PNG', fileSize: '12.5 MB', blockchain: 'Ethereum', tokenStandard: 'ERC-721' }
    },
    {
      id: '2', title: 'Neon Nights',
      artist: { name: 'Sarah Jones', avatar: 'https://picsum.photos/seed/sarah/100/100', verified: true, id: 'a2' },
      price: { eth: 1.2, usd: 2160 },
      image: 'https://picsum.photos/seed/neon/400/400',
      category: 'Photography', likes: 85, views: 900,
      description: 'Cyberpunk city vibes captured in the neon-lit streets of Tokyo. Every pixel tells a story of urban nightlife and digital revolution.',
      reviews: [
        { user: 'PhotoFan', avatar: 'https://picsum.photos/seed/user4/50/50', rating: 5, comment: 'The neon colors are incredibly vibrant!', date: '2024-02-01' },
        { user: 'DigitalNomad', avatar: 'https://picsum.photos/seed/user5/50/50', rating: 4, comment: 'Great composition and mood.', date: '2024-01-28' }
      ],
      createdAt: '2024-01-15', edition: '1/10',
      details: { dimensions: '6000x4000px', fileType: 'JPEG', fileSize: '8.2 MB', blockchain: 'Ethereum', tokenStandard: 'ERC-1155' }
    },
    {
      id: '3', title: 'Pixel Samurai',
      artist: { name: 'Kenji Tanaka', avatar: 'https://picsum.photos/seed/kenji/100/100', verified: true, id: 'a3' },
      price: { eth: 0.8, usd: 1440 },
      image: 'https://picsum.photos/seed/samurai/400/400',
      category: 'Pixel Art', likes: 230, views: 3200,
      description: 'The legendary pixel warrior. A tribute to classic 16-bit era gaming with modern artistic sensibilities.',
      reviews: [
        { user: 'RetroGamer', avatar: 'https://picsum.photos/seed/user6/50/50', rating: 5, comment: 'Perfect pixel art! Takes me back to my childhood.', date: '2024-02-10' },
        { user: 'ArtCritic', avatar: 'https://picsum.photos/seed/user7/50/50', rating: 4, comment: 'Impressive technique and attention to detail.', date: '2024-02-05' },
        { user: 'PixelMaster', avatar: 'https://picsum.photos/seed/user8/50/50', rating: 5, comment: 'A masterpiece of pixel art.', date: '2024-01-30' },
        { user: 'GameDev', avatar: 'https://picsum.photos/seed/user9/50/50', rating: 4, comment: 'Would love to see more in this series!', date: '2024-01-25' }
      ],
      createdAt: '2024-01-20', edition: '1/100',
      details: { dimensions: '128x128px', fileType: 'PNG', fileSize: '0.5 MB', blockchain: 'Ethereum', tokenStandard: 'ERC-721' }
    },
    {
      id: '4', title: 'Abstract Void',
      artist: { name: 'Maya Chen', avatar: 'https://picsum.photos/seed/maya/100/100', verified: true, id: 'a4' },
      price: { eth: 3.0, usd: 5400 },
      image: 'https://picsum.photos/seed/void/400/400',
      category: '3D', likes: 310, views: 4500,
      description: 'Diving into the void of abstract space. A 3D masterpiece that challenges perception and invites viewers to lose themselves in its depth.',
      reviews: [
        { user: '3DArtFan', avatar: 'https://picsum.photos/seed/user10/50/50', rating: 5, comment: 'The depth in this piece is incredible!', date: '2024-02-15' },
        { user: 'VRExplorer', avatar: 'https://picsum.photos/seed/user11/50/50', rating: 5, comment: 'Would love to see this in VR.', date: '2024-02-12' }
      ],
      createdAt: '2024-02-01', edition: '1/1',
      details: { dimensions: '4K Render', fileType: 'PNG', fileSize: '18.3 MB', blockchain: 'Ethereum', tokenStandard: 'ERC-721' }
    },
    {
      id: '5', title: 'Ethereal Being',
      artist: { name: 'Alex Rivers', avatar: 'https://picsum.photos/seed/alex/100/100', verified: true, id: 'a1' },
      price: { eth: 1.5, usd: 2700 },
      image: 'https://picsum.photos/seed/ethereal/400/400',
      category: 'Illustration', likes: 150, views: 2000,
      description: 'A portrait of an ethereal being from another dimension. Inspired by dreams and cosmic consciousness.',
      reviews: [
        { user: 'DreamWalker', avatar: 'https://picsum.photos/seed/user12/50/50', rating: 5, comment: 'Truly otherworldly! Love every detail.', date: '2024-02-18' }
      ],
      createdAt: '2024-01-25', edition: '1/5',
      details: { dimensions: '3000x4000px', fileType: 'PNG', fileSize: '9.1 MB', blockchain: 'Ethereum', tokenStandard: 'ERC-721' }
    },
    {
      id: '6', title: 'Glitch Horizon',
      artist: { name: 'Zane Wolf', avatar: 'https://picsum.photos/seed/zane/100/100', verified: false, id: 'a5' },
      price: { eth: 0.5, usd: 900 },
      image: 'https://picsum.photos/seed/glitch/400/400',
      category: 'Digital Art', likes: 60, views: 800,
      description: 'A glitch in the system reveals the beauty behind the code. Data corruption as art form.',
      reviews: [
        { user: 'GlitchFan', avatar: 'https://picsum.photos/seed/user13/50/50', rating: 4, comment: 'Love the aesthetic!', date: '2024-03-01' }
      ],
      createdAt: '2024-02-05', edition: '1/50',
      details: { dimensions: '2000x2000px', fileType: 'GIF', fileSize: '4.7 MB', blockchain: 'Ethereum', tokenStandard: 'ERC-1155' }
    },
    {
      id: '7', title: 'Digital Garden',
      artist: { name: 'Luna Park', avatar: 'https://picsum.photos/seed/luna/100/100', verified: true, id: 'a6' },
      price: { eth: 1.8, usd: 3240 },
      image: 'https://picsum.photos/seed/garden/400/400',
      category: 'Illustration', likes: 195, views: 2800,
      description: 'A lush digital garden blooming with impossible flowers and luminescent butterflies. Nature reimagined through code.',
      reviews: [
        { user: 'NatureDigital', avatar: 'https://picsum.photos/seed/user14/50/50', rating: 5, comment: 'So peaceful and beautiful!', date: '2024-03-05' },
        { user: 'BotanyArt', avatar: 'https://picsum.photos/seed/user15/50/50', rating: 5, comment: 'The colors are sublime.', date: '2024-03-02' }
      ],
      createdAt: '2024-02-10', edition: '1/3',
      details: { dimensions: '5000x5000px', fileType: 'PNG', fileSize: '15.0 MB', blockchain: 'Ethereum', tokenStandard: 'ERC-721' }
    },
    {
      id: '8', title: 'Cyber Wolf',
      artist: { name: 'Kenji Tanaka', avatar: 'https://picsum.photos/seed/kenji/100/100', verified: true, id: 'a3' },
      price: { eth: 1.0, usd: 1800 },
      image: 'https://picsum.photos/seed/cyberwolf/400/400',
      category: 'Pixel Art', likes: 175, views: 2200,
      description: 'A cybernetic wolf prowling through neon-lit alleyways. Where nature meets technology.',
      reviews: [
        { user: 'WolfPack', avatar: 'https://picsum.photos/seed/user16/50/50', rating: 5, comment: 'My new profile pic!', date: '2024-03-10' },
        { user: 'PixelPerfect', avatar: 'https://picsum.photos/seed/user17/50/50', rating: 4, comment: 'Great work as always from Kenji!', date: '2024-03-08' }
      ],
      createdAt: '2024-02-15', edition: '1/25',
      details: { dimensions: '256x256px', fileType: 'PNG', fileSize: '1.2 MB', blockchain: 'Ethereum', tokenStandard: 'ERC-1155' }
    },
    {
      id: '9', title: 'Quantum Reef',
      artist: { name: 'Maya Chen', avatar: 'https://picsum.photos/seed/maya/100/100', verified: true, id: 'a4' },
      price: { eth: 4.2, usd: 7560 },
      image: 'https://picsum.photos/seed/reef/400/400',
      category: '3D', likes: 420, views: 5800,
      description: 'An underwater quantum coral reef where physics bends and reality distorts. Hyper-realistic 3D rendering.',
      reviews: [
        { user: 'OceanLover', avatar: 'https://picsum.photos/seed/user18/50/50', rating: 5, comment: 'Maya never disappoints. This is her best yet!', date: '2024-03-15' },
        { user: 'Collector99', avatar: 'https://picsum.photos/seed/user19/50/50', rating: 5, comment: 'Instant buy. The detail is insane.', date: '2024-03-12' },
        { user: 'ArtInvestor', avatar: 'https://picsum.photos/seed/user20/50/50', rating: 5, comment: 'This will be worth 10x in a year.', date: '2024-03-10' }
      ],
      createdAt: '2024-02-20', edition: '1/1',
      details: { dimensions: '8K Render', fileType: 'PNG', fileSize: '45.0 MB', blockchain: 'Ethereum', tokenStandard: 'ERC-721' }
    },
    {
      id: '10', title: 'Solar Flare',
      artist: { name: 'Sarah Jones', avatar: 'https://picsum.photos/seed/sarah/100/100', verified: true, id: 'a2' },
      price: { eth: 0.9, usd: 1620 },
      image: 'https://picsum.photos/seed/solar/400/400',
      category: 'Photography', likes: 95, views: 1100,
      description: 'A long-exposure photograph of a solar flare event, enhanced with digital art techniques for dramatic effect.',
      reviews: [
        { user: 'SpaceNerd', avatar: 'https://picsum.photos/seed/user21/50/50', rating: 4, comment: 'Amazing capture! Is this real?', date: '2024-03-18' }
      ],
      createdAt: '2024-02-25', edition: '1/20',
      details: { dimensions: '6000x4000px', fileType: 'JPEG', fileSize: '7.5 MB', blockchain: 'Ethereum', tokenStandard: 'ERC-1155' }
    },
    {
      id: '11', title: 'Mystic Portal',
      artist: { name: 'Luna Park', avatar: 'https://picsum.photos/seed/luna/100/100', verified: true, id: 'a6' },
      price: { eth: 2.2, usd: 3960 },
      image: 'https://picsum.photos/seed/portal/400/400',
      category: 'Digital Art', likes: 280, views: 3900,
      description: 'A gateway to another realm opens before your eyes. Step through and discover what lies beyond imagination.',
      reviews: [
        { user: 'PortalHunter', avatar: 'https://picsum.photos/seed/user22/50/50', rating: 5, comment: 'I feel like I can walk right through it!', date: '2024-03-20' },
        { user: 'DigitalDreamer', avatar: 'https://picsum.photos/seed/user23/50/50', rating: 5, comment: 'Luna is a genius. Period.', date: '2024-03-18' }
      ],
      createdAt: '2024-03-01', edition: '1/1',
      details: { dimensions: '4000x4000px', fileType: 'PNG', fileSize: '14.2 MB', blockchain: 'Ethereum', tokenStandard: 'ERC-721' }
    },
    {
      id: '12', title: 'Binary Sunset',
      artist: { name: 'Zane Wolf', avatar: 'https://picsum.photos/seed/zane/100/100', verified: false, id: 'a5' },
      price: { eth: 0.3, usd: 540 },
      image: 'https://picsum.photos/seed/sunset/400/400',
      category: 'Digital Art', likes: 45, views: 600,
      description: 'Two suns set over a digital landscape, painting the sky in binary code patterns.',
      reviews: [],
      createdAt: '2024-03-05', edition: '1/100',
      details: { dimensions: '3000x2000px', fileType: 'PNG', fileSize: '5.8 MB', blockchain: 'Ethereum', tokenStandard: 'ERC-1155' }
    }
  ],
  artists: [
    {
      id: 'a1', name: 'Alex Rivers', avatar: 'https://picsum.photos/seed/alex/100/100',
      cover: 'https://picsum.photos/seed/alexcover/1200/400',
      bio: 'Digital artist exploring cosmic themes and the boundaries between reality and imagination. My work is inspired by the infinite vastness of space and the mysteries of consciousness.',
      style: 'Abstract, Cosmic, Vibrant - My artistic approach combines fluid dynamics simulations with hand-painted digital elements to create otherworldly landscapes.',
      totalSales: 45, totalWorks: 12, featuredWorks: 3, followers: 12500, transactions: 150,
      joined: '2021-05-10', verified: true,
      social: { twitter: '@alexrivers', instagram: '@alexrivers_art' }
    },
    {
      id: 'a2', name: 'Sarah Jones', avatar: 'https://picsum.photos/seed/sarah/100/100',
      cover: 'https://picsum.photos/seed/sarahcover/1200/400',
      bio: 'Photographer and digital artist capturing the essence of urban nightlife and the beauty of technology in everyday life.',
      style: 'Cyberpunk, Dark, Neon - I blend traditional photography with digital post-processing to create moody, atmospheric scenes that tell stories of the city at night.',
      totalSales: 20, totalWorks: 8, featuredWorks: 2, followers: 8400, transactions: 65,
      joined: '2022-01-15', verified: true,
      social: { twitter: '@sarahjones', instagram: '@sarahjones_photo' }
    },
    {
      id: 'a3', name: 'Kenji Tanaka', avatar: 'https://picsum.photos/seed/kenji/100/100',
      cover: 'https://picsum.photos/seed/kenjicover/1200/400',
      bio: 'Pixel art veteran and game design enthusiast. Creating nostalgic yet modern pixel masterpieces since 2015.',
      style: 'Retro, Pixel, Anime-Inspired - Each pixel is placed with intention, drawing from classic 16-bit era aesthetics while pushing the boundaries of what pixel art can express.',
      totalSales: 120, totalWorks: 50, featuredWorks: 10, followers: 25000, transactions: 400,
      joined: '2020-11-20', verified: true,
      social: { twitter: '@kenjitanaka', instagram: '@kenji_pixels' }
    },
    {
      id: 'a4', name: 'Maya Chen', avatar: 'https://picsum.photos/seed/maya/100/100',
      cover: 'https://picsum.photos/seed/mayacover/1200/400',
      bio: '3D artist and visual effects specialist. Former VFX artist at a major studio, now creating independent digital art.',
      style: 'Hyperrealistic 3D, Abstract, Surreal - Using Cinema 4D and Houdini, I create hyper-detailed environments that blur the line between digital and physical reality.',
      totalSales: 78, totalWorks: 25, featuredWorks: 8, followers: 18900, transactions: 230,
      joined: '2021-08-03', verified: true,
      social: { twitter: '@mayachen3d', instagram: '@maya_3d_art' }
    },
    {
      id: 'a5', name: 'Zane Wolf', avatar: 'https://picsum.photos/seed/zane/100/100',
      cover: 'https://picsum.photos/seed/zanecover/1200/400',
      bio: 'Emerging glitch artist and digital provocateur. My work explores the beauty found in digital errors and data corruption.',
      style: 'Glitch, Experimental, Deconstructive - I intentionally corrupt digital files and data streams to reveal hidden patterns and create unique visual artifacts.',
      totalSales: 12, totalWorks: 15, featuredWorks: 1, followers: 2300, transactions: 35,
      joined: '2023-06-01', verified: false,
      social: { twitter: '@zanewolf', instagram: '@zane_glitch' }
    },
    {
      id: 'a6', name: 'Luna Park', avatar: 'https://picsum.photos/seed/luna/100/100',
      cover: 'https://picsum.photos/seed/lunacover/1200/400',
      bio: 'Digital illustrator and fantasy world builder. Creating enchanted realms where magic meets technology.',
      style: 'Fantasy, Luminescent, Ethereal - My illustrations are painted with light, using bioluminescent palettes and dreamlike compositions to transport viewers to magical worlds.',
      totalSales: 55, totalWorks: 20, featuredWorks: 5, followers: 15600, transactions: 180,
      joined: '2021-12-15', verified: true,
      social: { twitter: '@lunapark_art', instagram: '@lunapark_digital' }
    }
  ],
  categories: ['All', 'Digital Art', '3D', 'Photography', 'Illustration', 'Pixel Art'],
  promotions: [
    { id: 'p1', title: 'Summer NFT Festival', subtitle: 'Up to 30% off on selected collections', image: 'https://picsum.photos/seed/promo1/800/300', badge: 'Limited Time' },
    { id: 'p2', title: 'New Artist Spotlight', subtitle: 'Discover emerging talent this week', image: 'https://picsum.photos/seed/promo2/800/300', badge: 'Featured' }
  ]
};

const cartManager = {
  getCart: () => JSON.parse(localStorage.getItem('openart_cart')) || [],
  
  saveCart: (cart) => {
    localStorage.setItem('openart_cart', JSON.stringify(cart));
  },
  
  addToCart: (id) => {
    const cart = cartManager.getCart();
    const item = mockData.artworks.find(a => a.id === id);
    if (!item) return;
    
    const existingIndex = cart.findIndex(i => i.id === id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    
    cartManager.saveCart(cart);
    updateCartCount();
    showToast(`Added ${item.title} to cart`);
  },
  
  removeFromCart: (id) => {
    let cart = cartManager.getCart();
    cart = cart.filter(item => item.id !== id);
    cartManager.saveCart(cart);
    updateCartCount();
    if (window.location.hash === '#cart') app.router();
  },
  
  updateQuantity: (id, change) => {
    let cart = cartManager.getCart();
    const itemIndex = cart.findIndex(i => i.id === id);
    
    if (itemIndex > -1) {
      const newQuantity = cart[itemIndex].quantity + change;
      if (newQuantity > 0) {
        cart[itemIndex].quantity = newQuantity;
      } else {
        cart.splice(itemIndex, 1);
      }
      cartManager.saveCart(cart);
      updateCartCount();
      if (window.location.hash === '#cart') app.router();
    }
  },
  
  getCartTotal: () => {
    const cart = cartManager.getCart();
    return cart.reduce((total, item) => total + (item.price.eth * item.quantity), 0);
  },
  
  getCartCount: () => {
    const cart = cartManager.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },
  
  clearCart: () => {
    localStorage.removeItem('openart_cart');
    updateCartCount();
  }
};

const searchAndFilter = {
  currentFilters: {
    search: '',
    category: 'All',
    priceMin: 0,
    priceMax: 10,
    minRating: 0,
    sortBy: 'newest'
  },
  getFilteredArtworks: function() {
    let results = [...mockData.artworks];
    
    // Search filter
    if (this.currentFilters.search) {
      const term = this.currentFilters.search.toLowerCase();
      results = results.filter(a => 
        a.title.toLowerCase().includes(term) || 
        a.artist.name.toLowerCase().includes(term) ||
        a.category.toLowerCase().includes(term) ||
        a.description.toLowerCase().includes(term)
      );
    }
    
    // Category filter
    if (this.currentFilters.category !== 'All') {
      results = results.filter(a => a.category === this.currentFilters.category);
    }
    
    // Price range filter
    results = results.filter(a => 
      a.price.eth >= this.currentFilters.priceMin && 
      a.price.eth <= this.currentFilters.priceMax
    );
    
    // Rating filter
    if (this.currentFilters.minRating > 0) {
      results = results.filter(a => {
        const avgRating = a.reviews.length > 0 
          ? a.reviews.reduce((sum, r) => sum + r.rating, 0) / a.reviews.length 
          : 0;
        return avgRating >= this.currentFilters.minRating;
      });
    }
    
    // Sort
    switch(this.currentFilters.sortBy) {
      case 'price-low': results.sort((a, b) => a.price.eth - b.price.eth); break;
      case 'price-high': results.sort((a, b) => b.price.eth - a.price.eth); break;
      case 'popular': results.sort((a, b) => b.likes - a.likes); break;
      case 'newest': results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
    }
    
    return results;
  },
  updateFilter: function(key, value) {
    this.currentFilters[key] = value;
    // Re-render explore page results
    const grid = document.getElementById('explore-results');
    if (grid) {
      const results = this.getFilteredArtworks();
      const countEl = document.getElementById('results-count');
      if (countEl) countEl.textContent = `${results.length} items`;
      grid.innerHTML = results.length > 0 
        ? results.map(art => renderArtCard(art)).join('')
        : '<div class="col-span-full text-center py-20"><p class="text-gray-400 text-lg">No artworks match your filters</p></div>';
      if(window.lucide) lucide.createIcons();
    }
  }
};

const utils = {
  formatPrice: (val) => Number(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  formatDate: (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  truncateText: (text, length) => text.length > length ? text.substring(0, length) + '...' : text,
  getAverageRating: (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  },
  generateStarRating: (rating) => {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars += '<i data-lucide="star" class="w-4 h-4 fill-yellow-400 text-yellow-400 inline-block"></i>';
      } else if (i - 0.5 <= rating) {
        stars += '<i data-lucide="star-half" class="w-4 h-4 fill-yellow-400 text-yellow-400 inline-block"></i>';
      } else {
        stars += '<i data-lucide="star" class="w-4 h-4 text-gray-600 inline-block"></i>';
      }
    }
    return stars;
  }
};

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function updateCartCount() {
  const count = cartManager.getCartCount();
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(badge => {
    if (count > 0) {
      badge.textContent = count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

const app = {
  init: () => {
    document.getElementById('app').innerHTML = `
      <div id="header"></div>
      <main id="main-content" class="min-h-screen"></main>
      <div id="footer"></div>
    `;
    document.getElementById('header').innerHTML = renderHeader();
    document.getElementById('footer').innerHTML = renderFooter();
    
    window.addEventListener('hashchange', app.router);
    app.router();
    
    // Global event delegation
    document.body.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.add-to-cart-btn');
      if (addBtn) {
        e.preventDefault();
        const id = addBtn.dataset.id;
        cartManager.addToCart(id);
      }
    });
    
    if(window.lucide) lucide.createIcons();
    updateCartCount();
  },
  router: () => {
    const hash = window.location.hash || '#home';
    const parts = hash.split('/');
    const route = parts[0];
    const id = parts[1];
    
    const main = document.getElementById('main-content');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('text-white', link.getAttribute('href') === route || (route === '#home' && link.getAttribute('href') === '#home'));
      link.classList.toggle('text-gray-300', link.getAttribute('href') !== route);
    });
    
    switch (route) {
      case '#home': main.innerHTML = renderHomePage(); break;
      case '#explore': main.innerHTML = renderExplorePage(); break;
      case '#product': main.innerHTML = renderProductPage(id); break;
      case '#cart': main.innerHTML = renderCartPage(); break;
      case '#checkout': main.innerHTML = renderCheckoutPage(); break;
      case '#confirmation': main.innerHTML = renderConfirmationPage(); break;
      case '#artist': main.innerHTML = renderArtistPage(id); break;
      default: main.innerHTML = renderHomePage();
    }
    
    if(window.lucide) lucide.createIcons();
    updateCartCount();
    
    // Initialize explore page filters if on explore page
    if (route === '#explore') {
      initExploreFilters();
    }
  }
};

function initExploreFilters() {
  // Category filter buttons
  document.querySelectorAll('.category-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-filter-btn').forEach(b => {
        b.classList.remove('bg-[#7B61FF]', 'text-white');
        b.classList.add('bg-[#1A1A3E]', 'text-gray-300');
      });
      btn.classList.add('bg-[#7B61FF]', 'text-white');
      btn.classList.remove('bg-[#1A1A3E]', 'text-gray-300');
      searchAndFilter.updateFilter('category', btn.dataset.category);
    });
  });
  
  // Price range slider
  const priceSlider = document.getElementById('price-range');
  if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      document.getElementById('price-max-label').textContent = `${e.target.value} ETH`;
      searchAndFilter.updateFilter('priceMax', parseFloat(e.target.value));
    });
  }
  
  // Rating filter
  document.querySelectorAll('.rating-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rating-filter-btn').forEach(b => b.classList.remove('border-[#7B61FF]'));
      btn.classList.add('border-[#7B61FF]');
      searchAndFilter.updateFilter('minRating', parseInt(btn.dataset.rating));
    });
  });
  
  // Sort dropdown
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      searchAndFilter.updateFilter('sortBy', e.target.value);
    });
  }
  
  // Search input
  const searchInput = document.getElementById('explore-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchAndFilter.updateFilter('search', e.target.value);
    });
  }
}

document.addEventListener('DOMContentLoaded', app.init);
