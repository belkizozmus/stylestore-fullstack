import { FiX, FiRotateCcw, FiHelpCircle, FiTruck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function MobileMenu({ isOpen, onClose }) {
  
  const handleCloseAll = () => {
    onClose();
  };

  const categories = [
    { name: "Dresses", path: "/shop/dresses" },
    { name: "T-shirts", path: "/shop/t-shirts" },
    { name: "Sweatpants", path: "/shop/sweatpants" }
  ];

  return (
    <>
      {/*Background Overlay*/}
      <div 
        className={`fixed inset-0 bg-black/40 z-[90] transition-opacity duration-300 
          ${isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={handleCloseAll}
      />

      {/*Menu Panel*/}
      <div className={`fixed inset-y-0 left-0 w-full max-w-xs bg-white z-[100] shadow-2xl transition-transform duration-300 flex flex-col
        ${isOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}`}
      >
        {/* Top Header*/}
        <div className="p-6 h-20 flex-shrink-0 flex items-center justify-end">
          <button onClick={handleCloseAll} className="text-2xl text-black outline-none cursor-pointer"><FiX /></button>
        </div>

        {/*Menu Content*/}
        <div className="flex-grow overflow-y-auto px-10 pb-10">
          <nav className="flex flex-col space-y-8">
            {categories.map((cat) => (
              <Link 
                key={cat.name} 
                to={cat.path} 
                onClick={handleCloseAll}
                className="text-[14px] text-gray-800 hover:text-black transition-colors tracking-[0.1em] font-medium"
              >
                {cat.name.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer Navigation */}
        <div className="flex-shrink-0 w-full border-t border-gray-50 p-8 bg-white">
          <div className="grid grid-cols-3 gap-2">
            <Link to="/returns" onClick={handleCloseAll} className="flex flex-col items-center gap-2 text-gray-400 hover:text-black transition-colors">
              <FiRotateCcw className="text-lg" />
              <span className="text-[8px] font-bold uppercase tracking-widest">Returns</span>
            </Link>
            <Link to="/help" onClick={handleCloseAll} className="flex flex-col items-center gap-2 text-gray-400 hover:text-black transition-colors">
              <FiHelpCircle className="text-lg" />
              <span className="text-[8px] font-bold uppercase tracking-widest">Help</span>
            </Link>
            <Link to="/track" onClick={handleCloseAll} className="flex flex-col items-center gap-2 text-gray-400 hover:text-black transition-colors">
              <FiTruck className="text-lg" />
              <span className="text-[8px] font-bold uppercase tracking-widest">Track</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}