import styles from './Staking.module.css';
import StakingSection from './Staking/StakingSection';
import BalanceSection from './Staking/BalanceSection';
import ApproveSection from './Staking/ApproveSection';
import { Button, Col, Row } from 'antd';
import { Typography } from 'components/Typography';
const Staking = ({
  fishBalance,
  totalFishRounded,
  stakedTokensNew,
  isApproved,
  tokensOfOwner,
  handleUnstake,
  handleStake,
  handleApprove,
  handleClaimRewards,
  fishPriceUSDT,
}: any) => {
  return (
    <div className={styles.container}>
      {isApproved ? (
        <>
          <StakingSection
            stakedTokensNew={stakedTokensNew}
            tokensOfOwner={tokensOfOwner}
            handleUnstake={handleUnstake}
            handleStake={handleStake}
          />
          <div className={styles.divider} />
          <BalanceSection
            fishBalance={fishBalance}
            totalFishRounded={totalFishRounded}
            handleClaimRewards={handleClaimRewards}
            fishPriceUSDT={fishPriceUSDT}
          />
        </>
      ) : (
        <Row justify="space-between" align="bottom" className={styles.approveContainer}>
          <Col lg={12} xs={24}>
            <Typography className="sans" color="black" weight={700} size={20} block>
              Staking Napa Mutant Cats rewards
            </Typography>
            <Typography color="black" weight={400} size={14} block mt={10}>
              1. Approve the contract to enable staking.
            </Typography>
            <Typography color="black" weight={400} size={14} block>
              2. Once complete, stake your Napa Mutant Cats tokens.
            </Typography>
          </Col>
          <Col lg={12} xs={24} className={styles.left}>
            {!isApproved && (
              <Button className={styles.approveBtn} onClick={handleApprove}>
                {' '}
                APPROVE STAKING
              </Button>
            )}{' '}
          </Col>
        </Row>
      )}

      <ApproveSection fishPriceUSDT={fishPriceUSDT} />
    </div>
  );
};

export default Staking;
