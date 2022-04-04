import styles from './Staking.module.css';
import StakingSection from './Staking/StakingSection';
import BalanceSection from './Staking/BalanceSection';
import { Button } from 'antd';

const Staking = ({
  handleUnstake,
  handleStake,
  handleApprove,
  handleClaimSerum,
  isApproved,
  claimableSerum,
  handleFeedGorilla,
  tokensOfOwner,
  depositOf,
  allowance,
  handleApproveAppetite,
}: any) => {
  return (
    <>
      <div className={styles.container}>
        {!!isApproved ? (
          <>
            <StakingSection
              handleUnstake={handleUnstake}
              handleStake={handleStake}
              handleFeedGorilla={handleFeedGorilla}
              tokensOfOwner={tokensOfOwner}
              depositOf={depositOf}
              allowance={allowance}
              handleApproveAppetite={handleApproveAppetite}
            />
            <div className={styles.divider} />
            <BalanceSection handleClaimSerum={handleClaimSerum} claimableSerum={claimableSerum} />
          </>
        ) : (
          <Button className={styles.approveBtn} onClick={handleApprove}>
            Approve Staking
          </Button>
        )}
      </div>
    </>
  );
};

export default Staking;
