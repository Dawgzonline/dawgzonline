import React, { useRef, useState , useContext} from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import NavCollection from "./NavCollection";
import { AppStateContext } from "../../context/AppstateProvider";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import styles from '../../styles/Nav.module.scss';

const CustomizedBadge = styled(Badge)`
  & .MuiBadge-badge {
    background-color: var(--dark-color);
    color: var(--text-light-color);
  }
`;

export default function Navbar() {
  const [wishListCount] = useState(0);
  const [cartItemCount] = useState(0);
  const history = useRouter();
  const [navOpenState, setNavOpenState] = useState(false);
  const navRef = useRef();
  const { collection} = useContext(AppStateContext);
  const navCollection = collection;

  const openNav = () => {
    navRef.current.style.transitionDelay = "0s";
    setNavOpenState(true);
  };

  const closeNav = () => {
    navRef.current.style.transitionDelay = "1s";
    setNavOpenState(false);
  };

  return (
    <div className={styles.navbar}>
      <MenuIcon className={styles.globalicons} onClick={() => openNav(true)} />
      <PersonOutlineOutlinedIcon className={styles.globalicons} />
      <HomeOutlinedIcon className={styles.globalicons} />
      <div className={styles.navlogo}>
      <Image alt="" src="/logo.png" width="50" height="50"/>
      </div>
      <SearchIcon className={styles.globalicons} />
      <CustomizedBadge
        badgeContent={wishListCount}
        className={styles.badge}
        overlap="circular"
        invisible={false}
      >
        <FavoriteBorderOutlinedIcon className={styles.globalicons} />
      </CustomizedBadge>
      <CustomizedBadge
        badgeContent={cartItemCount}
        className={styles.badge}
        overlap="circular"
        invisible={false}
      >
        <ShoppingCartOutlinedIcon className={styles.globalicons} />
      </CustomizedBadge>
      <div
        className={styles.navcontainer}
        ref={navRef}
        style={{
          transform: !navOpenState ? "translateX(-100%)" : "translateX(0%)",
        }}
        onClick={(e) => {
          if (e.target === navRef.current) {
            closeNav(false);
          }
        }}
      >
        <div
          className={styles.navdrawer}
          style={{
            transform: !navOpenState ? "translateX(-100%)" : "translateX(0%)",
          }}
        >
          {navCollection.map((collectionItem, index) => (
            <NavCollection
              key={`nav-collection-${index}`}
              heading={collectionItem.heading}
              content={collectionItem.content}
            />
          ))}

            <div className={styles.navfooter}>
              <button className={styles.navlink} onClick={() => { history.push('/contact'); closeNav();}}><Typography variant="body1" color="myprimary.dark">Contact Us</Typography></button>
              <button className={styles.navlink} onClick={() => {history.push('/about'); closeNav();}} ><Typography variant="body1" color="myprimary.dark">About Us</Typography></button>
              <button className={styles.navlink}><Typography variant="body1" color="myprimary.dark">FAQS</Typography></button>
              <button className={styles.navlink}><Typography variant="body1" color="myprimary.dark">INSTAGRAM</Typography></button>
            </div>
        </div>
      </div>
    </div>
  );
}
