import React from 'react';
import { X, ShoppingBag, ArrowRight, Trash2, ShieldCheck, Clock } from 'lucide-react';
import { Product, PRODUCTS, STANDARD_SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '../data/products';
import { FreeShippingBar } from './FreeShippingBar';
import { trackBeginCheckout } from '../utils/analytics';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  onQuickAddProduct: (product: Product) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onQuickAddProduct,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_COST;
  const estimatedTax = subtotal * 0.0825;
  const total = subtotal + shippingCost + estimatedTax;

  const handleCheckoutClick = () => {
    trackBeginCheckout(
      items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        brand: i.product.brand,
        category: i.product.category,
        price: i.product.price,
        quantity: i.quantity,
      })),
      subtotal
    );
    onProceedToCheckout();
  };

  // Cross-sell suggestion: item not yet in cart
  const cartProductIds = new Set(items.map((i) => i.product.id));
  const suggestedProduct = PRODUCTS.find((p) => !cartProductIds.has(p.id)) || PRODUCTS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="text-base font-bold text-neutral-900">Your Cart</h2>
              <span className="text-xs font-semibold bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full tabular-nums">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Free Shipping Threshold Tracker */}
          <div className="px-4 py-3 border-b border-neutral-100 bg-white">
            <FreeShippingBar currentSubtotal={subtotal} />
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-neutral-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-neutral-900">Your bag is empty</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                  Browse Google's 1998 retro collection, Android collectibles, and developer gear.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={`${item.product.id}-${index}`} className="flex gap-3 pt-4 first:pt-0">
                    <img
                      src={item.product.image || item.product.fallbackImage}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-18 h-18 object-cover rounded-lg border border-neutral-200 bg-neutral-50 shrink-0"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (item.product.fallbackImage && img.src !== window.location.origin + item.product.fallbackImage) {
                          img.src = item.product.fallbackImage;
                        }
                      }}
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(index)}
                            aria-label={`Remove ${item.product.name} from cart`}
                            className="text-neutral-400 hover:text-red-600 p-0.5 ml-2 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Variants if chosen */}
                        <div className="text-[11px] text-neutral-500 mt-0.5 space-x-1.5">
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedColor && (
                            <>
                              <span>·</span>
                              <span>{item.selectedColor}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-neutral-200 rounded bg-neutral-50 text-xs">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="px-2 py-0.5 text-neutral-600 hover:text-neutral-900 font-semibold"
                          >
                            -
                          </button>
                          <span className="w-6 text-center tabular-nums font-semibold text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="px-2 py-0.5 text-neutral-600 hover:text-neutral-900 font-semibold"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-bold text-neutral-900 tabular-nums">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Bundle Cross-Sell Add-On */}
                {suggestedProduct && (
                  <div className="mt-6 pt-4 border-t border-dashed border-neutral-200 bg-neutral-50 p-3 rounded-xl">
                    <div className="text-[11px] font-semibold text-neutral-700 flex items-center justify-between mb-2">
                      <span>Pairs well with your order:</span>
                      <span className="text-[#4285F4]">Featured</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={suggestedProduct.image || suggestedProduct.fallbackImage}
                          alt={suggestedProduct.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 object-cover rounded bg-white border border-neutral-200 shrink-0"
                          onError={(e) => {
                            const img = e.currentTarget;
                            if (suggestedProduct.fallbackImage && img.src !== window.location.origin + suggestedProduct.fallbackImage) {
                              img.src = suggestedProduct.fallbackImage;
                            }
                          }}
                        />
                        <div>
                          <div className="text-xs font-medium text-neutral-900 line-clamp-1">
                            {suggestedProduct.name}
                          </div>
                          <div className="text-[11px] text-neutral-500 tabular-nums">
                            ${suggestedProduct.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onQuickAddProduct(suggestedProduct)}
                        className="text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Drawer Footer & Upfront Shipping Cost Transparency */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50/50 space-y-3">
              {/* Shipping & Fulfillment Transparency Note */}
              <div className="flex items-center gap-2 text-[11px] text-neutral-600 bg-white p-2.5 rounded-lg border border-neutral-200">
                <Clock className="w-3.5 h-3.5 text-[#4285F4] shrink-0" />
                <span>
                  <strong>Estimated Delivery:</strong> 3–5 business days via FedEx Tracked Ground.
                </span>
              </div>

              {/* Cost Calculations */}
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900 tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Estimated Shipping</span>
                  <span className="font-medium tabular-nums">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase text-[11px]">
                        FREE
                      </span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Sales Tax</span>
                  <span className="font-medium text-neutral-900 tabular-nums">
                    ${estimatedTax.toFixed(2)}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-bold text-neutral-900">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 active:scale-98 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <span>Proceed to Single-Page Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-bit encrypted checkout with Google Pay & Cards</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
