import React from 'react';
import { MasterFormDrawer } from './MasterFormDrawer';
import type { MachineFormData } from '../../types';

interface AddMachineDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AddMachineDrawer: React.FC<AddMachineDrawerProps> = ({ open, onClose }) => {
  const handleSubmit = async (values: MachineFormData) => {
    console.log('Form values:', values);
    // TODO: Replace with actual API call
  };

  return (
    <MasterFormDrawer
      entityType="machine"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default AddMachineDrawer;
