import React from "react";
import Info from "./Info";

export default function TermsAndConditionsPage() {
  const contents = [
    {
      title: "OVERVIEW",
      content:
        ["This website is operated by DAWGZ. Throughout the site, the terms “we”, “us” and “our” refer to DAWGZ. DAWGZ offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.",
        "By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply  to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.",
        "Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.",
        "Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.",
        "Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.",
      ],
      width: {
        width: "100%",
      },
    },
    {
      title: "SECTION 1 - ONLINE STORE TERMS",
      content: [
        "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
        "You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).",
        "A breach or violation of any of the Terms will result in an immediate termination of your Services.",
    ],
      width: {
        width: "100%",
      },
    },
    {
      title: "SECTION 2 - GENERAL CONDITIONS",
      content: [
        "We reserve the right to refuse service to anyone for any reason at any time.",
        "You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.",
        "You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.",
        "The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.",
      ],
      width: {
        width: "100%",
      },
    },
  ];

  return <Info heading="Tearms And Conditions" contents={contents} />;
}
