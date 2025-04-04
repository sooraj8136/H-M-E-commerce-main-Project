// import React from 'react'
// import PreppyUniform from '../../components/user/PreppyUniform'
// import { Container } from 'react-bootstrap'
// import { useSelector } from 'react-redux';
// import NewUtilitarian from '../../components/user/NewUtilitarian';
// import KidsDenim from '../../components/user/KidsDenim';
// import Office from '../../components/user/Office';
// import HomeWidget from '../../components/user/HomeWidget';

// function Home() {

//     const { darkMode } = useSelector((state) => state.mode)
//     console.log(darkMode)

//     return (
//         <>
//             <Container>
//                 <div>
//                     <div className="container  d-flex justify-content-center align-items-center heading-head">
//                         <p className={darkMode ? "text-black" : "text-white "}>HM.com/ <span className='text-danger' style={{
//                             fontWeight: "700",
//                         }}>Home</span></p>
//                     </div>
//                 </div>
//                 <HomeWidget />
//                 <PreppyUniform />
//                 <NewUtilitarian />
//                 <KidsDenim />
//                 <Office />
//             </Container>
//         </>
//     )
// }

// export default Home

import React, { useState, useEffect } from 'react';
import PreppyUniform from '../../components/user/PreppyUniform';
import { Container, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import NewUtilitarian from '../../components/user/NewUtilitarian';
import KidsDenim from '../../components/user/KidsDenim';
import Office from '../../components/user/Office';
import HomeWidget from '../../components/user/HomeWidget';

function Home() {
    const { darkMode } = useSelector((state) => state.mode);
    console.log(darkMode);
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500); // Simulating a loading time of 1.5 seconds
    }, []);

    return (
        <>
            <Container>
                {loading ? (
                    <div className="d-flex flex-column justify-content-center align-items-center p-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <h5 className="mt-3">Loading...</h5>
                    </div>
                ) : (
                    <>
                        <div>
                            <div className="container d-flex justify-content-center align-items-center heading-head">
                                <p className={darkMode ? "text-black" : "text-white"}>HM.com/ <span className='text-danger' style={{ fontWeight: "700" }}>Home</span></p>
                            </div>
                        </div>
                        <HomeWidget />
                        <PreppyUniform />
                        <NewUtilitarian />
                        <KidsDenim />
                        <Office />
                    </>
                )}
            </Container>
        </>
    );
}

export default Home;