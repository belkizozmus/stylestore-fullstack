import { useState } from 'react';
export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLocateShipment = async (e) => {
    e.preventDefault();
    if (!orderId) return alert("Please enter a valid Order ID.");
    
    setLoading(true);
    try {
      const cleanId = orderId.replace('#', '');
      const response = await fetch(`https://stylestore-fullstack.onrender.com/api/orders/${cleanId}`);
      
      if (response.ok) {
        const data = await response.json();
        setOrderStatus(data); 
      } else {
        alert("Order not found. Please check your ID.");
        setOrderStatus(null);
      }
    } catch (error) {
      console.error("Tracking error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-32 max-w-2xl text-center">
      <h1 className="text-2xl font-bold uppercase tracking-[0.3em] mb-4">Track Order</h1>
      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-16">
        Enter your order ID found in your confirmation email.
      </p>

      <form onSubmit={handleLocateShipment} className="space-y-8">
        <div className="relative border-b border-gray-300 focus-within:border-black transition-colors">
          <label className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest text-left mb-1">
            Order ID (e.g. #12345)
          </label>
          <input 
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full py-4 bg-transparent outline-none text-sm tracking-widest"
            placeholder="#12345"
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-900 transition-all cursor-pointer"
        >
          {loading ? 'Locating...' : 'Locate Shipment'}
        </button>
      </form>

      {orderStatus && (
        <div className="mt-20 p-10 border border-gray-100 bg-white rounded-sm shadow-sm animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-left border-b border-gray-50 pb-4">
            Order Details: #{orderStatus.Id}
          </h2>
          
          {/*Sipariş Durum Çizelgesi*/}
          <div className="flex justify-between items-center relative mb-12 px-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mb-2"></div>
              <span className="text-[9px] font-bold uppercase">Received</span>
            </div>
            <div className="h-[1px] flex-grow bg-gray-200 mx-2 mb-4"></div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mb-2"></div>
              <span className="text-[9px] font-bold uppercase text-gray-400">Shipped</span>
            </div>
          </div>

          {/*Ürün Listesi*/}
          <div className="space-y-6 mb-10">
            {orderStatus.Items && orderStatus.Items.map((item, index) => (
              <div key={index} className="flex gap-4 items-center border-b border-gray-50 pb-4 last:border-0">
                <img src={item.ImageUrl} alt={item.Name} className="w-12 h-16 object-cover rounded shadow-sm" />
                <div className="flex-grow text-left">
                  <h4 className="text-[10px] font-bold text-gray-800 uppercase tracking-tighter">{item.Name}</h4>
                  <p className="text-[9px] text-gray-400 mt-1 uppercase">
                    Size: <span className="text-black">{item.Size}</span> | Qty: <span className="text-black">{item.Quantity}</span>
                  </p>
                </div>
                <span className="text-[10px] font-bold text-green-600 tracking-widest">
                  ${(Number(item.Price) * item.Quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/*Sipariş Özeti*/}
          <div className="text-left space-y-3 pt-6 border-t border-gray-100">
            <div className="flex justify-between">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Contact Email:</span>
              <span className="text-[9px] font-bold uppercase">{orderStatus.Email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Phone Number:</span>
              <span className="text-[9px] font-bold uppercase">{orderStatus.Phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Shipping Address:</span>
              <span className="text-[9px] font-bold uppercase truncate max-w-[200px]">{orderStatus.Address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Payment Method:</span>
              <span className="text-[9px] font-bold uppercase">{orderStatus.PaymentMethod}</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-50">
              <span className="text-[10px] font-black uppercase tracking-widest">Total Paid:</span>
              <span className="text-[11px] font-black text-blue-900">${orderStatus.TotalAmount}</span>
            </div>
          </div>
        </div>
      )}

      <p className="mt-16 text-[9px] text-gray-400 uppercase tracking-[0.2em] leading-loose">
        Order tracking updates may take up to <br /> 24 hours to reflect after shipment.
      </p>
    </div>
  );
}