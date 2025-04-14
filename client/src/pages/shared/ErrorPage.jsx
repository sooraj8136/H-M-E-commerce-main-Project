import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/user/Header'
import Footer from '../../components/user/Footer'
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

function ErrorPage({ role = "user" }) {

    const { darkMode } = useSelector((state) => state.mode)
    console.log(darkMode)

    const navigate = useNavigate()

    const handleNavigation = () => {
        if (role == "user") {
            navigate("/")
            return;
        }
        if (role == "admin") {
            navigate("/")
            return;
        }
        if (role == "seller") {
            navigate("/")
            return;
        }
    }

    return (
        <>
            <Header />
            <Container className="my-5">
                <div style={{marginTop:"140px"}}>
                    <h1 className="fw-bold">PAGE NOT FOUND</h1>
                </div>
                <div className="mt-3">
                    <p className="fw-medium">
                        WE'RE SORRY, BUT THE PAGE YOU'RE LOOKING FOR IS CURRENTLY UNAVAILABLE.
                    </p>
                    <br />
                    <Link onClick={handleNavigation} className="text-black fw-semibold">
                        BACK TO HOME
                    </Link>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default ErrorPage