import { React, createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const clearCart = () => {
    setCart([]);
  };

  const addToCart = (post) => {
    setCart([...cart, post]);
  };

  const deleteProduct = () => {
    console.log("se eliminó del carrito");
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        clearCart: clearCart,
        addToCart: addToCart,
        deleteProduct: deleteProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
