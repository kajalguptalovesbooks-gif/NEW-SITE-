import React, { useState, useEffect } from 'react';
import { X, Activity, Check, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { AnalyticsEvent, recentEvents, subscribeAnalytics } from '../utils/analytics';

interface GA4InspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GA4Inspector: React.FC<GA4InspectorProps> = ({ isOpen, onClose }) => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([...recentEvents]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeAnalytics((newEvent) => {
      setEvents((prev) => [newEvent, ...prev.slice(0, 29)]);
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const handleCopy = (evt: AnalyticsEvent) => {
    navigator.clipboard.writeText(JSON.stringify(evt, null, 2));
    setCopiedId(evt.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] bg-neutral-900 text-white rounded-2xl shadow-2xl border border-neutral-700 overflow-hidden text-xs animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Inspector Header */}
      <div className="p-3.5 bg-neutral-800/90 border-b border-neutral-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-neutral-100 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#4285F4]" />
            GA4 Event Stream (gtag.js)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-neutral-400 font-mono">G-GMSSTORE98</span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-700 rounded text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description info */}
      <div className="px-3.5 py-2 bg-neutral-900/90 border-b border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
        <span>Tracking real-time e-commerce user actions</span>
        <span className="font-mono text-[10px] text-neutral-500">{events.length} dispatched</span>
      </div>

      {/* Events List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-neutral-800 p-2 space-y-1">
        {events.length === 0 ? (
          <div className="p-6 text-center text-neutral-500 text-xs">
            Interact with the store to trigger GA4 events...
          </div>
        ) : (
          events.map((evt) => {
            const isExpanded = expandedId === evt.id;
            const badgeColor =
              evt.eventName === 'purchase'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                : evt.eventName === 'add_to_cart'
                ? 'bg-blue-950 text-blue-300 border border-blue-700'
                : evt.eventName === 'begin_checkout'
                ? 'bg-amber-950 text-amber-300 border border-amber-700'
                : 'bg-neutral-800 text-neutral-300 border border-neutral-700';

            return (
              <div
                key={evt.id}
                className="bg-neutral-800/60 hover:bg-neutral-800 rounded-lg p-2.5 transition-colors"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : evt.id)}
                  className="flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${badgeColor}`}
                    >
                      {evt.eventName}
                    </span>
                    <span className="text-neutral-400 font-mono text-[10px]">
                      {evt.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(evt);
                      }}
                      className="p-1 text-neutral-400 hover:text-white rounded"
                      title="Copy JSON Payload"
                    >
                      {copiedId === evt.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                    )}
                  </div>
                </div>

                {/* Expanded JSON payload */}
                {isExpanded && (
                  <pre className="mt-2 p-2 bg-black/70 rounded text-[10px] font-mono text-neutral-300 overflow-x-auto leading-relaxed border border-neutral-800">
                    {JSON.stringify(evt.params, null, 2)}
                  </pre>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="p-2.5 bg-neutral-800/70 border-t border-neutral-800 text-[10px] text-neutral-400 text-center">
        Verified with window.dataLayer & gtag('event', ...)
      </div>
    </div>
  );
};
