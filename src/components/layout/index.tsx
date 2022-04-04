import { FC } from 'react';
import { Layout } from 'antd';
import Footer from './Footer';
import Navbar from './Navbar';
import { WalletModal } from 'components/WalletModal';
import styled from 'styled-components';

const MainLayout: FC = ({ children }) => {
  return (
    <>
      <Layout>
        <Navbar />
        {/* Some component need a fullscreen mode */}
        <Main>{children}</Main>
        <Footer />
      </Layout>
      <WalletModal />
    </>
  );
};

export default MainLayout;

const Main = styled.main`
  min-height: calc(100vh - 131px);
  @media(max-width:1000px) {
    overflow: hidden;
  }
`;
