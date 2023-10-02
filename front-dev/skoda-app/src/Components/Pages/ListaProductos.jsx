import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Stack from "@mui/material/Stack";
import "./ListaProductos.css";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const ListaProductos = () => {
  const { cart, addToCart, clearCart, removeFromCart, deleteProduct } =
    useContext(CartContext);
  const [dense, setDense] = React.useState(false);

  return (
    <div style={{ paddingTop: "30px" }}>
      <Typography variant="h5" component="div">
        Listado de autopartes
      </Typography>
      <Divider
        variant="inset"
        component="ul"
        style={{
          padding: "10px",
          width: "40%",
          margin: "auto",
          color: "silver",
        }}
      />
      {cart.map((post) => {
        return (
          <Box sx={{ flexGrow: 1, maxWidth: "40%" }}>
            <Grid item xs={12} md={6}>
              <Demo>
                <List dense={dense}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={() => deleteProduct(post)} />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={post?.name}
                        src={post?.img}
                        style={{
                          marginRight: "25px",
                          width: "55px",
                          height: "55px",
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primaryTypographyProps={{ style: { textAlign: "left" } }}
                      secondaryTypographyProps={{
                        style: { textAlign: "left" },
                      }}
                      primary={post?.name}
                      secondary={"Referencia:" + post?.reference}
                    />
                    <IconButton
                      aria-label="Restar"
                      onClick={() => removeFromCart(post)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1">{post?.cant}</Typography>
                    <IconButton
                      aria-label="Sumar"
                      onClick={() => addToCart(post)}
                    >
                      <AddIcon />
                    </IconButton>
                  </ListItem>
                  <Divider
                    variant="outset"
                    component="ul"
                    style={{ width: "100%" }}
                  />
                </List>
              </Demo>
            </Grid>
          </Box>
        );
      })}
      <div
        className="footer"
        style={{
          position: "fixed",
          color: "#fff",
          padding: "15px",
          textAlign: "center",
          bottom: "0",
          width: "100%",
          zIndex: 1000, // Opcional: Controla la elevación
          background: "white", // Opcional: Establece un fondo si es necesario
          borderRadius: "3px", // Opcional: Agrega esquinas redondeadas
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.10)", // Opcional: Agrega una sombra
          marginTop: "20px",
        }}
      >
        <div>
          <a href={"https://wa.me/3186296550"}>
            <Button variant="contained" endIcon={<SendIcon />}>
              Cotizar lista
            </Button>
          </a>

          <Button
            onClick={() => clearCart()}
            variant="contained"
            startIcon={<DeleteIcon />}
            style={{ margin: "5px" }}
          >
            Limpiar lista
          </Button>
          <Link to="/form">
            <Button variant="contained" startIcon={<SearchIcon />}>
              buscar más
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
