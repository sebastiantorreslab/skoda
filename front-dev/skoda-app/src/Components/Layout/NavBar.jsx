import React from "react";
import { Outlet, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export const NavBar = () => {
  return (
    <>
      <Nav justify variant="tabs" >
        <Nav.Item>
          <Nav.Link href="/form">Buscador</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/servicios">Servicios</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/lista">Cotizar</Nav.Link>
        </Nav.Item>
      </Nav>{" "}
      <Outlet />
    </>
  );
};
