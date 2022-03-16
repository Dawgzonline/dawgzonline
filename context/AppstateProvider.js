import React, { useState, useEffect } from "react";

const collection = [
  {
    heading: "DOG",
    image: "/dog.jpg",
    content: [
      {
        id: 1,
        title: "Food",
        to: "/category/food?pet-type=dog",
      },
      {
        id: 2,
        title: "Treats",
        to: "/category/treats?pet-type=dog",
      },
      {
        id: 3,
        title: "Grooming",
        to: "/category/grooming?pet-type=dog",
      },
      {
        id: 4,
        title: "Toys",
        to: "/category/toys?pet-type=dog",
      },
      {
        id: 5,
        title: "Accessories",
        to: "/category/accessories?pet-type=dog",
      },
      {
        id: 6,
        title: "Utilities",
        to: "/category/utilities?pet-type=dog",
      },
    ],
  },
  {
    heading: "CAT",
    image: "/cat.jpg",
    content: [
      {
        id: 1,
        title: "Food",
        to: "/category/food?pet-type=cat",
      },
      {
        id: 2,
        title: "Treats",
        to: "/category/treats?pet-type=cat",
      },
      {
        id: 3,
        title: "Grooming",
        to: "/category/grooming?pet-type=cat",
      },
      {
        id: 4,
        title: "Toys",
        to: "/category/toys?pet-type=cat",
      },
      {
        id: 5,
        title: "Accessories",
        to: "/category/accessories?pet-type=cat",
      },
      {
        id: 6,
        title: "Utilities",
        to: "/category/utilities?pet-type=cat",
      },
    ],
  },
];

export const AppStateContext = React.createContext({ collection });

export default function AppstateProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishList] = useState([]);

  const modifyCart = (newData) => {
    localStorage.setItem("cart", JSON.stringify(newData));
    setCart(newData);
  };
  const modifyWishList = (newData) => {
    localStorage.setItem("wishlist", JSON.stringify(newData));
    setWishList(newData);
  };

  useEffect(() => {
    const cartItem = JSON.parse(localStorage.getItem("cart"));
    const wishlistItem = JSON.parse(localStorage.getItem("wishlist"));
    if (cartItem) {
      setCart(cartItem);
    }
    if (wishlistItem) {
      setWishList(wishlistItem);
    }
  }, []);

  const value = {
    collection,
    cart,
    wishlist,
    modifyCart,
    modifyWishList,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}
