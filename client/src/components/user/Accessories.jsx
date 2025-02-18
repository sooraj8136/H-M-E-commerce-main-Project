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
        maxWidth: "930px", // Matches the width of the second container
        width: "100%", // Ensures it doesn't exceed the max width
        height: "100%", // Adjust height for consistency
        marginTop: "27px", // Matches the margin-top of the second container
      }}
    >
      <img
        src="https://www2.hm.com/content/dam/global_campaigns/season_00/ladies/ws60i/WS60i-3x2-1.jpg"
        className="img-fluid"
        alt="Sample"
        style={{
          width: "100%", // Ensures it fills the container width
          height: "100%", // Fills the container height
          objectFit: "cover", // Maintains aspect ratio while covering the container
        }}
      />
      <div
        className="preppy-sec position-absolute text-white d-flex flex-column align-items-start justify-content-center"
        style={{
          top: "0", // Ensures it spans the full height
          left: "0", // Aligns the content to the left
          width: "100%", // Full width of the container
          height: "100%", // Matches container height
          textAlign: "left", // Aligns the text to the left
          paddingLeft: "20px", // Adds padding to the left
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "calc(1.5rem + 1vw)", // Responsive font size
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