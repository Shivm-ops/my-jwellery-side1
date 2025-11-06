import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import WeightPriceModal from './components/WeightPriceModal';
import ShoppingCart from './components/ShoppingCart';
import AuthForm from './components/AuthForm';
import OrdersPage from './components/OrdersPage';
import ProfilePage from './components/ProfilePage';
import Footer from './components/Footer';
import { Product, CartItem } from './types';
import { apiService } from './services/api';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [weightModalProduct, setWeightModalProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'orders' | 'profile'>('home');

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiService.getProducts();
        if (response.success) {
          setProducts(response.products);
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoryFiltered = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredProducts = normalizedSearch
    ? categoryFiltered.filter(p =>
        p.name.toLowerCase().includes(normalizedSearch) ||
        p.description.toLowerCase().includes(normalizedSearch)
      )
    : categoryFiltered;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Reset category to show all when searching
    setSelectedCategory('all');
    // Smooth scroll to shop section
    const el = document.getElementById('shop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.hash = '#shop';
    }
  };

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
      // Open cart so user can access immediately
      setIsCartOpen(true);
      
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
      // Open cart even if API failed (optimistic UX)
      setIsCartOpen(true);
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

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'orders':
        return <OrdersPage onBack={() => setCurrentPage('home')} />;
      case 'profile':
        return <ProfilePage onBack={() => setCurrentPage('home')} />;
      default:
        return (
          <>
            <Hero onSearch={handleSearch} />

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

              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                  <p className="text-xl text-gray-500 mt-4">Loading products...</p>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-xl text-red-500">{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={() => setWeightModalProduct(product)}
                        onViewDetails={setSelectedProduct}
                      />
                    ))}
                  </div>

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                      <p className="text-xl text-gray-500">No products found in this category</p>
                    </div>
                  )}
                </>
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

            <section id="contact" className="py-20 bg-gradient-to-br from-amber-50 via-white to-amber-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
                  Get in Touch
                </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
                    Have questions about our collection? Our jewelry experts are here to help you find the perfect piece. 
                    We're committed to providing exceptional service and guidance.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Contact Information */}
                  <div className="space-y-8 animate-fade-in-left">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Let's Connect</h3>
                <p className="text-lg text-gray-600 mb-8">
                        Whether you're looking for a custom piece or need help choosing the perfect gift, 
                        our jewelry experts are here to guide you every step of the way.
                      </p>
                    </div>

                    {/* Contact Cards */}
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="flex items-start space-x-4">
                          <div className="bg-amber-100 p-3 rounded-xl">
                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Phone</h4>
                            <p className="text-gray-600 mb-2">Call us for immediate assistance</p>
                            <a href="tel:+15551234567" className="text-amber-600 font-semibold hover:text-amber-700 transition-colors">
                              +91 7499404640
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="flex items-start space-x-4">
                          <div className="bg-amber-100 p-3 rounded-xl">
                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Email</h4>
                            <p className="text-gray-600 mb-2">Send us a detailed message</p>
                            <a href="mailto:info@luxejewelry.com" className="text-amber-600 font-semibold hover:text-amber-700 transition-colors">
                              info@luxejewelry.com
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="flex items-start space-x-4">
                          <div className="bg-amber-100 p-3 rounded-xl">
                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h4>
                            <p className="text-gray-600 mb-2">Come see our collection in person</p>
                            <p className="text-amber-600 font-semibold">
                              Main road kasba Beed <br />
                              kolhapur,416001
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="flex items-start space-x-4">
                          <div className="bg-amber-100 p-3 rounded-xl">
                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Store Hours</h4>
                            <div className="text-gray-600 space-y-1">
                              <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                              <p>Saturday: 10:00 AM - 6:00 PM</p>
                              <p>Sunday: 12:00 PM - 5:00 PM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="animate-fade-in-right">
                    <div className="bg-white rounded-3xl p-8 shadow-2xl">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
                        <p className="text-gray-600">We'll get back to you within 24 hours</p>
                      </div>

                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="relative">
                            <input
                              type="text"
                              name="name"
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:border-amber-500 focus:bg-amber-50"
                              placeholder="Your Name"
                            />
                          </div>
                          <div className="relative">
                            <input
                              type="email"
                              name="email"
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:border-amber-500 focus:bg-amber-50"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:border-amber-500 focus:bg-amber-50"
                            placeholder="(555) 123-4567"
                          />
                        </div>

                        <div className="relative">
                          <select
                            name="subject"
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:border-amber-500 focus:bg-amber-50"
                          >
                            <option value="">Select a subject</option>
                            <option value="general">General Inquiry</option>
                            <option value="custom">Custom Jewelry</option>
                            <option value="repair">Jewelry Repair</option>
                            <option value="appraisal">Jewelry Appraisal</option>
                            <option value="warranty">Warranty Service</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="relative">
                          <textarea
                            name="message"
                            required
                            rows={4}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:border-amber-500 focus:bg-amber-50 resize-none"
                            placeholder="Tell us how we can help you..."
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          <span>Send Message</span>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-20">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                    <p className="text-lg text-gray-600">Quick answers to common questions</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        question: "Do you offer custom jewelry design?",
                        answer: "Yes! Our master craftsmen can create custom pieces tailored to your specifications. Contact us to discuss your vision."
                      },
                      {
                        question: "What is your return policy?",
                        answer: "We offer a 30-day return policy for all jewelry in original condition. Custom pieces are non-returnable."
                      },
                      {
                        question: "Do you provide jewelry appraisals?",
                        answer: "Yes, we offer professional jewelry appraisals for insurance and estate purposes. Appointments are required."
                      },
                      {
                        question: "How long does custom jewelry take?",
                        answer: "Custom pieces typically take 4-6 weeks depending on complexity. We'll provide a detailed timeline during consultation."
                      }
                    ].map((faq, index) => (
                      <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h4>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      <Header 
        cartItemCount={totalItems} 
        onCartClick={() => setIsCartOpen(true)} 
        onAuthClick={() => setIsAuthOpen(true)}
        onOrdersClick={() => setCurrentPage('orders')}
        onProfileClick={() => setCurrentPage('profile')}
      />

      {renderCurrentPage()}

      {currentPage === 'home' && <Footer />}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {weightModalProduct && (
        <WeightPriceModal
          product={weightModalProduct}
          isOpen={true}
          onClose={() => setWeightModalProduct(null)}
          onConfirm={({ product, grams, metal, price }) => {
            // You could optionally store grams/metal/price in cart metadata if backend supports it
            addToCart(product);
            setWeightModalProduct(null);
          }}
        />
      )}

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckoutSuccess={() => setIsAuthOpen(true)}
      />

      <AuthForm
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}

export default App;
