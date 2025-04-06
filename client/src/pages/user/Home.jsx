import React, { useEffect, useState } from 'react'
import PreppyUniform from '../../components/user/PreppyUniform'
import { Container, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import NewUtilitarian from '../../components/user/NewUtilitarian';
import KidsDenim from '../../components/user/KidsDenim';
import Office from '../../components/user/Office';
import HomeWidget from '../../components/user/HomeWidget';

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
                <div className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
                    <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading...</span>
                </div>
            ) : (
                <>
                    <Container>
                        <div>
                            <div className="container  d-flex justify-content-center align-items-center heading-head">
                                <p className={darkMode ? "text-black" : "text-white "}>HM.com/ <span className='text-danger' style={{
                                    fontWeight: "700",
                                }}>Home</span></p>
                            </div>
                        </div>
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