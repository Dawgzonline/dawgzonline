import React, { useState } from "react";
import { Typography } from "@mui/material";

export default function CollectionPanel({ content, rightOriented }) {
  const [subCollectionOpenState, setSubCollectionOpenState] = useState({
    state: false,
    id: null,
  });
  const [subCollection, setSubCollection] = useState([]);

  const openSubCollection = (links, id) => {
    if (links) {
      setSubCollection(links);
      if (subCollectionOpenState.id && subCollectionOpenState.id === id) {
        setSubCollectionOpenState({ state: false, id: null });
        return;
      }
      setSubCollectionOpenState({ state: true, id: id });
      return;
    }
    setSubCollectionOpenState({ state: false, id: null });
  };

  return (
    <div className="collection-panel-content-group">
      {!rightOriented && (
        <div className="collection-panel-content">
          {content.map((collecLink, index) => (
            <button
              key={`collection-link-${index}`}
              className="collection-panel-link"
              onClick={() => {
                openSubCollection(collecLink.links, collecLink.id);
              }}
            >
              <Typography variant="body1" color="myprimary.main">
                {!collecLink.nested
                  ? collecLink.title
                  : subCollectionOpenState.state &&
                    collecLink.id === subCollectionOpenState.id
                  ? collecLink.title + " --"
                  : collecLink.title + " +"}
              </Typography>
            </button>
          ))}
        </div>
      )}
      {subCollectionOpenState.state ? (
        <div
          className="collection-panel-content"
          style={
            !rightOriented
              ? { borderLeft: "0.1rem solid var(--dark-color)" }
              : { borderRight: "0.1rem solid var(--dark-color)" }
          }
        >
          {subCollection.map((collecLink, index) => (
            <button
              key={`collection-panel-sub-link-${index}`}
              className="collection-panel-link"
            >
              <Typography variant="body1" color="myprimary.main">
                {collecLink.title}
              </Typography>
            </button>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      {rightOriented && (
        <div className="collection-panel-content">
          {content.map((collecLink, index) => (
            <button
              key={`collection-link-${index}`}
              className="collection-panel-link"
              onClick={() => {
                openSubCollection(collecLink.links, collecLink.id);
              }}
            >
              <Typography variant="body1" color="myprimary.main">
                {!collecLink.nested
                  ? collecLink.title
                  : subCollectionOpenState.state &&
                    collecLink.id === subCollectionOpenState.id
                  ? "-- " + collecLink.title
                  : "+ " + collecLink.title}
              </Typography>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
