import React, { useContext } from "react";
import { AppStateContext } from "../context/AppstateProvider";
import { arrayIncludes, isObjectEqual } from "../libs/utility";

function useWishlist() {
  const { wishlist, modifyWishList } = useContext(AppStateContext);
  const addToWishlist = (data) => {
    if (!arrayIncludes(wishlist, data)) {
      modifyWishList([...wishlist, data]);
    }
  };
  const deleteFromWishlist = (data) => {
    modifyWishList([...wishlist.filter((obj) => !isObjectEqual(data, obj))]);
  };
  return { wishlist, addToWishlist, deleteFromWishlist };
}

export default useWishlist;
