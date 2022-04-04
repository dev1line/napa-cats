import { Button, Col, Divider, Row, Typography } from 'antd';
import styled from 'styled-components';
import { HeroContainer, HeadLine, TextContent } from './components/styled';
import { Typography as Typo } from 'components/Typography';
import SlimeWeb from 'assets/images/home/slime_web.svg';
import SlimeBottom from 'assets/images/home/slime_bottom.svg';
import { Link } from 'react-router-dom';
import { routesEnum } from 'pages/Routes';
import { useWallet } from 'hooks';
import {
  getContractNoWalletLPToken,
  getContractNoWalletMutantCats,
  getContractNoWalletUSDTLPToken,
} from 'utils/getContract';
import { STAKING_NEW, STAKING_OLD } from 'utils/constants';
import { useEffect, useState } from 'react';
import Big from 'big.js';
import { formatNumber } from 'utils/formatNumber';

const StakeYourMutantCatSection = () => {
  const [data, setData] = useState({
    vaultMutantsStaked: 0,
    vaultMutantsStakedPercent: 0,
    fishPriceUSDT: 0,
    totalLiquidity: 0,
  });
  const { active, account, connector, library } = useWallet();

  const getBlockchainData = async (text?: string) => {
    try {
      const { contract: USDTLPTokenContract } = await getContractNoWalletUSDTLPToken();
      const { contract: LPTokenContract } = await getContractNoWalletLPToken();

      const { contract: mutantContractNoWallet } = await getContractNoWalletMutantCats();
      const oldStakeNumber = await mutantContractNoWallet.methods.balanceOf(STAKING_OLD).call();
      const newStakeNumber = await mutantContractNoWallet.methods.balanceOf(STAKING_NEW).call();

      const vaultMutantsStaked = parseInt(oldStakeNumber) + parseInt(newStakeNumber);
      const vaultMutantsStakedPercent = Math.round((vaultMutantsStaked / 9999) * 1000) / 10;

      const reservesUSDT = await USDTLPTokenContract.methods.getReserves().call();
      const reservesFish = await LPTokenContract.methods.getReserves().call();

      const ethPrice = new Big(`${reservesUSDT[1]}000000000000`).toNumber() / +new Big(`${reservesUSDT[0]}`).toNumber();

      const fishPriceETH = new Big(`${reservesFish[1]}`).toNumber() / new Big(`${reservesFish[0]}`).toNumber();

      const fishPriceUSDT = +(ethPrice * fishPriceETH).toFixed(2);

      const total = new Big(reservesFish[0]).toNumber() / new Big(`${10 ** 18}`).toNumber();
      const totalLiquidity = total * fishPriceUSDT;
      setData({ vaultMutantsStaked, vaultMutantsStakedPercent, fishPriceUSDT, totalLiquidity });
    } catch (err: any) {}
  };

  useEffect(() => {
    getBlockchainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector, account, active, library]);
  const { vaultMutantsStaked, vaultMutantsStakedPercent, fishPriceUSDT, totalLiquidity } = data;
  return (
    <HeroContainer>
      <Row justify="center" align="middle" gutter={{ xs: 0, sm: 0, md: 0 }}>
        <Col xs={24} lg={14}>
          <div className="flex">
            <HeadLine>
              Stake your Napa Mutant Cats. Earn $FISH
              {/* <span>🐟</span> */}
            </HeadLine>
          </div>
          <TextContent>
            When you buy a Napa Mutant Cats NFT, you have the option to stake it. Staking is the mechanism by which
            fractional shares of the DAO community’s vault of NFTs are distributed. These fractions are distributed
            daily to holders in the form of our native $FISH token. Each Mutant Cat NFT can be staked to earn 10 $FISH
            per day. $FISH can also be traded on the secondary market via SushiSwap.
          </TextContent>
          <TextContent>
            $FISH are a key part of the MutantCats project, and will have a multitude of use cases as our project grows,
            from raffle entries, exclusive merchandise, alpha access, and of course breeding of Napa Mutant Cats. But we
            strongly feel that it is only scratching the surface of what $FISH could do. To celebrate this, we’re
            holding our first-ever $FISH hackathon to explore future uses for our native token, with 50 ETH in prizes to
            be claimed!
          </TextContent>
          <Divider />

          <StakeCatWrapper>
            <div>
              <Typo className="sans" weight="900" size={25} lineHeight={31}>
                <Typo className="sans" weight="900" size={25} lineHeight={31} color="#FFD43C">
                  {vaultMutantsStakedPercent}% &nbsp;
                </Typo>
                Napa Mutant Cats staked
              </Typo>
              <MarginTop>
                <Typo size={18} lineHeight={21}>
                  {vaultMutantsStaked}/9999
                </Typo>
              </MarginTop>
            </div>

            <Link to={routesEnum.stakeCats}>
              <Button type="primary">Stake your Napa Mutant Cats</Button>
            </Link>
          </StakeCatWrapper>
        </Col>
        <CenterCol xs={24} lg={10}>
          <Right>
            <Box>
              <Typography.Text>Total liquidity</Typography.Text>
              <Statictis>${formatNumber(totalLiquidity)}</Statictis>
            </Box>
            <img src={SlimeWeb} alt="web" width="230px" />
            <Box>
              <Typography.Text>Current price</Typography.Text>
              <Statictis>${fishPriceUSDT} per $FISH</Statictis>
            </Box>
            <img src={SlimeWeb} alt="web" width="230px" />
            <Box>
              <Typography.Text>Token address</Typography.Text>
              <Statictis>0xfe4a7f...0a7a8b323</Statictis>
            </Box>
            <SlimeBottomImage src={SlimeBottom} alt="web" width="299px" />
          </Right>
        </CenterCol>
      </Row>
    </HeroContainer>
  );
};

export default StakeYourMutantCatSection;

const CenterCol = styled(Col)`
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  padding: 29px;
  border: 2px solid #ffba3b;
  box-sizing: border-box;
  border-radius: 12px;
  width: 299px;
`;

const Statictis = styled.p`
  margin-top: 18px;
  margin-bottom: 0px;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;
`;

const SlimeBottomImage = styled.img`
  margin-top: -8px;
`;

const StakeCatWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 960px) {
    & button {
      margin: 30px 0px;
    }
  }
  @media (max-width: 660px) {
    justify-content: center;
  }
`;
const MarginTop = styled.div`
  margin-top: 6px;
`;
