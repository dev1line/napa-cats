import styles from './index.module.css';
import ProgressBar from './components/ProgressBar';
import Introduction from './components/Introduction';
import Staking from './components/Staking';
import { useWallet } from 'hooks';
import {
  getContractFish,
  getContractLPToken,
  // getContractLPToken,
  // getContractLPToken,
  getContractMutant,
  getContractNoWalletMutantCats,
  getContractStakeNew,
  getContractStakeOld,
  getContractUSDTLPToken,
  // getContractUSDTLPToken,
} from 'utils/getContract';
import { useEffect, useState } from 'react';
import { STAKING_NEW, STAKING_OLD } from 'utils/constants';
import { Button, notification } from 'antd';
import { useWalletModal } from 'hooks';
import Loading from 'components/layout/Loading';
import Big from 'big.js';

const StakeCats = () => {
  const { active, account, connector, library } = useWallet();
  // const { active, connector, library } = useWallet();
  // const account = '0x6b1f74df9b1383adc6b3bfc840a92003bb2e6e49';
  const { toggleOpen } = useWalletModal();
  const [data, setData] = useState({
    fishBalance: 0,
    stakedTokensOld: [],
    stakedTokensNew: [],
    totalFishRounded: 0,
    isApproved: false,
    tokensOfOwner: [],
    fishPriceUSDT: 0,
  });

  const [dataNoWallet, setDataNoWallet] = useState({
    vaultMutantsStaked: 0,
    vaultMutantsStakedPercent: 0,
  });

  const [loading, setLoading] = useState('');

  const getBlockchainData = async (text?: string) => {
    try {
      const { contract: mutantContractNoWallet } = await getContractNoWalletMutantCats();

      const oldStakeNumber = await mutantContractNoWallet.methods.balanceOf(STAKING_OLD).call();

      const newStakeNumber = await mutantContractNoWallet.methods.balanceOf(STAKING_NEW).call();

      // const vaultMutantsStaked = parseInt(oldStakeNumber) + parseInt(newStakeNumber);
      const vaultMutantsStakedPercent = Number((((parseInt(newStakeNumber) / 9999) * 1000) / 10).toFixed(2));
      console.log('all', oldStakeNumber, newStakeNumber, vaultMutantsStakedPercent);
      setDataNoWallet({
        ...dataNoWallet,
        vaultMutantsStakedPercent,
      });
    } catch {}
    if (connector && library) {
      try {
        setLoading('Loading');

        const { contract: mutantContract } = await getContractMutant(connector);
        const { contract: stakeOldContract } = await getContractStakeOld(connector);
        const { contract: stakeNewContract } = await getContractStakeNew(connector);
        const { contract: fishContract } = await getContractFish(connector);
        const { contract: USDTLPTokenContract } = await getContractUSDTLPToken(connector);
        const { contract: LPTokenContract } = await getContractLPToken(connector);
        // const latest = await library.eth.getBlockNumber()

        const reservesUSDT = await USDTLPTokenContract.methods.getReserves().call();
        const reservesFish = await LPTokenContract.methods.getReserves().call();
        // const total = new Big(reservesFish[1]).toNumber() / new Big(`${10 ** 18}`).toNumber();
        const ethPrice =
          +library.utils.fromWei(`${reservesUSDT[1]}`, 'ether') / +library.utils.fromWei(`${reservesUSDT[0]}`, 'ether');

        const fishPriceETH =
          +library.utils.fromWei(`${reservesFish[0]}`, 'ether') / +library.utils.fromWei(`${reservesFish[1]}`, 'ether');

        const fishPriceUSDT = +(ethPrice * fishPriceETH).toFixed(2);

        const fishDecimal = await fishContract.methods.balanceOf(account).call();
        const fish = library.utils.fromWei(fishDecimal, 'ether');
        const fishBalance = Math.round(+fish * 100) / 100;

        const stakedTokensOld = await stakeOldContract.methods.depositsOf(account).call();
        const stakedTokensNew = await stakeNewContract.methods.depositsOf(account).call();
        const tokensOfOwner = await mutantContract.methods.tokensOfOwner(account).call();

        // const isApproved = true;
        const isApproved = await mutantContract.methods.isApprovedForAll(account, STAKING_NEW).call();
        const claimableDecimalList = await stakeNewContract.methods.calculateRewards(account, stakedTokensNew).call();
        let totalFish = 0;
        for (let claimableDecimal of claimableDecimalList) {
          // const fish = parseFloat(library.utils.fromWei(claimableDecimal, 'ether'));
          // console.log('🚀 ~ file: index.tsx ~ line 101 ~ getBlockchainData ~ fish', fish);
          totalFish += +claimableDecimal;
        }
        const totalFishRounded = new Big(totalFish).toNumber() / Number(new Big(`${10 ** 18}`).toNumber());
        setData({
          fishBalance,
          stakedTokensOld,
          stakedTokensNew,
          totalFishRounded,
          isApproved,
          tokensOfOwner,
          fishPriceUSDT,
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
      const { contract: mutantContract } = await getContractMutant(connector);
      const isApprovedForAll = await mutantContract.methods.isApprovedForAll(account, STAKING_NEW).call();

      if (isApprovedForAll) {
        notification.warning({
          message: '',
          description: 'Already Approved',
        });
        await getBlockchainData(undefined);
        return;
      }

      await mutantContract.methods
        .setApprovalForAll(STAKING_NEW, true)
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

  const handleUnstake = async (cats: string[]) => {
    try {
      const { contract: stakeNewContract } = await getContractStakeNew(connector);
      await stakeNewContract.methods.withdraw(cats).call({
        from: account,
      });
      await stakeNewContract.methods
        .withdraw(cats)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Unstaking');
        })
        .on('receipt', async () => {
          getBlockchainData('Unstake success!');
        });
    } catch (err) {
      setLoading('');
    }
  };

  const handleStake = async (cats: string[]) => {
    try {
      const { contract: stakeNewContract } = await getContractStakeNew(connector);
      await stakeNewContract.methods.deposit(cats).call({
        from: account,
      });
      await stakeNewContract.methods
        .deposit(cats)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Staking');
        })
        .on('receipt', async () => {
          getBlockchainData('Stake success');
        });
    } catch (err) {
      console.log('err', err);
      setLoading('');
    }
  };

  const handleClaimRewards = async () => {
    try {
      const { contract: stakeNewContract } = await getContractStakeNew(connector);
      await stakeNewContract.methods
        .claimRewards(stakedTokensNew)
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

  const { tokensOfOwner, fishBalance, totalFishRounded, stakedTokensNew, isApproved, fishPriceUSDT } = data;
  console.log(data);
  const { vaultMutantsStakedPercent } = dataNoWallet;

  return (
    <div className={styles.container}>
      {loading !== '' && <Loading />}
      {active ? (
        <>
          <Introduction vaultMutantsStakedPercent={vaultMutantsStakedPercent} />
          <ProgressBar vaultMutantsStakedPercent={vaultMutantsStakedPercent} />
          <Staking
            fishBalance={fishBalance}
            totalFishRounded={totalFishRounded}
            stakedTokensNew={stakedTokensNew}
            tokensOfOwner={tokensOfOwner}
            isApproved={isApproved}
            handleUnstake={handleUnstake}
            handleStake={handleStake}
            handleApprove={handleApprove}
            handleClaimRewards={handleClaimRewards}
            fishPriceUSDT={fishPriceUSDT}
          />
        </>
      ) : (
        <>
          <Introduction vaultMutantsStakedPercent={vaultMutantsStakedPercent} />
          <ProgressBar vaultMutantsStakedPercent={vaultMutantsStakedPercent} />{' '}
          <Button type="primary" onClick={toggleOpen} className={styles.connectWallet}>
            Connect Wallet
          </Button>
        </>
      )}
    </div>
  );
};

export default StakeCats;
