import { CURED_CATS_CONTRACT } from './constants';
/* eslint-disable import/prefer-default-export */
import Web3 from 'web3';

import contractMutant from 'contracts/MutantTokenABI.json';
import contractStakeOld from 'contracts/StakingOldABI.json';
import contractStakeNew from 'contracts/StakingNewABI.json';
import contractFish from 'contracts/FishABI.json';
import contractLPStake from 'contracts/LPStakingABI.json';
import contractLPToken from 'contracts/LPTokenABI.json';
import contractUSDTLPToken from 'contracts/USDTLPTokenABI.json';
import contractMutantGorilla from 'contracts/MutantGorillaABI.json';
import contractSerumStaking from 'contracts/SerumStakingABI.json';
import contractCuredCats from 'contracts/CuredCatsABI.json';

import {
  FISH_TOKEN_CONTRACT,
  INFURA_ENDPOINT,
  LP_STAKING,
  MUTANT_CATS_CONTRACT,
  MUTANT_GORILLA,
  SERUM_STAKING,
  STAKING_NEW,
  STAKING_OLD,
  SUSHISWAP_LP_TOKEN_CONTRACT,
  USDT_LP_TOKEN_CONTRACT,
} from './constants';

export const getContractNoWalletMutantCats = async () => {
  const networkAddress = INFURA_ENDPOINT;
  const provider = new Web3.providers.HttpProvider(networkAddress);
  const web3 = new Web3(provider);

  const contractAbi: any = contractMutant.abi;

  const contractAddress = MUTANT_CATS_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractNoWalletLPToken = async () => {
  const networkAddress = INFURA_ENDPOINT;
  const provider = new Web3.providers.HttpProvider(networkAddress);
  const web3 = new Web3(provider);

  const contractAbi: any = contractLPToken.abi;

  const contractAddress = SUSHISWAP_LP_TOKEN_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractNoWalletUSDTLPToken = async () => {
  const networkAddress = INFURA_ENDPOINT;
  const provider = new Web3.providers.HttpProvider(networkAddress);
  const web3 = new Web3(provider);

  const contractAbi: any = contractUSDTLPToken.abi;

  const contractAddress = USDT_LP_TOKEN_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractMutant = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractMutant.abi;

  const contractAddress = MUTANT_CATS_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractFish = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractFish.abi;

  const contractAddress = FISH_TOKEN_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractStakeOld = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractStakeOld.abi;

  const contractAddress = STAKING_OLD;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractStakeNew = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractStakeNew.abi;

  const contractAddress = STAKING_NEW;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractLPStake = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractLPStake.abi;

  const contractAddress = LP_STAKING;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractLPToken = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractLPToken.abi;

  const contractAddress = SUSHISWAP_LP_TOKEN_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractUSDTLPToken = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractUSDTLPToken.abi;

  const contractAddress = USDT_LP_TOKEN_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractMutantGorilla = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractMutantGorilla.abi;

  const contractAddress = MUTANT_GORILLA;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractSerumStaking = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractSerumStaking.abi;

  const contractAddress = SERUM_STAKING;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractNoWalletMutantGorillas = async () => {
  const networkAddress = INFURA_ENDPOINT;
  const provider = new Web3.providers.HttpProvider(networkAddress);
  const web3 = new Web3(provider);

  const contractAbi: any = contractMutantGorilla.abi;

  const contractAddress = MUTANT_GORILLA;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractCuredCats = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractCuredCats.abi;

  const contractAddress = CURED_CATS_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};
