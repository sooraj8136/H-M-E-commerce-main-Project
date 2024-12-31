import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/user/Header'
import Footer from '../../components/user/Footer'
import { useSelector } from 'react-redux';

function ErrorPage({ role = "user" }) {

    const { darkMode } = useSelector((state) => state.mode)
    console.log(darkMode)

    const navigate = useNavigate()

    const handleNavigation = () => {
        if (role == "user") {
            navigate("/")
            return;
        }
        if (role == "mentor") {
            navigate("/mentor")
            return;
        }
    }

    return (
        <>
            <Header />
            <div className='mt-5 mb-5'>
                <div className='text-center'>
                    <h1>PAGE NOT FOUND</h1>
                    <p>We're sorry, but the page you're looking for is currently unavailable</p>
                    <br />
                    <Link onClick={handleNavigation} className=' text-black' >Return to home</Link>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ErrorPage