import React from 'react'
import HomeWidget from '../../components/user/HomeWidget'
import KidsProducts from '../../components/user/KidsProducts'
import KidsLimitedEdition from '../../components/user/KidsLimitedEdition'
import KidsArrivals from '../../components/user/KidsArrivals'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import BabyProducts from '../../components/user/BabyProducts'

function KidsPage() {

    const { darkMode } = useSelector((state) => state.mode)
    console.log(darkMode)

    return (
        <>
            <Container>
                    <div className="container  d-flex justify-content-center align-items-center">
                        <p className={darkMode ? "text-black" : "text-white "}>H&M / <span className='text-danger' style={{
                            fontWeight: "700",
                        }}>Kids</span> </p>
                    </div>
                <HomeWidget />
                <BabyProducts/>
                <KidsLimitedEdition />
                <KidsProducts />
                <KidsArrivals />
                <div className='ladies-clothing-cap'>
                    <div className="container mt-4 d-flex justify-content-center align-items-center">
                        <div className="position-relative"
                            style={{
                                maxWidth: "930px",
                                width: "100%",
                            }}>
                            <h3 className={darkMode ? "text-black" : "text-white "}>Kids' Clothing</h3>
                            <p className={darkMode ? "text-black" : "text-white "}>Refill on their everyday essentials with our kids' clothes. You'll find an extensive selection of kids' tops and T-Shirts featuring colors that pop, plus adorable designs to suit their personality. Pair their favorite cardigan or sweater with our kids' jeans and pants – you'll find an array of cuts and styles, including chinos and cargo pants, to name a few. outdoor adventures on the cards? No problem. Keep chills at bay and little ones warm with our standout edit of kids' jackets and coats – and don't forget to scroll our kids' shoes for wellington boots, trendy sneakers and summer sandals.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default KidsPage