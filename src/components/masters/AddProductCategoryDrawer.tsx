import React from 'react';
import { MasterFormDrawer } from './MasterFormDrawer';
import type { ProductCategoryFormData } from '../../types';

interface AddProductCategoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AddProductCategoryDrawer: React.FC<AddProductCategoryDrawerProps> = ({ open, onClose }) => {
  const handleSubmit = async (values: ProductCategoryFormData) => {
    console.log('Form values:', values);
    // TODO: Replace with actual API call
  };

  return (
    <MasterFormDrawer
      entityType="productCategory"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default AddProductCategoryDrawer;
