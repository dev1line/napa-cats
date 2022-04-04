import { Row, Col, notification } from 'antd';
import { Typography } from 'components/Typography';
import styles from './ApproveSection.module.css';
import { Button } from 'antd';
import { useWallet } from 'hooks';
import { getContractLPStake, getContractLPToken } from 'utils/getContract';
import { APPROVE_AMOUNT, LP_STAKING } from 'utils/constants';
import { useEffect, useState } from 'react';
import StakeLPModal from './StakeLPModal';
import UnStakeLPModal from './UnStakeLPModal';
import Loading from 'components/layout/Loading';

const ApproveSection = ({ fishPriceUSDT }: any) => {
  const { active, account, connector, library } = useWallet();
  // const { active, connector, library } = useWallet();
  // const account = '0x49695bd21712967bf54bc0643444d657225aadc9';
  const [open, setOpen] = useState({
    stakeModal: false,
    unStakeModal: false,
  });
  const [data, setData] = useState({
    allowance: 0,
    totalStakedBalance: 0,
    balance: 0,
    totalStakedUni: 0,
    rewards: 0,
    // isApprove: false,
  });

  const toggleOpen = (key: 'stakeModal' | 'unStakeModal') => {
    setOpen((old) => ({ ...old, [key]: !old[key] }));
  };
  const [loading, setLoading] = useState('');

  const getBlockchainData = async (text?: string) => {
    if (connector && library) {
      try {
        setLoading('Loading');
        const { contract: LPTokenContract } = await getContractLPToken(connector);
        const { contract: stakeContractLP } = await getContractLPStake(connector);

        const allowance = await LPTokenContract.methods.allowance(account, LP_STAKING).call();
        const totalStakedBalance = await LPTokenContract.methods.balanceOf(LP_STAKING).call();
        const balance = await LPTokenContract.methods.balanceOf(account).call();
        const totalStakedUni = await stakeContractLP.methods.balanceOf(account).call();
        const rewards = await stakeContractLP.methods.earned(account).call();
        // const isApprove = await LPTokenContract.methods.approve(LP_STAKING, APPROVE_AMOUNT).call();
        Number(library.utils.fromWei(balance, 'ether'));
        setData({
          // isApprove,
          allowance,
          totalStakedBalance: Number(library.utils.fromWei(totalStakedBalance, 'ether')),
          balance: Number(library.utils.fromWei(balance, 'ether')),
          totalStakedUni: Number(library.utils.fromWei(totalStakedUni, 'ether')),
          rewards: Number(library.utils.fromWei(rewards, 'ether')),
        });
        setLoading('');
        text &&
          notification.success({
            message: '',
            description: text,
          });
      } catch (err: any) {
        setLoading('');
      }
    }
  };

  useEffect(() => {
    getBlockchainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector, account, active, library]);

  const handleApprove = async () => {
    try {
      const { contract: LPTokenContract } = await getContractLPToken(connector);
      const allowance = await LPTokenContract.methods.allowance(account, LP_STAKING).call({ gas: 30000000 });
      if (!allowance) {
        notification.warning({
          message: '',
          description: 'Already Approved',
        });
        await getBlockchainData(undefined);
        return;
      }

      await LPTokenContract.methods
        .approve(LP_STAKING, APPROVE_AMOUNT)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Approving');
        })
        .on('receipt', async () => {
          getBlockchainData('Approve success!');
        });
    } catch (err: any) {
      console.log({ err });
      if (err.message.includes('execution reverted')) {
        notification.error({
          message: '',
          description: err.message.substr(0, err.message.indexOf('{')) || err.message,
        });
      } else {
        notification.error({
          message: '',
          description: err.message,
        });
      }
    }
  };

  const handleClaimRewards = async () => {
    const { contract: stakeContractLP } = await getContractLPStake(connector);

    try {
      await stakeContractLP.methods
        .getReward()
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Claiming reward');
        })
        .on('receipt', async () => {
          getBlockchainData('Claim rewards success!');
        });
    } catch (err: any) {
      setLoading('');
      if (err.message.includes('execution reverted')) {
        notification.error({
          message: '',
          description: err.message.substr(0, err.message.indexOf('{')) || err.message,
        });
      } else {
        notification.error({
          message: '',
          description: err.message,
        });
      }
    }
  };

  const handleStake = async (stakedAmount: number | undefined) => {
    try {
      const { contract: stakeContractLP } = await getContractLPStake(connector);
      await stakeContractLP.methods
        .stake(library?.utils?.toWei('' + stakedAmount, 'ether') || 0)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Staking');
          toggleOpen('stakeModal');
        })
        .on('receipt', async () => {
          getBlockchainData('Stake success');
        });
    } catch (err) {
      console.log('err', err);
      setLoading('');
    }
  };

  const handleUnstake = async (unStakeAmount: number, type?: string) => {
    if (unStakeAmount > totalStakedUni) {
      // toast.error('Invalid amount');
      return;
    }
    try {
      const amountSend = type === 'all' ? unStakeAmount : library?.utils?.toWei('' + unStakeAmount, 'ether') || 0;
      const { contract: stakeContractLP } = await getContractLPStake(connector);
      await stakeContractLP.methods
        .withdraw(amountSend)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Withdrawing');
          toggleOpen('unStakeModal');
        })
        .on('receipt', async () => {
          getBlockchainData('Withdraw success!');
        });
    } catch (err) {
      setLoading('');
    }
  };

  // const isApprove = true;
  // const isApprove = handleApprove();
  // +data.allowance !== 0;
  const { totalStakedBalance, balance, totalStakedUni, rewards, allowance } = data;
  // console.log('allowance', allowance);
  return (
    <>
      {loading !== '' && <Loading />}
      <Row justify="space-between" align="bottom" className={styles.approveContainer}>
        <Col lg={12} xs={24}>
          <Typography className="sans" color="black" weight={700} size={20} block>
            Staking liquidity rewards
          </Typography>
          <Typography color="black" weight={400} size={14} block mt={10}>
            1. Approve the contract to enable staking.
          </Typography>
          <Typography color={!!allowance ? 'black' : 'gray'} weight={400} size={14} block>
            2. Once complete, stake your tokens.
          </Typography>
        </Col>
        <Col lg={12} xs={24} className={styles.left}>
          {allowance === 0 && (
            <Button className={styles.approveBtn} onClick={handleApprove}>
              {' '}
              APPROVE CONTRACT
            </Button>
          )}{' '}
        </Col>
      </Row>
      {allowance > 0 && (
        <Row justify="space-between">
          <div className={styles.card}>
            <Typography size={14} color="#000000" weight={600} block>
              Total Staked
            </Typography>
            <Typography size={20} color="#000000" weight={800} block>
              {totalStakedBalance.toFixed(2)} LP Token
            </Typography>
          </div>
          <div className={styles.card}>
            <Row align="middle">
              <Col span={12}>
                <Typography size={14} color="#000000" weight={600} block>
                  Rewards
                </Typography>
                <Typography size={20} color="#000000" weight={800} block>
                  {rewards.toFixed(2)} $NFISH
                </Typography>
                <Typography size={14} color="#000000" weight={600} block>
                  ~ ${(rewards * fishPriceUSDT).toFixed(2)} USD
                </Typography>
              </Col>
              <Col span={12} className={styles.center}>
                <Button type="primary" onClick={handleClaimRewards} disabled={rewards === 0}>
                  Claim
                </Button>
              </Col>
            </Row>
          </div>
          <div className={styles.card}>
            <Row align="top">
              <Col span={12}>
                <Typography size={14} color="#000000" weight={600} block>
                  LP Token Staked
                </Typography>
                <Typography size={20} color="#000000" weight={800} block>
                  {totalStakedUni.toFixed(2)} LP Token
                </Typography>
              </Col>
              <Col span={12} className={styles.center}>
                <Button
                  type="primary"
                  onClick={() => toggleOpen('unStakeModal')}
                  className={styles.withdrawBtn}
                  disabled={totalStakedUni === 0}
                >
                  Withdraw
                </Button>
                <Button
                  type="primary"
                  onClick={() => handleUnstake(totalStakedUni, 'all')}
                  disabled={totalStakedUni === 0}
                >
                  Withdraw All
                </Button>
              </Col>
            </Row>
          </div>
          <div className={styles.card}>
            <Row align="top">
              <Col span={12}>
                <Typography size={14} color="#000000" weight={600} block>
                  LP Token Balance
                </Typography>
                <Typography size={20} color="#000000" weight={800} block>
                  {balance.toFixed(2)} LP Token
                </Typography>
              </Col>
              <Col span={12} className={styles.center}>
                <Button
                  type="primary"
                  onClick={() => toggleOpen('stakeModal')}
                  className={styles.withdrawBtn}
                  disabled={balance === 0}
                >
                  Stake
                </Button>
                <Button type="primary" onClick={() => handleStake(balance)} disabled={balance === 0}>
                  Stake All
                </Button>
              </Col>
            </Row>
          </div>
        </Row>
      )}
      {open.stakeModal && <StakeLPModal handleStake={handleStake} onClose={() => toggleOpen('stakeModal')} />}
      {open.unStakeModal && <UnStakeLPModal handleUnstake={handleUnstake} onClose={() => toggleOpen('unStakeModal')} />}
    </>
  );
};

export default ApproveSection;
