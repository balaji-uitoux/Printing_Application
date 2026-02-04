import React from 'react';
import { MasterFormDrawer } from './MasterFormDrawer';
import type { ProductFormData } from '../../types';

interface AddProductDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AddProductDrawer: React.FC<AddProductDrawerProps> = ({ open, onClose }) => {
  const handleSubmit = async (values: ProductFormData) => {
    console.log('Form values:', values);
    // TODO: Replace with actual API call
  };

  return (
    <MasterFormDrawer
      entityType="product"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default AddProductDrawer;
