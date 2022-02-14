import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
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
    >
      <CardMedia
        component="img"
        height={160}
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent
        sx={{
          backgroundColor: "secondary.main",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle2">{product.name}</Typography>
        {paragraphs.map((para, index) => (
          <Typography
            key={`paragraph_${index}`}
            variant="body1"
            color="primary.light"
            textAlign={"center"}
          >
            {para}
          </Typography>
        ))}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          {product?.discountedPrice && (
            <Typography
              variant="body1"
              variantMapping={{ body1: "span" }}
              sx={{
                backgroundColor: product?.discountedPrice
                  ? "mytext.background"
                  : "",
                px: 1,
              }}
            >
              ₹ {product.discountedPrice}
            </Typography>
          )}
          <Typography
            variant="body1"
            variantMapping={
              product?.discountedPrice ? { body1: "strike" } : { body1: "span" }
            }
            color={product?.discountedPrice ? "primary.light" : "primary.main"}
          >
            ₹ {product.originalPrice}
          </Typography>
          {product?.discountedPrice && (
            <Typography variant="body1" variantMapping={{ body1: "span" }}>
              (-
              {100 -
                Math.round(
                  (product.discountedPrice / product.originalPrice) * 100
                )}
              %)
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
