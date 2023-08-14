import React from "react";
import lineasMarca from "../../api/modelo.json";
import { Search } from "../SearchBar/Search";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import "./VehicleForm.css";

export const VehicleForm = () => {
  let marcas = ["Skoda", "Volkswagen", "Audi", "Seat"];

  let anios = [];
  const modeloSelect = () => {
    for (let i = 1987; i <= 2023; i++) {
      anios.push(i);
    }
  };

  modeloSelect();

  const [marca, setMarca] = useState("Skoda");

  const handleMarca = (marca) => {
    if (
      marca === "Skoda" ||
      marca === "Volkswagen" ||
      marca === "Audi" ||
      marca === "Seat"
    ) {
      setMarca(marca);
    }
  };

  let lineasRef = lineasMarca.linea[0][marca];

  const [isSelected, setIsSelected] = useState(false);

  const [vehiculo, setVehiculo] = useState({
    marca: "",
    linea: "",
    modelo: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSelected(true);
  };

  const handleChangeVehiculo = (e, propiedad) => {
    setIsSelected(false);
    setVehiculo({ ...vehiculo, [propiedad]: e.target.value });
    handleMarca(e.target.value);
  };

  return (
    <div className="main">
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <Image
              style={{ width: "191px", height: "180px" }}
              src="https://res.cloudinary.com/dyqwp7czx/image/upload/v1686118723/skoda_dhqzry.jpg"
              rounded
            />
          </Col>
        </Row>
      </Container>
      <br></br>
      <h5 style={{ margin: "auto" }}>
        Selecciona un vehículo para iniciar la búsqueda
      </h5>
      <br></br>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Select
            value={vehiculo.marca}
            name=""
            id=""
            onChange={(e) => handleChangeVehiculo(e, "marca")}
          >
            <option defaultValue="disabled">
              Seleccione marca del vehículo
            </option>
            {marcas.map((element, index) => (
              <option key={index}>{element}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Select
            value={vehiculo.linea}
            name=""
            id=""
            onChange={(e) => handleChangeVehiculo(e, "linea")}
          >
            <option defaultValue="disabled">
              Seleccione la línea del vehículo
            </option>
            {lineasRef.map((element) => (
              <option key={element}>{element}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Select
            value={vehiculo.modelo}
            name=""
            id=""
            onChange={(e) => handleChangeVehiculo(e, "modelo")}
          >
            <option defaultValue="disabled">
              Seleccione el modelo del vehículo
            </option>

            {anios.map((element) => {
              return <option key={element}>{element}</option>;
            })}
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="outline-primary">
          Seleccionar vehículo
        </Button>{" "}
      </Form>
      <br></br>
      {isSelected && <Search vehiculo={vehiculo} />}
    </div>
  );
};
