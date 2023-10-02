import { React, createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const clearCart = () => {
    setCart([]);
    sessionStorage.setItem("cart", JSON.stringify([]));
  };

  const addToCart = (post) => {
    const product = cart.find((item) => item?.id === post?.id);
    if (product) {
      setCart(
        cart?.map((item) => {
          if (item.id === post.id) {
            setCart({ ...post, cant: post.cant + 1 });
            sessionStorage.setItem(
              "cart",
              JSON.stringify({ ...post, cant: post.cant + 1 })
            );
          } else {
            item;
          }
        })
      );
    } else {
      setCart([...cart, post]);
      sessionStorage.setItem("cart", JSON.stringify([...cart, post]));
    }
  };

  const removeFromCart = (post) => {
    const product = cart.find((item) => item?.id === post?.id);
    if (product) {
      setCart(
        cart?.map((item) => {
          if (item.id === post.id) {
            setCart({ ...post, cant: post.cant - 1 });
            sessionStorage.setItem(
              "cart",
              JSON.stringify({ ...post, cant: post.cant - 1 })
            );
          } else {
            item;
          }
        })
      );
    } else {
      deleteProduct(post);
    }
  };

  const deleteProduct = (post) => {
    const updatedCart = cart.filter((item) => {
      if (item.id !== post.id) {
        return true;
      }
    });
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify([...cart, updatedCart]));
  };

  return (
    <CartContext.Provider
      value={{
        cart: JSON.parse(sessionStorage.getItem("cart")) || cart,
        clearCart: clearCart,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        deleteProduct: deleteProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
