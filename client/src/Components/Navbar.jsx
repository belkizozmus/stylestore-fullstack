import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiSearch, FiHeart, FiShoppingBag, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

export default function Navbar({ onMenuOpen }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop/all?search=${searchQuery.trim()}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-[oklch(39.3%_0.095_152.535)] text-white shadow-sm sticky top-0 z-[60]">
      <div className="container mx-auto px-4 lg:px-8 h-14 flex items-center justify-between relative">
        
        {/* Sol: Menü Butonu*/}
        <div className="flex-1 flex justify-start">
          <button onClick={onMenuOpen} className="text-xl hover:text-gray-300 cursor-pointer p-2">
            <FiMenu />
          </button>
        </div>

        {/*Orta: Logo*/}
        <div className={`flex-1 flex justify-center ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}>
          <Link to="/" className="text-xl md:text-2xl font-black tracking-[0.25em] uppercase">
            STYLESTORE.
          </Link>
        </div>

        {/*Sağ: İkonlar ve Arama*/}
        <div className="flex-1 flex justify-end items-center gap-2 md:gap-5">
          
          {/*Arama Kutusu*/}
          <form 
            onSubmit={handleSearch}
            className={`absolute inset-x-4 md:inset-x-auto md:right-32 bg-[oklch(39.3%_0.095_152.535)] flex items-center transition-all duration-300 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          >
            <input 
              type="text"
              placeholder="SEARCH PRODUCTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-b border-white/30 text-[10px] font-bold tracking-widest uppercase py-1 outline-none w-40 md:w-64 placeholder:text-white/50"
              autoFocus={isSearchOpen}
            />
          </form>

          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-lg hover:text-gray-300 p-2">
            {isSearchOpen ? <FiX /> : <FiSearch />}
          </button>

          <Link to="/favorites" className="text-lg hover:text-gray-300 hidden sm:block">
            <FiHeart />
          </Link>

          <Link to="/cart" className="relative p-2">
            <FiShoppingBag className="text-xl" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-white text-[oklch(39.3%_0.095_152.535)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}