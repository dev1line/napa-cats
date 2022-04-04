import styles from './Staking.module.css';
import StakingSection from './Staking/StakingSection';
import { Button } from 'antd';

const Staking = ({
  stakedTokensNew,
  isApprovedCats,
  tokensOfOwner,
  handleApproveCats,
  serumOwned,
  isApprovedSerum,
  handleApproveSerum,
  handleCureCats,
}: any) => {
  return (
    <div className={styles.container}>
      {isApprovedCats && isApprovedSerum && (
        <>
          <StakingSection
            stakedTokensNew={stakedTokensNew}
            tokensOfOwner={tokensOfOwner}
            handleCureCats={handleCureCats}
            serumOwned={serumOwned}
          />
          <div className={styles.divider} />
        </>
      )}
      {!isApprovedCats && (
        <Button className={styles.approveBtn} onClick={handleApproveCats}>
          Approve Cats For Transform
        </Button>
      )}
      {!isApprovedSerum && (
        <Button className={styles.approveBtn} onClick={handleApproveSerum}>
          Approve $SERUM For Transform
        </Button>
      )}
    </div>
  );
};

export default Staking;
