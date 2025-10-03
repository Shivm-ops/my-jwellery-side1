import { categories } from '../data/products';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === category.slug
              ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg transform scale-105'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
