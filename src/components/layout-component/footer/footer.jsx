import React from "react";
import Container from "react-bootstrap/Container";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#003366",
        color: "white",
        textAlign: "center",
        padding: "30px 0",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container>
        <small>
          © ATH COP WebApplication V. 2024.12.17.4 - Autoliv (Thailand)
        </small>
      </Container>
    </footer>
  );
}

export default Footer;
