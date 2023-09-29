import "./SearchBar.css";
import { styled, alpha } from "@mui/material/styles";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.03),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.02),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    margin: "auto",
    width: "55%",
    marginBottom: "10px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const SearchBar = ({ vehiculo, items }) => {
  const [itemSelected, setItemSelected] = useState([]);
  const [productos, setProductos] = useState([]);
  const [query, setQuery] = useState("");

  const { addToCart } = useContext(CartContext);

  const filtrarBusqueda = () => {
    let filtroVh = items
      .map((product) => {
        return product;
      })
      .filter((product) => {
        if (
          product.vehicleSet.some((vehicle) => {
            if (
              vehicle.brand != null &&
              vehicle.carLine != null &&
              vehicle.iniYear != null &&
              vehicle.finYear != null
            ) {
              vehicle.brand
                .toLowerCase()
                .includes(vehiculo.marca.toLowerCase()) &&
                vehicle.carLine
                  .toLowerCase()
                  .includes(vehiculo.linea.toLowerCase()) &&
                vehiculo.modelo >= vehicle.iniYear &&
                vehiculo.modelo <= vehicle.finYear;
              return true;
            } else {
              console.log("error");
            }
          })
        ) {
          return true;
        } else {
          console.log("no");
        }
      });

    setProductos(filtroVh);

    let filtrados = productos.filter((post) => {
      if (query === " ") {
        //if query is empty
      } else if (
        post.name?.toLowerCase().includes(query.toLowerCase()) ||
        post.reference?.toLowerCase().includes(query.toLowerCase()) ||
        post.description?.toLowerCase().includes(query.toLowerCase())
      ) {
        return post;
      }
    });

    setItemSelected(filtrados);
  };

  useEffect(() => {
    filtrarBusqueda();
  }, []);

  return (
    <div className="searchBar">
      <div
        className="vehiculoBata"
        style={{
          border: "3px solid white",
          margin: "1px",
          position: "sticky",
          top: "0", // Cuando llega al principio de la página
          zIndex: 1000, // Opcional: Controla la elevación
          background: "white", // Opcional: Establece un fondo si es necesario
          borderRadius: "3px", // Opcional: Agrega esquinas redondeadas
          padding: "5px",
          width: "100%",
        }}
      >
        <Search
          style={{
            position: "sticky",
            top: "0", // Cuando llega al principio de la página
            zIndex: 1000, // Opcional: Controla la elevación
            background: "white", // Opcional: Establece un fondo si es necesario
            borderRadius: "5px", // Opcional: Agrega esquinas redondeadas
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Opcional: Agrega una sombra
            marginTop: "10px",
          }}
        >
          <StyledInputBase
            placeholder="Buscar repuestos..."
            inputProps={{ "aria-label": "search" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, paddingRight: "2px" }}
          />
          <IconButton
            style={{
              borderLeft: "1px solid #d1d1d1",
              position: "absolute",
              backgroundColor: "rgba(0, 0, 0,  0.10)",
              right: "0px",
              width: "60px",
              height: "40px",
              padding: "5px",
              borderRadius: "3px",
            }}
            onClick={filtrarBusqueda}
          >
            <SearchIcon />
          </IconButton>
        </Search>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 1, md: 1 }}
          justifyContent="center"
          style={{ margin: "10px" }}
        >
          <Item
            style={{
              background: "#f3f3f3",
              borderRadius: "0",
              width: "100px",
              textAlign: "center",
            }}
          >
            {vehiculo.marca}
          </Item>
          <Item
            style={{
              background: "#f3f3f3",
              borderRadius: "0",
              width: "100px",
              textAlign: "center",
            }}
          >
            {vehiculo.linea}
          </Item>
          <Item
            style={{
              background: "#f3f3f3",
              borderRadius: "0",
              width: "100px",
              textAlign: "center",
            }}
          >
            {vehiculo.modelo}
          </Item>
        </Stack>
      </div>
      <div className="body">
        {itemSelected.map((post) => {
          return (
            <div className="content" key={post?.id}>
              <Card sx={{ maxWidth: 250, maxHeight: 280 }}>
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
      </div>
      <br></br>
      <div className="button">
        <Link to="/lista">
          <Button variant="contained" size="small">
            Ver lista repuestos
          </Button>
        </Link>
      </div>
    </div>
  );
};
