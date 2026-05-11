import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiShoppingBag, FiAlertCircle } from 'react-icons/fi';
import { useCart } from '../Context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(''); 
  const [showError, setShowError] = useState(false); 
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  useEffect(() => {
    fetch(`https://stylestore-fullstack.onrender.com/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }
    
    addToCart({ ...product, size: selectedSize });
    setShowError(false);
  };

  if (loading || !product) return null;

  return (
    <div className="container mx-auto px-4 py-20 mt-10">

      <div className="flex flex-col justify-center">
        {/*BEDEN SEÇİMİ*/}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <span className={`text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${showError ? 'text-red-500' : 'text-gray-900'}`}>
              {showError ? 'Error: Please Select a Size' : 'Select Size'}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  setSelectedSize(size);
                  setShowError(false);
                }}
                className={`w-14 h-14 flex items-center justify-center text-xs font-bold border transition-all duration-300
                  ${selectedSize === size 
                    ? 'border-black bg-black text-white shadow-md' 
                    : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
              >
                {size}
              </button>
            ))}
          </div>

          {showError && (
            <div className="flex items-center gap-2 mt-4 text-red-500 text-[10px] font-bold uppercase tracking-widest animate-bounce">
              <FiAlertCircle />
              Selection Required
            </div>
          )}
        </div>

        {/*SATIN ALMA*/}
        <div className="flex flex-col gap-4">
          <button 
            type="button"
            disabled={!selectedSize} 
            onClick={handleAddToCart}
            className={`w-full py-5 flex items-center justify-center gap-3 transition-all duration-500 shadow-xl
              ${!selectedSize 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60' 
                : 'bg-black text-white hover:bg-gray-900 active:scale-95 cursor-pointer'}`}
          >
            <FiShoppingBag />
            <span className="text-xs font-black uppercase tracking-[0.2em]">
              {selectedSize ? 'Add to Bag' : 'Please Select Size'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}