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
import { SearchBar } from "../SearchBar/SearchBar";
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
  const [err, setErr] = useState(
    "Selecciona un vehículo para iniciar la búsqueda"
  );

  const [vehiculo, setVehiculo] = useState({
    marca: "",
    linea: "",
    modelo: "",
  });

  useEffect(() => {
    const products = axios.get("http://localhost:8080/product/findAll");
    products.then((res) => setItems(res.data)).catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (vehiculo.marca == "" || vehiculo.linea == "" || vehiculo.modelo == 0) {
      if (
        vehiculo.marca == "" &&
        vehiculo.linea == "" &&
        vehiculo.modelo == 0
      ) {
        setErr("Selecciona un vehículo para iniciar");
      } else {
        setErr("Selecciona marca, línea y modelo del vehículo");
      }
    } else if (
      vehiculo.marca != "" &&
      vehiculo.linea != "" &&
      vehiculo.modelo != 0
    ) {
      setErr("");
      setIsSelected(true);
    }
  };

  const handleErr = () => {
    setIsSelected(false);
    setVehiculo({ vehiculo, marca: "", linea: "", modelo: "" });
    setErr("Selecciona marca, línea y modelo del vehículo");
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
        style={{ width: "281px", height: "270px" }}
        src="https://res.cloudinary.com/dyqwp7czx/image/upload/v1686118723/skoda_dhqzry.jpg"
        rounded
      />
      <br></br>

      <br></br>

      <br></br>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel
          id="demo-simple-select-autowidth-label"
          style={{ width: "230px" }}
        >
          Marca vehículo
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={vehiculo.marca}
          onChange={(e) => handleChangeVehiculo(e, "marca")}
          label="Marca vehículo"
          style={{ width: "200px" }}
        >
          {marcas.map((marca) => {
            return <MenuItem value={marca}>{marca}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel
          id="linea-simple-select-autowidth-label"
          style={{ width: "230px" }}
        >
          Línea vehículo
        </InputLabel>
        <Select
          labelId="linea-simple-select-autowidth-label"
          id="linea-simple-select-autowidth"
          value={vehiculo.linea}
          onChange={(e) => handleChangeVehiculo(e, "linea")}
          autoWidth
          label="Línea vehículo"
          style={{ width: "200px" }}
        >
          {linea.map((linea) => {
            return <MenuItem value={linea}>{linea}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel
          id="linea-simple-select-autowidth-label"
          style={{ width: "230px" }}
        >
          Modelo vehículo
        </InputLabel>
        <Select
          labelId="modelo-simple-select-autowidth-label"
          id="modelo-simple-select-autowidth"
          value={vehiculo.modelo}
          onChange={(e) => handleChangeVehiculo(e, "modelo")}
          autoWidth
          label="Modelo vehículo"
          style={{ width: "200px" }}
        >
          {anios.map((anio) => {
            return <MenuItem value={anio}>{anio}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <div>
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
          <Button sx={{ m: 1, minWidth: 80 }} size="medium" onClick={handleErr}>
            Buscar de nuevo
          </Button>
        </ButtonGroup>
      </div>
      <br></br>
      {isSelected && <span>Vehículo seleccionado </span>}
      {isSelected && !err ? (
        <SearchBar vehiculo={vehiculo} items={items} />
      ) : (
        <span>{err}</span>
      )}

      <br></br>
    </div>
  );
};
