import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

//Pages
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Favorites from './Pages/Favorites';
import Checkout from './Pages/Checkout';
import Returns from './Pages/Returns';
import Help from './Pages/Help';
import TrackOrder from './Pages/TrackOrder';

//Components
import Navbar from './Components/Navbar';
import MobileMenu from './Components/MobileMenu';
import UtilityBar from './Components/UtilityBar';


function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-x-hidden font-sans">
      <ScrollToTop />

      {/*Navigasyon*/}
      <Navbar onMenuOpen={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/shop" element={<Shop />} /> 
          <Route path="/shop/:category" element={<Shop />} />
          
          <Route path="/product/:id" element={<ProductDetail />} />
          
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/checkout" element={<Checkout />} /> 

          {/*Yardımcı Sayfalar*/}
          <Route path="/returns" element={<Returns />} />
          <Route path="/help" element={<Help />} />
          <Route path="/track" element={<TrackOrder />} />
        </Routes>
      </main>

      {/*Alt Bilgi Çubuğu ve Footer*/}
      <UtilityBar />
      <footer className="py-12 bg-white text-center border-t border-gray-50">
        <p className="text-[9px] text-gray-400 tracking-[0.4em] uppercase font-medium">
          © 2026 STYLESTORE. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}