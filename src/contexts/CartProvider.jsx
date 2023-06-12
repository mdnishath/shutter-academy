import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const cartInfo = { cart, setCart };
  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};
