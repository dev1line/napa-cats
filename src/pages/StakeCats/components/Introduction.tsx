import { Col, Row } from 'antd';
import styles from './Introduction.module.css';

const Introduction = ({ vaultMutantsStakedPercent }: any) => {
  return (
    <>
      <Row gutter={30} align="middle">
        <Col lg={14} xs={24}>
          <div className={styles.pageTitle}>Stake Napa Cats. Earn $NFISH</div>
          <div className={styles.description}>
            Here you can stake your Napa Cats to earn fractionalized ownership of the DAO’s vault assets. Every staked
            cat earns 10 $NFISH / day. Note: Staking your Zombie Cat, as well as claiming fish to your wallet will
            require gas transactions. We recommend allowing fish to accumulate to offset the cost of gas.
          </div>
        </Col>
        <Col lg={10} xs={24} className={styles.steakPercentWrap}>
          <div className={styles.stakePercent}>{vaultMutantsStakedPercent || 0}%</div>
          <div className={styles.stakePercentText}>Napa Cats staked</div>
        </Col>
      </Row>
    </>
  );
};

export default Introduction;
