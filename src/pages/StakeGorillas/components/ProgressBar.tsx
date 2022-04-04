import styles from './ProgressBar.module.css';
import styled from 'styled-components';

const ProgressBar = ({percentStake}:any) => {
  const percent = 100;
  const activeDot = Math.floor(percent / 25) + 1;
  return (
    <div className={styles.container}>
      <div className={styles.line}>
        <FinishLine percent={percentStake} />
        <Dot className={activeDot < 1 ? 'inactive dot1' : 'active dot1'}>
          <div className={`${styles.dotsText}`}>0%</div>
        </Dot>
        <Dot className={activeDot < 2 ? 'inactive dot2' : 'active dot2'}>
          <div className={`${styles.dotsText}`}>25%</div>
        </Dot>
        <Dot className={activeDot < 3 ? 'inactive dot3' : 'active dot3'}>
          <div className={`${styles.dotsText}`}>50%</div>
        </Dot>
        <Dot className={activeDot < 4 ? 'inactive dot4' : 'active dot4'}>
          <div className={`${styles.dotsText}`}>75%</div>
        </Dot>
        <Dot className={activeDot < 5 ? 'inactive dot5' : 'active dot5'}>
          <div className={`${styles.dotsText}`}>100%</div>
        </Dot>
      </div>
    </div>
  );
};

const Dot = styled.div`
  width: 24px;
  height: 24px;
  background: black;
  border: 4px solid #ffd43c;
  border-radius: 70px;
  position: absolute;
  top: -8px;
  &.inactive {
    border-color: #454545;
  }
  &.dot1 {
    left: -5px;
  }
  &.dot2 {
    left: 25%;
  }
  &.dot3 {
    left: 50%;
  }
  &.dot4 {
    left: 75%;
  }
  &.dot5 {
    left: 99%;
  }
`;

const FinishLine = styled.div<{ percent: number }>`
  width: ${(p) => p.percent}%;
  height: 6px;
  background: #454545;
  background: #ffd43c;
`;

export default ProgressBar;
