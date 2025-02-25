import React from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import HomeWidget from '../../components/user/HomeWidget';

function SalesPage() {

    const { darkMode } = useSelector((state) => state.mode)
    console.log(darkMode)

    return (
        <>
            <Container>
                <div className="container  d-flex justify-content-center align-items-center heading-head">
                    <p className={darkMode ? "text-black" : "text-white "}>HM.com / <span className='text-danger' style={{
                        fontWeight: "700",
                    }}>Sale</span></p>
                </div>
                <div className='text-center mt-3'>
                    <h1 className={darkMode ? "text-black" : "text-white "}>H&M Sale</h1>
                </div>
                <HomeWidget />
                <div className='sales-text' >
                    <div className='container mt-4 d-flex justify-content-center align-items-center'>
                        <div className="position-relative"
                            style={{ maxWidth: "930px", width: "100%" }}>
                            <p className={darkMode ? "text-black" : "text-white"}>Shop the sale online at H&M and stock up on lots of great deals! Discover latest styles for less from all our departments.</p>


                            <p className={darkMode ? "text-black" : "text-white "}>Find everything from sharp office staples and casual looks to on-trend fashion and jeans in every fit, shape and colour. Discover discounted clothing, shoes, bags, accessories, swimwear, underwear and loungewear. Shop our clothes sale for stylish and functional sportswear.</p>


                            <p className={darkMode ? "text-black" : "text-white "}>Start building your new wardrobe today, browse the H&M sale to find the latest clothes on sale and update your wardrobe with stylish new looks. </p>

                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default SalesPage