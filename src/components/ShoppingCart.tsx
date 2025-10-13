import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { apiService } from '../services/api';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckoutSuccess?: () => void;
}

export default function ShoppingCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutSuccess,
}: ShoppingCartProps) {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      console.log('💳 Starting checkout process...');
      
      // Prepare cart items for purchase
      const purchaseItems = cartItems.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        total: item.product.price * item.quantity
      }));

      // Call API to process purchase
      const result = await apiService.purchase(purchaseItems);
      
      console.log('✅ Purchase successful:', result);
      
      // Show success message (you could add a toast notification here)
      alert(`Purchase successful! Order ID: ${result.orderId}`);
      
      // Close cart after successful purchase
      onClose();
      
      // Notify parent about successful checkout
      if (onCheckoutSuccess) {
        onCheckoutSuccess();
      }
      
    } catch (error) {
      console.error('❌ Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />

      <div className="relative bg-white h-full w-full max-w-md shadow-2xl flex flex-col z-50">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some beautiful jewelry to get started!</p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-full hover:from-amber-700 hover:to-amber-800 transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-gray-50 rounded-xl p-4 flex gap-4 hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{item.product.material}</p>
                    <p className="text-lg font-bold text-amber-600">
                      ${item.product.price.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-300">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="font-semibold text-gray-900">Subtotal</span>
                <span className="font-bold text-gray-900">${total.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>{total > 500 ? 'Free' : '$25'}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between text-xl">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                  ${(total + (total > 500 ? 0 : 25)).toLocaleString()}
                </span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-full font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
