import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { vaultdata } from '../../data/VaultData';
import Big from 'big.js';
import { getContractNoWalletUSDTLPToken } from 'utils/getContract';
import { useWallet } from 'hooks';
import { formatNumber } from 'utils/formatNumber';

interface VaultProps {
  vaultImage: any;
  vaultName: string;
  value?: number;
  vaultCreateBy: string;
  content: string;
}

let totalValue = 0;
vaultdata.forEach((item) => (totalValue += item.value));
const Vault = () => {
  const [data, setData] = useState({
    ethPrice: 4000,
  });
  const { active, account, connector, library } = useWallet();
  const getBlockchainData = async (text?: string) => {
    try {
      const { contract: USDTLPTokenContract } = await getContractNoWalletUSDTLPToken();
      const reservesUSDT = await USDTLPTokenContract.methods.getReserves().call();
      const ethPrice = new Big(`${reservesUSDT[1]}000000000000`).toNumber() / +new Big(`${reservesUSDT[0]}`).toNumber();
      setData({ ethPrice });
    } catch (err: any) {}
  };

  useEffect(() => {
    getBlockchainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector, account, active, library]);
  const { ethPrice } = data;
  return (
    <div className={styles.vaultContainer}>
      <div className={styles.textContainer}>
        <Typography.Text className={styles.text}>The vault</Typography.Text>
        <div className={styles.valueContainer}>
          <span>Vault Value: </span>
          <Typography.Text type="secondary">{totalValue.toFixed(2)}Ξ</Typography.Text>
          <Typography.Text> (${formatNumber(totalValue * ethPrice)})</Typography.Text>
        </div>
      </div>
      {vaultdata.length > 0 && (
        <div className={styles.imageContainer}>
          {vaultdata?.map((item: VaultProps, index: number) => (
            <div key={index} className={styles.itemVault}>
              <div className={styles.itemVaultImageWrap}>
                <Link to={`/vault-detail/${index}`}>
                  <div className={styles.itemVaultImage}>
                    <img className={styles.vaultImage} src={item.vaultImage} alt={item.vaultName}></img>
                  </div>
                </Link>
              </div>
              <div className={styles.vaultName}>
                <Typography.Text> {item.vaultName}</Typography.Text>
              </div>
              <div className={styles.vaultCreateBy}>
                <Typography.Text> {item.vaultCreateBy}</Typography.Text>
              </div>
              <div className={styles.vaultPrice}>
                <Typography.Text type="secondary"> {(item.value || 0).toFixed(2)}Ξ</Typography.Text>
                <Typography.Text> (${formatNumber((item.value || 0) * ethPrice)})</Typography.Text>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vault;
