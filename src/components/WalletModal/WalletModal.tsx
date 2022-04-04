import { FC, memo } from 'react';
import styles from './styles.module.css';

import { Modal } from 'antd';

import WalletConnectIcon from 'assets/images/wallet/walletConnectIcon.svg';
import CoinbaseWalletIcon from 'assets/images/wallet/coinbaseWalletIcon.svg';
import MetaMask from 'assets/images/wallet/metamask.png';

import { useWallet, useWalletModal } from 'hooks';

const WalletModal: FC = () => {
  const { connect } = useWallet();
  const { toggleOpen, open } = useWalletModal();

  const handleConnect = async (key: 'injected' | 'walletconnect' | 'walletlink') => {
    try {
      await connect(key);
      toggleOpen();
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <Modal
      className={styles.root}
      visible={open}
      title={<b>Connect a wallet</b>}
      footer={null}
      centered
      width={418}
      onCancel={toggleOpen}
    >
      <ul className={styles.menu}>
        <li onClick={() => handleConnect('injected')}>
          <p>MetaMask</p> <img src={MetaMask} alt="metamask" />
        </li>
        <li onClick={() => handleConnect('walletconnect')}>
          <p>WalletConnect</p> <img src={WalletConnectIcon} alt="walletconnect" />
        </li>
        <li onClick={() => handleConnect('walletlink')}>
          <p>Coinbase Wallet</p> <img src={CoinbaseWalletIcon} alt="coinbase" />
        </li>
      </ul>
    </Modal>
  );
};

export default memo(WalletModal);
