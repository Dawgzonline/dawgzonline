import React , { useContext } from 'react';
import Carousel from './../Carousel';
import { AppStateContext } from '../../context/AppstateProvider';
import CollectionsMini from '../CollectionsMini';
import { Box } from "@mui/material";
import Image from 'next/image';

function MainPage() {

    const {collection} = useContext(AppStateContext);
    const collectionForCM = [collection[1],collection[0]];

  return (
    <div>
        {/* First Carousel */}
      <Carousel height="15rem">
        <Box sx={{ width : "100%", height : "100%", position : "relative", cursor : "pointer"}} onClick={()=>{console.log("clicked")}}>
          <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUdK-pL5Nsd0zy_wd_XaZ5Z7B_xq2ccdufQg&usqp=CAU" alt="" layout="fill" />
        </Box>
        <Box sx={{ width : "100%", height : "100%", position : "relative", cursor : "pointer"}} onClick={()=>{console.log("clicked")}}>
          <Image src="https://cdn.pixabay.com/photo/2021/09/12/07/58/banner-6617550__340.png" alt="" layout="fill" />
        </Box>
      </Carousel>

        <CollectionsMini collection={collectionForCM}/>

      {/* Second Carousel */}
      <Carousel height="15rem">
      </Carousel>



    </div>
  );
}

export default MainPage;
