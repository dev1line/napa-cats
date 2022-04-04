import { FC } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { SyncOutlined  } from '@ant-design/icons';

const loadingIcon = <SyncOutlined  style={{ fontSize: 50 }} spin />;

const Loading: FC = () => {
  return (
    <LoadingContainer>
      <Spin indicator={loadingIcon} size='large' />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default Loading;
