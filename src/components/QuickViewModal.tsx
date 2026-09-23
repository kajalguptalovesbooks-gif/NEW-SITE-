import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, Ruler } from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';
import { trackAddToCart } from '../utils/analytics';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  onOpenSizeGuide: () => void;
  onSelectRelated: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
  onSelectRelated,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? product.sizes[1] || product.sizes[0] : '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors ? product.colors[0].name : '');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const handleAdd = () => {
    trackAddToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
    onAddToCart(product, quantity, selectedSize, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const relatedProducts = product.bundleSuggestions
    ? PRODUCTS.filter((p) => product.bundleSuggestions?.includes(p.id))
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product modal"
          className="absolute top-4 right-4 z-10 p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Gallery & Spec Highlights */}
          <div className="bg-neutral-50 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white border border-neutral-200 flex items-center justify-center">
              <img
                src={product.image || product.fallbackImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (product.fallbackImage && img.src !== window.location.origin + product.fallbackImage) {
                    img.src = product.fallbackImage;
                  }
                }}
              />
            </div>

            {/* Product Value Props */}
            <div className="mt-6 pt-6 border-t border-neutral-200/80 space-y-2.5 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#4285F4]" />
                <span>Free shipping over $75 · Ships from Google campus hub</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#34A853]" />
                <span>100% Official Licensed Google Merchandise</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-neutral-500" />
                <span>Hassle-free 30-day returns & exchanges</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                <span className="font-semibold uppercase tracking-wider text-[11px] text-[#4285F4]">
                  {product.category}
                </span>
                <span className="font-mono text-[11px] text-neutral-400">SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
                {product.name}
              </h2>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mt-3 pb-4 border-b border-neutral-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-neutral-900 tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through tabular-nums">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 bg-neutral-50 px-2.5 py-1 rounded-md border border-neutral-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="tabular-nums font-semibold">{product.rating}</span>
                  <span className="text-neutral-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection if available */}
              {product.colors && (
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-neutral-900">Color: {selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          selectedColor === color.name
                            ? 'ring-2 ring-[#4285F4] ring-offset-2 border-white'
                            : 'border-neutral-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection if available */}
              {product.sizes && (
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-neutral-900">Select Size:</span>
                    <button
                      onClick={onOpenSizeGuide}
                      className="text-[#4285F4] hover:underline flex items-center gap-1 font-medium text-xs"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                          selectedSize === sz
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Details Bullet Points */}
              <div className="mt-5">
                <span className="text-xs font-medium text-neutral-900 block mb-1.5">
                  Product Specifications:
                </span>
                <ul className="space-y-1 text-xs text-neutral-600 list-disc list-inside">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Purchase CTA and Quantity */}
            <div className="mt-6 pt-5 border-t border-neutral-200">
              <div className="flex items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50 px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-1 text-neutral-600 hover:text-neutral-900 font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-semibold tabular-nums text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 py-1 text-neutral-600 hover:text-neutral-900 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Primary Buy CTA */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-6 bg-neutral-900 hover:bg-neutral-800 active:scale-98 text-white font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedNotice ? 'Added to Bag! ✓' : `Add to Bag · $${(product.price * quantity).toFixed(2)}`}</span>
                </button>
              </div>

              {/* Dynamic Cross-Sell Bundle Section */}
              {relatedProducts.length > 0 && (
                <div className="mt-5 pt-4 border-t border-neutral-100">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                    Frequently Bundled With:
                  </div>
                  <div className="space-y-2">
                    {relatedProducts.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => onSelectRelated(rel)}
                        className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={rel.image || rel.fallbackImage}
                            alt={rel.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-cover rounded bg-white border border-neutral-200 shrink-0"
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (rel.fallbackImage && img.src !== window.location.origin + rel.fallbackImage) {
                                img.src = rel.fallbackImage;
                              }
                            }}
                          />
                          <div className="text-left">
                            <div className="text-xs font-medium text-neutral-900 line-clamp-1">
                              {rel.name}
                            </div>
                            <div className="text-[11px] text-neutral-500 tabular-nums">
                              ${rel.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(rel, 1);
                          }}
                          className="text-[11px] font-medium text-[#4285F4] hover:underline px-2 py-1 whitespace-nowrap"
                        >
                          + Quick Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
