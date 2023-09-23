import lineasMarca from "../../api/modelo.json";
import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { Search } from "../SearchBar/Search";
import { useEffect, useState, useContext } from "react";
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
  const [items, setItems] = useState([]);

  const handleMarca = (marca) => {
    if (
      marca == "Skoda" ||
      marca == "Volkswagen" ||
      marca == "Audi" ||
      marca == "Seat"
    ) {
      setMarca(marca);
    }
  };

  let linea = lineasMarca.linea[0][marca];

  const [isSelected, setIsSelected] = useState(false);

  const [vehiculo, setVehiculo] = useState({
    marca: "",
    linea: "",
    modelo: 0,
  });

  useEffect(() => {
    const products = axios.get("http://localhost:8080/product/findAll");
    products.then((res) => setItems(res.data)).catch((err) => console.log(err));
  }, []);

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
      <br></br>
      <img
        style={{ width: "191px", height: "180px" }}
        src="https://res.cloudinary.com/dyqwp7czx/image/upload/v1686118723/skoda_dhqzry.jpg"
        rounded
      />
      <br></br>
      <h5 style={{ margin: "auto" }}>
        Selecciona un vehículo para iniciar la búsqueda
      </h5>
      <br></br>
      <FormControl sx={{ m: 1, minWidth: 280 }}>
        <InputLabel id="marca-simple-select-autowidth-label">
          Marca vehículo
        </InputLabel>
        <Select
          labelId="marca-simple-select-autowidth-label"
          id="marca-simple-select-autowidth"
          value={vehiculo.marca}
          onChange={(e) => handleChangeVehiculo(e, "marca")}
          autoWidth
          label="Marca vehículo"
        >
          {marcas.map((marca) => {
            return <MenuItem value={marca}>{marca}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 280 }}>
        <InputLabel id="linea-simple-select-autowidth-label">
          Línea vehículo
        </InputLabel>
        <Select
          labelId="linea-simple-select-autowidth-label"
          id="linea-simple-select-autowidth"
          value={vehiculo.linea}
          onChange={(e) => handleChangeVehiculo(e, "linea")}
          autoWidth
          label="Línea vehículo"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {linea.map((linea) => {
            return <MenuItem value={linea}>{linea}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 280 }}>
        <InputLabel id="modelo-simple-select-autowidth-label">
          Modelo vehículo
        </InputLabel>
        <Select
          labelId="modelo-simple-select-autowidth-label"
          id="modelo-simple-select-autowidth"
          value={vehiculo.modelo}
          onChange={(e) => handleChangeVehiculo(e, "modelo")}
          autoWidth
          label="Modelo vehículo"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {anios.map((anio) => {
            return <MenuItem value={anio}>{anio}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <ButtonGroup
        disableElevation
        variant="contained"
        aria-label="Disabled elevation buttons"
      >
        <Button
          onClick={handleSubmit}
          sx={{ m: 1, minWidth: 80 }}
          size="medium"
        >
          Seleccionar vehículo
        </Button>
        <Button sx={{ m: 1, minWidth: 80 }} size="medium">
          Buscar de nuevo
        </Button>
      </ButtonGroup>
      <br>{/*  space for alert bar*/}</br>
      {isSelected && <Search vehiculo={vehiculo} items={items} />}
      {!isSelected && <span>Selecciona un vehículo para iniciar</span>}
    </div>
  );
};
