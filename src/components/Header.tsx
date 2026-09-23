import React from 'react';
import { ShoppingBag, Search, BarChart3, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (cat: string) => void;
  activeCategory: string;
  onOpenGA4: () => void;
  ga4EventCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategory,
  activeCategory,
  onOpenGA4,
  ga4EventCount,
  searchQuery,
  onSearchChange,
}) => {
  const [showBanner, setShowBanner] = React.useState(true);
  const [showSearchInput, setShowSearchInput] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      {/* Slim Top Announcement Banner */}
      {showBanner && (
        <div className="bg-neutral-900 text-white text-xs py-2 px-4 flex items-center justify-between">
          <div className="mx-auto flex items-center gap-2 font-medium tracking-tight">
            <span className="text-amber-400 font-semibold">Free US Shipping</span>
            <span>·</span>
            <span>On orders over $75.00</span>
            <span>·</span>
            <span className="text-neutral-400 hidden sm:inline">Orders dispatch within 24 hours</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss banner"
            className="text-neutral-400 hover:text-white transition-colors ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand Title */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onSelectCategory('All Products')}
            className="text-left font-bold text-lg tracking-tight text-neutral-900 hover:opacity-90 flex items-center gap-2 group"
          >
            <span className="flex items-center tracking-tighter text-xl font-black">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>
            <span className="font-medium text-neutral-800 text-base">Merchandise Store</span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-600">
          <button
            onClick={() => onSelectCategory('All Products')}
            className={`transition-colors whitespace-nowrap ${
              activeCategory === 'All Products'
                ? 'text-neutral-900 font-semibold border-b-2 border-[#4285F4] pb-0.5'
                : 'hover:text-neutral-900'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => onSelectCategory('1998 Retro Collection')}
            className={`transition-colors whitespace-nowrap ${
              activeCategory === '1998 Retro Collection'
                ? 'text-neutral-900 font-semibold border-b-2 border-[#4285F4] pb-0.5'
                : 'hover:text-neutral-900'
            }`}
          >
            1998 Retro
          </button>
          <button
            onClick={() => onSelectCategory('Android Collectibles')}
            className={`transition-colors whitespace-nowrap ${
              activeCategory === 'Android Collectibles'
                ? 'text-neutral-900 font-semibold border-b-2 border-[#4285F4] pb-0.5'
                : 'hover:text-neutral-900'
            }`}
          >
            Android
          </button>
          <button
            onClick={() => onSelectCategory('YouTube Kids & Apparel')}
            className={`transition-colors whitespace-nowrap ${
              activeCategory === 'YouTube Kids & Apparel'
                ? 'text-neutral-900 font-semibold border-b-2 border-[#4285F4] pb-0.5'
                : 'hover:text-neutral-900'
            }`}
          >
            YouTube
          </button>
          <button
            onClick={() => onSelectCategory('Chrome Dino Collectibles')}
            className={`transition-colors whitespace-nowrap ${
              activeCategory === 'Chrome Dino Collectibles'
                ? 'text-neutral-900 font-semibold border-b-2 border-[#4285F4] pb-0.5'
                : 'hover:text-neutral-900'
            }`}
          >
            Chrome Dino
          </button>
          <button
            onClick={() => onSelectCategory('Classic Google Drinkware & Stationery')}
            className={`transition-colors whitespace-nowrap ${
              activeCategory === 'Classic Google Drinkware & Stationery'
                ? 'text-neutral-900 font-semibold border-b-2 border-[#4285F4] pb-0.5'
                : 'hover:text-neutral-900'
            }`}
          >
            Classic Gear
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Search bar toggle */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center bg-neutral-100 rounded-lg px-2.5 py-1.5 border border-neutral-200">
                <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search gear..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm text-neutral-800 focus:outline-none w-28 sm:w-44"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-neutral-400 hover:text-neutral-600 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                aria-label="Search catalog"
                className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* GA4 Inspector Trigger Button */}
          <button
            onClick={onOpenGA4}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
            title="Inspect Google Analytics 4 (GA4) Real-Time Events"
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#4285F4]" />
            <span className="hidden sm:inline">GA4 Events</span>
            <span className="bg-[#4285F4] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
              {ga4EventCount}
            </span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            aria-label={`View Cart with ${cartCount} items`}
            className="relative flex items-center gap-2 px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-bold bg-white text-neutral-900 px-1.5 py-0.5 rounded text-[11px] min-w-[18px] text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
