const renderHomePage = () => {
  const trendingArt = [...mockData.artworks].sort((a, b) => b.likes - a.likes).slice(0, 4);
  const newArrivals = [...mockData.artworks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
  const topArtists = [...mockData.artists].sort((a, b) => b.totalSales - a.totalSales).slice(0, 6);

  return `
  <div class="container mx-auto px-4">
    <!-- Hero Section with featured artwork -->
    <section class="py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
      <div class="flex-1 animate-slide-up">
        <h1 class="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Discover, collect, and sell <span class="text-gradient">extraordinary NFTs</span>
        </h1>
        <p class="text-lg text-gray-400 mb-8 max-w-lg">
          OpenArt is the world's premier marketplace for digital art. Explore unique pieces from talented creators worldwide.
        </p>
        <div class="flex gap-4 flex-wrap">
          <a href="#explore" class="bg-gradient text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition">Explore</a>
          <a href="#" class="bg-[#1A1A3E] border border-[#374151] text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-[#252547] transition">Create</a>
        </div>
        <div class="flex gap-12 mt-10">
          <div><p class="text-3xl font-bold text-white">200K+</p><p class="text-gray-400 text-sm">Collections</p></div>
          <div><p class="text-3xl font-bold text-white">10K+</p><p class="text-gray-400 text-sm">Artists</p></div>
          <div><p class="text-3xl font-bold text-white">423K+</p><p class="text-gray-400 text-sm">Community</p></div>
        </div>
      </div>
      <div class="flex-1 w-full animate-fade-in">
        <div class="relative">
          <img src="https://picsum.photos/seed/hero/600/600" alt="Featured NFT" class="w-full rounded-2xl shadow-2xl border border-[#374151]">
          <div class="absolute bottom-4 left-4 right-4 glass-effect rounded-xl p-4">
            <div class="flex justify-between items-center">
              <div>
                <p class="text-sm text-gray-300">Featured Artwork</p>
                <p class="text-lg font-bold text-white">Quantum Reef</p>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-300">Current Bid</p>
                <p class="text-lg font-bold text-[#7B61FF]">4.2 ETH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Promotions Banner -->
    <section class="py-8">
      <div class="relative rounded-2xl overflow-hidden border border-[#374151]">
        <img src="https://picsum.photos/seed/promo1/1200/300" alt="Promotion" class="w-full h-48 md:h-64 object-cover">
        <div class="absolute inset-0 bg-gradient-to-r from-[#0D0D2B]/90 to-transparent flex items-center">
          <div class="p-8 md:p-12">
            <span class="bg-[#7B61FF] text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">Limited Time</span>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">Summer NFT Festival</h2>
            <p class="text-gray-300 mb-4">Up to 30% off on selected collections</p>
            <a href="#explore" class="bg-white text-[#0D0D2B] px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition">Shop Now</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Trending Now -->
    <section class="py-12">
      <div class="flex justify-between items-end mb-8">
        <div>
          <h2 class="text-3xl font-bold text-white">🔥 Trending Now</h2>
          <p class="text-gray-400 mt-1">The most popular NFTs this week</p>
        </div>
        <a href="#explore" class="text-[#7B61FF] hover:text-white transition flex items-center gap-2 font-medium">View all <i data-lucide="arrow-right" class="w-4 h-4"></i></a>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        ${trendingArt.map(art => renderArtCard(art)).join('')}
      </div>
    </section>

    <!-- Recent Purchases (simulated) -->
    <section class="py-12">
      <div class="flex justify-between items-end mb-8">
        <div>
          <h2 class="text-3xl font-bold text-white">🕐 Recent Purchases</h2>
          <p class="text-gray-400 mt-1">Recently acquired by collectors</p>
        </div>
      </div>
      <div class="overflow-x-auto pb-4">
        <div class="flex gap-6" style="min-width: max-content;">
          ${mockData.artworks.slice(2, 8).map(art => `
            <div class="w-64 flex-shrink-0 nft-card">
              <a href="#product/${art.id}">
                <img src="${art.image}" alt="${art.title}" class="w-full h-48 object-cover">
              </a>
              <div class="p-4">
                <h4 class="font-bold text-white truncate">${art.title}</h4>
                <p class="text-sm text-gray-400">Bought by <span class="text-[#7B61FF]">@collector${art.id}</span></p>
                <p class="text-sm font-medium text-white mt-1">${art.price.eth} ETH</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="py-12">
      <div class="flex justify-between items-end mb-8">
        <div>
          <h2 class="text-3xl font-bold text-white">✨ New Arrivals</h2>
          <p class="text-gray-400 mt-1">Fresh artworks just listed</p>
        </div>
        <a href="#explore" class="text-[#7B61FF] hover:text-white transition flex items-center gap-2 font-medium">View all <i data-lucide="arrow-right" class="w-4 h-4"></i></a>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        ${newArrivals.map(art => renderArtCard(art)).join('')}
      </div>
    </section>

    <!-- Top Artists -->
    <section class="py-12">
      <div class="flex justify-between items-end mb-8">
        <div>
          <h2 class="text-3xl font-bold text-white">⭐ Top Artists</h2>
          <p class="text-gray-400 mt-1">The most acclaimed creators on the platform</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        ${topArtists.map((artist, index) => `
          <a href="#artist/${artist.id}" class="bg-[#1A1A3E] border border-[#374151] rounded-xl p-6 flex items-center gap-4 hover:border-[#7B61FF] transition group">
            <div class="text-2xl font-bold text-gray-600 w-8">${index + 1}</div>
            <img src="${artist.avatar}" alt="${artist.name}" class="w-14 h-14 rounded-full object-cover">
            <div class="flex-1">
              <h4 class="font-bold text-white group-hover:text-[#7B61FF] transition flex items-center gap-1">
                ${artist.name}
                ${artist.verified ? '<i data-lucide="check-circle" class="w-4 h-4 text-blue-500"></i>' : ''}
              </h4>
              <p class="text-sm text-gray-400">${artist.totalSales} sales · ${artist.followers.toLocaleString()} followers</p>
            </div>
          </a>
        `).join('')}
      </div>
    </section>
  </div>
  `;
};

const renderExplorePage = () => {
  const results = searchAndFilter.getFilteredArtworks();
  
  return `
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-white mb-2">Explore Collections</h1>
    <p class="text-gray-400 mb-8">Discover unique digital artworks from talented creators</p>
    
    <!-- Search Bar -->
    <div class="relative mb-8">
      <i data-lucide="search" class="absolute left-4 top-3.5 text-gray-400 w-5 h-5"></i>
      <input id="explore-search" type="text" placeholder="Search by title, artist, or category..." 
        class="w-full bg-[#1A1A3E] border border-[#374151] rounded-xl py-3 px-12 text-white focus:outline-none focus:border-[#7B61FF] text-lg">
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar Filters -->
      <div class="w-full lg:w-72 space-y-6 flex-shrink-0">
        <!-- Categories -->
        <div class="bg-[#1A1A3E] p-5 rounded-xl border border-[#374151]">
          <h3 class="font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="grid-3x3" class="w-4 h-4"></i> Categories</h3>
          <div class="flex flex-wrap gap-2">
            ${mockData.categories.map(cat => `
              <button class="category-filter-btn px-4 py-2 rounded-full text-sm font-medium border border-[#374151] transition ${cat === 'All' ? 'bg-[#7B61FF] text-white' : 'bg-[#1A1A3E] text-gray-300 hover:border-[#7B61FF]'}" data-category="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>
        
        <!-- Price Range -->
        <div class="bg-[#1A1A3E] p-5 rounded-xl border border-[#374151]">
          <h3 class="font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="tag" class="w-4 h-4"></i> Price Range</h3>
          <div class="flex justify-between text-sm text-gray-400 mb-2">
            <span>0 ETH</span>
            <span id="price-max-label">10 ETH</span>
          </div>
          <input id="price-range" type="range" min="0" max="10" step="0.1" value="10" class="w-full">
        </div>
        
        <!-- Rating Filter -->
        <div class="bg-[#1A1A3E] p-5 rounded-xl border border-[#374151]">
          <h3 class="font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="star" class="w-4 h-4"></i> Minimum Rating</h3>
          <div class="space-y-2">
            ${[0, 3, 4, 5].map(r => `
              <button class="rating-filter-btn w-full text-left px-3 py-2 rounded-lg border border-[#374151] text-gray-300 hover:border-[#7B61FF] transition text-sm ${r === 0 ? 'border-[#7B61FF]' : ''}" data-rating="${r}">
                ${r === 0 ? 'All Ratings' : `${r}+ Stars`}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
      
      <!-- Results -->
      <div class="flex-1">
        <div class="flex justify-between items-center mb-6">
          <p id="results-count" class="text-gray-400">${results.length} items</p>
          <select id="sort-select" class="bg-[#1A1A3E] border border-[#374151] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#7B61FF]">
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
        <div id="explore-results" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          ${results.map(art => renderArtCard(art)).join('')}
        </div>
      </div>
    </div>
  </div>
  `;
};

const renderProductPage = (id) => {
  const artwork = mockData.artworks.find(a => a.id === id);
  if (!artwork) return '<div class="text-center text-white py-20"><h2 class="text-2xl">Product not found</h2><a href="#explore" class="text-[#7B61FF]">Back to explore</a></div>';
  
  const avgRating = utils.getAverageRating(artwork.reviews);
  const relatedArtworks = mockData.artworks.filter(a => a.category === artwork.category && a.id !== artwork.id).slice(0, 4);

  return `
  <div class="container mx-auto px-4 py-8 animate-fade-in">
    <!-- Breadcrumb -->
    <nav class="mb-8 text-sm">
      <a href="#home" class="text-gray-400 hover:text-white">Home</a>
      <span class="text-gray-600 mx-2">/</span>
      <a href="#explore" class="text-gray-400 hover:text-white">Explore</a>
      <span class="text-gray-600 mx-2">/</span>
      <span class="text-[#7B61FF]">${artwork.title}</span>
    </nav>

    <div class="flex flex-col lg:flex-row gap-12">
      <!-- Image -->
      <div class="w-full lg:w-1/2">
        <div class="sticky top-24">
          <img src="${artwork.image}" alt="${artwork.title}" class="w-full rounded-2xl border border-[#374151] shadow-xl">
          <div class="flex gap-4 mt-4">
            <div class="flex items-center gap-2 text-gray-400 text-sm">
              <i data-lucide="eye" class="w-4 h-4"></i> ${artwork.views.toLocaleString()} views
            </div>
            <div class="flex items-center gap-2 text-gray-400 text-sm">
              <i data-lucide="heart" class="w-4 h-4"></i> ${artwork.likes} likes
            </div>
          </div>
        </div>
      </div>
      
      <!-- Info -->
      <div class="w-full lg:w-1/2 space-y-6">
        <div class="inline-block px-3 py-1 bg-[#1A1A3E] border border-[#374151] rounded-full text-sm text-[#7B61FF]">${artwork.category}</div>
        <h1 class="text-4xl font-bold text-white">${artwork.title}</h1>
        <p class="text-sm text-gray-400">Edition: ${artwork.edition} · Created ${utils.formatDate(artwork.createdAt)}</p>
        
        <!-- Creator info -->
        <a href="#artist/${artwork.artist.id}" class="flex items-center gap-4 py-4 px-4 bg-[#1A1A3E] rounded-xl border border-[#374151] hover:border-[#7B61FF] transition">
          <img src="${artwork.artist.avatar}" class="w-12 h-12 rounded-full">
          <div>
            <p class="text-sm text-gray-400">Creator</p>
            <p class="text-lg font-bold text-white flex items-center gap-1">
              ${artwork.artist.name}
              ${artwork.artist.verified ? '<i data-lucide="check-circle" class="w-4 h-4 text-blue-500"></i>' : ''}
            </p>
          </div>
        </a>
        
        <!-- Price and Buy -->
        <div class="bg-[#1A1A3E] p-6 rounded-xl border border-[#374151]">
          <p class="text-sm text-gray-400 mb-2">Current Price</p>
          <div class="flex items-end gap-3 mb-6">
            <span class="text-4xl font-bold text-white">${artwork.price.eth} ETH</span>
            <span class="text-gray-400 mb-1">~\\$${utils.formatPrice(artwork.price.usd)}</span>
          </div>
          <div class="flex gap-3">
            <button class="flex-1 add-to-cart-btn bg-gradient text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition flex justify-center items-center gap-2" data-id="${artwork.id}">
              <i data-lucide="shopping-cart" class="w-5 h-5"></i> Add to Cart
            </button>
            <button class="px-4 py-4 bg-[#252547] border border-[#374151] rounded-xl text-gray-300 hover:text-red-500 hover:border-red-500 transition">
              <i data-lucide="heart" class="w-5 h-5"></i>
            </button>
          </div>
        </div>

        <!-- Tabs: Description / Details / Reviews -->
        <div class="border-b border-[#374151]">
          <div class="flex gap-8">
            <button onclick="switchTab('description')" class="tab-btn pb-3 text-white font-medium border-b-2 border-[#7B61FF]" data-tab="description">Description</button>
            <button onclick="switchTab('details')" class="tab-btn pb-3 text-gray-400 font-medium border-b-2 border-transparent hover:text-white" data-tab="details">Details</button>
            <button onclick="switchTab('reviews')" class="tab-btn pb-3 text-gray-400 font-medium border-b-2 border-transparent hover:text-white" data-tab="reviews">Reviews (${artwork.reviews.length})</button>
          </div>
        </div>
        
        <!-- Tab Content: Description -->
        <div id="tab-description" class="tab-content">
          <p class="text-gray-300 leading-relaxed">${artwork.description}</p>
        </div>
        
        <!-- Tab Content: Details -->
        <div id="tab-details" class="tab-content hidden">
          <div class="space-y-3">
            ${artwork.details ? Object.entries(artwork.details).map(([key, val]) => `
              <div class="flex justify-between py-2 border-b border-[#374151]">
                <span class="text-gray-400 capitalize">${key.replace(/([A-Z])/g, ' $1')}</span>
                <span class="text-white font-medium">${val}</span>
              </div>
            `).join('') : '<p class="text-gray-400">No details available</p>'}
          </div>
        </div>
        
        <!-- Tab Content: Reviews -->
        <div id="tab-reviews" class="tab-content hidden">
          ${artwork.reviews.length > 0 ? `
            <div class="flex items-center gap-4 mb-6">
              <span class="text-4xl font-bold text-white">${avgRating.toFixed(1)}</span>
              <div>
                <div class="flex gap-1">${utils.generateStarRating(avgRating)}</div>
                <p class="text-sm text-gray-400 mt-1">Based on ${artwork.reviews.length} reviews</p>
              </div>
            </div>
            <div class="space-y-4">
              ${artwork.reviews.map(review => `
                <div class="bg-[#252547] rounded-xl p-4 border border-[#374151]">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-3">
                      <img src="${review.avatar}" class="w-8 h-8 rounded-full">
                      <span class="font-medium text-white">${review.user}</span>
                    </div>
                    <span class="text-sm text-gray-400">${utils.formatDate(review.date)}</span>
                  </div>
                  <div class="flex gap-1 mb-2">${utils.generateStarRating(review.rating)}</div>
                  <p class="text-gray-300">${review.comment}</p>
                </div>
              `).join('')}
            </div>
          ` : '<p class="text-gray-400">No reviews yet. Be the first to review!</p>'}
        </div>
      </div>
    </div>

    <!-- Related Artworks -->
    ${relatedArtworks.length > 0 ? `
    <section class="mt-16">
      <h2 class="text-2xl font-bold text-white mb-6">Related Artworks</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        ${relatedArtworks.map(art => renderArtCard(art)).join('')}
      </div>
    </section>
    ` : ''}
  </div>
  `;
};

// Tab switching function (global)
function switchTab(tab) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('text-white', 'border-[#7B61FF]');
    btn.classList.add('text-gray-400', 'border-transparent');
  });
  document.getElementById(`tab-${tab}`).classList.remove('hidden');
  const activeBtn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
  if (activeBtn) {
    activeBtn.classList.add('text-white', 'border-[#7B61FF]');
    activeBtn.classList.remove('text-gray-400', 'border-transparent');
  }
  if(window.lucide) lucide.createIcons();
}

const renderCartPage = () => {
  const cart = cartManager.getCart();
  const totals = cartManager.getCartTotal();
  const gasEstimate = 0.005;

  if (cart.length === 0) {
    return `
    <div class="container mx-auto px-4 py-20 text-center animate-slide-up">
      <div class="w-24 h-24 bg-[#1A1A3E] rounded-full flex items-center justify-center mx-auto mb-6">
        <i data-lucide="shopping-bag" class="w-12 h-12 text-gray-500"></i>
      </div>
      <h2 class="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
      <p class="text-gray-400 mb-8 max-w-md mx-auto">Looks like you haven't added any NFTs to your cart yet. Explore our collection to find your perfect piece.</p>
      <a href="#explore" class="bg-gradient text-white px-8 py-3 rounded-full font-bold inline-block hover:shadow-lg hover:shadow-purple-500/30 transition">Explore NFTs</a>
    </div>
    `;
  }

  return `
  <div class="container mx-auto px-4 py-8 animate-fade-in">
    <h1 class="text-4xl font-bold text-white mb-2">Shopping Cart</h1>
    <p class="text-gray-400 mb-8">${cart.length} item${cart.length > 1 ? 's' : ''} in your cart</p>
    
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Cart Items -->
      <div class="w-full lg:w-2/3 space-y-4">
        ${cart.map(item => `
          <div class="bg-[#1A1A3E] border border-[#374151] rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <a href="#product/${item.id}">
              <img src="${item.image}" class="w-24 h-24 rounded-lg object-cover">
            </a>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-white"><a href="#product/${item.id}" class="hover:text-[#7B61FF] transition">${item.title}</a></h3>
              <p class="text-gray-400 text-sm">by ${item.artist.name}</p>
              <p class="text-xs text-gray-500 mt-1">Edition: ${item.edition}</p>
            </div>
            <div class="flex items-center gap-3">
              <button onclick="cartManager.updateQuantity('${item.id}', ${item.quantity - 1})" class="w-8 h-8 rounded-lg bg-[#252547] border border-[#374151] text-white flex items-center justify-center hover:bg-[#7B61FF] transition">
                <i data-lucide="minus" class="w-4 h-4"></i>
              </button>
              <span class="text-white font-medium w-6 text-center">${item.quantity}</span>
              <button onclick="cartManager.updateQuantity('${item.id}', ${item.quantity + 1})" class="w-8 h-8 rounded-lg bg-[#252547] border border-[#374151] text-white flex items-center justify-center hover:bg-[#7B61FF] transition">
                <i data-lucide="plus" class="w-4 h-4"></i>
              </button>
            </div>
            <div class="text-right">
              <p class="font-bold text-white text-lg">${(item.price.eth * item.quantity).toFixed(4)} ETH</p>
              <p class="text-xs text-gray-400">~\\$${utils.formatPrice(item.price.usd * item.quantity)}</p>
            </div>
            <button onclick="cartManager.removeFromCart('${item.id}')" class="text-gray-500 hover:text-red-500 p-2 transition" title="Remove">
              <i data-lucide="trash-2" class="w-5 h-5"></i>
            </button>
          </div>
        `).join('')}
      </div>
      
      <!-- Order Summary -->
      <div class="w-full lg:w-1/3">
        <div class="bg-[#1A1A3E] border border-[#374151] rounded-xl p-6 sticky top-24">
          <h3 class="text-xl font-bold text-white mb-6">Order Summary</h3>
          <div class="space-y-4 mb-6">
            <div class="flex justify-between text-gray-300">
              <span>Subtotal (${cart.length} items)</span>
              <span>${totals.eth.toFixed(4)} ETH</span>
            </div>
            <div class="flex justify-between text-gray-300">
              <span>~USD Value</span>
              <span>\\$${utils.formatPrice(totals.usd)}</span>
            </div>
            <div class="flex justify-between text-gray-300">
              <span>Estimated Gas Fee</span>
              <span>${gasEstimate} ETH</span>
            </div>
            <div class="border-t border-[#374151] pt-4 flex justify-between text-white font-bold text-lg">
              <span>Total</span>
              <span>${(totals.eth + gasEstimate).toFixed(4)} ETH</span>
            </div>
            <p class="text-xs text-gray-500 text-right">~\\$${utils.formatPrice(totals.usd + gasEstimate * 1800)}</p>
          </div>
          <a href="#checkout" class="block w-full bg-gradient text-white text-center py-4 rounded-xl font-bold text-lg hover:opacity-90 transition">Proceed to Checkout</a>
          <a href="#explore" class="block w-full text-center py-3 text-gray-400 hover:text-white mt-3 transition text-sm">Continue Shopping</a>
        </div>
      </div>
    </div>
  </div>
  `;
};

const renderCheckoutPage = () => {
  const cart = cartManager.getCart();
  const totals = cartManager.getCartTotal();
  const gasEstimate = 0.005;

  if (cart.length === 0) {
    window.location.hash = '#explore';
    return '';
  }

  return `
  <div class="container mx-auto px-4 py-8 animate-fade-in">
    <h1 class="text-4xl font-bold text-white mb-2">Checkout</h1>
    <p class="text-gray-400 mb-8">Complete your purchase</p>
    
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Form -->
      <div class="w-full lg:w-2/3 space-y-6">
        <!-- Account Confirmation -->
        <div class="bg-[#1A1A3E] border border-[#374151] rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <i data-lucide="user" class="w-5 h-5 text-[#7B61FF]"></i> Account Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Full Name</label>
              <input type="text" value="John Doe" class="w-full bg-[#252547] border border-[#374151] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#7B61FF]">
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Email Address</label>
              <input type="email" value="john@example.com" class="w-full bg-[#252547] border border-[#374151] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#7B61FF]">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm text-gray-400 mb-2">Wallet Address</label>
              <input type="text" value="0x1234...abcd" class="w-full bg-[#252547] border border-[#374151] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#7B61FF]" readonly>
            </div>
          </div>
        </div>
        
        <!-- Payment Method -->
        <div class="bg-[#1A1A3E] border border-[#374151] rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <i data-lucide="credit-card" class="w-5 h-5 text-[#7B61FF]"></i> Payment Method
          </h3>
          <div class="grid grid-cols-3 gap-3 mb-6">
            <button class="payment-method-btn border-2 border-[#7B61FF] bg-[#252547] rounded-xl p-4 text-center" data-method="card">
              <i data-lucide="credit-card" class="w-8 h-8 text-[#7B61FF] mx-auto mb-2"></i>
              <p class="text-sm text-white font-medium">Credit Card</p>
            </button>
            <button class="payment-method-btn border border-[#374151] bg-[#252547] rounded-xl p-4 text-center hover:border-[#7B61FF] transition" data-method="crypto">
              <i data-lucide="wallet" class="w-8 h-8 text-gray-400 mx-auto mb-2"></i>
              <p class="text-sm text-gray-300 font-medium">Crypto Wallet</p>
            </button>
            <button class="payment-method-btn border border-[#374151] bg-[#252547] rounded-xl p-4 text-center hover:border-[#7B61FF] transition" data-method="bank">
              <i data-lucide="landmark" class="w-8 h-8 text-gray-400 mx-auto mb-2"></i>
              <p class="text-sm text-gray-300 font-medium">Bank Transfer</p>
            </button>
          </div>
          
          <!-- Card Form -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" maxlength="19" class="w-full bg-[#252547] border border-[#374151] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#7B61FF]">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-400 mb-2">Expiry Date</label>
                <input type="text" placeholder="MM/YY" maxlength="5" class="w-full bg-[#252547] border border-[#374151] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#7B61FF]">
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">CVV</label>
                <input type="text" placeholder="123" maxlength="3" class="w-full bg-[#252547] border border-[#374151] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#7B61FF]">
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Cardholder Name</label>
              <input type="text" placeholder="JOHN DOE" class="w-full bg-[#252547] border border-[#374151] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#7B61FF]">
            </div>
          </div>
        </div>
        
        <!-- Promo Code -->
        <div class="bg-[#1A1A3E] border border-[#374151] rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <i data-lucide="percent" class="w-5 h-5 text-[#7B61FF]"></i> Promo Code
          </h3>
          <div class="flex gap-3">
            <input type="text" placeholder="Enter promo code" class="flex-1 bg-[#252547] border border-[#374151] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#7B61FF]">
            <button class="bg-[#252547] border border-[#374151] text-[#7B61FF] px-6 rounded-lg font-medium hover:bg-[#7B61FF] hover:text-white transition">Apply</button>
          </div>
        </div>
      </div>
      
      <!-- Order Summary -->
      <div class="w-full lg:w-1/3">
        <div class="bg-[#1A1A3E] border border-[#374151] rounded-xl p-6 sticky top-24">
          <h3 class="text-xl font-bold text-white mb-6">Order Summary</h3>
          
          <!-- Items -->
          <div class="space-y-4 mb-6">
            ${cart.map(item => `
              <div class="flex items-center gap-3">
                <img src="${item.image}" class="w-12 h-12 rounded-lg object-cover">
                <div class="flex-1">
                  <p class="text-white text-sm font-medium truncate">${item.title}</p>
                  <p class="text-gray-400 text-xs">x${item.quantity}</p>
                </div>
                <p class="text-white text-sm font-medium">${(item.price.eth * item.quantity).toFixed(4)} ETH</p>
              </div>
            `).join('')}
          </div>
          
          <div class="border-t border-[#374151] pt-4 space-y-3">
            <div class="flex justify-between text-gray-300 text-sm">
              <span>Subtotal</span>
              <span>${totals.eth.toFixed(4)} ETH</span>
            </div>
            <div class="flex justify-between text-gray-300 text-sm">
              <span>Gas Fee</span>
              <span>${gasEstimate} ETH</span>
            </div>
            <div class="flex justify-between text-green-400 text-sm">
              <span>Potential Savings</span>
              <span>-0.05 ETH</span>
            </div>
            <div class="border-t border-[#374151] pt-3 flex justify-between text-white font-bold text-lg">
              <span>Total</span>
              <span>${(totals.eth + gasEstimate - 0.05).toFixed(4)} ETH</span>
            </div>
            <p class="text-xs text-gray-500 text-right">~\\$${utils.formatPrice((totals.usd + gasEstimate * 1800) - 90)}</p>
          </div>
          
          <button onclick="cartManager.clearCart(); window.location.hash='#confirmation'" class="w-full bg-gradient text-white py-4 rounded-xl font-bold text-lg mt-6 hover:opacity-90 transition flex items-center justify-center gap-2">
            <i data-lucide="lock" class="w-5 h-5"></i> Confirm & Pay
          </button>
          <p class="text-xs text-gray-500 text-center mt-3 flex items-center justify-center gap-1">
            <i data-lucide="shield" class="w-3 h-3"></i> Secured by OpenArt Payment Protection
          </p>
        </div>
      </div>
    </div>
  </div>
  `;
};

const renderConfirmationPage = () => `
<div class="container mx-auto px-4 py-20 text-center animate-slide-up">
  <div class="max-w-lg mx-auto">
    <div class="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6" style="animation: pulse 2s ease-in-out infinite;">
      <i data-lucide="check" class="w-12 h-12 text-green-500"></i>
    </div>
    <h1 class="text-4xl font-bold text-white mb-4">Purchase Confirmed! 🎉</h1>
    <p class="text-gray-400 mb-2">Your NFT transaction has been successfully processed.</p>
    <p class="text-sm text-gray-500 mb-8">Order #OA-${Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
    
    <div class="bg-[#1A1A3E] border border-[#374151] rounded-xl p-6 mb-8 text-left">
      <h3 class="text-lg font-bold text-white mb-4">What's Next?</h3>
      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-[#7B61FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <i data-lucide="download" class="w-4 h-4 text-[#7B61FF]"></i>
          </div>
          <div>
            <p class="text-white font-medium">NFT Transfer</p>
            <p class="text-sm text-gray-400">Your NFTs will be transferred to your wallet within 1-2 minutes.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-[#7B61FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <i data-lucide="mail" class="w-4 h-4 text-[#7B61FF]"></i>
          </div>
          <div>
            <p class="text-white font-medium">Confirmation Email</p>
            <p class="text-sm text-gray-400">A receipt has been sent to your registered email address.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-[#7B61FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <i data-lucide="palette" class="w-4 h-4 text-[#7B61FF]"></i>
          </div>
          <div>
            <p class="text-white font-medium">View Your Collection</p>
            <p class="text-sm text-gray-400">Access your purchased artworks anytime from your profile.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex gap-4 justify-center">
      <a href="#explore" class="bg-gradient text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-purple-500/30 transition">Continue Shopping</a>
      <a href="#home" class="bg-[#1A1A3E] border border-[#374151] text-white px-8 py-3 rounded-full font-bold hover:bg-[#252547] transition">Back to Home</a>
    </div>
  </div>
</div>
`;

const renderArtistPage = (id) => {
  const artist = mockData.artists.find(a => a.id === id);
  if (!artist) return '<div class="text-center text-white py-20"><h2 class="text-2xl">Artist not found</h2><a href="#explore" class="text-[#7B61FF]">Back to explore</a></div>';
  
  const artistArtworks = mockData.artworks.filter(a => a.artist.id === id);
  const totalReviews = artistArtworks.reduce((sum, a) => sum + a.reviews.length, 0);

  return `
  <div class="animate-fade-in">
    <!-- Cover & Avatar -->
    <div class="relative">
      <img src="${artist.cover}" class="w-full h-48 md:h-64 object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-[#0D0D2B] to-transparent"></div>
    </div>
    
    <div class="container mx-auto px-4">
      <div class="relative -mt-20 mb-8">
        <div class="flex flex-col md:flex-row items-start md:items-end gap-6">
          <img src="${artist.avatar}" class="w-32 h-32 rounded-full border-4 border-[#0D0D2B] object-cover bg-[#1A1A3E] shadow-xl">
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-white flex items-center gap-2">
              ${artist.name}
              ${artist.verified ? '<i data-lucide="check-circle" class="w-6 h-6 text-blue-500"></i>' : ''}
            </h1>
            <p class="text-gray-400 mt-1">Joined ${utils.formatDate(artist.joined)}</p>
          </div>
          <button class="bg-gradient text-white px-8 py-2 rounded-full font-bold hover:opacity-90 transition">Follow</button>
        </div>
      </div>

      <!-- Bio -->
      <div class="bg-[#1A1A3E] border border-[#374151] rounded-xl p-6 mb-8">
        <h3 class="text-lg font-bold text-white mb-3">About</h3>
        <p class="text-gray-300 leading-relaxed mb-4">${artist.bio}</p>
        <h4 class="text-sm font-bold text-[#7B61FF] mb-2">Artistic Style</h4>
        <p class="text-gray-400 text-sm">${artist.style}</p>
        ${artist.social ? `
          <div class="flex gap-4 mt-4 pt-4 border-t border-[#374151]">
            ${artist.social.twitter ? `<a href="#" class="text-gray-400 hover:text-[#1DA1F2] transition text-sm"><i data-lucide="twitter" class="w-4 h-4 inline mr-1"></i>${artist.social.twitter}</a>` : ''}
            ${artist.social.instagram ? `<a href="#" class="text-gray-400 hover:text-[#E1306C] transition text-sm"><i data-lucide="instagram" class="w-4 h-4 inline mr-1"></i>${artist.social.instagram}</a>` : ''}
          </div>
        ` : ''}
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        <div class="bg-[#1A1A3E] border border-[#374151] rounded-xl p-5 text-center">
          <p class="text-3xl font-bold text-white">${artist.totalWorks}</p>
          <p class="text-sm text-gray-400 mt-1">Total Works</p>
        </div>
        <div class="bg-[#1A1A3E] border border-[#374151] rounded-xl p-5 text-center">
          <p class="text-3xl font-bold text-[#7B61FF]">${artist.totalSales}</p>
          <p class="text-sm text-gray-400 mt-1">Works Sold</p>
        </div>
        <div class="bg-[#1A1A3E] border border-[#374151] rounded-xl p-5 text-center">
          <p class="text-3xl font-bold text-white">${artist.featuredWorks}</p>
          <p class="text-sm text-gray-400 mt-1">Featured</p>
        </div>
        <div class="bg-[#1A1A3E] border border-[#374151] rounded-xl p-5 text-center">
          <p class="text-3xl font-bold text-white">${artist.followers.toLocaleString()}</p>
          <p class="text-sm text-gray-400 mt-1">Followers</p>
        </div>
        <div class="bg-[#1A1A3E] border border-[#374151] rounded-xl p-5 text-center">
          <p class="text-3xl font-bold text-green-400">${artist.transactions}</p>
          <p class="text-sm text-gray-400 mt-1">Transactions</p>
        </div>
      </div>

      <!-- Artworks -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-white mb-6">Artworks by ${artist.name}</h2>
        ${artistArtworks.length > 0 ? `
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            ${artistArtworks.map(art => renderArtCard(art)).join('')}
          </div>
        ` : '<p class="text-gray-400">No artworks listed yet.</p>'}
      </section>

      <!-- Reviews from buyers -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-white mb-6">Buyer Reviews (${totalReviews})</h2>
        ${totalReviews > 0 ? `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${artistArtworks.flatMap(a => a.reviews.map(r => ({...r, artworkTitle: a.title}))).slice(0, 6).map(review => `
              <div class="bg-[#1A1A3E] border border-[#374151] rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <img src="${review.avatar}" class="w-8 h-8 rounded-full">
                    <div>
                      <span class="font-medium text-white">${review.user}</span>
                      <p class="text-xs text-gray-500">on "${review.artworkTitle}"</p>
                    </div>
                  </div>
                  <span class="text-sm text-gray-400">${utils.formatDate(review.date)}</span>
                </div>
                <div class="flex gap-1 mb-2">${utils.generateStarRating(review.rating)}</div>
                <p class="text-gray-300 text-sm">${review.comment}</p>
              </div>
            `).join('')}
          </div>
        ` : '<p class="text-gray-400">No reviews yet.</p>'}
      </section>
    </div>
  </div>
  `;
};
