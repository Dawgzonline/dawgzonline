import React from "react";
import { Typography } from "@mui/material";
import Image from "next/image";
import styles from '../../styles/Info.module.scss';

const InfoParas = ({ content }) => {
  return (
    <>
      {content.map((para,ind) => (
        <Typography
          key={`Info_para_${ind}`}
          variant="body2"
          color="myprimary.main"
          sx={{py : 1}}
        >
          {para}
        </Typography>
      ))
      }
    </>
  );
};

function Info({ heading, contents }) {
  return (
    <div className={styles.infomain}>
      <div className={styles.infobackground}></div>

      <Typography
        variant="h4"
        color="myprimary.dark"
        className={styles.infomainheading}
      >
        {heading}
      </Typography>

      {contents.map((content, index) => {
        return (
          <div
            key={`info-${index}`}
            className={index === 0 ? `${styles.infoblock} ${styles.infoblocktop}` : `${styles.infoblock}`}
            style={content.width}
          >
            <Typography
              variant="subtitle2"
              color="myprimary.dark"
              sx={{my : 2}}
            >
              {content.title}
            </Typography>
            <InfoParas content={content.content} />
          </div>
        );
      })}
      <div className={styles.infologo}>
      <Image alt="dawgzonline logo" width="100" height="100" src="/logo.png" />
      </div>
    </div>
  );
}

export default Info;
