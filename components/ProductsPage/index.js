import React, { useContext, useState } from "react";
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
import { AppStateContext } from "../../context/AppstateProvider";

export default function ProductsPage({ products }) {
  const [sortDrawer, setSortDrawer] = useState(false);
  const [filterDrawer, setFilterDrawer] = useState(false);
  const { filter } = useContext(AppStateContext);
  const [selectedFilter, setSelectedFilter] = useState(-1);
  return (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid key={`product_${index}`} item xs={6}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "secondary.light",
        }}
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
                <RadioGroup sx={{ py: 1 }} defaultValue="relevance">
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
                sx={{ width: "100vw", height: "100vh", position: "relative" }}
              >
                <Grid container sx={{ height: "100%" }}>
                  <Grid
                    item
                    xs={6}
                    sx={{ height: "100%", backgroundColor: "secondary.main" }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Typography variant="subtitle1" color="primary.main">
                        Filter
                      </Typography>
                      <Stack sx={{ mt: 2 }} spacing={1}>
                        {filter.map((obj, index) => (
                          <Button
                            key={`filter_heading_${index}`}
                            sx={{ typography: "subtitle2", fontWeight: "500" }}
                            style={{ textTransform: "none" }}
                            onClick={() => {
                              setSelectedFilter(index);
                            }}
                          >
                            {obj.title}
                          </Button>
                        ))}
                      </Stack>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ height: "100%", backgroundColor: "secondary.light" }}
                  >
                    <Stack sx={{ mt: 6, px: 2 }} spacing={1}>
                      {selectedFilter !== -1 &&
                        filter[selectedFilter].options.list.map(
                          (obj, index) => (
                            <FormGroup key={`filter_content_${index}`}>
                              <FormControlLabel
                                control={<Checkbox />}
                                label={obj.title}
                              />
                            </FormGroup>
                          )
                        )}
                    </Stack>
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
