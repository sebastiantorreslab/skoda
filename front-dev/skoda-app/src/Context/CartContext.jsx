import { React, createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const clearCart = () => {
    setCart([]);
  };

  const addToCart = (post) => {
    const product = cart.find((item) => item?.id === post?.id);
    if (product) {
      setCart(
        cart?.map((item) =>
          item.id === post.id ? { ...post, cant: post.cant + 1 } : item
        )
      );
    } else {
      setCart([...cart, post]);
    }
  };

  const removeFromCart = (post) => {
    const product = cart.find((item) => item?.id === post?.id);
    if (product) {
      setCart(
        cart?.map((item) =>
          item.id === post.id && post.cant > 0
            ? { ...post, cant: post.cant - 1 }
            : item
        )
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
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart,
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
