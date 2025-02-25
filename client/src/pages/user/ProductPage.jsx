import React from 'react';
import ProductCards from '../../components/user/Cards';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';

function ProductPage() {

    const { darkMode } = useSelector((state) => state.mode);
    console.log(darkMode);

    const [productList, error] = useFetch("/product/get-all-products");

    return (
        <>
            <div className="container  d-flex justify-content-center align-items-center heading-head mb-5">
                <p className={darkMode ? "text-black" : "text-white "}>HM.com / <span className='text-danger' style={{
                    fontWeight: "700",
                }}>Products</span></p>
            </div>
            <Container>
                <Row>
                    {productList?.map((value) => (
                        <Col key={value._id} xs={12} sm={6} md={6} lg={4} xl={3} xxl={3}>
                            <ProductCards product={value} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default ProductPage;
