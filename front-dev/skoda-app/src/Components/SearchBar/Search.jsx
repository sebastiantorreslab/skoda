import "./Search.css";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Search = ({ vehiculo }) => {
  const [items, setItems] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);
  const [productos, setProductos] = useState([]);
  const [query, setQuery] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const products = axios.get("http://localhost:8080/product/findAll");
    products.then((res) => setItems(res.data)).catch((err) => console.log(err));
    filtrarBusqueda();
  }, []);

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
    console.log(filtroVh);

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

  return (
    <div className="bar">
      Vehículo seleccionado
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Item>{vehiculo.marca}</Item>
        <Item>{vehiculo.linea}</Item>
        <Item>{vehiculo.modelo}</Item>
      </Stack>
      <div className="search-bar">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="outlined-required"
            label="Required"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="outlined" onClick={filtrarBusqueda}>
            Buscar
          </Button>
        </Box>
      </div>
      <div className="body">
        {itemSelected.map((post) => {
          return (
            <div className="content" key={post?.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={post.img}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.reference}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Marca: </b>
                    {post.productBrand}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Agregar a lista</Button>
                  <Button size="small">Ver detalle</Button>
                </CardActions>
              </Card>
            </div>
          );
        })}
        <div className="container">
          {!query.length == 0 && itemSelected.length == 0 && (
            <h6>No hay referencias que coincidan con tu búsqueda</h6>
          )}
          {query.length == 0 && (
            <h6>Ingresa un repuesto en la barra de búsqueda</h6>
          )}
        </div>
      </div>
      <div className="button">
        <Button variant="contained" href="/lista">
          Ver lista repuestos
        </Button>
      </div>
    </div>
  );
};
