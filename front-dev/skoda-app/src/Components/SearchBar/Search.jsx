import "./Search.css";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";

export const Search = ({ vehiculo }) => {
  const [items, setItems] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [itemSelected, setItemSelected] = useState([]);
  const [productos, setProductos] = useState([]);
  const [query, setQuery] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    try {
      const products = axios.get(
        "https://back-end-service-4d3a.onrender.com/product/findAll"
      );
      products
        .then((res) => setItems(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [isChange]);

  const filtrarBusqueda = () => {
    let productosDisp = items
      .map((product) => {
        return product;
      })
      .filter((product) => {
        product.vehicleSet.map((vehicle) => {
          console.log("------vehiculo-------");
          console.log(vehicle.brand);
          console.log(vehicle.carLine);
          console.log(vehicle.iniYear);
          console.log(vehicle.finYear);
          console.log("----------------");
          if (
            vehicle?.brand != null &&
            vehicle?.carLine != null &&
            vehicle?.iniYear != null &&
            vehicle?.finYear != null
          ) {
            return product;
          } else {
            console.log("not null allowed");
            return false;
          }
        });
      });

    setProductos(productosDisp);

    let filtrados = productosDisp
      .map((product) => {
        return product;
      })
      .filter((product) => {
        if (product) {
          product.vehicleSet.some((vehicle) => {
            if (
              vehicle.brand
                ?.toLocalLowerCase()
                .trim()
                .includes(vehiculo?.trim().marca) &&
              vehicle.carLine
                ?.toLocaleLowerCase()
                .trim()
                .includes(vehiculo?.trim().linea) &&
              Number(vehiculo.modelo) >= Number(vehicle.iniYear) &&
              Number(vehiculo.modelo) <= Number(vehicle.finYear)
            ) {
              return true;
            } else {
              return false;
            }
          });

          return product;
        } else {
          console.log("no se encontraron vehiculos relacionados");
        }
      });

    setProductos(filtrados);

    let busqueda = productos.filter((product) => {
      if (query === "") {
        //if query is empty
      } else if (
        product.name
          ?.toLowerCase()
          .trim()
          .includes(query?.trim().toLowerCase()) ||
        product.reference
          ?.toLowerCase()
          .includes(query?.trim().toLowerCase()) ||
        product.description?.toLowerCase().includes(query?.trim().toLowerCase())
      ) {
        console.log("busqueda Search.jsx" + product);
        //returns filtered array
        return product;
      }
    });

    setItemSelected(busqueda);
    setIsChange(true);
  };

  return (
    <div className="bar">
      <Card className="car-select" style={{ width: "70%" }}>
        <Card.Title>Vehículo seleccionado</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <b>Marca:</b> {vehiculo.marca}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Linea:</b> {vehiculo.linea}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Modelo:</b> {vehiculo.modelo}
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <br></br>
      <div className="search-bar">
        <InputGroup className="mb-3">
          <Form.Control
            id="input-form"
            value={query}
            name="search"
            type="text"
            placeholder="Ingresa el repuesto a buscar"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            variant="outline-primary"
            id="button-addon2"
            onClick={filtrarBusqueda}
          >
            Buscar
          </Button>
        </InputGroup>
      </div>
      <div className="body">
        {itemSelected.map((post) => {
          return (
            <div className="content" key={post.id}>
              <Card style={{ width: "16rem", height: "390px" }}>
                <Card.Img
                  variant="top"
                  src={post.img}
                  alt="img"
                  style={{ height: "50%" }}
                />
                <Card.Body>
                  <Card.Title>{post.name}</Card.Title>
                  <Card.Text>
                    <b>Ref: </b>
                    {post.reference}
                  </Card.Text>
                  <Card.Text>
                    <b>Marca: </b>
                    {post.productBrand}
                  </Card.Text>
                  <Button
                    className="btn"
                    variant="primary"
                    onSelect="active"
                    style={{ width: "auto" }}
                    onClick={() => addToCart(post)}
                  >
                    Cotizar
                  </Button>
                </Card.Body>
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
      <Link to="/lista">
        <div className="button">
          <button>Ver lista repuestos</button>
        </div>
      </Link>
    </div>
  );
};
