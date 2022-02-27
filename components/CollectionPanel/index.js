import React from "react";
import { Stack, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function CollectionPanel({ content, rightOriented }) {
  const router = useRouter();
  return (
    <Stack sx={{ width: "100%", py : 1 }}>
      {content.map(({ title, id, to }) => (
        <Button
          sx={{
            typography: "subtitle2",
            display: "flex",
            textAlign: "center",
            justifyContent: rightOriented ? "flex-end" : "flex-start",
            fontSize : "0.8rem",
          }}
          key={`collection-btn-${id}`}
          onClick={()=>{ router.push(to) }}
        >
          {title}
        </Button>
      ))}
    </Stack>
  );
}
