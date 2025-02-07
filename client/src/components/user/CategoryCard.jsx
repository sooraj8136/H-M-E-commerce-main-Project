import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WishlistButton from '../../api/Wishlistbutton';

function CategoryCard({ product }) {

    const { darkMode } = useSelector((state) => state.mode);
    console.log(darkMode);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        const checkWishlist = async () => {
            try {
                const response = await axiosInstance.get('/wishlist/get-wishlist');
                const wishlistProducts = response.data.data.products;

                setIsInWishlist(wishlistProducts.some((p) => p._id === product?._id));
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        checkWishlist();
    }, [product]);

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center my-3 ">
                <div className="text-center position-relative mx-1">
                    <Link
                        key={product._id}
                        to={`/productDetails/${product._id}`}
                        className="text-decoration-none">
                        <div className="product-item text-center"
                        >
                            <img src={product?.image} alt={product?.title} style={{
                                width: "300px",
                                height: "auto",
                                objectFit: "cover",
                                marginBottom: "10px",
                                maxWidth: "1024px"
                            }} />
                            <h3
                                className={darkMode ? "text-black" : "text-white"}
                                style={{ fontSize: "1rem", marginBottom: "0.5rem", }}>
                                {product?.title}
                            </h3>
                            <p
                                className={darkMode ? "text-black" : "text-white price"}
                                style={{ fontSize: "1rem", }}>
                                Rs.{product?.price}.00
                            </p>
                        </div>
                    </Link>
                    <div className="position-absolute" style={{ top: '-15px', right: '-1px' }}>
                        <WishlistButton productId={product?._id} isInWishlist={isInWishlist} setIsInWishlist={setIsInWishlist} />
                    </div>
                </div>
            </Container>
        </>
    );
}

export default CategoryCard;
