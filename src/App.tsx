/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { GA4Inspector } from './components/GA4Inspector';
import { PRODUCTS, Product, CATEGORIES } from './data/products';
import { trackPageView, trackAddToCart, trackViewItem, recentEvents, subscribeAnalytics } from './utils/analytics';
import { Sparkles, ArrowRight, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('All Products');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutActive, setIsCheckoutActive] = useState<boolean>(false);
  const [isGA4Open, setIsGA4Open] = useState<boolean>(false);
  const [ga4Count, setGa4Count] = useState<number>(recentEvents.length);

  // Initial cart with sample items for instant interactivity
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[1], // Android Classic Plushie
      quantity: 1,
    },
  ]);

  // Initial page_view tracking
  useEffect(() => {
    trackPageView('/', 'Google Merchandise Store Clone - Home');
  }, []);

  // Subscribe to GA4 count updates
  useEffect(() => {
    const unsub = subscribeAnalytics(() => {
      setGa4Count(recentEvents.length);
    });
    return unsub;
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number, size?: string, color?: string) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedSize: size, selectedColor: color }];
    });
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product) => {
    trackAddToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      quantity: 1,
    });
    handleAddToCart(product, 1, product.sizes ? product.sizes[0] : undefined);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Filter products by category and search
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === 'All Products' || product.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  // Primary Anchor Product (Marine Layer Pullover)
  const anchorProduct = PRODUCTS.find((p) => p.isAnchor) || PRODUCTS[0];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 flex flex-col font-sans selection:bg-[#4285F4] selection:text-white">
      {/* Top Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setIsCheckoutActive(false);
          trackPageView(`/category/${encodeURIComponent(cat)}`, `Google Merch - ${cat}`);
        }}
        activeCategory={activeCategory}
        onOpenGA4={() => setIsGA4Open(true)}
        ga4EventCount={ga4Count}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main View: Either Single-Page Checkout OR Storefront */}
      {isCheckoutActive ? (
        <main className="flex-1">
          <CheckoutView
            items={cartItems}
            onBackToShopping={() => setIsCheckoutActive(false)}
            onOrderSuccess={() => {
              setCartItems([]);
            }}
          />
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero Campaign Showcase: Marine Layer 1998 Pullover Anchor */}
          {activeCategory === 'All Products' && searchQuery === '' && (
            <section className="bg-white border-b border-neutral-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Story & Anchored Purchase Point */}
                  <div className="lg:col-span-6 space-y-5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                      <span className="text-[#4285F4] uppercase tracking-wider font-bold">
                        1998 Retro Heritage
                      </span>
                      <span>·</span>
                      <span>Marine Layer Collaboration</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.1] text-balance">
                      Google Marine Layer <br />
                      <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] bg-clip-text text-transparent">
                        1998 Pullover
                      </span>
                    </h1>

                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl">
                      Commemorating Google's foundation in Menlo Park. Crafted from custom-knit Supima micro-fleece with the original four-color serif embroidery. Authentic heritage comfort designed for daily wear.
                    </p>

                    {/* Price, Stock status, & CTA Button */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-bold text-neutral-900 tabular-nums">
                          ${anchorProduct.price.toFixed(2)}
                        </span>
                        {anchorProduct.originalPrice && (
                          <span className="text-sm text-neutral-400 line-through tabular-nums">
                            ${anchorProduct.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => {
                            trackViewItem(anchorProduct);
                            setQuickViewProduct(anchorProduct);
                          }}
                          className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all active:scale-98 flex items-center gap-2"
                        >
                          <span>Explore Pullover Specs</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleQuickAdd(anchorProduct)}
                          className="px-4 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-lg transition-colors border border-neutral-300/80"
                        >
                          + Quick Bag
                        </button>
                      </div>
                    </div>

                    {/* Trust badges */}
                    <div className="pt-4 border-t border-neutral-100 grid grid-cols-3 gap-4 text-xs text-neutral-600">
                      <div>
                        <strong className="text-neutral-900 block font-semibold">Supima Cotton</strong>
                        <span className="text-[11px] text-neutral-500">Custom soft wash</span>
                      </div>
                      <div>
                        <strong className="text-neutral-900 block font-semibold">Free Delivery</strong>
                        <span className="text-[11px] text-neutral-500">Over $75.00 cart</span>
                      </div>
                      <div>
                        <strong className="text-neutral-900 block font-semibold">Official Merch</strong>
                        <span className="text-[11px] text-neutral-500">Mountain View, CA</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Hero Visual Showcase */}
                  <div className="lg:col-span-6">
                    <div
                      onClick={() => {
                        trackViewItem(anchorProduct);
                        setQuickViewProduct(anchorProduct);
                      }}
                      className="cursor-pointer group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-md hover:shadow-lg transition-all"
                    >
                      <img
                        src={anchorProduct.image || anchorProduct.fallbackImage}
                        alt="Google Marine Layer 1998 Pullover"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (anchorProduct.fallbackImage && img.src !== window.location.origin + anchorProduct.fallbackImage) {
                            img.src = anchorProduct.fallbackImage;
                          }
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-neutral-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded backdrop-blur-xs">
                          Primary Apparel Anchor
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white/95 px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium text-neutral-800 flex items-center gap-1.5 backdrop-blur-xs">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Quick View</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Collection Filter Tabs */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-neutral-200">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">
                  {activeCategory === 'All Products' ? 'Curated Official Gear' : activeCategory}
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Showing {filteredProducts.length} items with instant fulfillment from Mountain View
                </p>
              </div>

              {/* Functional Interactive Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      trackPageView(`/category/${encodeURIComponent(cat)}`, `Google Merch - ${cat}`);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      activeCategory === cat
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:text-neutral-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Product Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200">
                <p className="text-sm font-semibold text-neutral-900">No matching merchandise found</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Try clearing your search query or selecting a different brand category.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('All Products');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-lg"
                >
                  Reset Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onQuickAdd={(p) => handleQuickAdd(p)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Value Props Strip */}
          <section className="border-t border-neutral-200 bg-white py-10 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-neutral-700 text-xs">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#4285F4] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-1">Fast US & Global Dispatch</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    All orders are inspected and dispatched directly from the Mountain View campus fulfillment hub within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#34A853] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-1">Guaranteed Authentic</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Official licensed apparel and collector vinyl items designed in tandem with Android, Chrome, and Google creative teams.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-[#EA4335] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-1">30-Day Easy Exchanges</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Not the right size? Prepaid exchange labels provided for all Marine Layer pullovers, tees, and apparel items.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-400 text-xs py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-neutral-800">
            <div>
              <div className="font-bold text-white text-base tracking-tight mb-2">
                Google Merchandise Store
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Celebrating open platforms, developer creativity, and retro tech heritage since 1998.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-2">
                Collections
              </h5>
              <ul className="space-y-1.5 text-neutral-400">
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('1998 Retro Collection');
                      setIsCheckoutActive(false);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    1998 Retro Marine Layer
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('Android Collectibles');
                      setIsCheckoutActive(false);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Android Collectibles & Plushies
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('Chrome Dino Collectibles');
                      setIsCheckoutActive(false);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Chrome Dino Vinyl
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-2">
                Customer Care
              </h5>
              <ul className="space-y-1.5 text-neutral-400">
                <li>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="hover:text-white transition-colors"
                  >
                    Apparel Sizing Guide
                  </button>
                </li>
                <li>Shipping & Fulfillment Rates ($75 Free Tier)</li>
                <li>Hassle-Free Return Policy</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-2">
                Analytics & Privacy
              </h5>
              <p className="text-neutral-400 leading-relaxed mb-3">
                GA4 event measurement active (G-GMSSTORE98). Inspect client-side dataLayer triggers.
              </p>
              <button
                onClick={() => setIsGA4Open(true)}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-md text-xs font-medium border border-neutral-700 transition-colors"
              >
                Launch GA4 Inspector
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <div>
              © 1998–2026 Google Merchandise Store Clone. Production-ready Next.js / React storefront.
            </div>
            <div className="flex items-center gap-4">
              <span>Mountain View, California</span>
              <span>·</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onSelectRelated={(p) => setQuickViewProduct(p)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutActive(true);
        }}
        onQuickAddProduct={(p) => handleQuickAdd(p)}
      />

      {/* Real-time GA4 event inspector */}
      <GA4Inspector isOpen={isGA4Open} onClose={() => setIsGA4Open(false)} />
    </div>
  );
}
