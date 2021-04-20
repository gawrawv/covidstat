import React from 'react';
import { Typography, Link } from '@material-ui/core';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <Typography>
        By{' '}
        <Link underline="none" color="primary" href="https://github.com/gawrawv">
          Gaurav Raj Thapa
        </Link>
      </Typography>
      <Typography className={styles.social_link}>
        <IconContext.Provider value={{ color: '#385898', size: '25px' }}>
          <Link underline="none" href="https://www.facebook.com/dimebaggboy.gaurav/" name="facebook">
            <FaFacebook />
          </Link>
        
        </IconContext.Provider>
        <IconContext.Provider value={{ color: '#003f67', size: '25px' }}>
          <Link
            underline="none"
            href="https://www.linkedin.com/in/gauravraj-thp-16b520161/"
            name="LinkedIn"
          >
            <FaLinkedin />
          </Link>
        </IconContext.Provider>
        <IconContext.Provider value={{ color: 'black', size: '25px' }}>
          <Link underline="none" href="https://github.com/gawrawv" name="Github">
            <FaGithub />
          </Link>
        </IconContext.Provider>
      </Typography>
      <Typography color="textSecondary"> May 31 2020 </Typography>
    </div>
  );
};
export default Footer;
