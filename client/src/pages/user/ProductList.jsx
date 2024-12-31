import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CategoryCard from '../../components/user/CategoryCard';


function ProductList() {

    const { darkMode } = useSelector((state) => state.mode)
    console.log(darkMode)

    const { category } = useParams()

    const [products, setProducts] = useState([])

    const fetchProduct = async () => {

        try {
            const response = await axiosInstance({
                method: "GET",
                url: `/product/${category}`
            })
            console.log("ProductsList ---- ", response)
            setProducts(response?.data?.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [])

    return (
        <>
            <Container>
                
                <h1 style={{fontWeight: "800", fontSize: "medium", maxWidth: "800px"}}> Best of {category} collection</h1>
                
                <Row>
                    {products?.map((productsArray) => (
                        <Col key={productsArray._id} xs="12" sm="6" md="4" lg="4" xl="3" xxl="3">
                            <CategoryCard product={productsArray} />

                        </Col>
                    ))}
                </Row>
            </Container>
        </>

    )
}

export default ProductList