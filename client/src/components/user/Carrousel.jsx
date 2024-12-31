import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

function Carrousel() {
  return (
    <>
      <div
        className="container d-flex justify-content-center"
        style={{
          maxWidth: "950px",
          width: "100%", 
        }}
      >
        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              src="https://image.hm.com/content/dam/global_campaigns/season_00/ladies/ws60h/WS60H-3x2.jpg?imwidth=1536"
              className="d-block w-100"
              alt="First slide"
              style={{
                height: "auto",
              }}
            />
            <Carousel.Caption>
              <h3 className="text-black">New arrivals</h3>
              <p className="text-black">Sale is live. Explore exclusive styles.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              src="https://www2.hm.com/content/dam/HM%20Magazine%202018/Everyday%20Icon/18_17-A-Jung-Ju-Lee-Seoul_5.jpg"
              className="d-block w-100"
              alt="Second slide"
              style={{
                height: "auto",
              }}
            />
            <Carousel.Caption>
              <h3 className="text-black">New arrivals</h3>
              <p className="text-black">Sale is live. Explore exclusive styles.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://www2.hm.com/content/dam/global_campaigns/season_00/kids/4200t/4200T-3x2-Limited-edition-kids.jpg"
              className="d-block w-100"
              alt="Third slide"
              style={{
                height: "auto",
              }}
            />
            <Carousel.Caption>
              <h3 className="text-black">New arrivals</h3>
              <p className="text-black">Sale is live. Explore exclusive styles.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>


    </>
  )
}

export default Carrousel