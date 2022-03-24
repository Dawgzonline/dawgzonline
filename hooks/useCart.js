import React, { useContext } from "react";
import { AppStateContext } from "../context/AppstateProvider";

const arrayIncludes = (arr, obj) => {
  return !!arr.find(
    (data) => data.product === obj.product && data.variant === obj.variant
  );
};

const isObjectEqual = (data, obj) => {
  return data.product === obj.product && data.variant === obj.variant;
};

function useCart() {
  const { cart, modifyCart } = useContext(AppStateContext);
  const addToCart = (data) => {
    if (!arrayIncludes(cart, data)) {
      modifyCart([...cart, { ...data, amount: 1 }]);
      return;
    }
    modifyCart([
      ...cart.map((item) => {
        if (isObjectEqual(item, data)) {
          return { ...data, amount: item.amount + 1 };
        }
        return item;
      }),
    ]);
  };
  const removeFromCart = (data) => {
    if (!arrayIncludes(cart, data)) {
      return;
    }
    modifyCart([
      ...cart.map((item) => {
        if (isObjectEqual(item, data) && item.amount === 1) return null;
        if (isObjectEqual(item, data) && item.amount !== 0) {
          return { ...data, amount: item.amount - 1 };
        }
        return item;
      }),
    ].filter( t => !!t));
  };
  const deleteFromCart = (data) => {
    modifyCart([...cart.filter((obj) => !isObjectEqual(data, obj))]);
  };

  const empty = () => {
    modifyCart([]);
  }
  return { cart, addToCart, deleteFromCart, removeFromCart, empty };
}

export default useCart;
