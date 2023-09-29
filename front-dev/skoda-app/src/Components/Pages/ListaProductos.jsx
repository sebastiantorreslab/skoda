import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import "./ListaProductos.css";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const ListaProductos = () => {
  const { cart, clearCart } = useContext(CartContext);
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
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar style={{ marginRight: "40px" }}>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primaryTypographyProps={{ style: { textAlign: "left" } }}
                      secondaryTypographyProps={{
                        style: { textAlign: "left" },
                      }}
                      primary={post?.name}
                      secondary={"Referencia:" + post?.reference}
                    />
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
            onClick={clearCart}
            variant="contained"
            startIcon={<DeleteIcon />}
            style={{ margin: "5px" }}
          >
            Limpiar lista
          </Button>
          <Link to="/form">
            <Button
              onClick={clearCart}
              variant="contained"
              startIcon={<SearchIcon />}
            >
              buscar más
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
