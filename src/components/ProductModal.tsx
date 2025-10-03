import { X, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
              {product.featured && (
                <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Featured
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
                <p className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent mb-6">
                  ${product.price.toLocaleString()}
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Material</p>
                      <p className="text-gray-600">{product.material}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Category</p>
                      <p className="text-gray-600 capitalize">{product.category}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Availability</p>
                      <p className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Free shipping on orders over $500</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Lifetime warranty</span>
                  </div>
                </div>
              </div>

              {product.inStock && (
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-full font-semibold flex items-center justify-center space-x-2 hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
