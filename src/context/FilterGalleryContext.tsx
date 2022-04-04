/* eslint-disable react-hooks/exhaustive-deps */
import { useState, createContext } from 'react';

export interface IFilterGallery {
  name: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  setName: any;
  setAttributes: any;
  resetFilter: any;
}

export const FilterGalleryContext = createContext<IFilterGallery>({
  name: '',
  attributes: [],
  setName: () => null,
  setAttributes: () => null,
  resetFilter: () => null,
});

export function FilterGalleryProvider({ children }: any) {
  const [name, setName] = useState('');
  const [attributes, setAttributes] = useState([]);

  const resetFilter = () => {
    setAttributes([]);
    setName('');
  };

  return (
    <FilterGalleryContext.Provider value={{ name, setName, attributes, setAttributes, resetFilter }}>
      {children}
    </FilterGalleryContext.Provider>
  );
}
