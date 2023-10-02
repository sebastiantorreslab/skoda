import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateProducts } from "../Operations/CreateProducts";
import { CreateVehicles } from "../Operations/CreateVehicles";
import { VehicleForm } from "../Pages/VehicleForm";
import { Home } from "../Pages/Home";
import { NavBar } from "../Layout/NavBar";
import { Servicios } from "../Pages/Servicios";
import { CartContextProvider } from "../../Context/CartContext";
import { SearchBar } from "../SearchBar/SearchBar";
import { ListaProductos } from "../Pages/ListaProductos";
import { Producto } from "../Pages/Producto";

export const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <CartContextProvider>
          <Routes>
            <Route element={<NavBar />}>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/form" element={<VehicleForm />} />
              <Route path="/search" element={<SearchBar />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/lista" element={<ListaProductos />} />
              <Route path="/producto/:id" element={<Producto />} />
              <Route path="/create" element={<CreateProducts />} />
              <Route path="/create/vehicle" element={<CreateVehicles />} />
              <Route path="*" element={<h1>404 Not found</h1>} />
            </Route>
          </Routes>
        </CartContextProvider>
      </BrowserRouter>
    </div>
  );
};
