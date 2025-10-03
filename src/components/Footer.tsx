import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <h3 className="text-xl font-bold text-white">Luxe Jewelry</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Discover timeless elegance with our curated collection of fine jewelry. Each piece tells a story of craftsmanship and beauty.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#shop" className="hover:text-amber-400 transition-colors">Shop</a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">Shipping & Returns</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">Size Guide</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">Care Instructions</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>123 Luxury Ave, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>info@luxejewelry.com</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Luxe Jewelry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
