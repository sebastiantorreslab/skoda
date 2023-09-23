import lineasMarca from "../../api/modelo.json";
import * as React from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
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
      marca == "Skoda" ||
      marca == "Volkswagen" ||
      marca == "Audi" ||
      marca == "Seat"
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
          value=""
          onChange=""
          autoWidth
          label="Marca vehículo"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 280 }}>
        <InputLabel id="linea-simple-select-autowidth-label">
          Línea vehículo
        </InputLabel>
        <Select
          labelId="linea-simple-select-autowidth-label"
          id="linea-simple-select-autowidth"
          value=""
          onChange=""
          autoWidth
          label="Línea vehículo"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 280 }}>
        <InputLabel id="modelo-simple-select-autowidth-label">
          Modelo vehículo
        </InputLabel>
        <Select
          labelId="modelo-simple-select-autowidth-label"
          id="modelo-simple-select-autowidth"
          value=""
          onChange=""
          autoWidth
          label="Modelo vehículo"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
