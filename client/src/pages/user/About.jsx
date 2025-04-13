import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function About() {
  const { darkMode } = useSelector((state) => state.mode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" >
        <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
        <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading...</span>
      </div>
    );
  }

  return (
    <div className={darkMode ? "text-black" : "text-white"}>
      <section>
        <div className="container d-flex justify-content-center align-items-center heading-head">
          <p className={darkMode ? "text-black" : "text-white"} style={{ fontWeight: "600" }}>
            SM.com / <span className='text-danger' style={{ fontWeight: "700" }}>About H&M Group</span>
          </p>
        </div>
        <h1 className="text" style={{ fontSize: "80px" }}>About Us</h1>
        <div style={{ maxWidth: "100%", overflow: "hidden" }}>
          <img
            src="https://hmgroup.com/wp-content/uploads/2025/01/About-Us-HERO.jpg"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            alt="About Us"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "60%",
            margin: "90px auto",
          }}
        >
          <h2 className="text" style={{ fontSize: "32px", lineHeight: "1.4" }}>
            H&M Group is a global fashion and design company, with over 4,000 stores in more than 75 markets and online sales in 60 markets.
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            All our brands and business ventures share the same passion for making great and more sustainable fashion and design available to everyone...
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            textAlign: "center",
            maxWidth: "80%",
            margin: "auto",
            padding: "40px 0"
          }}
        >
          <div>
            <h1 style={{ fontSize: "90px" }}>77</h1>
            <p className="text">markets</p>
          </div>
          <div>
            <h1 style={{ fontSize: "90px" }}>143000</h1>
            <p className="text">employees globally (2023)</p>
          </div>
          <div>
            <h1 style={{ fontSize: "90px" }}>236</h1>
            <p className="text">billion SEK in net sales in 2023, +6% vs. 2022</p>
          </div>
          <div>
            <h1 style={{ fontSize: "90px" }}>85%</h1>
            <p className="text">recycled or sustainably sourced materials in our commercial products</p>
          </div>
        </div>
      </section>

      <section>
        <h1 className="text" style={{ fontSize: "80px" }}>Our way</h1>
        <div style={{ maxWidth: "100%", overflow: "hidden" }}>
          <img
            src="https://hmgroup.com/wp-content/uploads/2025/02/Our-Way-hero-scaled.jpg"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            alt="Our Way"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "60%",
            margin: "90px auto",
          }}
        >
          <h2 className="text" style={{ fontSize: "32px", lineHeight: "1.4" }}>
            We follow all regulations in the markets where we operate and aim to do the right thing...
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            The “Our way” document sums up H&M Group’s culture, values, policies and guidelines.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
