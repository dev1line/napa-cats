import { Button, Typography } from 'antd';
import Serum from 'assets/images/stake/serum.svg';
import styled from 'styled-components';
import styles from './BalanceSection.module.css';

const BalanceSection = ({ handleClaimSerum, claimableSerum }: any) => {
  const totalSerum = +claimableSerum;
  return (
    <>
      <Typography.Text className={styles.text}>
        $SERUM{' '}
        {totalSerum > 0 && (
          <StyledButton type="primary" onClick={handleClaimSerum} className={styles.claim}>
            Claim $Serum
          </StyledButton>
        )}
      </Typography.Text>
      <div className={styles.serumWrap}>
        <Typography.Text className={styles.textTotal}>
          {totalSerum > 0 ? 'Total $SERUM earned' : 'Total $SERUM earned : 0'}{' '}
        </Typography.Text>
        {totalSerum > 0 &&
          Array.from(Array(totalSerum).keys()).map((item, index) => (
            <div key={index} className={styles.imageWrap}>
              <img src={Serum} alt="serum" />
            </div>
          ))}
      </div>
    </>
  );
};

const StyledButton = styled(Button)`
  margin: 0 0 10px 10px;
`;

export default BalanceSection;
