import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import useCart from "../../hooks/useCart";
import StyledButton from "../styled/Button";
import { useRouter } from "next/router";
import useFetchFromIds from "../../hooks/useFetchFromIds";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTextFromDescription } from "../../libs/utility";
import Input from "../styled/Input";
import useWishlist from "../../hooks/useWishlist";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { AuthContext } from "../../context/AuthProvider";

const InputNumberBox = ({ quantity, addVariant, removeVariant, sx }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplate: '"a b c" 2rem/ 1fr 1fr 1fr',
        width: "6rem",
        ...sx,
      }}
    >
      <IconButton
        color="primary"
        onClick={() => {
          addVariant();
        }}
        sx={{ fontSize: "1rem", gridArea: "a" }}
      >
        <AddIcon />
      </IconButton>
      <Typography
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        variant="subtitle2"
        color="primary.main"
      >
        {quantity}
      </Typography>
      <IconButton
        color="primary"
        onClick={() => {
          removeVariant();
        }}
        sx={{ fontSize: "1rem", gridArea: "c" }}
      >
        <RemoveIcon />
      </IconButton>
    </Box>
  );
};

const CartCard = ({
  product,
  deleteVariant,
  addVariant,
  removeVariant,
  quantity,
}) => {
  const paragraphs = getTextFromDescription(product?.description);
  const { addToWishlist } = useWishlist();
  return (
    <>
      {product?.variants.map((variant, index) => (
        <Grid item xs={12} key={`variant_${index}`}>
          <Card sx={{ display: "flex", gap: 1, position: "relative" }}>
            <CardMedia
              component="img"
              image={variant.images ? variant.images[0] : product.image}
              sx={{ width: 120 }}
              alt={variant.label}
            />
            <Box
              sx={{
                flexGrow: 1,
                borderLeft: "1px solid",
                borderColor: "secondary.main",
                p: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 0.3,
              }}
            >
              <Typography variant="subtitle2" color="primary.main">
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
              <Typography variant="body2" color="primary.light">
                {variant.label}
              </Typography>
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
                    product?.discountedPrice
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
              <Typography
                variant="body2"
                color="primary.light"
                sx={{ fontSize: "0.7rem" }}
              >
                You save Rs.{variant.originalPrice - variant.discountedPrice}
              </Typography>
            </Box>
            {variant.amount === 0 && (
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "primary.main",
                    px: 2,
                    py: 0.4,
                  }}
                >
                  Out of Stock
                </Typography>
              </Box>
            )}
          </Card>
          <Box
            sx={{
              backgroundColor: "secondary.main",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 2,
            }}
          >
            <InputNumberBox
              addVariant={() => {
                addVariant({ product: product._id, variant: variant._id });
              }}
              removeVariant={() => {
                removeVariant({ product: product._id, variant: variant._id });
              }}
              quantity={quantity[variant._id]}
              sx={{ mr: 1 }}
            />
            <IconButton
              color="primary"
              sx={{ fontSize: "1rem", marginLeft: "auto" }}
              onClick={() => {
                addToWishlist({ product: product._id, variant: variant._id });
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => {
                deleteVariant({ product: product._id, variant: variant._id });
              }}
              sx={{ fontSize: "1rem" }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>
      ))}
    </>
  );
};

function Cart() {
  const { cart, deleteFromCart, addToCart, removeFromCart } = useCart();
  const [doFetch, setDoFetch] = useState(true);
  const [cartItem, loading, setCartItem] = useFetchFromIds(
    "/api/product",
    doFetch ? cart : []
  );
  const [quantity, setQuantity] = useState({});
  useEffect(() => {
    const newQuantity = {};
    for (let item of cart) {
      newQuantity[item.variant] = item.amount;
    }
    setQuantity(newQuantity);
  }, [cart]);
  const addVariant = (obj) => {
    setDoFetch(false);
    addToCart(obj);
  };
  const removeVariant = (obj) => {
    setDoFetch(false);
    removeFromCart(obj);
    if (quantity[obj.variant] === 1) {
      setCartItem([
        ...cartItem
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
    }
  };
  const deleteVariant = (obj) => {
    setDoFetch(false);
    deleteFromCart(obj);
    setCartItem([
      ...cartItem
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
  const totalCost = cartItem.reduce((prev, item) => {
    return (
      prev +
      item.variants.reduce(
        (prev, variant) => prev + variant.originalPrice * quantity[variant._id],
        0
      )
    );
  }, 0);
  const totalSaving = cartItem.reduce((prev, item) => {
    return (
      prev +
      item.variants.reduce(
        (prev, variant) =>
          prev +
          (variant.originalPrice - variant.discountedPrice) *
            quantity[variant._id],
        0
      )
    );
  }, 0);
  const coupanSaving = 0;
  const total = totalCost - totalSaving - coupanSaving;
  const router = useRouter();
  const { userData } = useContext(AuthContext);
  const handleOrder = () => {
    if (!userData._id) {
      router.push("/login");
      return;
    }
    router.push("/checkout");
  };
  return (
    <Box sx={{ minHeight: "var(--window-height)" }}>
      {!loading && cartItem.length === 0 && (
        <Stack sx={{ p: 2 }} spacing={2}>
          <Typography variant="h4" color="primary.main">
            Sorry no product found .
          </Typography>
          <Typography variant="subtitle2" color="primary.light">
            Please add product to the cart.
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
      {!loading && cartItem.length > 0 && (
        <>
          <Box sx={{ backgroundColor: "secondary.main", p: 1, mt: 2 }}>
            <Typography variant="subtitle2" color="primary.main">
              SHOPPING CART
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {cartItem.map((item, index) => (
              <CartCard
                product={item}
                key={`cart_card_${index}`}
                deleteVariant={deleteVariant}
                addVariant={addVariant}
                removeVariant={removeVariant}
                quantity={quantity}
              />
            ))}
          </Grid>
          <Box
            sx={{
              p: 1,
              py: 2,
              display: "flex",
              flexDirection: "column",
              gap: 0.4,
              alignItems: "flex-end",
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary.main"
              sx={{ fontSize: "0.8rem" }}
            >
              Apply Coupan
            </Typography>
            <Input placeholder="Coupen Code"/>
          </Box>
          <Box sx={{ p: 1, py: 2, backgroundColor: "secondary.main" }}>
            <Grid container>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.4,
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="body2" color="primary.light">
                  ORDER DETAILS
                </Typography>
                <Typography variant="body2" color="primary.light">
                  Card Total
                </Typography>
                <Typography variant="body2" color="primary.light">
                  Cart Savings
                </Typography>
                <Typography variant="body2" color="primary.light">
                  Coupan Savings
                </Typography>
                <Typography variant="body2" color="primary.light">
                  Delivery
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  Total Amount
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.4,
                  alignItems: "flex-end",
                }}
              >
                <Typography variant="body2" color="primary.light">
                  Description
                </Typography>
                <Typography variant="body2" color="primary.light">
                  Rs. {totalCost}
                </Typography>
                <Typography variant="body2" color="primary.light">
                  Rs. {totalSaving}
                </Typography>
                <Typography variant="body2" color="primary.light">
                  Rs. {coupanSaving}
                </Typography>
                <Typography variant="body2" color="primary.light">
                  Free
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  Rs. {total}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ p: 2, py: 4, display: "flex", justifyContent: "center" }}>
            <StyledButton text={"Confirm Order"} onClick={handleOrder} />
          </Box>
        </>
      )}
    </Box>
  );
}

export default Cart;
