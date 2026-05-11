import { useFavorites } from '../Context/FavoritesContext';
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-[60vh]">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-black uppercase tracking-[0.2em] mb-2">MY WISHLIST</h1>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{favorites.length} ITEMS SAVED</p>
      </header>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50/50 rounded-lg">
          <p className="text-gray-400 uppercase tracking-widest text-[10px] mb-6">Your wishlist is empty.</p>
          <Link to="/" className="inline-block bg-black text-white px-10 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}