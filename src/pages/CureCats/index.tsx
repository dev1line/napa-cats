import styles from './index.module.css';
import Introduction from './components/Introduction';
import Staking from './components/Staking';
import { useWallet } from 'hooks';
import {
  getContractCuredCats,
  getContractMutant,
  getContractNoWalletMutantCats,
  getContractSerumStaking,
} from 'utils/getContract';
import { useEffect, useState } from 'react';
import { CURED_CATS_CONTRACT, STAKING_NEW, STAKING_OLD } from 'utils/constants';
import { Button, notification } from 'antd';
import { useWalletModal } from 'hooks';
import Loading from 'components/layout/Loading';
import { handleError } from 'utils/handleError';

const CureCats = () => {
  const { active, account, connector, library } = useWallet();
  // const { active, connector, library } = useWallet();
  // const account = '0xe052113bd7d7700d623414a0a4585bcae754e9d5'; //has cat
  const { toggleOpen } = useWalletModal();
  const [data, setData] = useState({
    isApprovedCats: false,
    tokensOfOwner: [],
    serumOwned: 0,
    isApprovedSerum: false,
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

      const vaultMutantsStaked = parseInt(oldStakeNumber) + parseInt(newStakeNumber);
      const vaultMutantsStakedPercent = Math.round((vaultMutantsStaked / 9999) * 1000) / 10;
      setDataNoWallet({
        vaultMutantsStaked,
        vaultMutantsStakedPercent,
      });
    } catch {}
    if (connector && library) {
      try {
        setLoading('Loading');
        const { contract: mutantContract } = await getContractMutant(connector);

        const { contract: SerumStakingContract } = await getContractSerumStaking(connector);

        const SERUM = +(await SerumStakingContract.methods.SERUM().call());
        const serumOwned = +(await SerumStakingContract.methods.balanceOf(account, SERUM).call());

        const tokensOfOwner = await mutantContract.methods.tokensOfOwner(account).call();

        const isApprovedCats = await mutantContract.methods.isApprovedForAll(account, CURED_CATS_CONTRACT).call();
        console.log('isApprovedCats', isApprovedCats, account);
        const isApprovedSerum = await SerumStakingContract.methods
          .isApprovedForAll(account, CURED_CATS_CONTRACT)
          .call();
        setData({
          isApprovedCats,
          tokensOfOwner,
          serumOwned,
          isApprovedSerum,
        });
        setLoading('');
        text &&
          notification.success({
            message: '',
            description: text,
          });
      } catch (err) {
        setLoading('');
      }
    }
  };

  useEffect(() => {
    getBlockchainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector, account, active, library]);

  const handleApproveCats = async () => {
    try {
      const { contract: mutantContract } = await getContractMutant(connector);
      const isApprovedForAll = await mutantContract.methods.isApprovedForAll(account, CURED_CATS_CONTRACT).call();

      if (isApprovedForAll) {
        notification.warning({
          message: '',
          description: 'Already Approved',
        });
        await getBlockchainData(undefined);
        return;
      }
      await mutantContract.methods.setApprovalForAll(CURED_CATS_CONTRACT, true).call({
        from: account,
      });
      await mutantContract.methods
        .setApprovalForAll(CURED_CATS_CONTRACT, true)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Approving');
        })
        .on('receipt', async () => {
          getBlockchainData('Approve success!');
        });
    } catch (err) {
      handleError(err);
    }
  };
  const handleApproveSerum = async () => {
    try {
      const { contract: SerumStakingContract } = await getContractSerumStaking(connector);
      const isApprovedForAll = await SerumStakingContract.methods.isApprovedForAll(account, CURED_CATS_CONTRACT).call();

      if (isApprovedForAll) {
        notification.warning({
          message: '',
          description: 'Already Approved',
        });
        await getBlockchainData(undefined);
        return;
      }
      await SerumStakingContract.methods.setApprovalForAll(CURED_CATS_CONTRACT, true).call({
        from: account,
      });
      await SerumStakingContract.methods
        .setApprovalForAll(CURED_CATS_CONTRACT, true)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Approving');
        })
        .on('receipt', async () => {
          getBlockchainData('Approve success!');
        });
    } catch (err) {
      handleError(err);
    }
  };

  const handleCureCats = async (cats: string[]) => {
    try {
      const { contract: CuredCatsContract } = await getContractCuredCats(connector);
      await CuredCatsContract.methods.transformCuredCat(cats).call({
        from: account,
      });
      await CuredCatsContract.methods
        .transformCuredCat(cats)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Transforming Cats');
        })
        .on('receipt', async () => {
          getBlockchainData('Transform Cats success!');
        });
    } catch (err) {
      handleError(err);
    }
  };

  const { tokensOfOwner, serumOwned, isApprovedCats, isApprovedSerum } = data;
  const { vaultMutantsStakedPercent } = dataNoWallet;

  return (
    <div className={styles.container}>
      {loading !== '' && <Loading />}
      <Introduction vaultMutantsStakedPercent={vaultMutantsStakedPercent} />
      {active ? (
        <>
          <Staking
            tokensOfOwner={tokensOfOwner}
            isApprovedCats={isApprovedCats}
            handleApproveCats={handleApproveCats}
            serumOwned={serumOwned}
            isApprovedSerum={isApprovedSerum}
            handleApproveSerum={handleApproveSerum}
            handleCureCats={handleCureCats}
          />
        </>
      ) : (
        <>
          <Button type="primary" onClick={toggleOpen} className={styles.connectWallet}>
            Connect Wallet
          </Button>
        </>
      )}
    </div>
  );
};

export default CureCats;
