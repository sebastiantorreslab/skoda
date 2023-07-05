import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import "./ListaProductos.css";


export const ListaProductos = () => {
  const { cart, clearCart } = useContext(CartContext);

  return (
    <div>
      {cart.map((element) => {
        return (
          <div className="box" key={element.id}>
            <p>{element.nombre}</p>
            <p>{element.linea}</p>
            <p>{element.modelo}</p>
            <img src={element.img} alt={element.name}></img>
            <button>Eliminar de la lista</button>
          </div>
        );
      })}
      <a href={"https://wa.me/3186296550"}>
        <button style={{ backgroundColor: "#00bb2d", color: "white" }}>
          Cotizar Whatsapp
        </button>
      </a>
      <button onClick={clearCart}>Vaciar lista</button>
    </div>
  );
};
