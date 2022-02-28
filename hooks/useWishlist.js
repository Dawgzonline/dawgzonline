import React, { useContext } from "react";
import { AppStateContext } from "../context/AppstateProvider";
import { arrayIncludes } from "../libs/utility";

function useWishlist() {
  const { wishlist, modifyWishList } = useContext(AppStateContext);
  const addToWishlist = (data) => {
    if (!arrayIncludes(wishlist, data)) {
      modifyWishList([...wishlist, data]);
    }
  };
  return { wishlist, addToWishlist };
}

export default useWishlist;
