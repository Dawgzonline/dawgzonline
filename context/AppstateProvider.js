import React, { useState, useEffect } from "react";

const collection = [
  {
    heading: "DOG",
    image: "/dog.jpg",
    content: [
      {
        id: 1,
        title: "Food",
        nested: true,
        to: "/collection?category='food'",
        links: [{ title: "Wet food" }, { title: "Dry food" }],
      },
      {
        id: 2,
        title: "Treats",
        nested: true,
        to: "/collection?category='treats'",
        links: [{ title: "Veg treats" }, { title: "Non-veg treats" }],
      },
      {
        id: 3,
        title: "Grooming",
        to: "/collection?category='grooming'",
        nested: true,
        links: [
          { title: "Shampoo" },
          { title: "Conditioner" },
          { title: "Grooming tools" },
        ],
      },
      {
        id: 4,
        title: "Toys",
        nested: false,
        to: "/collection?category='toys'",
      },
      {
        id: 5,
        title: "Accessories",
        nested: false,
        to: "/collection?category='accessories'",
      },
      {
        id: 6,
        title: "Utilities",
        to: "/collection?category='utilities'",
        nested: false,
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
        nested: true,
        to: "/collection?category='food'",
        links: [{ title: "Wet food" }, { title: "Dry food" }],
      },
      {
        id: 2,
        title: "Treats",
        nested: true,
        to: "/collection?category='treats'",
        links: [{ title: "Veg treats" }, { title: "Non-veg treats" }],
      },
      {
        id: 3,
        title: "Grooming",
        to: "/collection?category='grooming/bas'",
        nested: true,
        links: [
          { title: "Shampoo" },
          { title: "Conditioner" },
          { title: "Grooming tools" },
        ],
      },
      {
        id: 4,
        title: "Toys",
        nested: false,
        to: "/collection?category='toys'",
      },
      {
        id: 5,
        title: "Accessories",
        nested: false,
        to: "/collection?category='accessories'",
      },
      {
        id: 6,
        title: "Utilities",
        to: "/collection?category='utilities'",
        nested: false,
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
