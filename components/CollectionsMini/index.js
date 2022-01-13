import React, { useState } from 'react';
import CollectionPanel from '../CollectionPanel';
import { Typography } from '@mui/material';

export default function CollectionsMini({collection}) {

    const [openCollectionNo,setOpenCollectionNo] = useState(0);

    return (
        <div className="collec-mini">
            <div className="collec-mini-container">
                <div className="collec-mini-content">
                    {openCollectionNo !== 1 && 
                    <div className="collec-mini-header">
                        <button className="collec-mini-btn" style={{position : "absolute", top : "0%", left : "50%",transform : "translate(-50%,-50%)"}} onClick={()=>{setOpenCollectionNo(1);}}><Typography variant='subtitle2' color="mytext.main">SHOP FOR {collection[0].heading}</Typography></button>
                    </div>
                    }
                    {openCollectionNo === 1 && 
                    <CollectionPanel content={collection[0].content} rightOriented={false}/>
                    }
                </div>
                <div className="collec-mini-content">
                    {openCollectionNo !== 2 && 
                    <div className="collec-mini-header">
                        <button className="collec-mini-btn" style={{position : "absolute", bottom : "0%", left : "50%",transform : "translate(-50%,50%)"}} onClick={()=>{setOpenCollectionNo(2);}}><Typography variant='subtitle2' color="mytext.main">SHOP FOR {collection[1].heading}</Typography></button>
                    </div>
                    }
                    {openCollectionNo === 2 && 
                    <CollectionPanel content={collection[1].content} rightOriented={true}/>
                    }
                </div>
            </div>
        </div>
    )
}
