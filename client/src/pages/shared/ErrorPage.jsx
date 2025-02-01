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
                <div>
                    <h1 className="fw-bold">PAGE NOT FOUND</h1>
                </div>
                <div className="mt-3">
                    <p className="fw-medium">
                        We're sorry, but the page you're looking for is currently unavailable.
                    </p>
                    <br />
                    <Link onClick={handleNavigation} className="text-black fw-semibold">
                        Return to Home
                    </Link>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default ErrorPage