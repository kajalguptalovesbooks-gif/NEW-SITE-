// GA4 Event Tracking & gtag.js Integration
// Implements GA4 Ecommerce Recommended Event Schema

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export interface AnalyticsEvent {
  id: string;
  eventName: 'page_view' | 'view_item' | 'add_to_cart' | 'begin_checkout' | 'purchase';
  params: Record<string, any>;
  timestamp: string;
}

type EventListener = (event: AnalyticsEvent) => void;
const listeners: EventListener[] = [];
export const recentEvents: AnalyticsEvent[] = [];

export function subscribeAnalytics(listener: EventListener) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx > -1) listeners.splice(idx, 1);
  };
}

function dispatchGtag(eventName: AnalyticsEvent['eventName'], params: Record<string, any>) {
  const event: AnalyticsEvent = {
    id: 'evt_' + Math.random().toString(36).substring(2, 9),
    eventName,
    params,
    timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
  };

  recentEvents.unshift(event);
  if (recentEvents.length > 30) recentEvents.pop();

  // Push to window.dataLayer
  if (typeof window !== 'undefined') {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(['event', eventName, params]);
    }
  }

  listeners.forEach(fn => fn(event));
}

// 1. page_view
export function trackPageView(pagePath: string, pageTitle: string) {
  dispatchGtag('page_view', {
    page_location: window.location.href,
    page_path: pagePath,
    page_title: pageTitle
  });
}

// 2. view_item
export function trackViewItem(product: {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
}) {
  dispatchGtag('view_item', {
    currency: 'USD',
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_brand: product.brand,
        item_category: product.category,
        price: product.price,
        quantity: 1
      }
    ]
  });
}

// 3. add_to_cart
export function trackAddToCart(product: {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}) {
  dispatchGtag('add_to_cart', {
    currency: 'USD',
    value: product.price * product.quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_brand: product.brand,
        item_category: product.category,
        item_variant: [product.color, product.size].filter(Boolean).join(' / ') || undefined,
        price: product.price,
        quantity: product.quantity
      }
    ]
  });
}

// 4. begin_checkout
export function trackBeginCheckout(items: Array<{
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
}>, cartValue: number) {
  dispatchGtag('begin_checkout', {
    currency: 'USD',
    value: cartValue,
    coupon: cartValue >= 75 ? 'FREESHIP75' : undefined,
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_brand: item.brand,
      item_category: item.category,
      price: item.price,
      quantity: item.quantity
    }))
  });
}

// 5. purchase
export function trackPurchase(order: {
  transaction_id: string;
  value: number;
  shipping: number;
  tax: number;
  items: Array<{
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    quantity: number;
  }>;
}) {
  dispatchGtag('purchase', {
    transaction_id: order.transaction_id,
    affiliation: 'Google Merchandise Store Online',
    value: order.value,
    tax: order.tax,
    shipping: order.shipping,
    currency: 'USD',
    items: order.items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_brand: item.brand,
      item_category: item.category,
      price: item.price,
      quantity: item.quantity
    }))
  });
}
