import styled from 'styled-components';

export const HeroContainer = styled.div`
  max-width: 1152px;
  margin: 170px auto;
  @media (max-width: 1024px) {
    padding: 0px 15px;
  }
`;

export const HeadLine = styled.h1<{ center?: boolean }>`
  font-family: var(--sans);
  font-style: normal;
  font-weight: 900;
  font-size: 45px;
  line-height: 55px;
  text-align: ${(p) => (p.center ? 'center' : 'left')};
  margin: 0;
  color: #ffba3b;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const TextContent = styled.p<{ center?: boolean }>`
  font-family: var(--mono);
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 40px;
  color: #ffffff;
  text-align: ${(p) => (p.center ? 'center' : 'left')};

  margin-top: 32px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
