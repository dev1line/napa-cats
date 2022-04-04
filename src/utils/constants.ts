/* eslint-disable no-underscore-dangle */
export const __prod__ = process.env.NODE_ENV === 'production';

export const CONTRACT_ADDRESS = process.env.REACT_APP_SC_ADDRESS || '0xf7933fb707e79256aB449D53F8bF86561cCc4dFD';

export const NETWORK_CHAIN_IDS = {
  mainnet: 1,
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  kovan: 42,
  localhost: 1337,
};

export const INFURA_ID = '8d84317685e945a18d61001c5f3291f4';

// TEST NET
export const MUTANT_CATS_CONTRACT = '0x3062e7C1db5EB3582Ab27DD2b77B4e67182E503B';
export const STAKING_OLD = '0x0B41ED99AC66B6e3b0413B9044017B5DB3ae3f17';
export const STAKING_NEW = '0x0A42e8BE7D9a5179EFd61B46eaBf25E8dE690F63';
export const SUSHISWAP_LP_TOKEN_CONTRACT = '0x85B68a45e78b9b1FfaDAbe457ECC070F881aC177';
export const USDT_LP_TOKEN_CONTRACT = '0x1E5cb03c5745e4b9AdCa439c8C5B3f83BB20468b';
export const LP_STAKING = '0x6345D7b374960A83e39f2858944850EC770D0636';
export const MUTANT_GORILLA = '0xDd366Df7318Bbaf398910b3a0368998fd75d3D49';
export const SERUM_STAKING = '0xA879B560A0689F5C5Ed00Df427D9Da0851aFB08F';
export const FISH_TOKEN_CONTRACT = '0xCd45897fB627BbB6F9C5532C24Cf6FEe575Fc4F6';
export const CURED_CATS_CONTRACT = '0x6b42F1D0f013d55847B01BeD517ac4ecdaf66390';

export const APPROVE_AMOUNT = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; //(2^256 - 1 )
export const INFURA_ENDPOINT = 'https://rinkeby.infura.io/v3/8d84317685e945a18d61001c5f3291f4';
