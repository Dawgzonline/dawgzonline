import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

function ProductCard({ product }) {
  const paragraphs = product?.description?.map((para) => {
    return para.children
      .reduce((prev, cur) => {
        return prev + " " + cur.text;
      }, "")
      .trim();
  });
  const router = useRouter();
  return (
    <Card
      onClick={() => {
        router.push(`/product/${product._id}`);
      }}
      sx={{ minHeight: "100%", backgroundColor: "secondary.main" }}
    >
      <CardMedia
        component="img"
        image={product.imageUrl}
        height={160}
        alt={product.name}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 1,
        }}
        style={{ paddingBottom: "0.5rem" }}
      >
        <Stack spacing={0.5}>
          <Typography variant="subtitle2" color="primary.dark">
            {product.name}
          </Typography>
          {paragraphs.map((para, index) => (
            <Typography
              key={`paragraph_${index}`}
              variant="body2"
              color="primary.light"
            >
              {para}
            </Typography>
          ))}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 0.8,
            }}
          >
            {product?.discountedPrice && (
              <Typography
                variant="body2"
                variantMapping={{ body2: "span" }}
                sx={{
                  backgroundColor: product?.discountedPrice
                    ? "mytext.background"
                    : "",
                  px: 1,
                  fontSize: "0.7rem",
                }}
              >
                ₹ {product.discountedPrice}
              </Typography>
            )}
            <Typography
              variant="body2"
              variantMapping={
                product?.discountedPrice
                  ? { body2: "strike" }
                  : { body1: "span" }
              }
              color={
                product?.discountedPrice ? "primary.light" : "primary.main"
              }
              sx={{
                fontSize: "0.7rem",
              }}
            >
              ₹ {product.originalPrice}
            </Typography>
            {product?.discountedPrice && (
              <Typography
                variant="body2"
                variantMapping={{ body2: "span" }}
                sx={{
                  display : "flex",
                  alignItems : "center",
                  fontSize: "0.7rem",
                }}
              >
                (-
                {100 -
                  Math.round(
                    (product.discountedPrice / product.originalPrice) * 100
                  )}
                %)
              </Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
