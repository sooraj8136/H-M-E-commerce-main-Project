import React from 'react'
import { useSelector } from 'react-redux'
import { useFetch } from '../../hooks/useFetch'
import { Row, Col } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import AdminProductCard from '../../components/admin/AdminProductCard'

function AdminProductPage() {
    const { darkMode } = useSelector((state) => state.mode)
    const [productList, error] = useFetch("/product/get-all-products")

  return (
        <>
            <Container>
                <div className="container py-5 text-center">
                    <p className="lead" style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}>
                    </p>
                </div>
                <div>
                    <div className="container  d-flex justify-content-center align-items-center">
                        <p className={darkMode ? "text-black" : "text-white "}>H&M / <span className='text-danger' style={{
                            fontWeight: "700",
                        }}>All products</span></p>
                    </div>
                </div>
                <Row>
                    {productList?.map((value) => (
                        <Col key={value._id} xs="12" sm="6" md="4" lg="4" xl="3" xxl="3">
                            <AdminProductCard product={value} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default AdminProductPage