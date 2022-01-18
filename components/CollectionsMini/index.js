import React, { useState } from "react";
import CollectionPanel from "../CollectionPanel";
import { Typography } from "@mui/material";
import styles from "../../styles/CollecMini.module.scss";

export default function CollectionsMini({ collection }) {
  const [openCollectionNo, setOpenCollectionNo] = useState(0);

  return (
    <div className={styles.collec_mini}>
      <div className={styles.collec_mini_container}>
        <div className={styles.collec_mini_content}>
          {openCollectionNo !== 1 && (
            <div className={styles.collec_mini_header}>
              <button
                className={styles.collec_mini_btn}
                style={{
                  position: "absolute",
                  top: "0%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
                onClick={() => {
                  setOpenCollectionNo(1);
                }}
              >
                <Typography variant="subtitle2" color="mytext.main">
                  SHOP FOR {collection[0].heading}
                </Typography>
              </button>
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
              <button
                className={styles.collec_mini_btn}
                style={{
                  position: "absolute",
                  bottom: "0%",
                  left: "50%",
                  transform: "translate(_50%,50%)",
                }}
                onClick={() => {
                  setOpenCollectionNo(2);
                }}
              >
                <Typography variant="subtitle2" color="mytext.main">
                  SHOP FOR {collection[1].heading}
                </Typography>
              </button>
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
