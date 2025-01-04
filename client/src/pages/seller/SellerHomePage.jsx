import React from 'react';

function SellerHomePage() {
    return (
        <div
            className="position-relative"
            style={{
                backgroundImage: `url('https://cloudfront-us-east-2.images.arcpublishing.com/reuters/XXQR3MFQWJLIDA7K75AHW7RTWE.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100vw',
            }}
        >
            <div
                className="position-absolute top-50 start-50 translate-middle text-center text-light px-3"
                style={{
                    width: '90%',
                    maxWidth: '800px',
                    backgroundColor: 'rgba(14, 14, 14, 0.7)', // Semi-transparent background for text
                    padding: '1.5rem',
                }}
            >
                <h1
                    className="fw-bold"
                    style={{
                        fontSize: 'clamp(1.8rem, 5vw, 3rem)', // Font size scales with screen size
                        lineHeight: '1.3',
                        color: '#ffffff',
                        marginBottom: '1rem',
                    }}
                >
                    Welcome to Your Seller Dashboard!
                </h1>
                <p
                    className="lead"
                    style={{
                        fontSize: 'clamp(1rem, 3vw, 1.5rem)', // Responsive font size for paragraph
                        lineHeight: '1.5',
                        color: '#ffffff',
                        marginBottom: '1rem',
                    }}
                >
                    We're thrilled to have you on board! Start managing your products, track your sales, and grow your store with us.
                </p>
                <p
                    style={{
                        fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)', // Scales for small text
                        lineHeight: '1.4',
                        color: '#ffffff',
                        marginBottom: '1.5rem',
                    }}
                >
                    <strong>It's time to make your business shine!</strong>
                </p>
                <h2
                    // className="btn btn-lg btn-light mt-3"
                    style={{
                        fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '0.5rem',
                    }}
                >
                    Start Your Selling!
                </h2>
            </div>
        </div>
    );
}

export default SellerHomePage;
