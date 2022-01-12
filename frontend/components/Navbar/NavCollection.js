import { Typography } from '@mui/material';
import React from 'react';
import CollectionPanel from '../CollectionPanel';

const NavCollection = ({ heading, content }) => {
  return (
    <>
      <Typography variant='subtitle1' color="mytext.main" className="nav-collection-header">{heading}</Typography>
      <CollectionPanel content={content} />
    </>
  );
};

export default NavCollection;