import React, { useContext } from "react";
import { AppStateContext } from "../context/AppstateProvider";
import { arrayIncludes, isObjectEqual } from "../libs/utility";

function useCart() {
  const { cart, modifyCart } = useContext(AppStateContext);
  const addToCart = (data) => {
    if (!arrayIncludes(cart, data)) {
      modifyCart([...cart, data]);
    }
  };
  const deleteFromCart = (data) => {
    modifyCart([...cart.filter((obj) => !isObjectEqual(data, obj))]);
  };
  return { cart, addToCart, deleteFromCart };
}

export default useCart;
