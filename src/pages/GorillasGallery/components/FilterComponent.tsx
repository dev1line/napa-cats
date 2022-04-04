import { Collapse, Input, Row } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Typography } from 'components/Typography';
import { useFilterGallery } from 'hooks';
import { useEffect } from 'react';
import { IGalleryAttribute } from 'types/Gallery';
import styles from './FilterComponent.module.css';
import filterTraits from './traits.json';

const { Panel } = Collapse;

interface IFilter {
  checked: boolean;
  trait_type: string;
  value: string;
}

const FilterComponent = ({ show }: any) => {
  const { name, setName, attributes, setAttributes, resetFilter } = useFilterGallery();

  useEffect(() => {
    resetFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAttributeChange = (data: IFilter) => {
    if (data.checked) {
      setAttributes((old: any) => {
        return [...old, { trait_type: data.trait_type, value: data.value }];
      });
    } else {
      setAttributes((old: any) => {
        const datas = [...old];
        const index = datas.findIndex(
          (x: IGalleryAttribute) => x.trait_type === data.trait_type && x.value === data.value
        );
        datas.splice(index, 1);
        return datas;
      });
    }
  };

  return (
    <div className={show ? `${styles.container} ${styles.show}` : `${styles.container}`}>
      <Typography size={28}>Filter</Typography>
      <div className={styles.inputContainer}>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Filter by ID" />
      </div>
      <div className={styles.collapseContainer}>
        <Collapse ghost>
          {Object.keys(filterTraits as any).map((trait: any) => (
            <Panel header={trait} key={trait}>
              {Object.keys((filterTraits as any)[trait]).map((traitValue: any) => (
                <Row justify="space-between" key={traitValue} align="middle">
                  <div className={styles.checkboxContainer}>
                    <Checkbox
                      checked={attributes.findIndex((x) => x.trait_type === trait && x.value === traitValue) !== -1}
                      onChange={(e) => {
                        handleAttributeChange({ checked: e.target.checked, trait_type: trait, value: traitValue });
                      }}
                    >
                      {traitValue}
                    </Checkbox>
                  </div>
                  <div> {(filterTraits as any)[trait][traitValue]}</div>
                </Row>
              ))}
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default FilterComponent;
