import React, { useEffect, useState } from 'react'
import PreppyUniform from '../../components/user/PreppyUniform'
import { Container, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import NewUtilitarian from '../../components/user/NewUtilitarian';
import KidsDenim from '../../components/user/KidsDenim';
import Office from '../../components/user/Office';
import HomeWidget from '../../components/user/HomeWidget';
import Carousel from '../../components/user/Carousel';

function Home() {

    const [loading, setLoading] = useState(true)

    const { darkMode } = useSelector((state) => state.mode)
    console.log(darkMode)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    return (
        <>
            {loading ? (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "180px" }}>
                    <div className="dot-spinner">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <span className={`mt-3 ${darkMode ? "text-black" : "text-white"}`} style={{ letterSpacing: "2px",marginLeft:"12px" }}>Loading...</span>
                </div>
            ) : (
                <>
                    <Carousel />
                    <Container>
                        <HomeWidget />
                        <PreppyUniform />
                        <NewUtilitarian />
                        <KidsDenim />
                        <Office />
                    </Container>
                </>
            )}

        </>
    )
}

export default Home