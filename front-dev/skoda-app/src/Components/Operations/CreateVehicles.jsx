import axios from "axios";
import "./CreateVehicles.css";
import { useState, useContext, useEffect } from "react";
import lineasMarca from "../../api/modelo.json";
import React from "react";


export const CreateVehicles = () => {
  const [vehicle, setVehicle] = useState({
    marca: "",
    linea: "",
    modelo: "",
    combustible: "",
    categoria: "",
    trasmision: "",
    motor: {
      numeroMotor: "",
      categoriaMotor: "",
    },
  });

  let marcas = ["skoda", "volkswagen", "audi"];

  let anios = [];
  const modeloSelect = () => {
    for (let i = 1990; i <= 2023; i++) {
      anios.push(i);
    }
  };

  modeloSelect();

  const [marca, setMarca] = useState("skoda");

  const handleMarca = (marca) => {
    if (marca === "skoda" || marca === "volkswagen" || marca === "audi") {
      setMarca(marca);
    }
  };

  let lineasRef = lineasMarca.linea[0][marca];

  const handleChange = (e, propiedad) => {
    setVehicle({ ...vehicle, [propiedad]: e.target.value });
    handleMarca(e.target.value);
  };

  const handleMotor = (e, propiedad) => {
    setVehicle({
      ...vehicle,
      motor: { ...vehicle.motor, [propiedad]: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      id:Number(),
      marca: vehicle.marca,
      linea: vehicle.linea,
      modelo: vehicle.modelo,
      combustible: vehicle.combustible,
      categoria: vehicle.categoria,
      trasmision: vehicle.trasmision,
      motor: {
        numeroMotor: vehicle.motor.numeroMotor,
        categoriaMotor: vehicle.motor.categoriaMotor,
      },
    };

    const producto = axios.post("http://localhost:5000/vehiculos", data);
    producto.catch((err) => console.log(err));
  };

  return (
    <div className="create">
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
          Registrar vehículo en plataforma
          <br />
          <select
            value={vehicle.marca}
            name=""
            id=""
            onChange={(e) => handleChange(e, "marca")}
          >
            <option value="" defaultValue="disabled">
              Selecciona una marca de vehículo
            </option>
            {marcas.map((element) => {
              return <option key={element}>{element}</option>;
            })}
          </select>
          <br />
          <select
            value={vehicle.linea}
            name=""
            id=""
            onChange={(e) => handleChange(e, "linea")}
          >
            <option value="" defaultValue="disabled">
              Selecciona una línea de vehículo
            </option>
            {lineasRef.map((element) => {
              return <option key={element}>{element}</option>;
            })}
          </select>
          <br />
          <select
            value={vehicle.modelo}
            name=""
            id=""
            onChange={(e) => handleChange(e, "modelo")}
          >
            <option value="" defaultValue="disabled">
              Selecciona un modelo de vehículo
            </option>
            {anios.map((element) => {
              return <option key={element}>{element}</option>;
            })}
          </select>
          <br />
          <select
            value={vehicle.combustible}
            name=""
            id=""
            onChange={(e) => handleChange(e, "combustible")}
          >
            <option value="" defaultValue="disabled">
              Selecciona el tipo de combustible
            </option>
            <option value="gasolina">Gasolina</option>
            <option value="diesel">Diesel</option>
          </select>
          <br />
          <select
            value={vehicle.categoria}
            name=""
            id=""
            onChange={(e) => handleChange(e, "categoria")}
          >
            <option value="" defaultValue="disabled">
              Selecciona categoría de vehículo
            </option>
            <option value="automovil">Automovil</option>
            <option value="camioneta">Camioneta</option>
            <option value="combi">Combi</option>
            <option value="pick-up">Pick Up</option>
          </select>
          <br />
          <select
            value={vehicle.trasmision}
            name=""
            id=""
            onChange={(e) => handleChange(e, "trasmision")}
          >
            <option value="" defaultValue="disabled">
              Selecciona la trasmisión del vehículo
            </option>
            <option value="manual">Manual</option>
            <option value="automatico">Automático</option>
            <option value="triptonico">Triptónico</option>
          </select>
        </label>
        <br />
        <label htmlFor="">
          <b>Registra información de motor del vehículo</b>
          <br />
          Número de motor
          <input
            value={vehicle.motor.numeroMotor}
            placeholder="Código motor"
            type="text"
            onChange={(e) => handleMotor(e, "numeroMotor")}
          />
        </label>
        <br />
        <label htmlFor="">
          Selecciona categoría de motor
          <select
            value={vehicle.motor.categoriaMotor}
            name=""
            id=""
            onChange={(e) => handleMotor(e, "categoriaMotor")}
          >
            <option value="" defaultValue="disabled">
              Selecciona categoría
            </option>
            <option value="1">Categoría 1</option>
            <option value="2">Categoría 2</option>
            <option value="3">Categoría 3</option>
          </select>
        </label>
        <br />
        <button type="submit">Registrar vehículo</button>
      </form>
    </div>
  );
};
