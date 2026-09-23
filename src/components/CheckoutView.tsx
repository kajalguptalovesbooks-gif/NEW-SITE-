import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, CreditCard, Lock, Package } from 'lucide-react';
import { CartItem } from './CartDrawer';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from '../data/products';
import { trackPurchase } from '../utils/analytics';

interface CheckoutViewProps {
  items: CartItem[];
  onBackToShopping: () => void;
  onOrderSuccess: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  items,
  onBackToShopping,
  onOrderSuccess,
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const standardShipping = isFreeShipping ? 0 : STANDARD_SHIPPING_COST;

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const shippingCost = shippingMethod === 'standard' ? standardShipping : 14.00;
  const tax = subtotal * 0.0825;
  const total = subtotal + shippingCost + tax;

  // Form states
  const [formData, setFormData] = useState({
    email: 'alex.chen@example.com',
    firstName: 'Alex',
    lastName: 'Chen',
    address: '1600 Amphitheatre Pkwy',
    apartment: 'Bldg 43',
    city: 'Mountain View',
    state: 'CA',
    zip: '94043',
    paymentMethod: 'gpay', // 'gpay' or 'card'
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    trackingId: string;
    total: number;
    email: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderNumber = 'GMS-' + Math.floor(100000 + Math.random() * 900000);
    const trackingId = 'FX-98' + Math.floor(10000000 + Math.random() * 90000000);

    setTimeout(() => {
      // Track GA4 purchase event
      trackPurchase({
        transaction_id: orderNumber,
        value: total,
        shipping: shippingCost,
        tax: tax,
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          brand: i.product.brand,
          category: i.product.category,
          price: i.product.price,
          quantity: i.quantity,
        })),
      });

      setIsProcessing(false);
      setCompletedOrder({
        orderNumber,
        trackingId,
        total,
        email: formData.email,
      });
      onOrderSuccess();
    }, 900);
  };

  // Order Confirmed State
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-10 shadow-sm text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-wider text-[#34A853]">
            Payment & Order Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
            Thank you for your order!
          </h1>
          <p className="text-sm text-neutral-600 mt-2 max-w-md mx-auto">
            A confirmation receipt has been dispatched to{' '}
            <strong className="text-neutral-900">{completedOrder.email}</strong>. Your merchandise is being prepared at the Mountain View fulfillment center.
          </p>

          {/* Order Details Card */}
          <div className="mt-8 bg-neutral-50 rounded-xl p-5 border border-neutral-200 text-left grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-neutral-500 block">Order Number</span>
              <strong className="text-sm font-mono text-neutral-900">
                #{completedOrder.orderNumber}
              </strong>
            </div>
            <div>
              <span className="text-neutral-500 block">FedEx Tracking</span>
              <strong className="text-sm font-mono text-[#4285F4]">
                {completedOrder.trackingId}
              </strong>
            </div>
            <div>
              <span className="text-neutral-500 block">Total Charged</span>
              <strong className="text-sm font-bold text-neutral-900 tabular-nums">
                ${completedOrder.total.toFixed(2)}
              </strong>
            </div>
          </div>

          {/* Fulfillment steps */}
          <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-6 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#4285F4]" />
              <span>Status: <strong>Order Queued for Dispatch (24h)</strong></span>
            </div>
            <button
              onClick={onBackToShopping}
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header back button */}
      <div className="mb-6">
        <button
          onClick={onBackToShopping}
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store Catalog</span>
        </button>
        <h1 className="text-2xl font-bold text-neutral-900 mt-2">
          Express Single-Page Checkout
        </h1>
        <p className="text-xs text-neutral-500">
          Streamlined single-page flow with instant order review & zero friction.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Contact Information */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                1. Contact Information
              </h2>
              <span className="text-[11px] text-neutral-500">Fast checkout enabled</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Email Address for Receipt
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4285F4]"
              />
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide mb-4">
              2. Shipping Address
            </h2>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4285F4]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4285F4]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4285F4]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4285F4]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4285F4]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4285F4]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Delivery Method */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide mb-3">
              3. Delivery Speed
            </h2>
            <div className="space-y-2">
              <label
                onClick={() => setShippingMethod('standard')}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                  shippingMethod === 'standard'
                    ? 'border-[#4285F4] bg-blue-50/20'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-3 text-xs">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="text-[#4285F4]"
                  />
                  <div>
                    <div className="font-semibold text-neutral-900">
                      FedEx Ground Standard (3–5 Business Days)
                    </div>
                    <div className="text-neutral-500 text-[11px]">
                      Dispatched from Google Mountain View Fulfillment Center
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold tabular-nums">
                  {standardShipping === 0 ? (
                    <span className="text-emerald-700">FREE</span>
                  ) : (
                    `$${standardShipping.toFixed(2)}`
                  )}
                </span>
              </label>

              <label
                onClick={() => setShippingMethod('express')}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                  shippingMethod === 'express'
                    ? 'border-[#4285F4] bg-blue-50/20'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-3 text-xs">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="text-[#4285F4]"
                  />
                  <div>
                    <div className="font-semibold text-neutral-900">
                      FedEx Priority 2-Day Air (1–2 Business Days)
                    </div>
                    <div className="text-neutral-500 text-[11px]">
                      Expedited processing and guaranteed delivery window
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold tabular-nums">$14.00</span>
              </label>
            </div>
          </div>

          {/* 4. Payment Options */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                4. Payment Method
              </h2>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <Lock className="w-3 h-3" />
                <span>SSL Encrypted</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Google Pay option */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'gpay' })}
                className={`w-full p-3 rounded-lg border flex items-center justify-between text-xs transition-colors ${
                  formData.paymentMethod === 'gpay'
                    ? 'border-[#4285F4] bg-blue-50/20 ring-1 ring-[#4285F4]'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-neutral-400 flex items-center justify-center">
                    {formData.paymentMethod === 'gpay' && (
                      <div className="w-2 h-2 rounded-full bg-[#4285F4]" />
                    )}
                  </div>
                  <span className="font-semibold text-neutral-900">Google Pay</span>
                </div>
                <span className="text-[11px] font-medium text-neutral-500">
                  One-tap encrypted billing
                </span>
              </button>

              {/* Credit Card option */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                className={`w-full p-3 rounded-lg border flex items-center justify-between text-xs transition-colors ${
                  formData.paymentMethod === 'card'
                    ? 'border-[#4285F4] bg-blue-50/20 ring-1 ring-[#4285F4]'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-neutral-400 flex items-center justify-center">
                    {formData.paymentMethod === 'card' && (
                      <div className="w-2 h-2 rounded-full bg-[#4285F4]" />
                    )}
                  </div>
                  <span className="font-semibold text-neutral-900">Credit or Debit Card</span>
                </div>
                <CreditCard className="w-4 h-4 text-neutral-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Review (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs sticky top-24 space-y-4">
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide pb-3 border-b border-neutral-200">
              Order Summary ({items.reduce((acc, i) => acc + i.quantity, 0)} Items)
            </h2>

            {/* Itemized summary */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-neutral-100">
              {items.map((item, idx) => (
                <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 object-cover rounded bg-neutral-100 border border-neutral-200 shrink-0"
                    />
                    <div>
                      <div className="font-medium text-neutral-900 line-clamp-1">
                        {item.product.name}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Qty: {item.quantity} {item.selectedSize ? `· ${item.selectedSize}` : ''}
                      </div>
                    </div>
                  </div>
                  <span className="font-semibold tabular-nums text-neutral-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="pt-3 border-t border-neutral-200 space-y-2 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping ({shippingMethod === 'standard' ? 'Standard' : 'Express'})</span>
                <span className="font-semibold tabular-nums">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-700">FREE</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8.25%)</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="pt-3 border-t border-neutral-200 flex justify-between text-base font-bold text-neutral-900">
                <span>Total Due</span>
                <span className="tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-4 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>
                {isProcessing ? 'Processing Order...' : `Complete Order · $${total.toFixed(2)}`}
              </span>
            </button>

            <div className="text-[11px] text-center text-neutral-400 flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Google Merchandise Store Guarantee</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
