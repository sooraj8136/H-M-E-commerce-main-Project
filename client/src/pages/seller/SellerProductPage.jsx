import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import SellerProductCard from '../../components/seller/SellerProductCard';

function ProductPage() {

    const { darkMode } = useSelector((state) => state.mode)
    console.log(darkMode)

    const [productList, error] = useFetch("/product/get-all-products") 

    return (
        <>
            <div>
                <div className="container  d-flex justify-content-center align-items-center">
                    <p className={darkMode ? "text-black" : "text-white "}>H&M / <span className='text-danger' style={{
                            fontWeight: "700",
                        }}>All products</span></p>
                </div>
            </div>
            <Container>
                <Row>
                    {productList?.map((value) => (
                        <Col key={value._id} xs="12" sm="6" md="4" lg="4" xl="3" xxl="3">
                            <SellerProductCard product={value} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default ProductPage