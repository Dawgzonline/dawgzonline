import React, { useState } from "react";
import CollectionPanel from "../CollectionPanel";
import { Typography, Button, Box } from "@mui/material";
import Image from "next/image";
import styles from "../../styles/CollecMini.module.scss";

export default function CollectionsMini({ collection }) {
  const [openCollectionNo, setOpenCollectionNo] = useState(0);

  return (
    <div className={styles.collec_mini}>
      <div className={styles.collec_mini_container}>
        <div className={styles.collec_mini_content}>
          {openCollectionNo !== 1 && (
            <div className={styles.collec_mini_header}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  position: "absolute",
                  top: "0%",
                  left: "50%",
                  maxWidth: "18ch",
                  transform: "translate(-50%,-50%)",
                  zIndex : "50",
                }}
                onClick={() => {
                  setOpenCollectionNo(1);
                }}
              >
                <Typography variant="subtitle2" color="mytext.main">
                  SHOP FOR {collection[0].heading}
                </Typography>
              </Button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box sx={{mt : "auto"}}>
                  <Image
                    src={collection[0].image}
                    alt={collection[0].heading}
                    width={120}
                    height={160}
                  />
                </Box>
              </Box>
            </div>
          )}
          {openCollectionNo === 1 && (
            <CollectionPanel
              content={collection[0].content}
              rightOriented={false}
            />
          )}
        </div>
        <div className={styles.collec_mini_content}>
          {openCollectionNo !== 2 && (
            <div className={styles.collec_mini_header}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  position: "absolute",
                  bottom: "0%",
                  left: "50%",
                  maxWidth: "18ch",
                  transform: "translate(-50%,50%)",
                  zIndex : "50",
                }}
                onClick={() => {
                  setOpenCollectionNo(2);
                }}
              >
                <Typography variant="subtitle2" color="mytext.main">
                  SHOP FOR {collection[1].heading}
                </Typography>
              </Button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box>
                  <Image
                    src={collection[1].image}
                    alt={collection[1].heading}
                    width={120}
                    height={160}
                  />
                </Box>
              </Box>
            </div>
          )}
          {openCollectionNo === 2 && (
            <CollectionPanel
              content={collection[1].content}
              rightOriented={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
