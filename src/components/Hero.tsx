import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-20 bg-gradient-to-br from-amber-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Timeless Elegance Since 1990</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-amber-900 to-gray-900 bg-clip-text text-transparent">
                Discover Your Perfect
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                Piece of Forever
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Explore our exquisite collection of handcrafted jewelry, where timeless elegance meets modern design. Each piece is carefully selected to celebrate life's precious moments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#shop"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-full hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Shop Collection
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-amber-700 font-semibold rounded-full border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-3xl blur-3xl"></div>
            <img
              src="https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Luxury jewelry collection"
              className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
              <div className="flex items-center space-x-4">
                <div className="bg-amber-100 rounded-full p-3">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">5000+</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
