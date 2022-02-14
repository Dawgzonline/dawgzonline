import React from "react";
import { Stack, Button } from "@mui/material";

export default function CollectionPanel({ content, rightOriented }) {
  return (
    <Stack sx={{ width: "100%", py : 1 }}>
      {content.map(({ title, id }) => (
        <Button
          sx={{
            typography: "body1",
            display: "flex",
            textAlign: "center",
            justifyContent: rightOriented ? "flex-end" : "flex-start",
          }}
          key={`collection-btn-${id}`}
        >
          {title}
        </Button>
      ))}
    </Stack>
  );
}
