import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Sayfa ilk yüklendiğinde LocalStorage'dan sepet verisini çekme
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('styleStoreCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Sepet her değiştiğinde LocalStorage'ı güncelleme
  useEffect(() => {
    localStorage.setItem('styleStoreCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 3. Sepete Ürün Ekleme
  const addToCart = (product) => {
    if (!product.size) {
      console.error("Hata: Beden seçilmeden sepete ekleme yapılamaz!");
      return; 
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.Id === product.Id && item.size === product.size
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.Id === product.Id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // 4. Sepetten Ürün Çıkarma 
  const removeFromCart = (productId, size) => {
    setCartItems((prevItems) => 
      prevItems.filter((item) => !(item.Id === productId && item.size === size))
    );
  };

  // 5. Ürün Miktarını Güncelleme 
  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return; 

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.Id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // 6.  Checkout sonrası sepeti tamamen boşaltma
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('styleStoreCart');
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);