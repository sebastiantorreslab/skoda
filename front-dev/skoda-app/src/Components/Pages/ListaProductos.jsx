import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import AlarmIcon from "@mui/icons-material/Alarm";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { blue, pink } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import "./ListaProductos.css";

export const ListaProductos = () => {
  const { cart, clearCart } = useContext(CartContext);

  return (
    <div>
      {cart.map((element) => {
        return (
          <div className="box" key={element.id}>
            <p>{element.nombre}</p>
            <p>{element.linea}</p>
            <p>{element.modelo}</p>
            <img src={element.img} alt={element.name}></img>
          </div>
        );
      })}
      <a href={"https://wa.me/3186296550"}>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Eliminar
        </Button>
        <Button variant="contained" endIcon={<SendIcon />}>
          Solicitar cotización
        </Button>
      </a>
      <Button onClick={clearCart} variant="contained">
        Vaciar lista
      </Button>
      <Avatar sx={{ bgcolor: blue[700] }}>
        <AssignmentIcon />
      </Avatar>
    </div>
  );
};
