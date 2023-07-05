import axios from "axios";
import React from "react";
import "./CreateProducts.css";
import { useState } from "react";

export const CreateProducts = () => {
  const [productos, setProductos] = useState({
    nombre: "",
    referenciaInterna: "",
    original: "",
    category: "",
    vehiculos: [],
    img: "",
  });

  const handleChange = (e, propiedad) => {
    setProductos({ ...productos, [propiedad]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      id: Number(),
      nombre: productos.nombre,
      referenciaInterna: productos.referenciaInterna,
      original: productos.original,
      category: productos.category,
      vehiculos: [],
      img: productos.img,
    };

    const producto = axios.post("http://localhost:5000/productos", data);
    producto.catch((err) => console.log(err));
  };
  return (
    <div className="create">
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
          Ingrese nombre de producto
          <br />
          <input type="text" onChange={(e) => handleChange(e, "nombre")} />
        </label>
        <br />
        <label htmlFor="">
          Ingrese referencia interna
          <br />
          <input
            type="text"
            onChange={(e) => handleChange(e, "referenciaInterna")}
          />
        </label>
        <br />
        <select
          value={productos.original}
          name=""
          id=""
          onChange={(e) => handleChange(e, "original")}
        >
          <option value="" defaultValue="disabled">
            ¿El producto es original u homologado?
          </option>
          <option value="original">Original</option>
          <option value="homologado">Homologado</option>
        </select>
        <br />
        <select
          value={productos.category}
          name=""
          id=""
          onChange={(e) => handleChange(e, "category")}
        >
          <option value="" defaultValue="disabled">
            Selecciona categoría de producto
          </option>
          <option value="motor">Motor</option>
          <option value="embrague">Embrague</option>
          <option value="suspension">Suspensión</option>
          <option value="trasmision">Trasmisión</option>
          <option value="escape">Escape</option>
          <option value="refrigeracion">Refrigeración</option>
          <option value="frenos">Frenos</option>
          <option value="electronico_electricidad">Electrónica</option>
        </select>
        <br />
        <label htmlFor="">
          Ingrese imagen del producto
          <br />
          <input type="text" onChange={(e) => handleChange(e, "img")} />
        </label>

        <br />
        <button type="submit">Crear producto</button>
      </form>
    </div>
  );
};
