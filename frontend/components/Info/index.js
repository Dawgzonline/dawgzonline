import React from "react";
import { Typography } from "@mui/material";

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
    <div className="info-main">
      <div className="info-background"></div>

      <Typography
        variant="h4"
        color="myprimary.dark"
        className="info-main-heading"
      >
        {heading}
      </Typography>

      {contents.map((content, index) => {
        return (
          <div
            key={`info-${index}`}
            className={index === 0 ? "info-block info-block-top" : "info-block"}
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
    </div>
  );
}

export default Info;
