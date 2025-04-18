import React from "react";
import { Container } from "react-bootstrap";

function HomeWidget() {
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center mt-4" style={{ maxWidth: "100%" }}>
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
              src="https://image.hm.com/content/dam/global_campaigns/season_01/women/ws21g/WS21G-new-3x2_2.jpg?imwidth=1536"
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
              <div
                className="button-group position-absolute d-flex justify-content-center flex-wrap"
                style={{
                  bottom: "50px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  gap: "9px",
                  maxWidth: "930px",
                  width: "100%",
                }}
              >
                <a href="/Ladies" style={{ textDecoration: "none" }}>
                  <button
                    className="btn-light"
                    style={{
                      padding: "7px 10px",
                      fontSize: ".9rem",
                      fontWeight: "700",
                      border: "1px solid #ddd",
                    }}
                  >
                    Ladies
                  </button>
                </a>
                <a href="/Hot-sellers" style={{ textDecoration: "none" }}>
                  <button
                    className="btn-light"
                    style={{
                      padding: "7px 10px",
                      fontSize: ".9rem",
                      fontWeight: "700",
                      border: "1px solid #ddd",
                    }}
                  >
                    Men
                  </button>
                </a>
                <a href="/Baby" style={{ textDecoration: "none" }}>
                  <button
                    className="btn-light"
                    style={{
                      padding: "7px 10px",
                      fontSize: ".9rem",
                      fontWeight: "700",
                      border: "1px solid #ddd",
                    }}
                  >
                    Kids & Baby
                  </button>
                </a>
              </div>

              <p
                className="position-absolute text-center"
                style={{
                  bottom: "3px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "x-small",
                  fontWeight: "600",
                }}
              >
                Explore the latest fashion.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}

export default HomeWidget;
