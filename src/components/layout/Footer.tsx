import { FC } from 'react';
import styles from './Footer.module.css';
import { Footer } from 'antd/lib/layout/layout';

import Logo from 'assets/images/home/logo.png';
import Slime from 'assets/images/layout/bottom_slime.svg';
import SocialIcon from './SocialIcon';
import { Link } from 'react-router-dom';

const FooterComponent: FC = () => {
  return (
    <Footer className={styles.root}>
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <Link to="/">
            <img src={Logo} alt="logo" style={{ borderRadius: '50%', border: '3px solid #ffba3b' }} />
          </Link>
          <div>© 2022 Napa Cats, All Rights Reserved.</div>
        </div>
        <div className={styles.iconWraper}>
          <SocialIcon />
        </div>
      </div>

      <img className={styles.bottomSlime} src={Slime} alt="bottomSlime" />
    </Footer>
  );
};

export default FooterComponent;
