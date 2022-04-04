import { memo, useEffect, useState } from 'react';
import styles from './styles.module.css';

import { Modal, Typography, Button } from 'antd';

const FeedModal = ({ visible, toggleModal, data, handleFeedGorilla }: any) => {
  // const { open, setOpen } = useState<boolean>(false);
  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setAmount(+data.fishDeposited);
    return () => setSelected(false)
  }, [data]);

  const toggleClass = (e: any, value: number) => {
    setAmount(value);
    setSelected(true)
  };

  const handleSave = async () => {
    toggleModal();
    await handleFeedGorilla(data.id, feedIncreaseAmount);
  };

  const renderStyle = (value: number) => {
    if (value < (+data.fishDeposited / data.fishFor100Boost * 100) || value === (+data.fishDeposited / data.fishFor100Boost * 100)) return `${styles.disabled}`;
    if (value === amount && selected) return `${styles.active}`;
  };
  const getMultiValue = () => {
    switch (amount) {
      case 25: return data.fishFor25Boost;
      case 50: return data.fishFor50Boost;
      case 100: return data.fishFor100Boost;
      default: return 1;
    }
  }
  const feedIncreaseAmount = getMultiValue() - +data.fishDeposited
  return (
    <Modal
      visible={visible}
      title={<b>Feed your Mutant Gorilla</b>}
      footer={null}
      centered
      width={418}
      onCancel={() => {
        toggleModal()
        setSelected(false)
      }}
      wrapClassName={styles.modalFeed}
    >
      <div className={styles.modalContent}>
        <div className={styles.imgContainer}>
          <div>
            <img src={data.img} alt="cat" />
            <div className={styles.levelGorilla}>
              <Typography.Text className={styles.level2}>#{data.id}</Typography.Text>
            </div>
          </div>
          <div className={styles.appetiteWrap}>
            <Typography.Text className={styles.level}>Current appetite</Typography.Text>
            <Typography.Text className={styles.appetite}>{data.fishDeposited} $FISH</Typography.Text>
          </div>
        </div>
        <div className={styles.line}></div>
        <Typography.Text className={styles.chooseAppetite}>Choose appetite (%)</Typography.Text>
        <div className={styles.fishWrap}>
          <div onClick={(e) => toggleClass(e, 0)} className={renderStyle(0)}>
            0%
          </div>
          <div onClick={(e) => toggleClass(e, 25)} className={renderStyle(25)}>
            25%
          </div>
          <div onClick={(e) => toggleClass(e, 50)} className={renderStyle(50)}>
            50%
          </div>
          <div onClick={(e) => toggleClass(e, 100)} className={renderStyle(100)}>
            100%
          </div>
        </div>
        {/* <StyledInput value={amount} onChange={(e) => setAmount(+e.target.value)} /> */}
        <div className={styles.buttonWrap}>
          {selected && <Typography.Text className={styles.amountCaculated}>{feedIncreaseAmount} $FISH</Typography.Text>
          }
          <Button type="primary" onClick={handleSave}>
            SAVE & SIGN
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// const StyledInput = styled(Input)`
//   margin-top: 20px;
//   border-color: gray;
//   color: black;
// `;

export default memo(FeedModal);
