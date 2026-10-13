/* ===================================================
   components.js — Reusable UI Components for OpenArt
   =================================================== */

// ── Header ──────────────────────────────────────────
const renderHeader = () => `
<header class="glass-effect sticky top-0 z-40 border-b border-[#374151]">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <!-- Logo -->
        <a href="#home" class="flex items-center gap-2">
            <div class="w-10 h-10 bg-gradient rounded-xl flex items-center justify-center">
                <i data-lucide="hexagon" class="w-6 h-6 text-white"></i>
            </div>
            <span class="text-2xl font-extrabold text-gradient">OpenArt</span>
        </a>
        
        <!-- Desktop Search -->
        <div class="hidden md:flex flex-1 max-w-md mx-8 relative">
            <i data-lucide="search" class="absolute left-4 top-2.5 text-gray-400 w-5 h-5"></i>
            <input type="text" id="header-search" placeholder="Search items, collections, and accounts" 
                class="w-full bg-[#1A1A3E] border border-[#374151] rounded-full py-2.5 px-4 pl-11 text-white text-sm focus:outline-none focus:border-[#7B61FF] transition"
                onkeydown="if(event.key==='Enter'){window.location.hash='#explore'; setTimeout(()=>{const s=document.getElementById('explore-search');if(s){s.value=this.value;searchAndFilter.updateFilter('search',this.value);}},100)}">
        </div>
        
        <!-- Navigation -->
        <nav class="flex items-center gap-2 md:gap-6">
            <a href="#home" class="nav-link text-gray-300 hover:text-white transition hidden md:block font-medium text-sm">Home</a>
            <a href="#explore" class="nav-link text-gray-300 hover:text-white transition hidden md:block font-medium text-sm">Explore</a>
            <a href="#cart" class="relative text-gray-300 hover:text-white transition p-2">
                <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                <span class="cart-count-badge absolute -top-1 -right-1 bg-[#7B61FF] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center" style="display:none;">0</span>
            </a>
            <button class="bg-gradient px-5 py-2 rounded-full font-semibold text-white text-sm hover:opacity-90 transition hidden md:block">
                Connect Wallet
            </button>
            <!-- Mobile Menu Toggle -->
            <button id="mobile-menu-btn" class="md:hidden text-gray-300 p-2" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
                <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
        </nav>
    </div>
    
    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden border-t border-[#374151] px-4 py-4 space-y-3">
        <div class="relative mb-3">
            <i data-lucide="search" class="absolute left-4 top-2.5 text-gray-400 w-5 h-5"></i>
            <input type="text" placeholder="Search..." class="w-full bg-[#1A1A3E] border border-[#374151] rounded-full py-2.5 px-4 pl-11 text-white text-sm focus:outline-none focus:border-[#7B61FF]">
        </div>
        <a href="#home" class="block text-gray-300 hover:text-white py-2 font-medium">Home</a>
        <a href="#explore" class="block text-gray-300 hover:text-white py-2 font-medium">Explore</a>
        <button class="w-full bg-gradient px-5 py-2.5 rounded-full font-semibold text-white text-sm hover:opacity-90 transition">Connect Wallet</button>
    </div>
</header>
`;

// ── Footer ──────────────────────────────────────────
const renderFooter = () => `
<footer class="bg-[#0D0D2B] border-t border-[#374151] pt-16 pb-8 mt-20">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <!-- Brand -->
            <div>
                <div class="flex items-center gap-2 mb-4">
                    <div class="w-10 h-10 bg-gradient rounded-xl flex items-center justify-center">
                        <i data-lucide="hexagon" class="w-6 h-6 text-white"></i>
                    </div>
                    <span class="text-2xl font-extrabold text-gradient">OpenArt</span>
                </div>
                <p class="text-gray-400 mb-6 text-sm leading-relaxed">The premier marketplace for digital art and NFTs. Discover, collect, and sell extraordinary digital creations.</p>
                <div class="flex gap-4">
                    <a href="#" class="w-10 h-10 rounded-full bg-[#1A1A3E] border border-[#374151] flex items-center justify-center text-gray-400 hover:text-[#7B61FF] hover:border-[#7B61FF] transition">
                        <i data-lucide="twitter" class="w-4 h-4"></i>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-[#1A1A3E] border border-[#374151] flex items-center justify-center text-gray-400 hover:text-[#7B61FF] hover:border-[#7B61FF] transition">
                        <i data-lucide="instagram" class="w-4 h-4"></i>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-[#1A1A3E] border border-[#374151] flex items-center justify-center text-gray-400 hover:text-[#7B61FF] hover:border-[#7B61FF] transition">
                        <i data-lucide="youtube" class="w-4 h-4"></i>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-[#1A1A3E] border border-[#374151] flex items-center justify-center text-gray-400 hover:text-[#7B61FF] hover:border-[#7B61FF] transition">
                        <i data-lucide="message-circle" class="w-4 h-4"></i>
                    </a>
                </div>
            </div>
            
            <!-- Marketplace -->
            <div>
                <h3 class="text-white font-bold mb-5">Marketplace</h3>
                <ul class="space-y-3 text-sm">
                    <li><a href="#explore" class="text-gray-400 hover:text-white transition">All NFTs</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-white transition">Digital Art</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-white transition">3D Art</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-white transition">Photography</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-white transition">Pixel Art</a></li>
                </ul>
            </div>
            
            <!-- Company -->
            <div>
                <h3 class="text-white font-bold mb-5">Company</h3>
                <ul class="space-y-3 text-sm">
                    <li><a href="#" class="text-gray-400 hover:text-white transition">About Us</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-white transition">Careers</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-white transition">Support</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                </ul>
            </div>
            
            <!-- Newsletter -->
            <div>
                <h3 class="text-white font-bold mb-5">Stay in the loop</h3>
                <p class="text-gray-400 mb-4 text-sm leading-relaxed">Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks.</p>
                <div class="flex">
                    <input type="email" placeholder="Your email address" 
                        class="bg-[#1A1A3E] border border-[#374151] border-r-0 rounded-l-lg py-2.5 px-4 w-full text-white text-sm focus:outline-none focus:border-[#7B61FF]">
                    <button class="bg-[#7B61FF] text-white px-5 py-2.5 rounded-r-lg hover:bg-[#6a50e5] transition text-sm font-medium flex-shrink-0">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Bottom Bar -->
        <div class="pt-8 border-t border-[#374151] flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-gray-500 text-sm">&copy; 2026 OpenArt. All rights reserved. TP2 UX-UI</p>
            <div class="flex gap-6 text-sm">
                <a href="#" class="text-gray-500 hover:text-white transition">Terms</a>
                <a href="#" class="text-gray-500 hover:text-white transition">Privacy</a>
                <a href="#" class="text-gray-500 hover:text-white transition">Cookies</a>
            </div>
        </div>
    </div>
</footer>
`;

