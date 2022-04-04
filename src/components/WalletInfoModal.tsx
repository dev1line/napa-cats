import { useWallet } from 'hooks/useWallet';
import { getAvatar } from 'utils/getAvatar';
import { useMemo } from 'react';
import { walletconnect, walletlink } from 'utils/connector';
import { Button, Modal, Typography } from 'antd';
import styled from 'styled-components';

interface WalletInfoModalProps {
  visible?: boolean;
  onClose: () => void;
}

export default function WalletInfoModal(props: WalletInfoModalProps) {
  const { visible, onClose } = props;
  const { account, connector, deactivate } = useWallet();

  const handleDisconnect = async () => {
    await deactivate();
    onClose();
  };

  const walletType = useMemo(() => {
    if (connector === walletconnect) return 'WalletConnect';
    if (connector === walletlink) return 'Coinbase Wallet';
    return 'Meta mask';
  }, [connector]);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      title={<>Connected with {walletType}</>}
      footer={null}
      centered
      width={418}
      onCancel={onClose}
    >
      <Container>
        <AccountRow>
          <ImageContainer>
            <img src={getAvatar(account || '')} alt="account" />
          </ImageContainer>
          <Typography.Text>
            {account?.slice(0, 8)}...{account?.slice(28, 42)}
          </Typography.Text>
        </AccountRow>
        <Button type="primary" onClick={handleDisconnect}>
          Disconnect
        </Button>
      </Container>
    </Modal>
  );
}

const AccountRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 32px;
`;

const ImageContainer = styled.div`
  padding-top: 3px;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 22px;
`;
