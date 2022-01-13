import { Typography } from '@mui/material';
import React from 'react';
import { useRouter } from "next/router";

export default function Footer() {
    const history = useRouter();
    return (
        <div className="footer">
           <div className="footer-grid">
                <div className="footer-grid-item" >
                    <button style={{textAlign : "start"}} onClick={() => {history.push("/about")}}><Typography variant='body1' color="myprimary.main">About Us</Typography></button>
                    <button style={{textAlign : "start"}} onClick={()=> {history.push("/contact")}}><Typography variant='body1' color="myprimary.main">Contact Us</Typography></button>
                </div>
                <div className="footer-grid-item" >
                    <button style={{textAlign : "end"}}><Typography variant='body1' color="myprimary.main">FAQS</Typography></button>
                    <button style={{textAlign : "end"}}><Typography variant='body1' color="myprimary.main">INSTAGRAM</Typography></button>
                </div>
            </div> 
        </div>
    )
}
