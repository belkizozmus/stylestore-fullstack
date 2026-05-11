import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom'; 

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = Number(item.Price) || 0; 
    return acc + (itemPrice * item.quantity);
  }, 0);

  const shipping = cartItems.length > 0 ? 15.00 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-20 mt-10">
      <h1 className="text-center text-2xl font-bold mb-10 tracking-[0.2em] uppercase">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-grow space-y-6">
          {cartItems.map((item) => (
            <div key={`${item.Id}-${item.size}`} className="flex gap-6 border-b border-gray-100 pb-6 relative">
              <div className="w-24 h-32 bg-gray-50 overflow-hidden">
                <img 
                  src={item.ImageUrl} 
                  alt={item.Name} 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="flex flex-col justify-between py-1">
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-widest">{item.Name}</h3>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase">Size: {item.size}</p>
                </div>
                
                <div className="flex items-center border border-gray-100 w-fit">
                  <button 
                    onClick={() => updateQuantity(item.Id, item.size, item.quantity - 1)} 
                    className="px-4 py-1 text-xs hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-[10px] font-bold border-x border-gray-100 min-w-[30px] text-center">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => updateQuantity(item.Id, item.size, item.quantity + 1)} 
                    className="px-4 py-1 text-xs hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="ml-auto text-[11px] font-black tracking-widest">
                ${(Number(item.Price) * item.quantity).toFixed(2)}
              </div>

              {/*REMOVE BUTONU*/}
              <button 
                onClick={() => removeFromCart(item.Id, item.size)}
                className="absolute bottom-6 right-0 text-[8px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 hover:text-black transition-colors cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}

          {cartItems.length === 0 && (
            <div className="text-center py-20 text-gray-400 uppercase tracking-widest text-xs">
              Your bag is empty
            </div>
          )}
        </div>

        {/*ÖZET ALANI*/}
        <div className="w-full lg:w-96 bg-gray-50/50 p-8 h-fit border border-gray-50">
          <h2 className="text-[12px] font-bold uppercase tracking-widest mb-8 border-b border-gray-100 pb-4">Order Summary</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-[11px] font-medium tracking-widest uppercase">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] font-medium tracking-widest uppercase">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between text-[13px] font-black tracking-[0.2em] uppercase border-t border-gray-200 pt-6 mb-8">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button 
            onClick={() => navigate('/checkout')}
            disabled={cartItems.length === 0}
            className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl active:scale-[0.98] 
              ${cartItems.length === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-900 cursor-pointer'}`}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}