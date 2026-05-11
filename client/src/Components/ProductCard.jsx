import { Link } from 'react-router-dom';
import { FiHeart, FiSearch } from 'react-icons/fi';
import { useFavorites } from '../Context/FavoritesContext';

export default function ProductCard({ product }) {
  const { toggleFavorite, isFavorited } = useFavorites();
  const favorited = isFavorited(product.Id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();   
    e.stopPropagation();  
    toggleFavorite(product);
  };

  return (
    <div className="group relative bg-white border border-transparent hover:border-gray-100 transition-all duration-500">
      
      {/*GÖRSEL ALANI*/}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <Link to={`/product/${product.Id}`} className="block w-full h-full">
          <img 
            src={product.ImageUrl} 
            alt={product.Name} 
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/*FAVORİ BUTONU*/}
        <button 
          onClick={handleFavoriteClick}
          type="button"
          className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all z-40 cursor-pointer border-none outline-none"
        >
          <FiHeart className={`text-lg ${favorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-40">
          <Link 
            to={`/product/${product.Id}`}
            className="w-full bg-black text-white py-4 flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors shadow-xl"
          >
            <FiSearch className="text-sm" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">View Details</span>
          </Link>
        </div>
      </div>

      {/*METİN ALANI*/}
      <div className="py-5 px-1 text-center">
        <Link to={`/product/${product.Id}`}>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900 mb-1.5 hover:opacity-60 transition-opacity">
            {product.Name}
          </h3>
          <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
            ${Number(product.Price).toFixed(2)}
          </p>
        </Link>
      </div>
    </div>
  );
}