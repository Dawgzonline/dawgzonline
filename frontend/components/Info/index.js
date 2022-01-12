import React from "react";
import { Typography } from "@mui/material";

function Info({ heading, contents }) {
  return (
    <div className="info-main">
      <div className="info-background"></div>

      <Typography variant="h4" color="myprimary.dark" className="info-main-heading">{heading}</Typography>

      {contents.map((content, index) => {
        return (
          <div
            key={`info-${index}`}
            className={index === 0 ? "info-block info-block-top" : "info-block"}
            style={content.width}
          >
            <Typography variant="subtitle2" color="myprimary.dark" className="info-title">{content.title}</Typography>
            <Typography variant="body2" color="myprimary.main" className="info-content">{content.content}</Typography>
          </div>
        );
      })}
    </div>
  );
}

export default Info;
