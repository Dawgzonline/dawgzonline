import React, { useState } from "react";
import { Box, Grid, Rating, Stack, Typography } from "@mui/material";
import Carousel from "../Carousel";
import Image from "next/image";
import { getWidthAndHeight, getTextFromDescription } from "../../libs/utility";
import StyledButton from "../styled/Button";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

function ProductPage({ product }) {
  const variantImages =
    product.variants && product.variant != null
      ? [
          ...product.variants?.reduce(
            (arr, variant) => [...arr, ...variant.images],
            []
          ),
        ]
      : [];
  const images = [
    product.imageUrl,
    ...product.mainVariant?.images,
    ...variantImages,
  ].map((image) => {
    const [width, height] = getWidthAndHeight(image);
    return {
      src: image,
      width,
      height,
    };
  });
  const variants =
    product.variants && product.variants !== null
      ? [product.mainVariant, ...product.variants]
      : [product.mainVariant];
  const [selectedVariant, setSelectedVariant] = useState(0);
  const paragraphs = getTextFromDescription(product?.description);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  return (
    <Box
      sx={{
        my: 2,
        minHeight: "calc( var(--window-height) - 1rem )",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Carousel dots={false}>
        {images.map((image, index) => (
          <Box
            key={`product_image_${index}`}
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              backgroundColor: "#ffff",
            }}
          >
            <Image
              alt={product.name}
              src={image.src}
              width={image.width}
              height={image.height}
            />
          </Box>
        ))}
      </Carousel>
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="primary.main" gutterBottom>
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
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 0.5,
              }}
            >
              <Rating
                value={product.rating}
                precision={0.5}
                readOnly
                sx={{ color: "primary.main" }}
              />
              <Typography variant="body2" color="primary.light">
                {product.reviews} Reviews
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, mb: 3 }}>
          <Stack spacing={1} direction="row">
            {variants
              .map((variant) => variant.label)
              .map((variant, index) => (
                <Box
                  key={`variant_label_${index}`}
                  sx={{
                    cursor: "pointer",
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%",
                    border: "0.25rem solid",
                    borderColor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor : "pointer",
                    backgroundColor:
                      index === selectedVariant
                        ? "secondary.main"
                        : "secondary.light",
                  }}
                  onClick={() => {
                    setSelectedVariant(index);
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="primary.main"
                    sx={{ width: "4ch", textAlign: "center" }}
                  >
                    {variant}
                  </Typography>
                </Box>
              ))}
          </Stack>
        </Box>
        <Grid container sx={{ marginTop: "auto" }}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              {variants[selectedVariant]?.discountedPrice && (
                <Typography
                  variant="body2"
                  variantMapping={{ body2: "span" }}
                  sx={{
                    backgroundColor: variants[selectedVariant]?.discountedPrice
                      ? "mytext.background"
                      : "",
                    px: 0.5,
                  }}
                >
                  Rs. {variants[selectedVariant].discountedPrice}
                </Typography>
              )}
              <Typography
                variant="body2"
                variantMapping={
                  variants[selectedVariant]?.discountedPrice
                    ? { body2: "strike" }
                    : { body1: "span" }
                }
                color={
                  variants[selectedVariant]?.discountedPrice
                    ? "primary.light"
                    : "primary.main"
                }
              >
                Rs. {variants[selectedVariant].originalPrice}
              </Typography>
              {variants[selectedVariant]?.discountedPrice && (
                <Typography
                  variant="body2"
                  variantMapping={{ body2: "span" }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  (-
                  {100 -
                    Math.round(
                      (variants[selectedVariant].discountedPrice /
                        variants[selectedVariant].originalPrice) *
                        100
                    )}
                  %)
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                alignItems: "flex-end",
              }}
            >
              <Typography variant="subtitle2" color="primary.main">
                Express Delivery
              </Typography>
              <Typography variant="body2" color="primary.light">
                {product.express_delivery ? "available" : "not available"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          p: 2,
          py: 3,
          backgroundColor: "secondary.main",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <StyledButton
          text={"ADD TO CART"}
          style={{ width: "100%" }}
          onClick={() => {
            addToCart({
              product: product._id,
              variant: variants[selectedVariant]._id,
            });
          }}
        />
        <StyledButton
          text={"ADD TO WISHLIST"}
          style={{ width: "100%" }}
          onClick={() => {
            addToWishlist({
              product: product._id,
              variant: variants[selectedVariant]._id,
            });
          }}
        />
      </Box>
    </Box>
  );
}

export default ProductPage;
