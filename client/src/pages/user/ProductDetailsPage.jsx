import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';


function ProductDetailsPage() {

  const { darkMode } = useSelector((state) => state.mode)
    console.log(darkMode)

  const { productId } = useParams()

  console.log(productId)

  const [ product, error] = useFetch(`/product/get-product/${productId}`)

  return (
    <>
      <Container className="my-5">
            {product ? (
                <Row className="d-flex justify-content-center align-items-center">
                    <Col xs="12" md="6">
                        <img
                            src={product?.image}
                            alt={product?.title}
                            style={{ width: '100%'}}/>
                    </Col>
                    <Col xs="12" md="6" className="text-center text-md-start">
                        <h1
                            className={darkMode ? 'text-black' : 'text-white'}
                            style={{ fontSize: '2rem', marginBottom: '1rem' }}
                        >
                            {product?.title}
                        </h1>
                        <p
                            className={darkMode ? 'text-black' : 'text-white'}
                            style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}
                        >
                            {product?.description}
                        </p>
                        <p
                            className={darkMode ? 'text-black' : 'text-white'}
                            style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                        >
                            Price: Rs.{product?.price}.00
                        </p>
                    </Col>
                </Row>
            ) : (
                <p>No product found.</p>
            )}
        </Container>
    </>
  )
}

export default ProductDetailsPage