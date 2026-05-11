import { useState, useEffect } from 'react';
import ProductCard from '../Components/ProductCard';

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setTrendingProducts(data.slice(0, 3)); 
      })
      .catch(err => console.error("Veri çekme hatası:", err));
  }, []);

  return (
    <div className="flex flex-col w-full">

      <div className="relative w-full h-[60vh] md:h-[80vh] bg-gray-100 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop" 
          alt="StyleStore New Collection" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-[0.3em] mb-4 drop-shadow-lg">
            StyleStore
          </h1>
          <p className="text-sm md:text-xl font-medium tracking-[0.5em] uppercase drop-shadow-md">
            New Collection 2026
          </p>
        </div>
      </div>

      {/*TRENDING NOW*/}
      <div className="container mx-auto py-20 px-4">
        <h2 className="text-center text-[18px] font-bold mb-16 tracking-[0.3em] uppercase text-gray-900">
          Trending Now
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {trendingProducts.map(product => (
            <ProductCard key={product.Id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
}