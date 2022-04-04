import styles from './index.module.css';
import ProgressBar from './components/ProgressBar';
import Introduction from './components/Introduction';
import Staking from './components/Staking';
import { useWallet, useWalletModal } from 'hooks';
import { useEffect, useState } from 'react';
import {
  getContractFish,
  getContractMutantGorilla,
  getContractNoWalletMutantGorillas,
  getContractSerumStaking,
} from 'utils/getContract';
import { APPROVE_AMOUNT, SERUM_STAKING } from 'utils/constants';
import Loading from 'components/layout/Loading';
import { Button, notification } from 'antd';

const StakeGorillas = () => {
  const [loading, setLoading] = useState('');
  const [data, setData] = useState({
    isApproved: false,
    claimableSerum: 0,
    tokensOfOwner: [] as any,
    depositOf: [] as any,
    allowance: 0,
  });

  const [dataNoWallet, setDataNoWallet] = useState({
    percentStake: 0,
  });

  const { active, account, connector, library }: any = useWallet();
  const getBlockchainData = async (text?: string, type?: string) => {
    try {
      const { contract: mutantGorillasContractNoWallet } = await getContractNoWalletMutantGorillas();
      const stakedGorilla = await mutantGorillasContractNoWallet.methods.balanceOf(SERUM_STAKING).call();
      const currentSupply = 8882;
      const percentStake = (parseInt(stakedGorilla) / currentSupply) * 100;
      setDataNoWallet({
        percentStake,
      });
    } catch {}
    if (connector && library) {
      try {
        setLoading('lodin');
        const { contract: mutantGorillaContract } = await getContractMutantGorilla(connector);
        const { contract: serumStakingContract } = await getContractSerumStaking(connector);
        const { contract: fishContract } = await getContractFish(connector);

        let claimableSerum = 0;
        const isApproved = await mutantGorillaContract.methods.isApprovedForAll(account, SERUM_STAKING).call();
        console.log('isApproved', isApproved);
        const allowance = await fishContract.methods.allowance(account, SERUM_STAKING).call({
          gas: 30000000,
        });

        try {
          claimableSerum = await serumStakingContract.methods.getClaimableSerumAmt(account).call({
            from: account,
          });
        } catch {
          claimableSerum = 0;
        }
        const TokenOfOwnersSentLogs = await mutantGorillaContract.getPastEvents('Transfer', {
          filter: { from: account },
          fromBlock: 0,
          toBlock: 'latest',
        });
        const TokenOfOwnersReceivedLogs = await mutantGorillaContract.getPastEvents('Transfer', {
          filter: { to: account },
          fromBlock: 0,
          toBlock: 'latest',
        });

        const accountLogs: any = TokenOfOwnersSentLogs.concat(TokenOfOwnersReceivedLogs).sort(
          (a, b) => a.blockNumber - b.blockNumber || a.transactionIndex - b.transactionIndex
        );

        const tokensOfOwner = new Set();

        for (const log of accountLogs) {
          const { from, to, tokenId } = log.returnValues;
          if (to === account) {
            tokensOfOwner.add(tokenId.toString());
          } else if (from === account) {
            tokensOfOwner.delete(tokenId.toString());
          }
        }

        const depositOf = await serumStakingContract.methods.depositsOf(account).call();

        setData({
          isApproved,
          claimableSerum,
          tokensOfOwner: Array.from(tokensOfOwner).sort((a: any, b: any) => +a - +b),
          depositOf,
          allowance,
        });
        text &&
          notification.success({
            message: '',
            description: text,
          });
        setLoading('');
      } catch (err: any) {
        // setLoading('');
      }
    }
  };

  useEffect(() => {
    getBlockchainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector, account, active, library]);

  const { toggleOpen } = useWalletModal();

  const handleApprove = async () => {
    try {
      const { contract: mutantGorillaContract } = await getContractMutantGorilla(connector);
      const isApprovedForAll = await mutantGorillaContract.methods.isApprovedForAll(account, SERUM_STAKING).call();
      if (isApprovedForAll) {
        notification.warning({
          message: '',
          description: 'Already Approved',
        });
        await getBlockchainData(undefined);
        return;
      }

      await mutantGorillaContract.methods
        .setApprovalForAll(SERUM_STAKING, true)
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

  const handleApproveAppetite = async () => {
    try {
      const { contract: fishContract } = await getContractFish(connector);
      const allowance = await fishContract.methods.allowance(account, SERUM_STAKING).call();
      if (!allowance) {
        notification.warning({
          message: '',
          description: 'Already Approved',
        });
        await getBlockchainData(undefined);
        return;
      }

      await fishContract.methods
        .approve(SERUM_STAKING, APPROVE_AMOUNT)
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

  const handleUnstake = async (gorillas: string[], resetSelect: Function) => {
    try {
      const { contract: serumStakingContract } = await getContractSerumStaking(connector);
      await serumStakingContract.methods
        .withdraw(gorillas)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Unstaking');
        })
        .on('receipt', async () => {
          // setTimeout(() =>
          getBlockchainData('Unstake success!', 'unstake');
          //  , 5000);
        });
      resetSelect();
    } catch (err) {
      setLoading('');
    }
  };

  const handleStake = async (gorillas: string[], resetSelect: Function) => {
    try {
      const { contract: serumStakingContract } = await getContractSerumStaking(connector);
      await serumStakingContract.methods
        .deposit(gorillas)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Staking');
        })
        .on('receipt', async () => {
          // setTimeout(() =>
          getBlockchainData('Stake success!', 'stake');
          // , 5000);
        });
      resetSelect();
    } catch (err) {
      console.log('err', err);
      setLoading('');
    }
  };

  const handleClaimSerum = async () => {
    try {
      const { contract: serumStakingContract } = await getContractSerumStaking(connector);
      await serumStakingContract.methods
        .claimSerum()
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Claiming $Serum');
        })
        .on('receipt', async () => {
          getBlockchainData('Claim $Serum success!');
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

  const handleFeedGorilla = async (gorillas: string, amount: number) => {
    try {
      const { contract: serumStakingContract } = await getContractSerumStaking(connector);
      await serumStakingContract.methods
        .feedGorilla(gorillas, library?.utils.toWei('' + amount, 'ether'))
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Feeding Gorilla');
        })
        .on('receipt', async () => {
          getBlockchainData('Feed Gorilla success!');
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

  const { isApproved, claimableSerum, tokensOfOwner, depositOf, allowance } = data;
  const { percentStake } = dataNoWallet;

  return (
    <div className={styles.container}>
      {loading !== '' && <Loading />}
      {active ? (
        <>
          <Introduction percentStake={percentStake} />
          <ProgressBar percentStake={percentStake} />
          <Staking
            handleUnstake={handleUnstake}
            handleStake={handleStake}
            handleApprove={handleApprove}
            handleClaimSerum={handleClaimSerum}
            isApproved={isApproved}
            claimableSerum={claimableSerum}
            handleFeedGorilla={handleFeedGorilla}
            handleApproveAppetite={handleApproveAppetite}
            tokensOfOwner={tokensOfOwner}
            depositOf={depositOf}
            allowance={allowance}
          />
        </>
      ) : (
        <>
          <Introduction percentStake={percentStake} />
          <ProgressBar percentStake={percentStake} />
          <Button type="primary" onClick={toggleOpen} className={styles.connectWallet}>
            Connect Wallet
          </Button>
        </>
      )}
    </div>
  );
};

export default StakeGorillas;
