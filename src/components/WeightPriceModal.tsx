import { X, CheckCircle2 } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { Product } from '../types';

interface WeightPriceModalProps {
  product: Product;
  isOpen: boolean;
  defaultMetal?: 'gold' | 'silver';
  onClose: () => void;
  onConfirm: (params: { product: Product; grams: number; metal: 'gold' | 'silver'; price: number; }) => void;
}

const GOLD_PRICE_PER_GRAM = 12117; // 24k
const SILVER_PRICE_PER_GRAM = 185; // rs per gram

export default function WeightPriceModal({ product, isOpen, defaultMetal, onClose, onConfirm }: WeightPriceModalProps) {
  const [grams, setGrams] = useState<string>('');
  const [metal, setMetal] = useState<'gold' | 'silver'>(defaultMetal || (product.material.toLowerCase().includes('gold') ? 'gold' : 'silver'));

  useEffect(() => {
    setMetal(defaultMetal || (product.material.toLowerCase().includes('gold') ? 'gold' : 'silver'));
    setGrams('');
  }, [product, defaultMetal]);

  const price = useMemo(() => {
    const g = parseFloat(grams || '0');
    if (Number.isNaN(g) || g <= 0) return 0;
    const rate = metal === 'gold' ? GOLD_PRICE_PER_GRAM : SILVER_PRICE_PER_GRAM;
    return Math.round(g * rate);
  }, [grams, metal]);

  if (!isOpen) return null;

  const submit = () => {
    const g = parseFloat(grams || '0');
    if (!g || g <= 0) return;
    onConfirm({ product, grams: g, metal, price });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="relative p-6 border-b border-gray-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:bg-gray-50"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-xl font-bold text-gray-900">Customize your order</h3>
          <p className="text-sm text-gray-600 mt-1">{product.name}</p>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Metal</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMetal('gold')}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${metal === 'gold' ? 'bg-amber-600 text-white border-amber-700' : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400'}`}
              >
                Gold (24K) • ₹{GOLD_PRICE_PER_GRAM.toLocaleString()}/g
              </button>
              <button
                type="button"
                onClick={() => setMetal('silver')}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${metal === 'silver' ? 'bg-amber-600 text-white border-amber-700' : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400'}`}
              >
                Silver • ₹{SILVER_PRICE_PER_GRAM.toLocaleString()}/g
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (grams)</label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              placeholder="e.g. 2.5"
              className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Enter the desired weight in grams.</p>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Estimated price</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                ₹{price.toLocaleString()}
              </p>
            </div>
            <CheckCircle2 className={`w-8 h-8 ${price > 0 ? 'text-green-600' : 'text-gray-300'}`} />
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={price <= 0}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-700 hover:to-amber-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}


