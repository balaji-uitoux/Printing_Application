import React from 'react';
import { MasterFormDrawer } from './MasterFormDrawer';
import type { ShiftFormData } from '../../types';

interface AddShiftDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AddShiftDrawer: React.FC<AddShiftDrawerProps> = ({ open, onClose }) => {
  const handleSubmit = async (values: ShiftFormData) => {
    console.log('Form values:', values);
    // TODO: Replace with actual API call
  };

  return (
    <MasterFormDrawer
      entityType="shift"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default AddShiftDrawer;
