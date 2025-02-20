import React from 'react'
import PreppyUniform from '../../components/user/PreppyUniform'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import NewUtilitarian from '../../components/user/NewUtilitarian';
import KidsDenim from '../../components/user/KidsDenim';
import Office from '../../components/user/Office';

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
                <PreppyUniform />
                <NewUtilitarian/>
                <KidsDenim/>
                <Office/>
            </Container>
        </>
    )
}

export default Home