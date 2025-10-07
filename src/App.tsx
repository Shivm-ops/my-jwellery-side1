import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import ShoppingCart from './components/ShoppingCart';
import AuthForm from './components/AuthForm';
import Footer from './components/Footer';
import { products } from './data/products';
import { Product, CartItem } from './types';
import { apiService } from './services/api';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const addToCart = async (product: Product) => {
    try {
      // Call API to add item to cart
      await apiService.addToCart(product.id, 1);
      
      // Update local state
      setCartItems(prev => {
        const existingItem = prev.find(item => item.product.id === product.id);
        if (existingItem) {
          return prev.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
      
      console.log(`✅ Successfully added ${product.name} to cart`);
    } catch (error) {
      console.error('❌ Failed to add item to cart:', error);
      // Still update local state for better UX, but log the error
      setCartItems(prev => {
        const existingItem = prev.find(item => item.product.id === product.id);
        if (existingItem) {
          return prev.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    try {
      // Call API to update cart item
      await apiService.updateCartItem(productId, newQuantity);
      
      // Update local state
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      
      console.log(`✅ Successfully updated quantity for product ${productId} to ${newQuantity}`);
    } catch (error) {
      console.error('❌ Failed to update cart item:', error);
      // Still update local state for better UX
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const removeItem = async (productId: string) => {
    try {
      // Call API to remove item from cart
      await apiService.removeFromCart(productId);
      
      // Update local state
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
      
      console.log(`✅ Successfully removed product ${productId} from cart`);
    } catch (error) {
      console.error('❌ Failed to remove item from cart:', error);
      // Still update local state for better UX
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      <Header 
        cartItemCount={totalItems} 
        onCartClick={() => setIsCartOpen(true)} 
        onAuthClick={() => setIsAuthOpen(true)} 
      />

      <Hero />

      <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our carefully curated selection of exquisite jewelry pieces
          </p>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onViewDetails={setSelectedProduct}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No products found in this category</p>
          </div>
        )}
      </section>

      <section id="about" className="bg-gradient-to-br from-amber-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Crafted with Excellence
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Since 1990, Luxe Jewelry has been dedicated to creating timeless pieces that celebrate life's most precious moments. Each item in our collection is carefully selected or crafted to meet the highest standards of quality and beauty.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our expert artisans combine traditional techniques with modern design to create jewelry that tells your unique story. From engagement rings to everyday elegance, we're here to help you find the perfect piece.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-600 mb-2">5000+</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-600 mb-2">30+</p>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-600 mb-2">100%</p>
                  <p className="text-sm text-gray-600">Satisfaction</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Jewelry craftsmanship"
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Have questions about our collection? Our jewelry experts are here to help you find the perfect piece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5551234567"
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-full hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Call Us: (555) 123-4567
            </a>
            <a
              href="mailto:info@luxejewelry.com"
              className="px-8 py-4 bg-white text-amber-700 font-semibold rounded-full border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      <AuthForm
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}

export default App;
