import { Row, Col } from 'antd';
import { Typography } from 'components/Typography';
import styles from './StakingSection.module.css';
// import CatImg from 'assets/images/stake/cat.png';
// import CatImg2 from 'assets/images/stake/cat2.png';
// import CatImg3 from 'assets/images/stake/cat3.png';
import Close from 'assets/images/stake/close.svg';
import { Button } from 'antd';
import { useWallet } from 'hooks';
import { useState } from 'react';
// const img = [CatImg, CatImg2, CatImg3];

const StakingSection = ({ stakedTokensNew, tokensOfOwner, handleUnstake, handleStake }: any) => {
  const { account } = useWallet();
  const [selectedStake, setSelectedStake] = useState<string[]>([]);
  const [selectedUnStake, setSelectedUnStake] = useState<string[]>([]);

  const handleSelectStake = (tokenId: string) => {
    if (selectedStake.includes(tokenId)) setSelectedStake(selectedStake.filter((item) => item !== tokenId));
    else setSelectedStake([...selectedStake, tokenId]);
  };

  const handleSelectUnStake = (tokenId: string) => {
    if (selectedUnStake.includes(tokenId)) setSelectedUnStake(selectedUnStake.filter((item) => item !== tokenId));
    else setSelectedUnStake([...selectedUnStake, tokenId]);
  };

  const isSelectStakeAll = selectedStake.length === 0 || selectedStake === stakedTokensNew.length;
  const isSelectUnStakeAll = selectedUnStake.length === 0 || selectedUnStake === stakedTokensNew.length;

  const handleUnStakeCats = () => {
    if (selectedStake.length === 0) handleUnstake(stakedTokensNew);
    else handleUnstake(selectedStake);
  };

  const handleStakeCats = () => {
    if (selectedUnStake.length === 0) handleStake(tokensOfOwner);
    else handleStake(selectedUnStake);
  };

  return (
    <>
      <Row>
        <Col span={12} className={styles.left}>
          <Typography className="sans" color="black" weight={900} size={28}>
            Staking
          </Typography>
        </Col>
        <Col span={12} className={styles.right}>
          <Typography color="black" weight={400} size={14}>
            Connected to {account?.slice(0, 7)}...{account?.slice(37, 42)}
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col lg={12} xs={24} className={styles.left}>
          <Typography color="black" weight={700} size={20} mt={20} block className="sans">
            Unstaked Cats ({tokensOfOwner.length})
          </Typography>
          <Row className={styles.imgRow} gutter={[20, 10]}>
            {tokensOfOwner.length ? (
              tokensOfOwner.map((item: any) => (
                <Col span={8} key={item} onClick={() => handleSelectUnStake(item)}>
                  <div className={styles.imgContainer}>
                    <img
                      src={`https://ipfs.io/ipfs/QmX7cwxUov4R9L9bp81j9sEMyfjv3bnYJXPog4LwuhbswG/${item}.png`}
                      alt="cat"
                      className={selectedUnStake.includes(item) ? styles.selected : ''}
                    />
                    <Typography color="white" className={styles.imgId}>
                      #{item}
                    </Typography>
                  </div>
                </Col>
              ))
            ) : (
              <Row className={styles.unstakedImgRowEmpty} gutter={[20, 10]}>
                <Col lg={8} md={12}>
                  <div className={styles.imgContainerEmpty}></div>
                </Col>
                <Col lg={8} md={12}>
                  <div className={styles.imgContainerEmpty}></div>
                </Col>
                <Col lg={8} md={12}>
                  <div className={styles.imgContainerEmpty}></div>
                </Col>
              </Row>
            )}
          </Row>
          <Button type="primary" onClick={handleStakeCats}>
            {isSelectUnStakeAll ? ' Stake all' : 'Stake'}
          </Button>
        </Col>
        <Col lg={12} xs={24} className={styles.left}>
          <Typography color="black" weight={700} size={20} mt={20} block className="sans">
            Staked Cats ({stakedTokensNew.length})
          </Typography>
          <Row className={styles.imgRow} gutter={[20, 10]}>
            {stakedTokensNew.length &&
              stakedTokensNew.map((item: any) => (
                <Col span={8} key={item} onClick={() => handleSelectStake(item)}>
                  <div className={styles.imgContainer}>
                    <img
                      src={`https://ipfs.io/ipfs/QmX7cwxUov4R9L9bp81j9sEMyfjv3bnYJXPog4LwuhbswG/${item}.png`}
                      alt="cat"
                      className={selectedStake.includes(item) ? styles.selected : ''}
                    />
                    <img src={Close} alt="" className={styles.close} />
                    <Typography color="white" className={styles.imgId}>
                      #{item}
                    </Typography>
                  </div>
                </Col>
              ))}
          </Row>
          <Button type="primary" onClick={handleUnStakeCats}>
            {isSelectStakeAll ? 'Unstake all' : 'Unstake'}
          </Button>
          <Typography color="black" weight={400} size={14} block mt={10}>
            Earning {stakedTokensNew.length * 10} $NFISH/day
          </Typography>
        </Col>
      </Row>
    </>
  );
};

export default StakingSection;
