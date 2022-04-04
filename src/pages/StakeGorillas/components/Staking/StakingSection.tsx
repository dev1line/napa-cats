import { Row, Col } from 'antd';
import { Typography, Button } from 'antd';
import styles from './StakingSection.module.css';
import SerumMini from 'assets/images/stake/serumMini.svg';
import Close from 'assets/images/stake/close.svg';
import { useWallet } from 'hooks';
import { FeedModal } from '../FeedModal';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getContractMutantGorilla, getContractSerumStaking } from 'utils/getContract';

const StakingSection = ({
  handleUnstake,
  handleStake,
  handleFeedGorilla,
  tokensOfOwner,
  depositOf,
  allowance,
  handleApproveAppetite,
}: any) => {
  const { active, account, connector, library }: any = useWallet();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOpen, setSelectedOpen] = useState({} as any);
  const [selectedStake, setSelectedStake] = useState<string[]>([]);
  const [selectedUnStake, setSelectedUnStake] = useState<string[]>([]);

  const [GorillaForUnstake, setGorillaForUnstake] = useState([] as any);
  const [GorillaForStake, setGorillaForStake] = useState([] as any);
  const DAY_STAKING = 60;
  const handleSelectStake = (tokenId: string) => {
    if (selectedStake.includes(tokenId)) setSelectedStake(selectedStake.filter((item) => item !== tokenId));
    else setSelectedStake([...selectedStake, tokenId]);
  };

  const handleSelectUnStake = (tokenId: string) => {
    if (selectedUnStake.includes(tokenId)) setSelectedUnStake(selectedUnStake.filter((item) => item !== tokenId));
    else setSelectedUnStake([...selectedUnStake, tokenId]);
  };

  const isSelectStakeAll = selectedStake.length === 0 || selectedStake === depositOf.length;
  const isSelectUnStakeAll = selectedUnStake.length === 0 || selectedUnStake === tokensOfOwner.length;

  const handleUnStakeGorillas = () => {
    if (selectedStake.length === 0) handleUnstake(depositOf);
    else
      handleUnstake(selectedStake, () => {
        // setGorillaForUnstake([]);
        setSelectedStake([]);
      });
  };
  const handleStakeGorillas = () => {
    if (selectedUnStake.length === 0) handleStake(tokensOfOwner);
    else
      handleStake(selectedUnStake, () => {
        // setGorillaForStake([]);
        setSelectedUnStake([]);
      });
  };

  const toggleModal = () => setOpen(!open);

  const handleFeed = (selectedId: string) => {
    setSelectedOpen(GorillaForUnstake.find((item: any) => item.id === selectedId));
    toggleModal();
  };

  useEffect(() => {
    const getBlockchainData = async () => {
      if (connector && library) {
        try {
          const { contract: mutantGorillaContract } = await getContractMutantGorilla(connector);
          const { contract: serumStakingContract } = await getContractSerumStaking(connector);
          const fishFor100Boost = +library.utils.fromWei(
            await serumStakingContract.methods.fishFor100Boost().call(),
            'ether'
          );
          const fishFor50Boost = +library.utils.fromWei(
            await serumStakingContract.methods.fishFor50Boost().call(),
            'ether'
          );
          const fishFor25Boost = +library.utils.fromWei(
            await serumStakingContract.methods.fishFor25Boost().call(),
            'ether'
          );
          let results: any[] = [];
          if (tokensOfOwner.length) {
            results = await Promise.all(
              tokensOfOwner.map(async (item: any): Promise<any> => {
                const img = await mutantGorillaContract.methods.tokenURI(item).call();
                const removeIPFSTextImg = img.substring(7, img.length);
                let imgUrl = {
                  data: {
                    image: '',
                  },
                };
                let img2nd = '';
                let removeIPFSTextImg2nd = '';
                try {
                  imgUrl = await axios.get(`https://ipfs.io/ipfs/${removeIPFSTextImg}`);
                } catch {}
                try {
                  img2nd = imgUrl?.data?.image;
                  removeIPFSTextImg2nd = img2nd.substring(7, img2nd.length);
                } catch {}
                return {
                  img: `https://ipfs.io/ipfs/${removeIPFSTextImg2nd}`,
                  id: item,
                };
              })
            );
          }

          setGorillaForStake(results);
          let results1: any[] = [];
          if (depositOf.length) {
            results1 = await Promise.all(
              depositOf.map(async (item: any): Promise<any> => {
                const img = await mutantGorillaContract.methods.tokenURI(item).call();
                const removeIPFSTextImg = img.substring(7, img.length);
                let imgUrl = {
                  data: {
                    image: '',
                  },
                };
                let img2nd = '';
                let removeIPFSTextImg2nd = '';
                try {
                  imgUrl = await axios.get(`https://ipfs.io/ipfs/${removeIPFSTextImg}`);
                } catch {}
                try {
                  img2nd = imgUrl?.data?.image;
                  removeIPFSTextImg2nd = img2nd.substring(7, img2nd.length);
                } catch {}
                const tokenReward = await serumStakingContract.methods._tokenRewards(item).call();
                let totalStakingDays = DAY_STAKING;
                let currentStakingDays = (new Date().getTime() - tokenReward.startTime * 1000) / (60 * 60 * 24 * 1000);
                const fishDepositedFromWei = +library.utils.fromWei(tokenReward.fishDeposited, 'ether');
                if (fishDepositedFromWei >= fishFor25Boost) {
                  totalStakingDays = +(DAY_STAKING - DAY_STAKING / 8).toFixed(1);
                }
                if (fishDepositedFromWei >= fishFor50Boost) {
                  totalStakingDays = +(DAY_STAKING - DAY_STAKING / 4).toFixed(1);
                }
                if (fishDepositedFromWei >= fishFor100Boost) {
                  totalStakingDays = +(DAY_STAKING - DAY_STAKING / 2).toFixed(1);
                }
                let percentage = currentStakingDays / totalStakingDays;
                if (percentage >= 1) {
                  percentage = 100;
                } else if (percentage < 0) {
                  percentage = 0;
                } else {
                  percentage = percentage * 100;
                }
                return {
                  img: `https://ipfs.io/ipfs/${removeIPFSTextImg2nd}`,
                  id: item,
                  fishDeposited: fishDepositedFromWei,
                  startTime: tokenReward.startTime,
                  totalStakingDays,
                  currentStakingDays,
                  fishFor25Boost,
                  fishFor50Boost,
                  fishFor100Boost,
                  percentage,
                };
              })
            );
          }
          setGorillaForUnstake(results1);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getBlockchainData();
  }, [connector, account, active, library, tokensOfOwner, depositOf]);
  return (
    <>
      <Row style={{ marginBottom: '24px' }}>
        <Col md={12} xs={24} className={styles.left}>
          <Typography.Text className={styles.text}>Staking</Typography.Text>
        </Col>
        <Col md={12} xs={24} className={styles.right}>
          <Typography.Text className={styles.textWallet}>
            Connected to {account?.slice(0, 7)}...{account?.slice(37, 42)}
          </Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col xs={24} className={styles.left}>
          <div>
            <Typography.Text className={styles.textStack}>Unstaked Gorillas ({GorillaForStake.length})</Typography.Text>
            &nbsp;&nbsp;
            <Button
              type="primary"
              onClick={handleStakeGorillas}
              disabled={!GorillaForStake.length}
              className={styles.btn}
            >
              {isSelectUnStakeAll ? ' Stake all' : 'Stake'}
            </Button>
          </div>
          <Row className={styles.imgRow} gutter={[20, 10]}>
            {GorillaForStake.length ? (
              GorillaForStake.map((item: any) => (
                <Col md={4} xs={24} key={item.id} onClick={() => handleSelectUnStake(item.id)}>
                  <div className={styles.stakedImgContainer}>
                    <img
                      src={item.img}
                      alt="cat"
                      className={selectedUnStake.includes(item.id) ? styles.selectedImg : ''}
                    />
                    <Typography className={styles.imgId}>#{item.id}</Typography>
                  </div>
                </Col>
              ))
            ) : (
              <Row className={styles.unstakedImgRowEmpty} gutter={[20, 10]}>
                <Col lg={4} md={6}>
                  <div className={styles.imgContainerEmpty}></div>
                </Col>
                <Col lg={4} md={6}>
                  <div className={styles.imgContainerEmpty}></div>
                </Col>
                <Col lg={4} md={6}>
                  <div className={styles.imgContainerEmpty}></div>
                </Col>
                <Col lg={4} md={6}>
                  <div className={styles.imgContainerEmpty}></div>
                </Col>
                <Col lg={4} md={6}>
                  <div className={styles.imgContainerEmpty}></div>
                </Col>
                <Col lg={4} md={6}>
                  <div className={styles.imgContainerEmpty}></div>
                </Col>
              </Row>
            )}
          </Row>
        </Col>
      </Row>
      <div>
        <>
          <Typography.Text className={styles.textStack}>Staked Gorillas ({GorillaForUnstake.length})</Typography.Text>
          &nbsp;&nbsp;
          <Button
            type="primary"
            onClick={handleUnStakeGorillas}
            disabled={!GorillaForUnstake.length}
            className={styles.btn}
          >
            {isSelectStakeAll ? ' UNstake all' : 'UNStake'}
          </Button>
          &nbsp;&nbsp;
          {+allowance === 0 && <Button onClick={handleApproveAppetite}>Approve Appetite</Button>}
        </>
      </div>

      {GorillaForUnstake.map((item: any, index: any) => (
        <Row
          key={index}
          gutter={[20, 20]}
          className={
            selectedStake.includes(item.id) ? `${styles.gorillaItem} ${styles.selected}` : `${styles.gorillaItem}`
          }
        >
          <Col span={8} lg={4} md={8} xs={24} className={styles.itemCol}>
            <div className={styles.imgContainer} onClick={() => handleSelectStake(item.id)}>
              <img src={item.img} alt="cat" className={styles.imgUnstake} />
              <div className={styles.levelGorilla}>
                <Typography.Text className={styles.level}>#{item.id}</Typography.Text>
              </div>
              <img src={Close} alt="" className={styles.close}></img>
            </div>
          </Col>
          <Col span={16} lg={8} md={16} xs={24} className={styles.earningWrap}>
            <div>
              <Typography.Text className={styles.textWallet}>Earning 1 $SERUM after</Typography.Text>
            </div>
            <div>
              <Typography.Text className={styles.text}>
                {Math.floor(item.totalStakingDays - item.currentStakingDays) >= 0
                  ? Math.floor(item.totalStakingDays - item.currentStakingDays)
                  : 0}{' '}
                days
                {<span>🐟</span>}
              </Typography.Text>
            </div>
            <div>
              <div className={styles.lineWrap}>
                <div className={styles.line}>
                  <FinishLine className={styles.finishLine} percent={item.percentage} />
                </div>
                <div className={styles.serumMiniWrap}>
                  <img src={SerumMini} alt="" />
                </div>
              </div>
            </div>
          </Col>
          <Col span={12} lg={6} md={12} xs={24} className={styles.appetiteWrap}>
            <div>
              <Typography.Text className={styles.textWallet}>Amount of $NFISH fed </Typography.Text>
              <div>
                <Typography.Text className={styles.text}>{item.fishDeposited} $NFISH</Typography.Text>
              </div>
            </div>
          </Col>
          <Col span={12} lg={6} md={12} xs={24} className={styles.buttonWrap}>
            {+item.fishDeposited > 0 ? (
              <Button
                onClick={() => handleFeed(item.id)}
                disabled={+allowance === 0 || +item.fishDeposited >= +item.fishFor100Boost}
                className={styles.btn}
              >
                UPDATE $NFISH
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => handleFeed(item.id)}
                disabled={+allowance === 0 || +item.fishDeposited >= +item.fishFor100Boost}
                className={styles.btn}
              >
                INCREASE $NFISH
              </Button>
            )}
          </Col>
        </Row>
      ))}
      <FeedModal data={selectedOpen} visible={open} toggleModal={toggleModal} handleFeedGorilla={handleFeedGorilla} />
    </>
  );
};

const FinishLine = styled.div<{ percent: number }>`
  width: ${(p) => p.percent}%;
  /* height: 6px; */
  /* background: #454545; */
  /* background: #ffd43c; */
`;

export default StakingSection;
