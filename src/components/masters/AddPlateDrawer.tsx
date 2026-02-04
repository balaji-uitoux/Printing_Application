import React from 'react';
import { MasterFormDrawer } from './MasterFormDrawer';
import type { PlateFormData } from '../../types';

interface AddPlateDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AddPlateDrawer: React.FC<AddPlateDrawerProps> = ({ open, onClose }) => {
  const handleSubmit = async (values: PlateFormData) => {
    console.log('Form values:', values);
    // TODO: Replace with actual API call
  };

  return (
    <MasterFormDrawer
      entityType="plate"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default AddPlateDrawer;
