import React, { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  Button,
  Drawer,
  Typography,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
} from "@mui/material";
import ProductCard from "./ProductCard";
import CloseIcon from "@mui/icons-material/Close";
import StyledButton from "../styled/Button";
import { motion } from "framer-motion";

const FilterComponent = ({ categories }) => {
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(-1);
  const router = useRouter();
  const [query, setQuery] = useState([]);
  useEffect(() => {
    const routerQuery = router.query;
    const queryArray = categories?.map((category) => {
      return routerQuery[category.label]
        ? routerQuery[category.label].split(",")
        : [];
    });
    setQuery(queryArray);
  }, [router.query, categories]);

  return (
    <>
      <Button
        onClick={() => {
          setFilterDrawer(true);
        }}
      >
        Filter
      </Button>
      <Drawer
        open={filterDrawer}
        onClose={() => {
          setFilterDrawer(false);
        }}
      >
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Grid container sx={{ height: "100%" }}>
            <Grid
              item
              xs={6}
              sx={{ height: "100%", backgroundColor: "secondary.main" }}
            >
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography variant="subtitle1" color="primary.main">
                  Filter
                </Typography>
                <Stack
                  sx={{ mt: 2, flexGrow: 1, overflowY: "scroll" }}
                  spacing={1}
                >
                  {categories?.map((obj, index) => (
                    <Button
                      key={`filter_heading_${index}`}
                      sx={{ typography: "subtitle2", fontWeight: "500" }}
                      style={{ textTransform: "none" }}
                      onClick={() => {
                        setSelectedFilter(index);
                      }}
                    >
                      {obj.name}
                    </Button>
                  ))}
                </Stack>
                <StyledButton
                  text={"Apply Filter"}
                  onClick={() => {
                    const route = query.reduce((prev, cur, index) => {
                      if (cur.length > 0) {
                        const combined = cur.reduce((ans, word) => {
                          return ans + word + ",";
                        }, "");
                        return (
                          prev +
                          "&" +
                          categories[index].label +
                          "=" +
                          combined.slice(0, combined.length - 1)
                        );
                      }
                      return prev;
                    }, "");
                    const newRoute =
                      route.length === 0
                        ? "/collection"
                        : "/collection?" + route.slice(1, route.length);
                    setFilterDrawer(false);
                    router.push(newRoute, undefined, { shallow: true });
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ height: "100%", backgroundColor: "secondary.light" }}
            >
              <Box
                sx={{
                  pt: 6,
                  px: 2,
                  pb: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack
                  sx={{
                    overflow: "hidden",
                    overflowY: "scroll",
                    flexGrow: 1,
                    mb: 2,
                  }}
                  spacing={0.75}
                >
                  {selectedFilter !== -1 &&
                    categories[selectedFilter]?.subcategories.map(
                      (obj, index) => {
                        return (
                          <FormGroup key={`filter_content_${index}`}>
                            <FormControlLabel
                              control={<Checkbox />}
                              checked={query[selectedFilter]?.includes(
                                obj.label
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setQuery([
                                    ...query.map((q, i) => {
                                      if (i === selectedFilter) {
                                        return [...q, obj.label];
                                      }
                                      return q;
                                    }),
                                  ]);
                                } else {
                                  setQuery([
                                    ...query.map((q, i) => {
                                      if (i === selectedFilter) {
                                        return q.filter(
                                          (value) => value !== obj.label
                                        );
                                      }
                                      return q;
                                    }),
                                  ]);
                                }
                              }}
                              label={obj.name}
                              sx={{ color: "primary.dark" }}
                            />
                          </FormGroup>
                        );
                      }
                    )}
                </Stack>
                <StyledButton
                  text={"Reset Filter"}
                  onClick={() => {
                    setQuery([...query.map((_) => [])]);
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ position: "absolute", top: 10, right: 10 }}>
            <CloseIcon
              color="secondary.main"
              onClick={() => {
                setFilterDrawer(false);
              }}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

const SortComponent = ({ filteredProduct, setFilteredProduct }) => {
  const [sortDrawer, setSortDrawer] = useState(false);
  const [sortType, setSortType] = useState("relevance");
  const changedByMe = useRef(false);
  const sortProduct = useCallback(() => {
    if (sortType === "priceUp") {
      setFilteredProduct((filteredProduct) => [
        ...filteredProduct.sort((a, b) => {
          return a.discountedPrice - b.discountedPrice;
        }),
      ]);
      changedByMe.current = true;
    } else if (sortType === "priceDown") {
      setFilteredProduct((filteredProduct) => [
        ...filteredProduct.sort((a, b) => {
          return b.discountedPrice - a.discountedPrice;
        }),
      ]);
      changedByMe.current = true;
    } else if (sortType === "discount") {
      setFilteredProduct((filteredProduct) => [
        ...filteredProduct.sort((a, b) => {
          return (
            (a.discountedPrice / a.originalPrice) * 100 -
            (b.discountedPrice / b.originalPrice) * 100
          );
        }),
      ]);
      changedByMe.current = true;
    } else if (sortType === "relevance") {
      setFilteredProduct((filteredProduct) => [
        ...filteredProduct.sort((a, b) => {
          const x = a.subcategories
            .map(({ label }) => label)
            .sort()
            .reduce((prev, cur) => {
              return prev + cur + ",";
            }, "");
          const y = b.subcategories
            .map(({ label }) => label)
            .sort()
            .reduce((prev, cur) => {
              return prev + cur + ",";
            }, "");
          return x > y ? 1 : x === y ? 0 : -1;
        }),
      ]);
      changedByMe.current = true;
    }
  }, [sortType, setFilteredProduct]);
  useEffect(() => {
    sortProduct();
  }, [sortProduct]);
  useEffect(() => {
    if (changedByMe.current) {
      changedByMe.current = false;
    } else {
      sortProduct();
    }
  }, [filteredProduct, sortProduct]);
  return (
    <>
      <Button
        onClick={() => {
          setSortDrawer(true);
        }}
      >
        Sort
      </Button>
      <Drawer
        open={sortDrawer}
        onClose={() => {
          setSortDrawer(false);
        }}
        anchor="bottom"
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="primary.main">
            Sort By
          </Typography>
          <RadioGroup
            sx={{ py: 1 }}
            value={sortType}
            onChange={(e) => {
              setSortDrawer(false);
              setSortType(e.target.value);
            }}
          >
            <FormControlLabel
              control={<Radio />}
              label="Relevance"
              value="relevance"
            />
            <FormControlLabel
              control={<Radio />}
              value="discount"
              label="Discount"
            />
            <FormControlLabel
              control={<Radio />}
              label="Price (High to Low)"
              value="priceDown"
            />
            <FormControlLabel
              control={<Radio />}
              label="Price (Low to High)"
              value="priceUp"
            />
          </RadioGroup>
        </Box>
      </Drawer>
    </>
  );
};

const CustomDrawer = ({ filteredProduct, setFilteredProduct, categories }) => {
  const [showDrawer, setShowDrawer] = useState(true);
  const lastY = useRef(0);
  const drawer = useRef();
  useEffect(() => {
    const handleScroll = () => {
      if (lastY.current < window.scrollY) {
        setShowDrawer(false);
      } else {
        setShowDrawer(true);
      }
      lastY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "secondary.light",
      }}
      component={motion.div}
      ref={drawer}
      animate={showDrawer ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{ type: "spring", bounce: 0.1 }}
    >
      <Grid
        container
        sx={{
          borderTop: "0.15rem solid",
          py: 1,
          borderColor: "secondary.main",
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "0.15rem solid",
            borderRightColor: "secondary.main",
          }}
        >
          <SortComponent
            setFilteredProduct={setFilteredProduct}
            filteredProduct={filteredProduct}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FilterComponent categories={categories} />
        </Grid>
      </Grid>
    </Box>
  );
};

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
