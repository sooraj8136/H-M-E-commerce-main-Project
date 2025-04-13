import React from 'react'
import Accessories from '../../components/user/Accessories'
import LadiesProducts from '../../components/user/LadiesProducts'
import PreppyUniform from '../../components/user/PreppyUniform'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import Office from '../../components/user/Office'
import ModernRomance from '../../components/user/ModernRomance'

function LadiesPage() {

    const { darkMode } = useSelector((state) => state.mode)
    console.log(darkMode)

    return (
        <>
            <div style={{ marginTop: "110px" }}>
                <div
                    className="container d-flex justify-content-start align-items-start heading-head"
                    style={{ marginTop: "140px" }}>
                    <p className={darkMode ? "text-black" : "text-white"} style={{ fontWeight: "400", fontSize: "0.9rem", color: "#a0a0a0" }}>
                        SM.COM / <span style={{ fontWeight: "600", fontSize: "0.9rem", color: "red" }}>LADIES</span>
                    </p>
                </div>
                <Office />
                <LadiesProducts />
                <Accessories />
                <ModernRomance />
                <PreppyUniform />
                <div className='ladies-clothing-cap'>
                    <div className="container mt-4 d-flex justify-content-center align-items-center">
                        <div className="position-relative"
                            style={{
                                width: "100%",
                            }}>
                            <h3 className={`login-text ${darkMode ? "text-black" : "text-white "}`} style={{ fontWeight: "400" }}>WOMEN'S CLOTHING</h3>
                            <p className={`login-text ${darkMode ? "text-black" : "text-white "}`}>Refresh your daily rotation with our women’s clothing range. With the freshest styles available all in one place, you can expect everyday basics, like women's tops and skirts, as well as must-have knitwear and cozy loungewear for downtime days. Plans to go out? Our women's dresses line up mini, midi and maxi styles that were made for summer evenings, while our stylish jeans and pants offer something to flatter every silhouette. Solve your wardrobe woes on busy days with cool co-ords, and wrap up to stay warm in our women's jackets and coats when extra layers are required. Finish off your favorite new looks with an array of trendy accessories, and don’t forget to scroll for statement footwear in our women's shoes range. Discover more women’s fashion by scrolling our Conscious collection, which has been crafted with the planet in mind – think sustainably sourced materials, including organic cotton and recycled polyester.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LadiesPage