import { useContext } from 'react';
import { FilterGalleryContext, IFilterGallery } from '../context/FilterGalleryContext';

export const useFilterGallery = (): IFilterGallery => {
  return useContext(FilterGalleryContext);
};
