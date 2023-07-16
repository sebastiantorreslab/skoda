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
        "https://back-end-service-4d3a.onrender.com/product/findAll",
        {
          method: "GET",
        }
      );
      products
        .then((res) => setItems(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      setItems([isChange]);
    }
  }, []);

  const filtrarBusqueda = () => {
    console.log("filtrando");

    let vehiculosFiltro = items
      .map((product) => {
        return product;
      })
      .filter((product) => {
        product.vehicleSet.map((vehicle) => {
          if (
            vehicle.brand == null &&
            vehicle.model == null &&
            vehicle.iniYear == null &&
            vehicle.finYear == null
          ) {
            console.log("null");
          } else if (
            vehicle?.brand
              .toLocaleLowerCase()
              .includes(vehiculo.marca?.toLocaleLowerCase()) &&
            vehicle?.carLine
              .toLocaleLowerCase()
              .includes(vehiculo.linea?.toLocaleLowerCase()) &&
            Number(vehiculo.model) >= Number(vehicle?.iniYear) &&
            Number(vehiculo.model) <= Number(vehicle?.finYear)
          ) {
            console.log(product);
            return product;
          } else {
            console.log("producto no encontrado");
          }
        });
      });
    setProductos(vehiculosFiltro);
    console.log("vehiculos filtro" + vehiculosFiltro);
    console.log("productos" + productos);

    let filtrados = productos.filter((post) => {
      if (query === "") {
      } else if (
        post.name?.toLocaleLowerCase().includes(query?.toLocaleLowerCase())
      ) {
        return post;
      } else {
      }
    });
    setItemSelected(filtrados);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bar">
      <Card className="car-select" style={{ width: "70%" }}>
        <Card.Title>Vehículo seleccionado</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <b>Marca:</b> {vehiculo?.marca}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Linea:</b> {vehiculo?.linea}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Modelo:</b> {vehiculo?.modelo}
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
        {itemSelected &&
          itemSelected.map((post) => {
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
