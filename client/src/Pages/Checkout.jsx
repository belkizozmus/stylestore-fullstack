import { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

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

const locationData = {
  "Istanbul": ["Beşiktaş", "Kadıköy", "Şişli", "Fatih", "Üsküdar", "Bakırköy", "Ataşehir", "Beyoğlu"],
  "Ankara": ["Çankaya", "Keçiören", "Mamak", "Yenimahalle", "Etimesgut", "Sincan", "Gölbaşı", "Altındağ"]
};

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const [selectedPhoneCode, setSelectedPhoneCode] = useState(phoneCountries[0]);

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    addressTitle: '',
    fullName: '',
    country: 'Turkey',
    city: '',
    district: '',
    address: '',
    zipCode: '',
    invoiceType: 'Personal',
    taxOffice: '',
    companyName: '',
    taxNumber: ''
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.Price) * item.quantity), 0);
  const codFee = 10.00; 
  const total = subtotal + codFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'city') {
      setFormData({ ...formData, city: value, district: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullPhone = `${selectedPhoneCode.dial} ${formData.phone}`;

    let fullAddress = `
      Title: ${formData.addressTitle} | 
      Name: ${formData.fullName} | 
      Address: ${formData.address} ${formData.district}/${formData.city}
    `.trim();

    if (formData.invoiceType === 'Corporate') {
      fullAddress += ` | Company: ${formData.companyName} | Tax Office: ${formData.taxOffice} | Tax No: ${formData.taxNumber}`;
    }

    const orderData = {
      email: formData.email, 
      phone: fullPhone,     
      address: fullAddress,
      totalAmount: total,
      paymentMethod: 'Cash on Delivery', 
      items: cartItems.map(item => ({
        productId: item.Id,
        size: item.size,
        quantity: item.quantity,
        price: item.Price
      }))
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const result = await response.json();
        clearCart();
        alert(`Thank you! Your order has been placed successfully via Cash on Delivery. \n\nYOUR ORDER NUMBER: #${result.orderId}`);
        navigate('/');
      }
    } catch (error) {
      console.error("Order error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) return <div className="text-center mt-32 font-medium">Your bag is currently empty.</div>;

  return (
    <div className="bg-[#F9F9F9] min-h-screen py-10 px-4 mt-16">
      <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row gap-8">
        
        {/*FORM*/}
        <div className="lg:w-2/3 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-8 text-gray-800 border-b border-gray-50 pb-4">Shipping Address</h2>
          
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="space-y-4">
              <input required type="email" name="email" placeholder="Email Address*" onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md p-4 text-sm focus:ring-1 focus:ring-green-500 outline-none" />
              
              <div className="relative flex border border-gray-200 rounded-md bg-white focus-within:ring-1 focus-within:ring-green-500">
                <div 
                  className="px-3 py-4 border-r border-gray-200 text-sm flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => setShowPhoneDropdown(!showPhoneDropdown)}
                >
                  <span className="text-lg">{selectedPhoneCode.flag}</span>
                  <span className="text-[10px] text-gray-500">▼</span>
                </div>

                {showPhoneDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-[320px] bg-white border border-gray-200 rounded-md shadow-xl z-50 max-h-64 overflow-y-auto">
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
                        <span className="text-sm font-semibold text-gray-800">{country.name}</span>
                        <span className="text-sm text-gray-500">{country.dial}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center pl-3 text-sm font-medium text-gray-600 select-none">
                  {selectedPhoneCode.dial}
                </div>
                <input required type="tel" name="phone" placeholder="Phone Number*" onChange={handleInputChange}
                  className="w-full p-4 pl-2 text-sm outline-none bg-transparent" />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50">
              <input required type="text" name="addressTitle" placeholder="Address Title*" onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md p-4 text-sm outline-none focus:ring-1 focus:ring-green-500" />
              <input required type="text" name="fullName" placeholder="Full Name*" onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md p-4 text-sm outline-none focus:ring-1 focus:ring-green-500" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-md p-4 text-sm bg-gray-50 text-gray-500 cursor-not-allowed">
                  Turkey
                </div>

                <select required name="city" value={formData.city} onChange={handleInputChange} 
                  className="border border-gray-200 rounded-md p-4 text-sm bg-white outline-none focus:ring-1 focus:ring-green-500">
                  <option value="">Select City*</option>
                  <option value="Istanbul">Istanbul</option>
                  <option value="Ankara">Ankara</option>
                </select>

                <select required name="district" value={formData.district} onChange={handleInputChange} 
                  disabled={!formData.city}
                  className="border border-gray-200 rounded-md p-4 text-sm bg-white outline-none focus:ring-1 focus:ring-green-500 disabled:bg-gray-50">
                  <option value="">Select District*</option>
                  {formData.city && locationData[formData.city].map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              <textarea required name="address" placeholder="Full Address*" rows="3" onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md p-4 text-sm outline-none focus:ring-1 focus:ring-green-500" />
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-6 text-sm mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="invoiceType" value="Personal" checked={formData.invoiceType === 'Personal'} onChange={handleInputChange} className="accent-green-600" /> Personal
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="invoiceType" value="Corporate" onChange={handleInputChange} className="accent-green-600" /> Corporate
                </label>
              </div>

              {formData.invoiceType === 'Corporate' && (
                <div className="space-y-4 transition-all duration-300">
                  <input required type="text" name="taxOffice" placeholder="Tax Office*" onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-md p-4 text-sm outline-none focus:ring-1 focus:ring-green-500" />
                  <input required type="text" name="companyName" placeholder="Company Name*" onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-md p-4 text-sm outline-none focus:ring-1 focus:ring-green-500" />
                  <input required type="text" name="taxNumber" placeholder="Tax Number*" onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-md p-4 text-sm outline-none focus:ring-1 focus:ring-green-500" />
                </div>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50">
              <h2 className="text-lg font-bold text-gray-800">Payment Method</h2>
              <div className="border border-green-200 bg-green-50 p-6 rounded-lg flex items-center gap-4">
                <div className="text-4xl text-green-600">💵</div>
                <div>
                  <h4 className="font-bold text-green-900">Cash on Delivery (COD)</h4>
                  <p className="text-sm text-green-800 mt-1">Pay with cash when your package arrives. An extra fee of ${codFee.toFixed(2)} applies for this service.</p>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className={`w-full text-white py-4 rounded-md font-bold text-lg transition-all shadow-lg active:scale-[0.99]
              ${loading ? 'bg-gray-400' : 'bg-[#00C853] hover:bg-[#00B24A] cursor-pointer'}`}>
              {loading ? 'Processing COD Order...' : 'Confirm COD Order'}
            </button>
          </form>
        </div>

        {/*SUMMARY*/}
        <div className="lg:w-1/3 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="font-bold text-sm tracking-widest uppercase">Your Order ({cartItems.length})</h3>
            </div>
            
            <div className="p-4 space-y-4 max-h-[350px] overflow-y-auto">
              {cartItems.map((item) => (
                <div key={`${item.Id}-${item.size}`} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0">
                  <img src={item.ImageUrl} alt={item.Name} className="w-16 h-20 object-cover rounded shadow-sm" />
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-[12px] font-bold text-gray-800 uppercase tracking-tight">{item.Name}</h4>
                      <p className="text-[10px] text-gray-400 mt-1">
                        SIZE: <span className="text-black font-bold">{item.size}</span> | QTY: <span className="text-black font-bold">{item.quantity}</span>
                      </p>
                    </div>
                    <span className="text-green-600 font-bold text-sm tracking-widest">${(Number(item.Price) * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white border-t border-gray-100 space-y-4">
              <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="text-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-widest">
                <span>COD Service Fee</span>
                <span className="text-black">${codFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 pt-4 border-t border-gray-100 uppercase tracking-[0.1em]">
                <span>Total</span>
                <span className="text-blue-900">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}