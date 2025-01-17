import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { Image } from "react-bootstrap";
import autoliv_logo from "../../../assets/images/autoliv_white_logo.png"
import { sUserName } from "../../../constants/jotai_state";
import { useAtom } from "jotai";

function CustomNavbar() {
  const [usenameDefault, setUsenameDefault] = useAtom(sUserName)

  return (
    <div className="container-fluid" style={{ backgroundColor: "#003366", paddingLeft:0 }}>
    <Navbar expand="lg"  variant="dark">
      <Container>
        <Navbar.Brand href="home">
          <div className="nav-bar-logo">
            <Image
              src={autoliv_logo}
              width={120}
              height={38}
            />  | COP Web Application
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown
              title={
                <>
                  <FaUserCircle size={20} style={{ marginRight: "5px" }} />
                  {usenameDefault}
                </>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Navbar expand="lg" style={{ backgroundColor: "#FFFFFF", width: "100vw", paddingLeft:0, boxShadow: "2px 2px 10px #D6D6D6"}} variant="dark">
      <Container>
        <Navbar.Brand href="home">
          <div className="second-nav-color">
            <NavDropdown
              title={
                <>
                  <FaBars size={20} style={{ marginRight: "5px", marginTop: "-4px" }} />
                  Home
                </>
              }
              id="seceond-nav-dropdown"
            >
              <NavDropdown.Item href="home">Home</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
       
      </Container>
    </Navbar>
    </div>
  );
}

export default CustomNavbar;
