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
    <div className="">
      <img src={item?.productId?.image} alt="cart-item" className="w-24 h-20" />
      <div>
        <h2>{item?.productId?.title} </h2>
        <h3>{item?.productId?.price} </h3>
        <h3>{item?.count} </h3>
      </div>
      <button className="btn btn-secondary" onClick={() => handleRemove(item?.productId?._id)}>
        Remove
      </button>
    </div>
  );
};


export default ProductCards