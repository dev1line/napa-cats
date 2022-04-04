import { Col, Row } from 'antd';
import styles from './Introduction.module.css';

const Introduction = ({ vaultMutantsStakedPercent }: any) => {
  return (
    <>
      <Row gutter={30} align="middle">
        <Col lg={14} xs={24}>
          <div className={styles.pageTitle}>Cure Cats with $SERUM</div>
        </Col>
      </Row>
    </>
  );
};

export default Introduction;
