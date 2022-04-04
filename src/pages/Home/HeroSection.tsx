import React from 'react';
import styled, { keyframes } from 'styled-components';
import SlideImage from 'assets/images/home/slide_cat.png';

const HeroSection = () => {
  return (
    <div>
      <TextContainer>
        <h1 className="text-green sans">
          An infectious disease has spread on the Ethereum blockchain, causing 9,999 cats to MUTATE.
        </h1>
        <p>
          Napa Mutant Cats is the first DAO that purchases and fractionalizes valuable blue chip NFTs to be distributed
          to its holders. Your Zombie Cat also grants you access to exclusive perks such as future collections,
          airdrops, giveaways, IRL events, and much more!
        </p>
      </TextContainer>

      <SlideMain>
        <Mover />
      </SlideMain>
    </div>
  );
};

export default HeroSection;

const TextContainer = styled.div`
  max-width: 1096px;
  margin-top: 100px;
  margin-bottom: 64px;
  margin-left: auto;
  margin-right: auto;
  & > h1 {
    font-style: normal;
    font-weight: 900;
    font-size: 75px;
    line-height: 78px;
    text-align: center;
  }
  & p {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
  }

  @media (max-width: 768px) {
    & > h1 {
      font-size: 40px;
      line-height: 46px;
    }
  }
`;

const SlideMain = styled.div`
  margin-top: -7px;
  height: 370px;
  width: 100%;
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  & > div {
    height: 370px;
    width: 3770px;
    background: url(${SlideImage});
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    transform: translate3d(0, 0, 0);
  }
`;

const moveSlideshow = keyframes`
 100% { 
    transform: translateX(-40%);  
  }
`;

const Mover = styled.div`
  animation: ${moveSlideshow} 12s linear infinite;
`;
