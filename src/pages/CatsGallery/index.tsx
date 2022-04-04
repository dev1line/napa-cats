import styles from './index.module.css';
import FilterComponent from './components/FilterComponent';
import CatsGallery from './components/CatsGallery';
import { Drawer, Button } from 'antd';
import { useToggle } from 'hooks/useToggle';

const Gallery = () => {
  const [open, toggleDrawer] = useToggle(false);

  return (
    <div className={styles.container}>
      <FilterComponent />
      <Button onClick={toggleDrawer} type='primary' className={styles.filterBtn}>☰ Filter</Button>
      <Drawer onClose={toggleDrawer} visible={open} className={styles.filterDrawer}>
        <FilterComponent show />
      </Drawer >
      <CatsGallery />
    </div >
  );
};

export default Gallery;
