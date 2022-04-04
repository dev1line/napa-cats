import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { useFontObserver } from 'hooks/useFontObserver';

import { Routes } from 'pages/Routes';
import { lightTheme } from 'styles/theme';

import { WalletModalProvider } from 'context/WalletModalContext';
import { FilterGalleryProvider } from 'context/FilterGalleryContext';
import { Web3ReactProvider } from '@web3-react/core';
import Layout from 'components/layout';
import Web3 from 'web3';
import ScrollToTop from 'components/ScrollToTop';
import TopProgressBar from 'components/ProgressBar';

const loading = <div>Loading ...</div>;

const getLibrary = (provider: any): Web3 => new Web3(provider);

function App() {
  const fontLoaded = useFontObserver();
  return (
    <>
      {!fontLoaded && loading}
      <Suspense fallback={<TopProgressBar />}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <ThemeProvider theme={lightTheme}>
            <FilterGalleryProvider>
              <WalletModalProvider>
                <Router>
                  <ScrollToTop>
                    <Layout>
                      <Routes />
                    </Layout>
                  </ScrollToTop>
                </Router>
              </WalletModalProvider>
            </FilterGalleryProvider>
          </ThemeProvider>
        </Web3ReactProvider>
      </Suspense>
    </>
  );
}

export default App;
