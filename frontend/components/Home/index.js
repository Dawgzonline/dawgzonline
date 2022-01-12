import React , { useContext } from 'react';
import Carousel from './../Carousel';
import { AppStateContext } from '../../context/AppstateProvider';
import CollectionsMini from '../CollectionsMini';
import { Typography } from '@mui/material';

function Home() {

    const {collection} = useContext(AppStateContext);
    const collectionForCM = [collection[1],collection[0]];

  return (
    <div>
        {/* First Carousel */}
      <Carousel height="15rem">
        <div className="top-carousel-poster-1" >
            <div className="top-carousel-poster1-background"></div>
            <div className="top-carousel-poster1-main">
                <div className="top-carousel-poster1-first-half">
                    <div className="top-carousel-poster1-first-half-inner">
                        <div className="top-carousel-poster1-heading-outer">
                            <Typography variant='h1' color="myprimary.dark" className="top-carousel-poster1-heading">SAME DAY DELIVERY</Typography>
                        </div>
                        <button className="top-carousel-poster1-button"><Typography variant='subtitle2' color="mytext.main">Express Delivery</Typography></button>
                        <div className="top-carousel-poster1-para">
                            <Typography variant='body1' color="myprimary.dark" className="top-carousel-poster1-para1">within 4 hours*</Typography>
                            <Typography variant='body1' color="mytext.background" className="top-carousel-poster1-para2">within 4 hours*</Typography>
                        </div>
                    </div>
            </div>

                {/* FOR IMAGE */}
                <div className="top-carousel-poster1-second-half"></div>

            </div>
        </div>

        {/* SECOND POSTER */}
        <div className="top-carousel-poster-2"></div>

      </Carousel>

        <CollectionsMini collection={collectionForCM}/>

      {/* Second Carousel */}
      <Carousel height="15rem">
          <div className="bottom-carousel-poster-1">
              <div className="bottom-carousel-poster1-background"></div>
              
              <div className="bottom-carousel-poster1-main">
                  {/* FOR IMAGE */}
                  <div className="bottom-carousel-poster1-first-half"></div>
   
                  <div className="bottom-carousel-poster1-second-half">
                      <div className="bottom-carousel-poster1-second-half-inner">
                          <Typography variant='subtitle2' color="myprimary.dark" className="bottom-carousel-poster1-heading">EVERYTHING AT</Typography>
                          <div className="bottom-carousel-poster1-para">
                            <Typography variant='h2' color="myprimary.dark" className="bottom-carousel-poster1-para1">50%</Typography>
                            <Typography variant='h2' color="mytext.background" className="bottom-carousel-poster1-para2">50%</Typography>
                          </div>
                          <button  className="bottom-carousel-poster1-button"><Typography variant='subtitle2' color="mytext.main">SHOP NOW</Typography></button>
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

export default Home;
