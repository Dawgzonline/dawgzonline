import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import React from "react";
import { getTextFromDescription } from "../../libs/utility";
import useCart from "../../hooks/useCart";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useRouter } from "next/router";

function WishListCard({ wishlistItem, variant, deleteVariant }) {
  const { addToCart } = useCart();
  const paragraphs = getTextFromDescription(wishlistItem?.description);
  const router = useRouter();
  return (
    <Grid item xs={6}>
      <Card
        sx={{
          minHeight: "100%",
          backgroundColor: "secondary.main",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}>
          <Typography
            variant="subtitle2"
            sx={{
              backgroundColor: "secondary.light",
              color: "primary.main",
              px: 1.5,
              py: 0.4,
              borderRadius: "0.8rem",
            }}
          >
            {variant.label}
          </Typography>
        </Box>
        {variant.amount === 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100%",
              height: 160,
              backgroundColor: "rgba(255,255,255,0.4)",
            }}
          />
        )}
        <CardMedia
          component="img"
          image={wishlistItem.image}
          height={160}
          alt={wishlistItem.name}
          onClick={() => {
            router.push(`/product/${wishlistItem._id}`);
          }}
        />
        <CardContent
          sx={{
            p: 1,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
          style={{ paddingBottom: "0.5rem" }}
        >
          <Stack
            spacing={0.5}
            sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
          >
            <Typography variant="subtitle2" color="primary.dark">
              {wishlistItem.name}
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
                justifyContent: "space-between",
                gap: 0.8,
                pt: 0.5,
              }}
              style={{ marginTop: "auto" }}
            >
              {variant?.discountedPrice && (
                <Typography
                  variant="body2"
                  variantMapping={{ body2: "span" }}
                  sx={{
                    backgroundColor: variant?.discountedPrice
                      ? "mytext.background"
                      : "",
                    px: 1,
                    fontSize: "0.7rem",
                  }}
                >
                  ₹ {variant.discountedPrice}
                </Typography>
              )}
              <Typography
                variant="body2"
                variantMapping={
                  variant?.discountedPrice
                    ? { body2: "strike" }
                    : { body1: "span" }
                }
                color={
                  variant?.discountedPrice ? "primary.light" : "primary.main"
                }
                sx={{
                  fontSize: "0.7rem",
                }}
              >
                ₹ {variant.originalPrice}
              </Typography>
              {variant?.discountedPrice && (
                <Typography
                  variant="body2"
                  variantMapping={{ body2: "span" }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.7rem",
                  }}
                >
                  (-
                  {100 -
                    Math.round(
                      (variant.discountedPrice / variant.originalPrice) * 100
                    )}
                  %)
                </Typography>
              )}
            </Box>
            <Divider />
          </Stack>
        </CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="primary"
            sx={{ fontSize: "0.9rem" }}
            onClick={() => {
              addToCart({
                product: wishlistItem._id,
                variant: variant._id,
              });
            }}
          >
            <ShoppingCartCheckoutIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => {
              deleteVariant({
                product: wishlistItem._id,
                variant: variant._id,
              });
            }}
            sx={{ fontSize: "0.9rem" }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>
    </Grid>
  );
}

export default WishListCard;
