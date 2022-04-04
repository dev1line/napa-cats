import { FC } from 'react';
import HeroSection from './HeroSection';
import StakeYourMutantCatSection from './StakeYourMutantCatSection';
import WhatAreMutantCatSection from './WhatAreMutantCatSection';
import DAOExplainSection from './DaoExplainSection';
import RoadMapSection from './RoadMapSection';
import TheTeamSection from './TheTeamSection';

const HomePage: FC = () => {
  return (
    <>
      <HeroSection />
      <WhatAreMutantCatSection />
      <StakeYourMutantCatSection />
      <DAOExplainSection />
      <RoadMapSection />
      <TheTeamSection />
    </>
  );
};

export default HomePage;
