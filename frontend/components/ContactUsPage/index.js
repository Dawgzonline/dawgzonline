import React from 'react';
import Info from "../Info";

export default function ContactUsPage() {
  const contents = [
    {
      title: "Address",
      content:
        "B1, Snow White C.H.S., 18th Road, Khar West, Opp. Fab India. Mumbai, Maharashtra 400052",
      width : {
        width : "6rem"
      }
    },
    {
      title: "Contact Number",
      content: "+91 9930 924 028   +91 9930 824 029",
      width : {
        width : "9rem"
      },
    },
    {
      title: "Timings",
      content: "10 AM to 8 PM",
      width : {
        width : "9rem"
      },
    },
  ];

    return <Info heading="CONTACT US" contents={contents} />

}
