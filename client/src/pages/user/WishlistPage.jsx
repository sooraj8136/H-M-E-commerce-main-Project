import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';

const WishlistPage = () => {
  const [products, setProducts] = useState([]); // Stores all products
  const [wishlist, setWishlist] = useState([]); // Stores wishlist product IDs
  const [loading, setLoading] = useState(true);

  // Fetch products and wishlist on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wishlistRes, productsRes] = await Promise.all([
          axiosInstance.get('/wishlist/get-wishlist'),
          axiosInstance.get('/product/get-all-products') // Replace with actual products API if necessary
        ]);

        console.log('Wishlist data:', wishlistRes.data); // Check wishlist data
        console.log('Products data:', productsRes.data); // Check products data

        setWishlist(wishlistRes.data.products); // Assuming the "products" field contains product IDs
        setProducts(productsRes.data); // Assuming products API returns a list of products
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add item to wishlist
  const addToWishlist = async (productId) => {
    try {
      const res = await axiosInstance.post('/wishlist/add-to-wishlist', { productId });
      setWishlist(res.data.wishlist.products);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const res = await axiosInstance.delete(`/wishlist/remove-from-wishlist/${productId}`);
      setWishlist(res.data.wishlist.products);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Debug: Check the products and wishlist data before rendering
  console.log('Wishlist:', wishlist);
  console.log('Products:', products);

  return (
    <div className="wishlist-page">
      <h1>Your Wishlist</h1>
      <section className="product-card-container">
        {products.length > 0 ? (
          products
            .filter(product => wishlist.includes(product._id)) // Filter products in wishlist
            .map((product) => {
              const isInWishlist = wishlist.includes(product._id);

              return (
                <div className="product-card" key={product._id}>
                  <img src={product.image} alt={product.title} className="product-img" />
                  <div className="product-info">
                    <h2 className="product-name">{product.title}</h2>
                    <p className="product-price">${product.price}</p>
                    <button
                      className={`heart-btn ${isInWishlist ? 'liked' : ''}`}
                      onClick={() => isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product._id)}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              );
            })
        ) : (
          <div>No products available</div>
        )}
      </section>
    </div>
  );
};

export default WishlistPage;
