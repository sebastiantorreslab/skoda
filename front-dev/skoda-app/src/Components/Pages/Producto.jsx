import * as React from "react";
import { useParams } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./Producto.css";
import axios from "axios";

export const Producto = () => {
  const [producto, setProducto] = useState([]);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { id } = useParams();

  useEffect(() => {
    const products = axios.get(`http://localhost:8080/product/findById/${id}`);
    products
      .then((res) => setProducto(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Card
        sx={{ maxWidth: 360, maxHeight: 480 }}
        key={producto.id}
        style={{ marginTop: "50px", alignItems: "center" }}
      >
        <CardMedia
          component="img"
          alt={producto.name}
          height="210"
          image={producto.img}
        />
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {producto.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Referencia: </b>
            {producto.reference}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Descripción: </b>
            {producto.description}
          </Typography>
        </CardContent>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <IconButton
            aria-label="Restar"
            onClick={() => removeFromCart(producto)}
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" style={{ padding: "7px" }}>
            {cart.map((post) => {
              if (post.id === producto.id) {
                console.log(post.cant);
                console.log("---------------------------------");
                console.log("producto", producto);
                console.log("---------------------------------");
                console.log("carrito", post);
              }
            })}
          </Typography>
          <IconButton aria-label="Sumar" onClick={() => addToCart(producto)}>
            <AddIcon />
          </IconButton>
        </div>
        <CardActions>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button size="small" onClick={() => addToCart(producto)}>
              Agregar a lista
            </Button>
            <Link to="/form">
              <Button size="small">Volver</Button>
            </Link>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};
