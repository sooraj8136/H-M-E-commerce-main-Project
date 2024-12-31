import React from 'react'
import HomeWidget from '../../components/user/HomeWidget'
import MenProducts from '../../components/user/MenProducts'
import IconicGraphics from '../../components/user/IconicGraphics'
import DenimMen from '../../components/user/DenimMen'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux';

function MenPage() {

    const { darkMode } = useSelector((state) => state.mode)
    console.log(darkMode)
    
    return (
        <>
            <div>
                <div className="container  d-flex justify-content-center align-items-center">
                    <p className={darkMode ? "text-black" : "text-white "}>H&M /<span className='text-danger' style={{
                            fontWeight: "700",
                        }}>Men</span></p>
                </div>
            </div>
            <HomeWidget />
            <MenProducts />
            <DenimMen/>
            <IconicGraphics/>
            <Container>
                <div className='ladies-clothing-cap'>
                    <div className="container mt-4 d-flex justify-content-center align-items-center">
                        <div className="position-relative"
                            style={{
                                maxWidth: "930px",
                                width: "100%",
                            }}>
                            <h3 className={darkMode ? "text-black" : "text-white "}>Men's Clothing</h3>
                            <p className={darkMode ? "text-black" : "text-white "}>Check out all the freshest styles your closet needs in our men's clothing range. You'll find a roundup of everyday essentials, including tops and T-Shirts, as well as comfy lounge sets and underwear. Formal event coming up? Scroll no further than our men's blazers and suits for the sharpest looks and nail the dress code. When it comes to men's pants, there's chinos, joggers and cargo styles in all the staple colors. dreaming of denim? our men's jeans offer a range of fits to suit your style, including skinny, straight and tapered, to name just a few. Wear yours with a trendy oversized shirt or a classic denim number from our men's shirts edit. and when it comes to chilly weather, our men's jackets and coats have you covered – we've got puffer jackets and trench coats, as well as leather jackets and bomber jackets in year-round colors.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default MenPage