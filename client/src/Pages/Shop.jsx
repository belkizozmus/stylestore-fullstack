import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';

export default function Shop() {
  const { category } = useParams();
  const [searchParams] = useSearchParams(); 
  const searchQuery = searchParams.get('search') || ''; 

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Veritabanından ürünleri çekme
  useEffect(() => {
    fetch('https://stylestore-fullstack.onrender.com/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Ürünler çekilemedi:", err);
        setLoading(false);
      });
  }, []);

  // Ürünleri filtreleme
  const filteredProducts = products.filter(product => {
    const matchCategory = category === 'all' || product.CategoryName?.toLowerCase() === category?.toLowerCase();

    const matchSearch = product.Name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  if (loading) {
    return (
      <div className="text-center py-20 text-xs font-bold tracking-widest uppercase">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 mt-10">
      
      <h1 className="text-left text-2xl font-bold uppercase tracking-[0.2em] mb-10">
        {searchQuery ? searchQuery : category}
      </h1>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-400 uppercase tracking-widest text-xs">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.Id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}