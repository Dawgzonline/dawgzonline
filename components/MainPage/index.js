import React, { useContext, useMemo } from "react";
import Carousel from "./../Carousel";
import { AppStateContext } from "../../context/AppstateProvider";
import CollectionsMini from "../CollectionsMini";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { getWidthAndHeight } from "../../libs/utility";

function MainPage({ banner }) {
  const router = useRouter();
  const { collection } = useContext(AppStateContext);
  const collectionForCM = [collection[1], collection[0]];
  const top_banner = useMemo(() => {
    const filteredData = banner.filter(
      (post) => post.category === "top_banner"
    );
    return filteredData.map((data) => {
      const [width, height] = getWidthAndHeight(data.imageUrl);
      return { ...data, width, height };
    });
  }, [banner]);
  const bottom_banner = useMemo(() => {
    const filteredData = banner.filter(
      (post) => post.category === "bottom_banner"
    );
    return filteredData.map((data) => {
      const [width, height] = getWidthAndHeight(data.imageUrl);
      return { ...data, width, height };
    });
  }, [banner]);

  return (
    <div>
      {/* First Carousel */}
      <Carousel>
        {top_banner.map((banner, index) => (
          <Box
            key={`top_banner_${index}`}
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => {
              router.push(banner.to);
            }}
          >
            <Image
              src={banner.imageUrl}
              alt={banner.name}
              layout="responsive"
              priority
              quality={100}
              width={banner.width}
              height={banner.height}
            />
          </Box>
        ))}
      </Carousel>

      <CollectionsMini collection={collectionForCM} />

      {/* Second Carousel */}
      <Carousel>
        {bottom_banner.map((banner, index) => (
          <Box
            key={`bottom_banner_${index}`}
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => {
              router.push(banner.to);
            }}
          >
            <Image
              src={banner.imageUrl}
              alt={banner.name}
              layout="responsive"
              priority
              quality={100}
              width={banner.width}
              height={banner.height}
            />
          </Box>
        ))}
      </Carousel>
    </div>
  );
}

export default MainPage;
