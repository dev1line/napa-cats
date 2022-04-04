import { Col, Row, Space } from 'antd';
import { TypographyDiv } from 'components/Typography';
import styled from 'styled-components';
import { HeroContainer, HeadLine, TextContent } from './components/styled';
import Cat from 'assets/images/home/cat.png';
import Blobs from 'assets/images/home/Blobs.svg';
// import { Link } from 'react-router-dom';
// import { routesEnum } from 'pages/Routes';
// import { vaultdata } from '../../data/VaultData';

const DaoExplainSection = () => {
  // const vaultData = vaultdata.slice(0, 4);
  return (
    <HeroContainer>
      <Row justify="center" align="top" gutter={{ xs: 0, sm: 0, md: 0, lg: 110 }}>
        <Col xs={24} lg={15}>
          <HeadLine>The DAO explained</HeadLine>
          <TextContent>
            If you’ve spent any time in the NFT space, you’ve probably heard the term DAO (Decentralized Autonomous
            Organization) being thrown around a lot lately. Since the Napa Mutant Cats inception and launch, we’ve
            sought to be the foremost DAO in the metaverse, both in the value of our assets, and our governance
            structure.
          </TextContent>
          <TextContent>
            The Napa Mutant Cats DAO is owned by the community, accumulating royalties from secondary sales which are
            then used to purchase Blue Chip NFTs in the fractionalized vault. However, this is only the tip of the
            iceberg for what we envision of the DAO. Currently, the DAO is expanding to reflect the values of holders,
            establishing specialized groups of community members who are dedicated to growing the project and its
            collective success.
          </TextContent>
          <TextContent>
            We have ambitious goals both for the overall project roadmap and the impact the DAO will have on the NFT
            space. To that end we aim to become the first fully decentralized fractionalized DAO project in the
            Metaverse.
          </TextContent>
        </Col>
        <Col xs={24} lg={9}>
          <TypographyDiv className="sans" size={28} lineHeight={40} weight={900}>
            Royalties
          </TypographyDiv>
          <div>
            <TypographyDiv mt={24} mb={8} color="#ffba3b" className="sans" size={40} lineHeight={49} weight={900}>
              7.5%
            </TypographyDiv>
            <TypographyDiv lineHeight={31}>
              to the DAO reserve wallet to be used for future fractional vault purchases and DAO-led initiatives.{' '}
            </TypographyDiv>
          </div>

          <Space size={40} align="start">
            <div>
              <TypographyDiv mt={24} mb={8} color="#ffba3b" className="sans" size={40} lineHeight={49} weight={900}>
                2.5%
              </TypographyDiv>
              <TypographyDiv lineHeight={31}>
                to Project reserve wallet for future development of roadmap.
              </TypographyDiv>
            </div>
            <div>
              <TypographyDiv mt={24} mb={8} color="#ffba3b" className="sans" size={40} lineHeight={49} weight={900}>
                2.5%
              </TypographyDiv>
              <TypographyDiv lineHeight={31}>to OpenSea fees</TypographyDiv>
            </div>
          </Space>
        </Col>
      </Row>
      <Card>
        <CatImage alt="cat" src={Cat} />
        <TypographyDiv mt={24} mb={8} color="#ffba3b" className="sans" size={35} lineHeight={43} weight={900}>
          TLDR:
        </TypographyDiv>

        <Row gutter={24}>
          <Col xs={24} md={6}>
            <TypographyDiv mt={24} size={16} lineHeight={16} weight="bold">
              01
            </TypographyDiv>
            <TypographyDiv mt={10} className="sans" size={28} lineHeight={40} weight="bold">
              Gain fractional ownership of the Napa Mutant Cats community vault.
            </TypographyDiv>
          </Col>
          <Col xs={24} md={6}>
            <TypographyDiv mt={24} size={16} lineHeight={16} weight="bold">
              02
            </TypographyDiv>
            <TypographyDiv mt={10} className="sans" size={28} lineHeight={40} weight="bold">
              Vote on future DAO purchases.
            </TypographyDiv>
          </Col>
          <Col xs={24} md={6}>
            <TypographyDiv mt={24} size={16} lineHeight={16} weight="bold">
              03
            </TypographyDiv>
            <TypographyDiv mt={10} className="sans" size={28} lineHeight={40} weight="bold">
              Have your say in the growth and future of the project.
            </TypographyDiv>
          </Col>
          <Col xs={24} md={6}>
            <TypographyDiv mt={24} size={16} lineHeight={16} weight="bold">
              04
            </TypographyDiv>
            <TypographyDiv mt={10} className="sans" size={28} lineHeight={40} weight="bold">
              Join an incredible community of like minded zombies!
            </TypographyDiv>
          </Col>
        </Row>

        <BlobImage src={Blobs} />
      </Card>

      {/* What is the dao vault */}
      {/* <TypographyDiv mt={70} mb={40} color="#ffba3b" className="sans" size={35} lineHeight={43} weight={900}>
        What’s in the DAO vault?
      </TypographyDiv>

      <Space className="justify-center" align="center" size={10} wrap>
        {vaultData.length > 0 &&
          vaultData.map((item: any, index) => (
            <div key={index}>
              <img
                src={item.vaultImage}
                alt={item.vaultName}
                width={280}
                height={280}
                style={{ borderRadius: '12px' }}
              />
              <TypographyDiv mt={24} className="sans" size={16} lineHeight={20} weight="bold">
                {item.vaultName}
              </TypographyDiv>
            </div>
          ))}
      </Space>

      <WrapButton>
          <Button className="mx-auto" type="primary">
            View all the vaults contents
          </Button>
      </WrapButton> */}
    </HeroContainer>
  );
};

export default DaoExplainSection;

// const ViewBtn = styled(Button)`
// margin:30px 0 50px;
//   `

const CatImage = styled.img`
  position: absolute;
  right: 0;
  top: -290px;
`;
const BlobImage = styled.img`
  position: absolute;
  right: -10px;
  bottom: -40px;
`;

const Card = styled.div`
  position: relative;
  border: 3px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 12px;
  padding: 48px;
  margin-top: 154px;
  @media (max-width: 768px) {
    margin-top: 314px;
  }
`;

// const WrapButton = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// margin-top: 68px;
// `;
