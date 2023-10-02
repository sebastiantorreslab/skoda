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
  const [product, setProduct] = useState([]);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { id } = useParams();

  useEffect(() => {
    const products = axios.get(`http://localhost:8080/product/findById/${id}`);
    products
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Card
        sx={{ maxWidth: 360, maxHeight: 480 }}
        key={product.id}
        style={{ marginTop: "50px", alignItems: "center" }}
      >
        <CardMedia
          component="img"
          alt={product.name}
          height="210"
          image={product.img}
        />
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Referencia: </b>
            {product.reference}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Descripción: </b>
            {product.description}
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
            onClick={() => removeFromCart(product)}
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" style={{ padding: "7px" }}>
            {cart.map((item) =>
              item.id === product.id ? item.cant : product.cant
            )}
          </Typography>
          <IconButton aria-label="Sumar" onClick={() => addToCart(product)}>
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
            <Button size="small" onClick={() => addToCart(product)}>
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