// ── Art Card (NFT Card) ─────────────────────────────
const renderArtCard = (artwork) => {
    const avgRating = utils.getAverageRating(artwork.reviews);
    return `
    <div class="nft-card flex flex-col h-full animate-fade-in">
        <a href="#product/${artwork.id}" class="block relative overflow-hidden group">
            <img src="${artwork.image}" alt="${artwork.title}" 
                class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-white">
                ${artwork.category}
            </div>
            ${artwork.edition === '1/1' ? '<div class="absolute top-3 right-3 bg-[#7B61FF]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">Unique</div>' : ''}
        </a>
        <div class="p-5 flex-1 flex flex-col">
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-bold text-white">
                    <a href="#product/${artwork.id}" class="hover:text-[#7B61FF] transition">${artwork.title}</a>
                </h3>
                <button class="text-gray-400 hover:text-red-500 transition flex-shrink-0 ml-2">
                    <i data-lucide="heart" class="w-5 h-5"></i>
                </button>
            </div>
            <div class="flex items-center gap-2 mb-2">
                <img src="${artwork.artist.avatar}" alt="${artwork.artist.name}" class="w-6 h-6 rounded-full object-cover">
                <a href="#artist/${artwork.artist.id}" class="text-sm text-gray-300 hover:text-white transition">${artwork.artist.name}</a>
                ${artwork.artist.verified ? '<i data-lucide="check-circle" class="w-4 h-4 text-blue-500"></i>' : ''}
            </div>
            ${artwork.reviews.length > 0 ? `
                <div class="flex items-center gap-2 mb-3">
                    <div class="flex gap-0.5">${utils.generateStarRating(avgRating)}</div>
                    <span class="text-xs text-gray-400">(${artwork.reviews.length})</span>
                </div>
            ` : ''}
            <div class="mt-auto pt-4 border-t border-[#374151] flex justify-between items-end">
                <div>
                    <p class="text-xs text-gray-400 mb-0.5">Price</p>
                    <p class="font-bold text-white">${artwork.price.eth} ETH</p>
                    <p class="text-xs text-gray-500">~$${utils.formatPrice(artwork.price.usd)}</p>
                </div>
                <button class="add-to-cart-btn bg-[#1A1A3E] hover:bg-[#7B61FF] text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5" data-id="${artwork.id}">
                    <i data-lucide="shopping-cart" class="w-4 h-4"></i> Add
                </button>
            </div>
        </div>
    </div>
    `;
};

// ── Loading Skeletons ───────────────────────────────
const renderLoadingSkeletons = (count = 4) => {
    return Array(count).fill('').map(() => `
        <div class="nft-card">
            <div class="w-full h-64 animate-shimmer rounded-t-xl"></div>
            <div class="p-5 space-y-3">
                <div class="h-5 w-3/4 animate-shimmer rounded"></div>
                <div class="h-4 w-1/2 animate-shimmer rounded"></div>
                <div class="h-8 w-full animate-shimmer rounded mt-4"></div>
            </div>
        </div>
    `).join('');
};

// ── Empty State ─────────────────────────────────────
const renderEmptyState = (icon, title, message, actionText, actionLink) => `
    <div class="text-center py-20 animate-slide-up">
        <div class="w-20 h-20 bg-[#1A1A3E] rounded-full flex items-center justify-center mx-auto mb-6">
            <i data-lucide="${icon}" class="w-10 h-10 text-gray-500"></i>
        </div>
        <h2 class="text-2xl font-bold text-white mb-3">${title}</h2>
        <p class="text-gray-400 mb-6 max-w-md mx-auto">${message}</p>
        ${actionText ? `<a href="${actionLink}" class="bg-gradient text-white px-8 py-3 rounded-full font-bold inline-block hover:shadow-lg hover:shadow-purple-500/30 transition">${actionText}</a>` : ''}
    </div>
`;

// ── Breadcrumb ──────────────────────────────────────
const renderBreadcrumb = (items) => `
    <nav class="mb-8 text-sm flex items-center gap-2 flex-wrap">
        ${items.map((item, i) => {
            if (i === items.length - 1) {
                return `<span class="text-[#7B61FF] font-medium">${item.label}</span>`;
            }
            return `<a href="${item.link}" class="text-gray-400 hover:text-white transition">${item.label}</a><i data-lucide="chevron-right" class="w-4 h-4 text-gray-600"></i>`;
        }).join('')}
    </nav>
`;
