import React from 'react';
import { Col, Row } from 'antd';
import styles from './Introduction.module.css';

const Introduction = ({ percentStake }: any) => {
  return (
    <>
      <Row gutter={30} align="top">
        <Col lg={14} xs={24}>
          <div className={styles.pageTitle}>Stake Napa Gorillas. Harvest SERUM</div>
          <div className={styles.description}>
            Staking your Napa Gorillas adds a whole new level of game theory to the Zombie Cat universe, as well as
            utility for our native $NFISH token. Every Napa Gorilla staked will produce an individual SERUM in 60 days.
            To speed up the production of SERUM, you can feed your Napa Gorillas fish to provide a boost and reduce the
            staking time to produce SERUM. Once your Napa Gorillas’ SERUMS’ are ready for harvest, you can use them to
            cure Napa Cats, or trade them on secondary markets. Serum is a fully tradable NFT.
          </div>
        </Col>
        <Col lg={10} xs={24} className={styles.steakPercentWrap}>
          <div className={styles.stakePercent}>{percentStake.toFixed(2)}%</div>
          <div className={styles.stakePercentText}>Napa Gorillas staked</div>
        </Col>
      </Row>
    </>
  );
};

export default Introduction;
