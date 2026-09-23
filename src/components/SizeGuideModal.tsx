import React from 'react';
import { X, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close size guide"
          className="absolute top-4 right-4 p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#4285F4]">
            Fit & Measurements
          </span>
          <h2 className="text-xl font-bold text-neutral-900 mt-1">
            Google Merchandise Sizing Guide
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            All dimensions listed below in inches. Standard unisex retail fit.
          </p>

          {/* Sizing Table */}
          <div className="mt-6 overflow-x-auto border border-neutral-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 border-b border-neutral-200 font-semibold text-neutral-700 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Chest (in)</th>
                  <th className="py-3 px-4">Body Length (in)</th>
                  <th className="py-3 px-4">Sleeve Length (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-600 tabular-nums">
                <tr className="hover:bg-neutral-50/50">
                  <td className="py-2.5 px-4 font-semibold text-neutral-900">XS</td>
                  <td className="py-2.5 px-4">34 - 36</td>
                  <td className="py-2.5 px-4">26.5</td>
                  <td className="py-2.5 px-4">32.5</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="py-2.5 px-4 font-semibold text-neutral-900">S</td>
                  <td className="py-2.5 px-4">36 - 38</td>
                  <td className="py-2.5 px-4">27.5</td>
                  <td className="py-2.5 px-4">33.5</td>
                </tr>
                <tr className="hover:bg-neutral-50/50 bg-blue-50/30">
                  <td className="py-2.5 px-4 font-semibold text-neutral-900">M (Standard)</td>
                  <td className="py-2.5 px-4 font-medium text-neutral-900">39 - 41</td>
                  <td className="py-2.5 px-4 font-medium text-neutral-900">28.5</td>
                  <td className="py-2.5 px-4 font-medium text-neutral-900">34.5</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="py-2.5 px-4 font-semibold text-neutral-900">L</td>
                  <td className="py-2.5 px-4">42 - 44</td>
                  <td className="py-2.5 px-4">29.5</td>
                  <td className="py-2.5 px-4">35.5</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="py-2.5 px-4 font-semibold text-neutral-900">XL</td>
                  <td className="py-2.5 px-4">45 - 48</td>
                  <td className="py-2.5 px-4">30.5</td>
                  <td className="py-2.5 px-4">36.5</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="py-2.5 px-4 font-semibold text-neutral-900">2XL</td>
                  <td className="py-2.5 px-4">49 - 52</td>
                  <td className="py-2.5 px-4">31.5</td>
                  <td className="py-2.5 px-4">37.5</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Measuring Tips */}
          <div className="mt-6 space-y-2 text-xs text-neutral-600 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
            <div className="font-semibold text-neutral-900">Measurement Tips:</div>
            <div className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-[#34A853] shrink-0 mt-0.5" />
              <span><strong>Chest:</strong> Measure around the fullest part of the chest, keeping tape horizontal.</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-[#34A853] shrink-0 mt-0.5" />
              <span><strong>Marine Layer Pullover Fit:</strong> Fits true to size for a relaxed retro pullover layer. If in-between sizes, size up.</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
