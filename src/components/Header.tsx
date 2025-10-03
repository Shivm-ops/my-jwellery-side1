import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export default function Header({ cartItemCount, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                Luxe Jewelry
              </h1>
              <p className="text-xs text-gray-500 tracking-wide">Fine Jewelry Collection</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Home
            </a>
            <a href="#shop" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Shop
            </a>
            <a href="#about" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="#" className="block py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Home
            </a>
            <a href="#shop" className="block py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Shop
            </a>
            <a href="#about" className="block py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="block py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Contact
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
