import React , { useContext } from 'react';
import Carousel from './../Carousel';
import { AppStateContext } from '../../context/AppstateProvider';
import CollectionsMini from '../CollectionsMini';
import { Typography } from '@mui/material';

function MainPage() {

    const {collection} = useContext(AppStateContext);
    const collectionForCM = [collection[1],collection[0]];

  return (
    <div>
        {/* First Carousel */}
      <Carousel height="15rem">
        <div className="top_carousel_poster_1" >
            <div className="top_carousel_poster1_background"></div>
            <div className="top_carousel_poster1_main">
                <div className="top_carousel_poster1_first_half">
                    <div className="top_carousel_poster1_first_half_inner">
                        <div className="top_carousel_poster1_heading_outer">
                            <Typography variant='h1' color="myprimary.dark" className="top_carousel_poster1_heading">SAME DAY DELIVERY</Typography>
                        </div>
                        <button className="top_carousel_poster1_button"><Typography variant='subtitle2' color="mytext.main">Express Delivery</Typography></button>
                        <div className="top_carousel_poster1_para">
                            <Typography variant='body1' color="myprimary.dark" className="top_carousel_poster1_para1">within 4 hours*</Typography>
                            <Typography variant='body1' color="mytext.background" className="top_carousel_poster1_para2">within 4 hours*</Typography>
                        </div>
                    </div>
            </div>

                {/* FOR IMAGE */}
                <div className="top_carousel_poster1_second_half"></div>

            </div>
        </div>

        {/* SECOND POSTER */}
        <div className="top_carousel_poster_2"></div>

      </Carousel>

        <CollectionsMini collection={collectionForCM}/>

      {/* Second Carousel */}
      <Carousel height="15rem">
          <div className="bottom_carousel_poster_1">
              <div className="bottom_carousel_poster1_background"></div>
              
              <div className="bottom_carousel_poster1_main">
                  {/* FOR IMAGE */}
                  <div className="bottom_carousel_poster1_first_half"></div>
   
                  <div className="bottom_carousel_poster1_second_half">
                      <div className="bottom_carousel_poster1_second_half_inner">
                          <Typography variant='subtitle2' color="myprimary.dark" className="bottom_carousel_poster1_heading">EVERYTHING AT</Typography>
                          <div className="bottom_carousel_poster1_para">
                            <Typography variant='h2' color="myprimary.dark" className="bottom_carousel_poster1_para1">50%</Typography>
                            <Typography variant='h2' color="mytext.background" className="bottom_carousel_poster1_para2">50%</Typography>
                          </div>
                          <button  className="bottom_carousel_poster1_button"><Typography variant='subtitle2' color="mytext.main">SHOP NOW</Typography></button>
                      </div>
                  </div>
              </div>

          </div>


          {/* OTHER POSTERS  */}
          <div></div>
          <div></div>
          <div></div>
          <div></div>

      </Carousel>



    </div>
  );
}

export default MainPage;
