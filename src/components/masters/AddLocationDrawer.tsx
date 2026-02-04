import React from 'react';
import { MasterFormDrawer } from './MasterFormDrawer';
import type { LocationFormData } from '../../types';

interface AddLocationDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AddLocationDrawer: React.FC<AddLocationDrawerProps> = ({ open, onClose }) => {
  const handleSubmit = async (values: LocationFormData) => {
    console.log('Form values:', values);
    // TODO: Replace with actual API call
  };

  return (
    <MasterFormDrawer
      entityType="location"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default AddLocationDrawer;
