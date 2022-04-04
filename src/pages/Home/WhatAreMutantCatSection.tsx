import { Col, Row } from 'antd';
import styled from 'styled-components';
import { HeroContainer, HeadLine, TextContent } from './components/styled';
import CatGif from 'assets/images/home/ezgif.gif';

const WhatAreMutantCatSection = () => {
  return (
    <HeroContainer>
      <Row justify="center" align="middle" gutter={{ xs: 0, sm: 0, md: 0, lg: 78 }}>
        <Col xs={24} lg={12}>
          <HeadLine>What are Napa Mutant Cats? </HeadLine>
          <TextContent>
            In the not too distant future, an infectious disease is let loose on the Ethereum blockchain, causing
            widespread havoc amongst the animal population. It didn’t take long before the first creatures began to feel
            the effects of the infection, causing 9,999 cats to mutate. These Napa Mutant Cats now have the singular
            goal of attracting $FISH in the hopes of one day finding a cure to their hideous, yet adorable,
            disfigurements. Each Zombie Cat NFT can be staked to earn 10 $FISH per day.
          </TextContent>

          <TextContent>
            Holding a Zombie Cat NFT grants you access to the exclusive DAO community, including voting rights over
            fractionalized assets, as well as future purchases. Holders also receive perks such as periodically
            claimable NFTs, airdrops, IRL events, and much more!
          </TextContent>
        </Col>
        <CenterCol xs={24} lg={12}>
          <CatImage src={CatGif} alt="cat" />
        </CenterCol>
      </Row>
    </HeroContainer>
  );
};

export default WhatAreMutantCatSection;

// const ViewBtn = styled(Button)`
//   @media(max-width:988px){
//     display: block;
//     margin: 30px auto;
//     width: 200px;
//   }

// `

const CatImage = styled.img`
  margin-right: -50px;
  border-radius: 20px;
  width: auto;

  @media (max-width: 660px) {
    max-width: 420px;
    margin: 0px auto;
  }
  @media (max-width: 360px) {
    max-width: 320px;
  }
`;

const CenterCol = styled(Col)`
  @media (max-width: 960px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
