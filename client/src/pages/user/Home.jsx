import React from 'react'
import Carrousel from '../../components/user/Carrousel'
import HomeWidget from '../../components/user/HomeWidget'
import IconicGraphics from '../../components/user/IconicGraphics'
import PreppyUniform from '../../components/user/PreppyUniform'
import KidsArrivals from '../../components/user/KidsArrivals'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux';

function Home() {

    const { darkMode } = useSelector((state) => state.mode)
    console.log(darkMode)

    return (
        <>
            <Container>
                <div>
                    <div className="container  d-flex justify-content-center align-items-center heading-head">
                        <p className={darkMode ? "text-black" : "text-white "}>HM.com/ <span className='text-danger' style={{
                            fontWeight: "700",
                        }}>Home</span></p>
                    </div>
                </div>
                <Carrousel />
                <HomeWidget />
                <PreppyUniform />
                <IconicGraphics />
                <KidsArrivals />
            </Container>
        </>
    )
}

export default Home