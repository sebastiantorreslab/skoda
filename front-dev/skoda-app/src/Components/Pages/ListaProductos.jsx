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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./ListaProductos.css";

export const ListaProductos = () => {
  const { cart, clearCart } = useContext(CartContext);

  return (
    <div>
      {cart.map((post) => {
        return (
          <div className="content" key={post?.id}>
            <Card sx={{ maxWidth: 250 }}>
              <CardMedia
                component="img"
                alt={post.name}
                height="150"
                image={post.img}
              />
              <CardContent>
                <Typography gutterBottom variant="h7" component="div">
                  {post.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Referencia: </b>
                  {post.reference}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => addToCart(post)}>
                  Agregar a lista
                </Button>
                <Button size="small">Ver detalle</Button>
              </CardActions>
            </Card>
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
    </div>
  );
};
