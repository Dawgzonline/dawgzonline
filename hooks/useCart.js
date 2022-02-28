import React, { useContext } from "react";
import { AppStateContext } from "../context/AppstateProvider";
import { arrayIncludes } from "../libs/utility";

function useCart() {
  const { cart, modifyCart } = useContext(AppStateContext);
  const addToCart = (data) => {
    if (!arrayIncludes(cart, data)) {
      modifyCart([...cart, data]);
    }
  };
  return { cart, addToCart };
}

export default useCart;
