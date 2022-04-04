import { Button, Modal } from 'antd';
import { FC, useState } from 'react';
import styled from 'styled-components';

interface StakeModalProps {
  onClose: () => void;
  handleUnstake: (value: any) => void;
  name?: string;
}

const UnStakeLPModal: FC<StakeModalProps> = ({ onClose, handleUnstake, name }) => {
  const [stakedAmount, setStakedAmount] = useState('');

  const unstakeCats = () => {
    handleUnstake(stakedAmount);
  };

  return (
    <StyledModal title={`Withdraw Your LP Token`} onCancel={onClose} visible>
      <ButtonWrap>
        <StyledInput
          placeholder="Amount"
          value={stakedAmount}
          type="number"
          onChange={(e: any) => {
            setStakedAmount(e.target.value);
          }}
        />
        <StyledButton disabled={!stakedAmount} type="primary" onClick={unstakeCats}>
          Withdraw
        </StyledButton>
      </ButtonWrap>
    </StyledModal>
  );
};

const StyledButton = styled(Button)`
  width: 150px;
  margin: 20px auto;
  border-radius: 10px;
  display: block;
`;

const StyledModal = styled(Modal)`
  &.ant-modal {
    width: 300px!important;
  }
  .ant-modal-footer {
    display: none;
  }
  .ant-modal-body {
    padding: 30px;
  }
`;

const StyledInput = styled.input`
  border: unset;
  width: 150px;
  height: 46px;
  margin: 10px auto;
  border-radius: 10px;
  font-size: 16px;
  border-color: none;
  text-align: center;
  display: block;
  color:black;
  &:focus {
    border: unset;
  }
  &:active {
    border: unset;
  }
`;

export default UnStakeLPModal;

const ButtonWrap = styled.div`
  text-align: center;
`;


