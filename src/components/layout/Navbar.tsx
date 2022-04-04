import { FC } from 'react';
import styles from './Navbar.module.css';
import TopSlime from 'assets/images/layout/top_slime.svg';
import Logo from 'assets/images/home/logo.png';
import { NavLink } from 'react-router-dom';
import { Button, Drawer, Space, Dropdown, Menu } from 'antd';
import { useWeb3React } from '@web3-react/core';
import { AccountInfo } from 'components/AccountInfo';
import { useWalletModal } from 'hooks';
import SocialIcon from './SocialIcon';
import { useToggle } from 'hooks/useToggle';
import ArrowDown from 'assets/images/layout/arrowDown.svg';
import { vaultdata } from '../../data/VaultData';

let totalValue = 0;
vaultdata.forEach((item) => (totalValue += item.value));

const Navbar: FC = () => {
  const [open, toggleDrawer] = useToggle(false);
  const { toggleOpen } = useWalletModal();
  const { active } = useWeb3React();

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <NavLink to="/stake/cats">Mutant Cats</NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink to="/stake/gorillas">Mutant Gorillas</NavLink>
      </Menu.Item>
    </Menu>
  );

  const menuGallery = (
    <Menu>
      <Menu.Item key="0">
        <NavLink to="/gallery/cats">Cats Gallery </NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink to="/gallery/gorillas">Gorillas Gallery</NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className={styles.header}>
      <img className={styles.topSlime} src={TopSlime} alt="slime" />

      <nav>
        <div className={styles.navLeft}>
          <Button onClick={toggleDrawer} className={styles.burgerMenu} size="small">
            <svg width="25" height="13" viewBox="0 0 25 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 1C6 0.447715 6.44772 0 7 0H13H19C19.5523 0 20 0.447715 20 1C20 1.55228 19.5523 2 19 2H13H7C6.44772 2 6 1.55228 6 1ZM0.977539 6.50002C0.977539 5.94774 1.42525 5.50002 1.97754 5.50002H23.9809C24.5332 5.50002 24.9809 5.94774 24.9809 6.50002C24.9809 7.05231 24.5332 7.50002 23.9809 7.50002H1.97754C1.42525 7.50002 0.977539 7.05231 0.977539 6.50002ZM7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H7Z"
                fill="#EAEAEA"
              />
            </svg>
          </Button>
          <NavLink to="/">
            <img src={Logo} alt="logo" style={{ borderRadius: '50%', border: '3px solid #ffba3b' }} />
          </NavLink>
          <ul className={styles.navList}>
            <li>
              <Dropdown overlay={menuGallery}>
                <div className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                  Gallery <img src={ArrowDown} alt="" />
                </div>
              </Dropdown>
            </li>
            <li>
              <Dropdown overlay={menu}>
                <div className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                  Staking <img src={ArrowDown} alt="" />
                </div>
              </Dropdown>
            </li>
            <li>
              <NavLink to="/cureCats">Cure Cats</NavLink>
            </li>
            <li>
              <NavLink to="/details">Detail $FISH</NavLink>
            </li>
          </ul>
        </div>

        <div className={styles.navRight}>
          <div className={styles.iconWraper}>
            <SocialIcon />
          </div>

          {active ? (
            <AccountInfo />
          ) : (
            <Button onClick={toggleOpen} type="primary">
              connect wallet
            </Button>
          )}
        </div>
      </nav>

      {/* Drawer */}

      <Drawer onClose={toggleDrawer} visible={open}>
        <div className={styles.drawerContent}>
          <Space direction="vertical" size={42} align="center">
            <NavLink to="/gallery/cats">Cats Gallery </NavLink>
            <NavLink to="/gallery/gorillas">Gorillas Gallery</NavLink>
            <NavLink to="/stake/cats">Stake Mutant Cats</NavLink>
            <NavLink to="/stake/gorillas">Stake Mutant Gorillas</NavLink>
            <NavLink to="/cureCats">Cure Cats</NavLink>
            <NavLink to="/details">Detail $FISH</NavLink>
          </Space>
        </div>
      </Drawer>
    </header>
  );
};

export default Navbar;
