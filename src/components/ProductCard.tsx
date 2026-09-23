import React from 'react';
import { Eye, Plus, Star } from 'lucide-react';
import { Product } from '../data/products';
import { trackViewItem } from '../utils/analytics';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onQuickAdd,
}) => {
  const handleClickCard = () => {
    trackViewItem(product);
    onQuickView(product);
  };

  return (
    <div className="group flex flex-col bg-white border border-neutral-200/80 rounded-xl overflow-hidden hover:border-neutral-300 hover:shadow-md transition-all duration-200">
      {/* Image Container */}
      <div
        onClick={handleClickCard}
        className="relative cursor-pointer aspect-[4/3] w-full overflow-hidden bg-neutral-100 flex items-center justify-center"
      >
        <img
          src={product.image || product.fallbackImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const img = e.currentTarget;
            if (product.fallbackImage && img.src !== window.location.origin + product.fallbackImage) {
              img.src = product.fallbackImage;
            }
          }}
        />

        {/* Quiet 1-line badge if present */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5">
            <span className="bg-neutral-900/85 backdrop-blur-sm text-white text-[11px] font-medium tracking-tight px-2 py-0.5 rounded">
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick View overlay button */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClickCard();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-white text-neutral-900 text-xs font-semibold rounded-lg shadow-sm backdrop-blur-sm transition-transform active:scale-95 whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Brand & Rating */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
            <span className="font-medium tracking-wide uppercase text-[10px] text-neutral-600">
              {product.brand}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="tabular-nums font-medium text-neutral-700">{product.rating}</span>
              <span className="text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={handleClickCard}
            className="font-semibold text-neutral-900 text-sm leading-snug hover:text-[#4285F4] transition-colors cursor-pointer line-clamp-2"
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-neutral-900 tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => onQuickAdd(product)}
            className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors whitespace-nowrap active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
