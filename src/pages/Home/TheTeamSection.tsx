import { Button, Space } from 'antd';
import { TypographyDiv } from 'components/Typography';
import styled from 'styled-components';
import { HeadLine, HeroContainer, TextContent } from './components/styled';

import team1 from 'assets/images/home/team1.png';
import team2 from 'assets/images/home/team2.png';
import team3 from 'assets/images/home/team3.png';

import twitter from 'assets/images/home/twitter.svg';

const TheTeamSection = () => {
  return (
    <HeroContainer>
      <TextContainer>
        <HeadLine center>The Team</HeadLine>
        <TextContent center>
          Meet your Napa Cats team! Leveraging our in-house expertise in community building, back and front-end
          development, as well as creative ideation and execution, our primary focus is continuing to provide value to
          the community and execute on our ambitious roadmap, including designing artworks for Cured Cats and VX Cats,
          as well as future and experiences, development of staking contracts, metaverse games, and expanding on $NFISH
          utility.
        </TextContent>
      </TextContainer>

      <TeamContainer>
        <div>
          <TeamInfo>
            <div>
              <TypographyDiv className="sans" size={16} lineHeight={20} weight="bold">
                ZombieMaker
              </TypographyDiv>
            </div>
            <Space>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <Button size="small" icon={<img src={twitter} alt="twitter" />} />
              </a>
            </Space>
          </TeamInfo>
          <img src={team1} alt="team1" />
        </div>

        <div>
          <TeamInfo>
            <div>
              <TypographyDiv className="sans" size={16} lineHeight={20} weight="bold">
                Mutated Purr
              </TypographyDiv>
            </div>
            <Space>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <Button size="small" icon={<img src={twitter} alt="twitter" />} />
              </a>
            </Space>
          </TeamInfo>
          <img src={team2} alt="team2" />
        </div>

        <div>
          <TeamInfo>
            <div>
              <TypographyDiv className="sans" size={16} lineHeight={20} weight="bold">
                Mutation 01
              </TypographyDiv>
            </div>
            <Space>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <Button size="small" icon={<img src={twitter} alt="twitter" />} />
              </a>
            </Space>
          </TeamInfo>
          <img src={team3} alt="team3" />
        </div>
      </TeamContainer>
    </HeroContainer>
  );
};

export default TheTeamSection;

const TextContainer = styled.div`
  max-width: 690px;
  margin: 0px auto;
`;
const TeamContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const TeamInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 56px;
  margin-bottom: 24px;
  & button {
    border: none;
  }
`;
