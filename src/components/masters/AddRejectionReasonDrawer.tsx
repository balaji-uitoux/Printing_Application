import React from 'react';
import { MasterFormDrawer } from './MasterFormDrawer';
import type { RejectionReasonFormData } from '../../types';

interface AddRejectionReasonDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AddRejectionReasonDrawer: React.FC<AddRejectionReasonDrawerProps> = ({ open, onClose }) => {
  const handleSubmit = async (values: RejectionReasonFormData) => {
    console.log('Form values:', values);
    // TODO: Replace with actual API call
  };

  return (
    <MasterFormDrawer
      entityType="rejectionReason"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default AddRejectionReasonDrawer;
