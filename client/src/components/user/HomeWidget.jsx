import React from "react";
import { Container } from "react-bootstrap";

function HomeWidget() {
  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ maxWidth: "100%" }}
      >
        <div
          className="widget text-white text-center"
          style={{
            maxWidth: "930px",
            width: "100%",
            backgroundColor: "#c9002e",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "400px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              height: "100%",
            }}
          >
            <h2>Weekend offer</h2>
            <h1
              className="widget-text-1"
              style={{
                fontSize: "calc(2rem + 1vw)",
                marginBottom: "10px",
              }}
            >
              Hurry up!
            </h1>
            <p className="responsive-text" style={{ fontSize: "large" }}>
              Shop t-shirts, polos & more at slashed prices.
            </p>
          </div>
          <div
            className="button-group d-flex justify-content-center flex-wrap mt-4 d-none d-md-flex"
            style={{
              gap: "9px",
              marginTop: "20px",
              maxWidth: "930px",
              width: "100%",
            }}
          >
            <a href="/New neutrals" style={{ textDecoration: "none" }}>
              <button
                className="btn-light"
                style={{
                  padding: "7px 10px",
                  fontSize: ".9rem",
                  fontWeight: "700",
                  border: "none",
                }}
              >
                Ladies
              </button>
            </a>
            <a href="/New neutrals" style={{ textDecoration: "none" }}>
              <button
                className="btn-light"
                style={{
                  padding: "7px 10px",
                  fontSize: ".9rem",
                  fontWeight: "700",
                  border: "none",
                }}
              >
                Men
              </button>
            </a>
            <a href="/Hot-sellers" style={{ textDecoration: "none" }}>
              <button
                className="btn-light"
                style={{
                  padding: "7px 10px",
                  fontSize: ".9rem",
                  fontWeight: "700",
                  border: "none",
                }}
              >
                Kids & Baby
              </button>
            </a>
          </div>
          <p
            className="text-center mt-4"
            style={{ fontSize: "x-small", fontWeight: "600" }}
          >
            Offer only valid online. *T&C Apply
          </p>
        </div>
      </Container>
    </>
  );
}

export default HomeWidget;
