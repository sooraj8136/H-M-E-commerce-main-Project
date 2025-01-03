import React from 'react';

function SellerHomePage() {
    return (
        <>
            <div className="position-relative">
                <img 
                    src="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/XXQR3MFQWJLIDA7K75AHW7RTWE.jpg" 
                    alt="Welcome Image"
                    className="img-fluid" 
                />
                <div 
                    className="position-absolute top-50 start-50 translate-middle text-center text-light px-3"
                >
                    <h1 
                        className="display-4 fs-1 fw-bold"
                        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }} // Scales from 2rem to 4rem
                    >
                        Welcome to Your Seller Dashboard!
                    </h1>
                    <p 
                        className="lead fs-5"
                        style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }} // Scales from 1rem to 1.5rem
                    >
                        We're thrilled to have you on board! Start managing your products, track your sales, and grow your store with us.
                    </p>
                    <p 
                        className="fs-6"
                        style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)' }} // Scales from 0.8rem to 1.2rem
                    >
                        <strong>It's time to make your business shine!</strong>
                    </p>
                    <h2 
                        className="btn btn-lg btn-light mt-4"
                        style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }} // Scales from 1rem to 1.5rem
                    >
                        Start Your Selling
                    </h2>
                </div>
            </div>
        </>
    );
}

export default SellerHomePage;
