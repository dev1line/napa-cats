import { Typography } from 'components/Typography';
import { FC, useEffect, useRef, useState } from 'react';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import styles from 'styles/Gallery.module.css';
import openseaIcon from 'assets/images/gallery/openseaIcon.png';
import galleryDatas from 'assets/json/catsGallery.json';
import { useFilterGallery } from 'hooks';

import { debounce } from 'utils/debounce';

import { IGallery } from 'types/Gallery';

import { Spin } from 'antd';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
const CatsGallery: FC<{ scrollPosition: any }> = ({ scrollPosition }) => {
  const [rawDatas, setRawDatas] = useState(galleryDatas);
  const [datas, setDatas] = useState<IGallery[]>(rawDatas.slice(0, 32));
  const lastDivRef = useRef<any>();
  const { name, attributes } = useFilterGallery();
  const hasMore = rawDatas.length > datas.length;

  useEffect(() => {
    let filtered = [...galleryDatas];

    if (name) {
      filtered = filtered.filter((x) => {
        return x.name.includes(name);
      });
    }

    if (attributes.length) {
      filtered = filtered.filter((x) => {
        return x.attributes.some((rawAttr) => {
          return attributes.some(
            (filterAtr) =>
              filterAtr.trait_type === rawAttr.trait_type && filterAtr.value === rawAttr.value.toLowerCase()
          );
        });
      });
    }

    setRawDatas(filtered);
    setDatas(filtered.slice(0, 32));
  }, [name, attributes]);

  useIntersectionObserver({
    target: lastDivRef,
    onIntersect: debounce(() => {
      if (datas.length === rawDatas.length) return;
      setDatas((old) => {
        return rawDatas.slice(0, old.length + 32);
      });
    }, 3000),
    enabled: hasMore,
  });

  return (
    <div className={styles.container}>
      <Typography size={45} weight={900} lineHeight={45} color="#ffba3b">
        Cats Gallery
      </Typography>
      <div className={styles.imgRow}>
        {datas.map((item) => (
          <div key={item.name}>
            <div className={styles.imgContainer}>
              <LazyLoadImage
                key={item.name}
                scrollPosition={scrollPosition}
                effect="blur"
                width="243px"
                height="266px"
                src={item.url}
              />
              {/* <img src={imgs[item % 7]} alt="cat" /> */}
              <div className={styles.opensea}>
                <a
                  // href={`https://opensea.io/assets/0xaadba140ae5e4c8a9ef0cc86ea3124b446e3e46a/${item.name.replace(
                  //   '#',
                  //   ''
                  // )}`}
                  href="https://testnets.opensea.io/collection/napa-mutantcats-v2"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={openseaIcon} alt="openseaIcon" />
                  OPENSEA
                </a>
              </div>
            </div>
            <Typography size={16} block mt={10} mb={10}>
              Zombie Cat {item.name}
            </Typography>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className={styles.loader} ref={lastDivRef}>
          <Spin />
        </div>
      )}
    </div>
  );
};

export default trackWindowScroll(CatsGallery);
