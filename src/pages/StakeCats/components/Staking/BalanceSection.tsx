import { Row, Col } from 'antd';
import { Typography } from 'components/Typography';
import styles from './BalanceSection.module.css';
import { Button } from 'antd';

const BalanceSection = ({ fishBalance, totalFishRounded, handleClaimRewards, fishPriceUSDT }: any) => {
  return (
    <>
      <Typography className="sans" color="black" weight={900} size={28}>
        $NFISH
      </Typography>
      <Row justify="space-between">
        <div className={styles.card}>
          <Typography size={14} color="#000000" weight={600} block>
            Account Balance
          </Typography>
          <Typography size={20} color="#000000" weight={800} block>
            {fishBalance} $NFISH
          </Typography>
          <Typography size={14} color="#000000" weight={600} block>
            ~ ${(fishBalance * fishPriceUSDT).toFixed(2)} USD
          </Typography>
        </div>
        <div className={styles.card}>
          <Row align="middle">
            <Col span={12}>
              <Typography size={14} color="#000000" weight={600} block>
                Unclaimed $NFISH
              </Typography>
              <Typography size={20} color="#000000" weight={800} block>
                {totalFishRounded.toFixed(4)} $NFISH
              </Typography>
              <Typography size={14} color="#000000" weight={600} block>
                ~ ${(totalFishRounded * fishPriceUSDT).toFixed(2)} USD
              </Typography>
            </Col>
            <Col span={12} className={styles.center}>
              <Button type="primary" disabled={totalFishRounded === 0} onClick={handleClaimRewards}>
                Claim
              </Button>
            </Col>
          </Row>
        </div>
      </Row>
    </>
  );
};

export default BalanceSection;
