import React from 'react';
// import Twitter from 'assets/images/layout/twitter.svg';
// import Discord from 'assets/images/layout/discord.svg';
import Etherscan from 'assets/images/layout/etherscan.svg';
// import Unknow from 'assets/images/layout/unknow.svg';
import Opensea from 'assets/images/layout/opensea.svg';
import { Button } from 'antd';
import styled from 'styled-components';

const SocialIcon = () => {
  return (
    <>
      {/* <a href="https://twitter.com/" target="_blank" rel="noreferrer">
        <IconButton shape="circle" icon={<img src={Twitter} alt="twitter" />} />
      </a> */}
      <a
        href="https://rinkeby.etherscan.io/address/0x3062e7C1db5EB3582Ab27DD2b77B4e67182E503B"
        target="_blank"
        rel="noreferrer"
      >
        <IconButton shape="circle" icon={<img src={Etherscan} alt="Etherscan" />} />
      </a>
      {/* <a href="https://discord.gg" target="_blank" rel="noreferrer">
        <IconButton shape="circle" icon={<img src={Discord} alt="Discord" />} />
      </a>
      <a
        href="https://fractional.art"
        target="_blank"
        rel="noreferrer"
      >
        <IconButton shape="circle" icon={<img src={Unknow} alt="twitter" />} />
      </a> */}
      <a href="https://testnets.opensea.io/collection/napa-mutantcats-v2" target="_blank" rel="noreferrer">
        <IconButton shape="circle" icon={<img src={Opensea} alt="Opensea" />} />
      </a>
    </>
  );
};

export default SocialIcon;

const IconButton = styled(Button)`
  color: #fff;
  border: none;
  min-width: 32px;
`;
