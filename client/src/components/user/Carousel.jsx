import React from 'react';
import { Link } from 'react-router-dom';

function Carousel() {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ marginTop: "70px" }}>
            <div className="carousel-inner" >
                <div className="carousel-item active position-relative">
                    <img
                        src="https://www2.hm.com/content/dam/hm-magazine-2023/may_2023/member-behind-the-scenes/Magazine-MEMBER-BTS-A2.jpg"
                        className="d-block w-100 banner-item"
                        alt="First slide"
                    />
                    <div
                        className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            color: 'white',
                            pointerEvents: 'none',
                            marginTop: "10px"
                        }}
                    >
                        <h2 className="mb-3" style={{ pointerEvents: 'auto', fontWeight: "600",letterSpacing:"2px" }}>
                            EXPLORE  OUR  ARRIVALS
                        </h2>
                        <Link to="/product" style={{ pointerEvents: 'auto', textDecoration: 'none' }}>
                            <button
                                className="btn btn-light"
                                style={{
                                    fontWeight: 'bold',
                                    borderRadius: "0"
                                }}
                            >
                                EXPLORE NOW
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
