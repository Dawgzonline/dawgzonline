import { Typography } from '@mui/material';
import React from 'react';
import CollectionPanel from '../CollectionPanel';
import styles from '../../styles/Nav.module.scss';

const NavCollection = ({ heading, content }) => {
  return (
    <>
      <Typography variant='subtitle1' color="mytext.main" className={styles.navcollectionheader}>{heading}</Typography>
      <CollectionPanel content={content} />
    </>
  );
};

export default NavCollection;