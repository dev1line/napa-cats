import { Button, Modal } from 'antd';
import { FC, useState } from 'react';
import styled from 'styled-components';

interface StakeModalProps {
  onClose: () => void;
  handleStake: (value: any) => void;
  name?: string;
}

const StakeLPModal: FC<StakeModalProps> = ({ onClose, handleStake, name }) => {
  const [stakedAmount, setStakedAmount] = useState('');

  const stakeCats = () => {
    handleStake(stakedAmount);
  };

  return (
    <StyledModal title={`Stake Your LP Token`} onCancel={onClose} visible>
      <ButtonWrap>
        <StyledInput
          placeholder="Amount"
          value={stakedAmount}
          type="number"
          onChange={(e: any) => {
            setStakedAmount(e.target.value);
          }}
        />
        <StyledButton disabled={!stakedAmount} type="primary" onClick={stakeCats}>
          Stake
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

export default StakeLPModal;

const ButtonWrap = styled.div`
  text-align: center;
`;


