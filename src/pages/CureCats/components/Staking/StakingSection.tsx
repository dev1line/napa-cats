import { Row, Col } from 'antd';
import { Typography } from 'components/Typography';
import styles from './StakingSection.module.css';
import { Button } from 'antd';
import { useWallet } from 'hooks';
import { useState } from 'react';
import Serum from 'assets/images/stake/serum.svg';

const StakingSection = ({ tokensOfOwner, handleCureCats, serumOwned }: any) => {
  const { account } = useWallet();
  const [selectedCure, setSelectedCure] = useState<string[]>([]);

  const handleSelectCure = (tokenId: string) => {
    if (selectedCure.includes(tokenId)) setSelectedCure(selectedCure.filter((item) => item !== tokenId));
    else setSelectedCure([...selectedCure, tokenId]);
  };

  const isSelectCureAll = selectedCure.length === 0 || selectedCure === tokensOfOwner.length;

  const handleClickCureCats = () => {
    if (selectedCure.length === 0) handleCureCats(tokensOfOwner);
    else handleCureCats(selectedCure);
  };
  const cats = [...tokensOfOwner];
  return (
    <>
      <Row>
        <Col span={12} className={styles.left}>
          <Typography className="sans" color="black" weight={900} size={28}>
            CURE CATS
          </Typography>
        </Col>
        <Col span={12} className={styles.right}>
          <Typography color="black" weight={400} size={14}>
            Connected to {account?.slice(0, 7)}...{account?.slice(37, 42)}
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Typography color="black" weight={700} size={20} mt={20} block className="sans">
            $SERUM Owned ({serumOwned})
          </Typography>
        </Col>
        {Array.from(Array(serumOwned).keys()).map((item) => (
          <div className={styles.imageWrap} key={item}>
            <img src={Serum} alt="serum" />
          </div>
        ))}
      </Row>

      <Row>
        <Col xs={24} className={styles.left}>
          <Typography color="black" weight={700} size={20} mt={20} block className="sans">
            Napa Cats ({cats.length})
          </Typography>
          <Row className={styles.imgRow} gutter={[20, 10]}>
            {cats.length ? (
              cats.map((item: any) => (
                <div key={item} onClick={() => handleSelectCure(item)}>
                  <div className={styles.imgContainer}>
                    <img
                      src={`https://ipfs.io/ipfs/QmX7cwxUov4R9L9bp81j9sEMyfjv3bnYJXPog4LwuhbswG/${item}.png`}
                      alt="cat"
                      className={selectedCure.includes(item) ? styles.selected : ''}
                    />
                    <Typography color="white" className={styles.imgId}>
                      #{item}
                    </Typography>
                  </div>
                </div>
              ))
            ) : (
              <Row className={styles.unstakedImgRowEmpty} gutter={[20, 10]}>
                <Col lg={8} md={12}>
                  <div className={styles.imgContainerEmpty}></div>
                </Col>
                <Col lg={8} md={12}>
                  <div className={styles.imgContainerEmpty}></div>
                </Col>
                <Col lg={8} md={12}>
                  <div className={styles.imgContainerEmpty}></div>
                </Col>
              </Row>
            )}
          </Row>
          <Button type="primary" onClick={handleClickCureCats} className={styles.mutateBtn}>
            {isSelectCureAll ? ' Transform all' : 'Transform'}
          </Button>
        </Col>
        {/* <Col xs={24} className={styles.left}>
          <Typography color="black" weight={700} size={20} mt={20} block className="sans">
            Cured Cats ({stakedTokensNew.length})
          </Typography>
          <Row className={styles.imgRow} gutter={[20, 10]}>
            {stakedTokensNew.length &&
              stakedTokensNew.map((item: any) => (
                <div
                  key={item}
                  // onClick={() => handleSelectCure(item)}
                >
                  <div className={styles.imgContainer}>
                    <img
                      src={`https://ipfs.io/ipfs/QmX7cwxUov4R9L9bp81j9sEMyfjv3bnYJXPog4LwuhbswG/${item}.png`}
                      alt="cat"
                      className={selectedCure.includes(item) ? styles.selected : ''}
                    />
                    <img src={Close} alt="" className={styles.close} />
                    <Typography color="white" className={styles.imgId}>
                      #{item}
                    </Typography>
                  </div>
                </div>
              ))}
          </Row>
     
        </Col> */}
      </Row>
    </>
  );
};

export default StakingSection;
