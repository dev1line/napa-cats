import React from 'react';
import { Typography } from 'antd';
import { vaultdata } from '../../data/VaultData';
import { Link } from 'react-router-dom';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import styles from './styles.module.css';
import Back from 'assets/images/vault/back.svg';

const VaultDetail = (props: any) => {
  const handle = useFullScreenHandle();

  const vaultDataItem = vaultdata[props.match.params.id];
  const imgUrl = `${vaultDataItem?.vaultImage.slice(0, vaultDataItem?.vaultImage.length - 3)}616`;
  const imgUrlFullscreen = `${vaultDataItem?.vaultImage.slice(0, vaultDataItem?.vaultImage.length - 3)}1080`;
  return (
    <div className={styles.vaultDetailCointainer}>
      <div>
        <FullScreen handle={handle} className={styles.fullscreenImage}>
          <div style={{ display: handle.active ? 'block' : 'none' }}>
            <img onClick={handle.enter} src={imgUrlFullscreen} className={styles.vaultImageFullscreen} alt="" />
          </div>
        </FullScreen>
      </div>
      <Link to="/vault">
        <div className={styles.backBtn}>
          <img src={Back} alt="" />
          &nbsp; Back
        </div>
      </Link>
      <div className={styles.vaultItemImage}>
        <img onClick={handle.enter} src={imgUrl} className={styles.vaultImage} alt="" />
      </div>
      <div className={styles.line} />
      <div className={styles.contentVault}>
        <div className={styles.content}>
          <div>
            <Typography.Text className={styles.vaultName}> {vaultDataItem.vaultName}</Typography.Text>
          </div>
          <div className={styles.vaultCreateBy}>
            <Typography.Text> {vaultDataItem.vaultCreateBy}</Typography.Text>
          </div>
          <div className={styles.vaultContent}>
            <Typography.Text> {vaultDataItem.content}</Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultDetail;
