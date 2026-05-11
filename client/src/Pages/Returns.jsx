import { useState } from 'react';
const phoneCountries = [
  { code: 'TR', name: 'Turkey (Türkiye)', dial: '+90', flag: '🇹🇷' },
  { code: 'AF', name: 'Afghanistan (افغانستان)', dial: '+93', flag: '🇦🇫' },
  { code: 'AL', name: 'Albania (Shqipëri)', dial: '+355', flag: '🇦🇱' },
  { code: 'DZ', name: 'Algeria (الجزائر)', dial: '+213', flag: '🇩🇿' },
  { code: 'AS', name: 'American Samoa', dial: '+1', flag: '🇦🇸' },
  { code: 'AD', name: 'Andorra', dial: '+376', flag: '🇦🇩' },
  { code: 'AO', name: 'Angola', dial: '+244', flag: '🇦🇴' },
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany (Deutschland)', dial: '+49', flag: '🇩🇪' },
];

export default function Returns() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const [selectedPhoneCode, setSelectedPhoneCode] = useState(phoneCountries[0]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [returnReason, setReturnReason] = useState('');
  const [iban, setIban] = useState('');
  const [returnSuccess, setReturnSuccess] = useState(false);

  const handleFindOrder = async (e) => {
    e.preventDefault();
    if (!email && !phone) return alert("Please enter an email address or a phone number.");

    setLoading(true);
    setOrders([]);
    setSelectedOrder(null);
    setReturnSuccess(false);

    try {
      const fullPhone = phone ? `${selectedPhoneCode.dial} ${phone}`.trim() : '';
      
      let url = `http://localhost:5000/api/orders/search?`;
      if (email) url += `email=${encodeURIComponent(email)}`;
      if (phone) url += `&phone=${encodeURIComponent(fullPhone)}`;

      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        alert("No orders found with the provided information.");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("An error occurred while searching for your order.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReturn = async (e) => {
    e.preventDefault();
    
    if (!returnReason) return alert("Please select a return reason.");
    if (!iban || iban.length < 24) return alert("Please enter a valid IBAN (24 digits).");

    setLoading(true);

    try {
      const returnData = {
        orderId: selectedOrder.Id,
        reason: returnReason,
        iban: `TR${iban}` 
      };

      const response = await fetch('http://localhost:5000/api/returns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(returnData)
      });

      if (response.ok) {
        setReturnSuccess(true);
      } else {
        const errorData = await response.json();
        alert(`Request Failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Return submit error:", error);
      alert("An error occurred while connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 mt-16 max-w-2xl">
      <h1 className="text-2xl font-bold uppercase tracking-[0.2em] mb-16 text-center text-gray-900">
        Returns & Exchanges
      </h1>
      
      {returnSuccess ? (
        <div className="text-center animate-in zoom-in duration-500 py-10">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✓</span>
          </div>
          <h2 className="text-xl font-black uppercase tracking-widest text-green-600 mb-4">Request Submitted</h2>
          <p className="text-sm text-gray-500 uppercase tracking-widest leading-loose">
            Your return request for Order #{selectedOrder.Id} has been received. <br/>
            Once the items are inspected and approved, the refund will be transferred to your IBAN within 7 business days.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-10 bg-black text-white px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all cursor-pointer shadow-md"
          >
            Return to Homepage
          </button>
        </div>
      ) : (
        <>
          {!selectedOrder && (
            <div className="space-y-12 mb-16 text-left">
              <div className="pl-6 border-l-[1.5px] border-black py-1">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-2 text-gray-900">30-Day Window</h2>
                <p className="text-[11px] text-gray-400 uppercase tracking-widest leading-relaxed">Items can be returned within 30 days of delivery.</p>
              </div>
              <div className="pl-6 border-l-[1.5px] border-black py-1">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-2 text-gray-900">COD Refund Policy</h2>
                <p className="text-[11px] text-gray-400 uppercase tracking-widest leading-relaxed">Refunds for COD orders are issued via Bank Transfer (EFT) to your IBAN.</p>
              </div>
            </div>
          )}

          {!showForm ? (
            <button 
              onClick={() => setShowForm(true)}
              className="w-full bg-black text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-900 transition-all cursor-pointer shadow-md"
            >
              Start A Return
            </button>
          ) : (
            <div className="mt-8 border-t border-gray-100 pt-10 text-left animate-in fade-in duration-500">
              
              {!selectedOrder ? (
                <>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-8 text-gray-900">Find Your Order</h3>
                  <form onSubmit={handleFindOrder} className="space-y-6">
                    <div className="text-left">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        placeholder="mail@site.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-md p-4 text-sm outline-none focus:border-green-500 transition-colors"
                      />
                    </div>

                    <div className="text-[11px] text-gray-400 font-bold uppercase tracking-widest py-1">Or</div>

                    <div className="text-left">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2">Mobile Phone</label>
                      <div className="relative flex border border-gray-200 rounded-md bg-white focus-within:ring-1 focus-within:ring-green-500">
                        <div 
                          className="px-3 py-4 border-r border-gray-200 text-sm flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                          onClick={() => setShowPhoneDropdown(!showPhoneDropdown)}
                        >
                          <span className="text-lg">{selectedPhoneCode.flag}</span>
                          <span className="text-[10px] text-gray-400">▼</span>
                        </div>

                        {showPhoneDropdown && (
                          <div className="absolute top-full left-0 mt-1 w-full md:w-[350px] bg-white border border-gray-200 rounded-md shadow-2xl z-50 max-h-60 overflow-y-auto">
                            {phoneCountries.map((country) => (
                              <div 
                                key={country.code}
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0"
                                onClick={() => {
                                  setSelectedPhoneCode(country);
                                  setShowPhoneDropdown(false);
                                }}
                              >
                                <span className="text-lg">{country.flag}</span>
                                <span className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{country.name}</span>
                                <span className="text-[11px] text-gray-400">{country.dial}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center pl-3 text-sm font-bold text-gray-500 select-none">
                          {selectedPhoneCode.dial}
                        </div>
                        <input
                          type="tel"
                          placeholder="501 234 56 78"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full p-4 pl-2 text-sm outline-none bg-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button 
                        type="submit"
                        disabled={loading}
                        className="bg-[#00C853] hover:bg-[#00B24A] text-white px-12 py-4 rounded-md font-bold uppercase text-[10px] tracking-[0.2em] transition-all shadow-md active:scale-95 cursor-pointer disabled:bg-gray-300"
                      >
                        {loading ? 'Searching...' : 'Find Order'}
                      </button>
                    </div>
                  </form>

                  {orders.length > 0 && (
                    <div className="mt-12 space-y-4 animate-in slide-in-from-top-2 duration-500">
                      <h4 className="text-[11px] font-black uppercase tracking-widest border-b border-gray-100 pb-3 text-gray-900">
                        Orders Found ({orders.length})
                      </h4>
                      <div className="space-y-3">
                        {orders.map((order) => (
                          <div 
                            key={order.Id} 
                            className="p-5 border border-gray-100 rounded-md bg-white hover:border-gray-300 transition-all flex justify-between items-center group shadow-sm"
                          >
                            <div className="space-y-1">
                              <span className="text-xs font-black text-gray-900 block">ORDER #{order.Id}</span>
                              <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                                {new Date(order.OrderDate).toLocaleDateString('tr-TR')}
                              </span>
                            </div>
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="text-[10px] font-black uppercase tracking-widest text-green-600 hover:text-green-700 transition-colors cursor-pointer"
                            >
                              Select For Return →
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="animate-in slide-in-from-right-4 duration-500">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-8">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Return Details</h3>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Order #{selectedOrder.Id}</p>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} className="text-[10px] text-gray-400 uppercase hover:text-black">
                      ← Back
                    </button>
                  </div>

                  <form onSubmit={handleSubmitReturn} className="space-y-8">
                    
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2">Reason for Return *</label>
                      <select 
                        required
                        value={returnReason}
                        onChange={(e) => setReturnReason(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-md p-4 text-sm outline-none focus:border-green-500 transition-colors"
                      >
                        <option value="" disabled>Select a reason</option>
                        <option value="too_small">Size is too small</option>
                        <option value="too_large">Size is too large</option>
                        <option value="not_as_expected">Item not as expected</option>
                        <option value="defective">Item arrived damaged / defective</option>
                        <option value="changed_mind">Changed my mind</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2">Bank IBAN (For Refund) *</label>
                      <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-md focus-within:border-green-500 overflow-hidden">
                        <div className="bg-gray-100 px-4 py-4 text-sm font-bold text-gray-600 border-r border-gray-200">TR</div>
                        <input
                          required
                          type="text"
                          maxLength="24"
                          placeholder="0000 0000 0000 0000 0000 0000"
                          value={iban}
                          onChange={(e) => setIban(e.target.value.replace(/\D/g, ''))}
                          className="w-full p-4 text-sm outline-none bg-transparent tracking-widest"
                        />
                      </div>
                      <p className="text-[9px] text-gray-400 mt-2 uppercase tracking-widest">
                        Must be a valid bank account under your name.
                      </p>
                    </div>

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-black hover:bg-gray-900 text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-md active:scale-95 cursor-pointer disabled:bg-gray-400"
                    >
                      {loading ? 'Submitting...' : 'Submit Return Request'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}