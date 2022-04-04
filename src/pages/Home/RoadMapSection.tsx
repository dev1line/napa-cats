import { Col, Row } from 'antd';
import styled from 'styled-components';
import { HeadLine, HeroContainer, TextContent } from './components/styled';

import CatGif from 'assets/images/home/ezgif.gif';
// import Gorillas from 'assets/images/home/mutant_gorillas.png';
import CuringCat from 'assets/images/home/curing_cat.png';
import SandBox from 'assets/images/home/sandbox.png';

const RoadMapSection = () => {
  return (
    <HeroContainer>
      <TextContainer>
        <HeadLine center>Roadmap</HeadLine>
        <TextContent center>
          The Napa Mutant Cats roadmap is full of exciting twists and turns as we continue to evolve as a DAO-led
          community, including future expansions to the Metaverse, Game Theory, and Deflationary Tokenomics. The first
          and foremost goal is to become a Billion Dollar DAO. We will do this by continuing to acquire blue chip NFTs
          that will appreciate over time. The second goal is to create a community founded in innovation and
          decentralization, in spreading good vibes over FUD, and connecting a global network of amazing contributors.
        </TextContent>
        <TextContent center>
          To get us there, the team has plenty of exciting milestones set out, so let’s not waste any more time and get
          right into the fun stuff:
        </TextContent>
      </TextContainer>

      <StyledRow justify="center" align="middle" gutter={{ xs: 0, md: 0, lg: 68 }}>
        <Col xs={24} lg={18}>
          <LevelText>Level 1: ACHIEVED</LevelText>
          <Title>Release the Napa Mutant Cats</Title>
          <Content>
            Launch the initial collection of 9,999 infected Napa Mutant Cats on to the world, and begin the search for a
            cure. Establish DAO wallet and begin purchasing blue chip NFTs to fractionalize and distribute via staked
            Napa Mutant Cats
          </Content>
        </Col>
        <CenterCol xs={24} lg={6}>
          <img src={CatGif} alt="cat" width="250px" />
        </CenterCol>
      </StyledRow>

      <StyledRowReverse justify="center" align="middle" gutter={{ xs: 0, md: 0, lg: 68 }}>
        <CenterCol xs={24} lg={8}>
          <SandBoxImage src={SandBox} alt="SandBox" />
        </CenterCol>

        <Col xs={24} lg={16}>
          <LevelText>Level 2: ACHIEVED</LevelText>
          <Title>Expand the Zombie Universe</Title>
          <Content>Expand the Zombie Universe.</Content>
          <Content>Buy $SERUM to save your cats.</Content>
        </Col>
      </StyledRowReverse>

      <StyledRow justify="center" align="middle" gutter={{ xs: 0, md: 0, lg: 68 }}>
        <Col xs={24} lg={18}>
          <LevelText>Level 3</LevelText>
          <Title>The Cured Collection</Title>
          <Content>
            With enough blood, sweat, and $SERUM, Napa Mutant Cats will finally be able to cure themselves of their
            horrendous disease. By buying $SERUM, or trading for $SERUM on secondary markets, holders will have to face
            the ultimate choice: Keeping their beloved, yet beastly Napa Mutant Cats, or douse them in $SERUM, forever
            burning the existing NFT and creating an entirely new species of Cured Cat, complete with new traits,
            rarities, and utility!
          </Content>
        </Col>
        <CenterCol xs={24} lg={6}>
          <img src={CuringCat} alt="CuringCat" />
        </CenterCol>
      </StyledRow>
    </HeroContainer>
  );
};

export default RoadMapSection;

const CenterCol = styled(Col)`
  @media (max-width: 975px) {
    margin-top: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TextContainer = styled.div`
  max-width: 700px;
  margin: 0px auto;
`;

const LevelText = styled.p`
  font-family: var(--mono);
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Title = styled.h2`
  font-family: var(--sans);
  color: #ffba3b;
  font-style: normal;
  font-weight: 900;
  font-size: 30px;
  line-height: 37px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Content = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 31px;

  color: #ffffff;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const StyledRow = styled(Row)`
  margin-top: 100px;
`;

const StyledRowReverse = styled(Row)`
  margin-top: 100px;
  @media (max-width: 975px) {
    flex-direction: column-reverse;
  }
`;

// const GorillasImage = styled.img`
//   @media (max-width: 975px) {
//     margin-left: 50px;
//   }
// `;

const SandBoxImage = styled.img`
  margin-left: -50px;
  @media (max-width: 975px) {
    margin-left: 0;
  }
`;
