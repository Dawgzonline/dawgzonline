import React, { useState, useEffect } from "react";
import WishListCard from "./WishListCard";
import useWishlist from "../../hooks/useWishlist";
import { Box, Grid, Stack, Typography } from "@mui/material";
import StyledButton from "../styled/Button";
import { useRouter } from "next/router";
import useFetchFromIds from "../../hooks/useFetchFromIds";
import CustomDrawer from "../CustomDrawer";

function Wishlist({ categories }) {
  const { wishlist, deleteFromWishlist } = useWishlist();
  const [doFetch, setDoFetch] = useState(true);
  const [wishlistItem, loading, setWishlistItem] = useFetchFromIds(
    "/api/product",
    doFetch ? wishlist : []
  );
  const [filteredProduct, setFilteredProduct] = useState([]);
  const deleteVariant = (obj) => {
    setDoFetch(false);
    deleteFromWishlist(obj);
    setWishlistItem([
      ...wishlistItem
        .map((item) => {
          if (item._id === obj.product) {
            let newVariants = item.variants.filter(
              (variant) => variant._id !== obj.variant
            );
            if (newVariants.length === 0) {
              return null;
            }
            return { ...item, variants: newVariants };
          }
          return item;
        })
        .filter((item) => !!item),
    ]);
  };
  const router = useRouter();
  useEffect(() => {
    const subcategories = new Set();
    for (let value of Object.values(router.query)) {
      value.split(",").forEach((cx) => {
        subcategories.add(cx);
      });
    }
    const newProducts = [];
    for (const product of wishlistItem) {
      const variants = product.variants.map((variant) => {
        return {
          ...product,
          discountedPrice: variant.discountedPrice,
          originalPrice: variant.originalPrice,
          variant : variant
        };
      });
      for (const variant of variants) {
        newProducts.push(variant);
      }
    }
    setFilteredProduct([
      ...newProducts.filter((product) => {
        const productSubcategory = product?.subcategories
          ? product.subcategories.map(({ label }) => label)
          : [];
        for (let item of subcategories.values()) {
          if (!productSubcategory.includes(item)) {
            return false;
          }
        }
        return true;
      }),
    ]);
  }, [router.query, wishlistItem]);

  return (
    <Box sx={{ minHeight: "var(--window-height)" }}>
      {!loading && filteredProduct.length === 0 && (
        <Stack sx={{ p: 2 }} spacing={2}>
          <Typography variant="h4" color="primary.main">
            Sorry no product found .
          </Typography>
          <Typography variant="subtitle2" color="primary.light">
            Please add product to the wishlist.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <StyledButton
              text={"Products"}
              onClick={() => {
                router.push("/collection");
              }}
            />
          </Box>
        </Stack>
      )}
      {!loading && filteredProduct.length > 0 && (
        <>
          <Box sx={{ backgroundColor: "secondary.main", p: 1, my: 2 }}>
            <Typography variant="subtitle2" color="primary.main">
              Wishlist
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {filteredProduct.map((item, index) => (
              <WishListCard
                wishlistItem={item}
                key={`cart_card_${index}`}
                deleteVariant={deleteVariant}
                variant={item.variant}
              />
            ))}
          </Grid>
          <CustomDrawer
            setFilteredProduct={setFilteredProduct}
            categories={categories}
            filteredProduct={filteredProduct}
          />
        </>
      )}
    </Box>
  );
}

export default Wishlist;
