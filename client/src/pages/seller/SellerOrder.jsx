import React from 'react';
import { Link } from 'react-router-dom';

function SellerOrder() {
    return (
        <>
            <h2>You can manage orders efficiently</h2>
            <div
                style={{
                    display: 'flex', // Use flexbox for layout
                    justifyContent: 'space-between', // Distributes content
                    alignItems: 'flex-start', // Align items at the top
                    padding: '20px', // Adds padding around the container
                }}
            >
                {/* Links Section */}
                <div
                    style={{
                        width: '30%', // Sidebar width
                        padding: '20px',
                        textAlign: 'start',
                    }}
                >
                    <hr />
                    <Link
                        to="/seller/get-orders-seller"
                        style={{
                            display: 'block', // Makes it easier to style as a block element
                            margin: '10px 0',
                            textDecoration: 'none', // Removes underline
                            color: 'black', // Link color
                            fontSize: '18px', // Adjusts font size
                            fontWeight: 'bold',
                        }}
                    >
                        Orders
                    </Link>
                    <hr />
                    <Link
                        to="/seller/update-order-status"
                        style={{
                            display: 'block',
                            margin: '10px 0',
                            textDecoration: 'none',
                            color: 'black',
                            fontSize: '18px',
                            fontWeight: 'bold',
                        }}
                    >
                        Update Order Status
                    </Link>
                    <hr />
                </div>

                {/* Image Section */}
                <div
                    style={{
                        width: '70%', // Image container width
                        textAlign: 'center', // Centers the image in its container
                    }}
                >
                    <img
                        src="https://wwd.com/wp-content/uploads/2023/08/9068_13_404-e1692642354831.jpg"
                        alt="Seller dashboard visual"
                        style={{
                            maxWidth: '100%', // Ensures the image fits the container
                            height: 'auto', // Maintains aspect ratio
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default SellerOrder;
