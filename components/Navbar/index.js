import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import NavCollection from "./NavCollection";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { styled } from "@mui/material/styles";
import { Button, Divider, Box } from "@mui/material";
import {
  motion,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion";
import styles from "../../styles/Nav.module.scss";
import { AppStateContext } from "../../context/AppstateProvider";

const CustomizedBadge = styled(Badge)`
  & .MuiBadge-badge {
    background-color: var(--dark-color);
    color: var(--text-light-color);
  }
`;

export default function Navbar() {
  const { cart, wishlist } = useContext(AppStateContext);
  const history = useRouter();
  const x = useSpring(-100);
  const transform = useMotionTemplate`translateX(${x}%)`;
  const opacity = useTransform(x, [-100, 0], [0, 1]);
  const [animationState, setAnimationState] = useState(false);
  const { collection } = useContext(AppStateContext);
  const navCollection = collection;

  useEffect(() => {
    x.onChange(() => {
      if (x.get() === 0) {
        setAnimationState(true);
      } else if (x.get() === -100) {
        setAnimationState(false);
      }
    });
  }, [x]);

  const closeNav = () => {
    x.set(-100);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.topbar}>
        <MenuIcon
          className={styles.globalicons}
          onClick={() => {
            setAnimationState(true);
            x.set(0);
          }}
          sx={{ mx: 0.8 }}
        />
        <PersonOutlineOutlinedIcon
          className={styles.globalicons}
          onClick={() => {
            history.push("/profile");
          }}
          sx={{ mx: 0.8 }}
        />
        <HomeOutlinedIcon
          className={styles.globalicons}
          onClick={() => {
            history.push("/");
          }}
          sx={{ mx: 0.8, marginRight: "1.75rem" }}
        />
        <Box
          sx={{
            width: 90,
            height: 90,
            margin: "0 auto",
            borderRadius: "50%",
            p: 0.5,
            zIndex: "10",
            backgroundColor: "secondary.light",
            transform: "translateY(15%)",
          }}
        >
          <Image alt="" src="/logo.png" width="86" height="86" />
        </Box>
        <SearchIcon className={styles.globalicons} sx={{ mx: 0.8 }} />
        <CustomizedBadge
          badgeContent={wishlist.length}
          className={styles.badge}
          overlap="circular"
          invisible={false}
          onClick={() => {
            history.push("/wishlist");
          }}
        >
          <FavoriteBorderOutlinedIcon
            className={styles.globalicons}
            sx={{ mx: 0.8 }}
          />
        </CustomizedBadge>
        <CustomizedBadge
          badgeContent={cart.length}
          className={styles.badge}
          overlap="circular"
          invisible={false}
          onClick={() => {
            history.push("/cart");
          }}
        >
          <ShoppingCartOutlinedIcon
            className={styles.globalicons}
            sx={{ mx: 0.8 }}
          />
        </CustomizedBadge>
      </div>
      <Divider
        sx={{ transform: "translateY( calc( var(--navbar-height) * -0.3 ) )" }}
      />
      <motion.div
        className={styles.navcontainer}
        id="drawer"
        onClick={(e) => {
          if (e.target.id === "drawer") {
            closeNav();
          }
        }}
        style={{
          opacity,
          transform: animationState ? "translateX(0%)" : "translateX(-100%)",
        }}
      >
        <motion.div className={styles.navdrawer} style={{ transform }}>
          {navCollection.map((collectionItem, index) => (
            <NavCollection
              key={`nav-collection-${index}`}
              heading={collectionItem.heading}
              content={collectionItem.content}
              closeNav={closeNav}
            />
          ))}

          <div className={styles.navfooter}>
            <Button
              sx={{
                typography: "subtitle2",
                fontWeight: 800,
                display: "flex",
                justifyContent: "flex-start",
              }}
              onClick={() => {
                history.push("/contact");
                closeNav();
              }}
            >
              Contact Us
            </Button>
            <Button
              sx={{
                typography: "subtitle2",
                fontWeight: 800,
                display: "flex",
                justifyContent: "flex-start",
                pt: 0,
              }}
              onClick={() => {
                history.push("/about");
                closeNav();
              }}
            >
              About Us
            </Button>
            <Button
              sx={{
                typography: "subtitle2",
                fontWeight: 800,
                display: "flex",
                justifyContent: "flex-start",
                pt: 0,
              }}
            >
              FAQS
            </Button>
            <Button
              sx={{
                typography: "subtitle2",
                fontWeight: 800,
                display: "flex",
                justifyContent: "flex-start",
                pt: 0,
              }}
            >
              INSTAGRAM
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
