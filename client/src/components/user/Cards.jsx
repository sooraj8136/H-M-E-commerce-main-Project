import React from 'react'
import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";
import { useSelector } from 'react-redux';

function ProductCards({ product }) {

  const { darkMode } = useSelector((state) => state.mode)
  console.log(darkMode)

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center my-3">
        <Nav.Link href={`/productDetails/${product?._id}`} className="text-decoration-none">
          <div className="product-item text-center">
            <img src={product?.image} alt={product?.title}
              style={{
                width: "300px",   
                height: "auto",
                objectFit: "cover",
                marginBottom: "10px",
                maxWidth: "1024px"
              }} />
            <h3 className={darkMode ? "text-black" : "text-white "}
              style={{ fontSize: "1rem", marginBottom: "0.5rem", }} >
              {product?.title}</h3>
            <p className={darkMode ? "text-black" : "text-white "} style={{ fontSize: "1rem", }} >
              Rs.{product?.price}.00
            </p>
          </div>
        </Nav.Link>
      </Container>
    </>
  )
}


export const CartCards = ({ item, handleRemove }) => {
  console.log('item=====', item);

  return (
    <div className="cart-card">
      <div className="cart-card-image">
        <img
          src={item?.productId?.image}
          alt="cart-item"
          className="product-image"
        />
      </div>

      <div className="cart-card-details">
        <h2 className="product-title">{item?.productId?.title}</h2>
        <h3 className="product-price">₹{item?.productId?.price}</h3>
        <h4 className="product-quantity">Quantity: {item?.count}</h4>
      </div>

      <div className="cart-card-actions">
        <button
          className="btn btn-danger remove-button"
          onClick={() => handleRemove(item?.productId?._id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};



export default ProductCards