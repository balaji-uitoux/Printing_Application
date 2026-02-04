import React from 'react';
import { MasterFormDrawer } from './MasterFormDrawer';
import type { DieFormData } from '../../types';

interface AddDieDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AddDieDrawer: React.FC<AddDieDrawerProps> = ({ open, onClose }) => {
  const handleSubmit = async (values: DieFormData) => {
    console.log('Form values:', values);
    // TODO: Replace with actual API call
  };

  return (
    <MasterFormDrawer
      entityType="die"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default AddDieDrawer;
