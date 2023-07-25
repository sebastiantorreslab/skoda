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
  const [filtrados, setFiltrados] = useState([]);
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

      console.log(items);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const filtrarBusqueda = () => {
    items
      .map((product) => {
        console.log("producto" + product);
        return product;
      })
      .filter((product) => {
        product?.vehicleSet.map((vehicle) => {
          if (
            vehicle?.brand != null &&
            vehicle?.carLine != null &&
            vehicle?.iniYear != null &&
            vehicle?.finYear != null
          ) {
            setProductos([{ ...productos, product }]);
          } else {
            console.log("not null allowed");
            return false;
          }
        });
      });

    console.log("productos sin nulos aquí");
    console.log(productos);

    productos?.filter((product) => {
      if (product) {
        product.vehicleSet.some((vehicle) => {
          // aquí se está rompiendo

          console.log("vehicle" + vehicle);
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
            setFiltrados([{ ...filtrados, product }]);
          } else {
            return false;
          }
        });
      } else {
        console.log("no se encontraron vehiculos relacionados");
      }
    });

    console.log("filtrados aquí");
    console.log(filtrados);

    filtrados?.filter((product) => {
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
        setItemSelected([{ itemSelected, product }]);
        console.log("itemSelected");
        console.log("itemSelected" + itemSelected);
        //returns filtered array
      }
    });

    console.log("busqueda array");
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
        {itemSelected?.map((post) => {
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
