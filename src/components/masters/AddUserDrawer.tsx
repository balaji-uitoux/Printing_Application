import React from 'react';
import { MasterFormDrawer } from './MasterFormDrawer';
import type { UserFormData } from '../../types';

interface AddUserDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AddUserDrawer: React.FC<AddUserDrawerProps> = ({ open, onClose }) => {
  const handleSubmit = async (values: UserFormData) => {
    console.log('Form values:', values);
    // TODO: Replace with actual API call
  };

  return (
    <MasterFormDrawer
      entityType="user"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default AddUserDrawer;
