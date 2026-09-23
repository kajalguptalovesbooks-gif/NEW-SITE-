import React from 'react';
import { Truck, CheckCircle2 } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '../data/products';

interface FreeShippingBarProps {
  currentSubtotal: number;
}

export const FreeShippingBar: React.FC<FreeShippingBarProps> = ({ currentSubtotal }) => {
  const diff = FREE_SHIPPING_THRESHOLD - currentSubtotal;
  const percentage = Math.min(100, Math.max(0, (currentSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const isUnlocked = diff <= 0;

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between text-xs font-medium">
        <div className="flex items-center gap-1.5 text-neutral-800">
          {isUnlocked ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <Truck className="w-4 h-4 text-[#4285F4]" />
          )}
          <span>
            {isUnlocked ? (
              <span className="text-emerald-700 font-semibold">
                You've unlocked FREE Standard Shipping!
              </span>
            ) : (
              <span>
                Add <strong className="text-neutral-900 tabular-nums">${diff.toFixed(2)}</strong> more for{' '}
                <strong className="text-[#4285F4]">FREE Shipping</strong>
              </span>
            )}
          </span>
        </div>
        <span className="text-neutral-500 tabular-nums text-[11px]">
          ${currentSubtotal.toFixed(2)} / ${FREE_SHIPPING_THRESHOLD.toFixed(2)}
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${
            isUnlocked ? 'bg-emerald-500' : 'bg-[#4285F4]'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
