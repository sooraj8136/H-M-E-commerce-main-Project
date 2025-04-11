import React from 'react'
import { Container, Nav } from 'react-bootstrap'

function Accessories() {
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center" style={{ maxWidth: "100%" }}>
        <section>
          <div
            className="position-relative"
            style={{
              maxWidth: "930px",
              width: "100%",
              height: "100%",
              marginTop: "27px",
            }}
          >
            <img
              src="https://www2.hm.com/content/dam/global_campaigns/season_00/ladies/ws60i/WS60i-3x2-1.jpg"
              className="img-fluid"
              alt="Sample"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              className="preppy-sec position-absolute text-white d-flex flex-column align-items-start justify-content-center"
              style={{
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                textAlign: "left",
                paddingLeft: "20px",
              }}
            >
              <h2
                style={{
                  fontWeight: "bold",
                  fontSize: "calc(1.5rem + 1vw)",
                  marginBottom: "10px",
                }}
              >
                New Season Accessories
              </h2>
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  textAlign: "center",
                }}
              >
                <ul
                  className="preppy-btn"
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    gap: "10px",
                  }}
                >
                  <li style={{ cursor: "pointer" }}>
                    <Nav.Link
                      href="/accessories"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        backgroundColor: "white",
                        border: "1px solid white",
                        padding: "6px 8px",
                        fontWeight: "bold",
                        fontSize: "small",
                      }}
                    >
                      Shop Now
                    </Nav.Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  )
}

export default Accessories