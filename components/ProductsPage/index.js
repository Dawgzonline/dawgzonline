import React, {  useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import ProductCard from "./ProductCard";
import StyledButton from "../styled/Button";
import CustomDrawer from "../CustomDrawer";

export default function ProductsPage({ products, categories }) {
  const [filteredProduct, setFilteredProduct] = useState(products);
  const router = useRouter();
  useEffect(() => {
    const subcategories = new Set();
    for (let value of Object.values(router.query)) {
      value.split(",").forEach((cx) => {
        subcategories.add(cx);
      });
    }
    setFilteredProduct([
      ...products.filter((product) => {
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
  }, [router.query, products]);
  useEffect(() => {
    const subcategories = new Set();
    for (let value of Object.values(router.query)) {
      value.split(",").forEach((cx) => {
        subcategories.add(cx);
      });
    }
    setFilteredProduct([
      ...products.filter((product) => {
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
  }, [router.query, products]);
  return (
    <Box sx={{ p: 1 }}>
      {filteredProduct.length === 0 && (
        <Stack
          spacing={2}
          sx={{
            p: 2,
            minHeight: "var(--window-height)",
          }}
        >
          <Typography variant="h4" color="primary.main">
            {" "}
            Sorry no product found .
          </Typography>
          <Typography variant="subtitle2" color="primary.light">
            Please select different filter, If applied.
          </Typography>
          <Typography variant="subtitle2" color="primary.light">
            We do not have any product in this category. Please contact owner
            for further discussion.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <StyledButton
              text={"All Products"}
              onClick={() => {
                router.push("/collection");
              }}
            />
          </Box>
        </Stack>
      )}
      {filteredProduct.length !== 0 && (
        <>
          <Grid container spacing={2}>
            {filteredProduct.map((product, index) => (
              <Grid key={`product_${index}`} item xs={6}>
                <ProductCard product={product} />
              </Grid>
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
