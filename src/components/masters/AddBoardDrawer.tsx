import React from 'react';
import { MasterFormDrawer } from './MasterFormDrawer';
import type { BoardFormData } from '../../types';

interface AddBoardDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AddBoardDrawer: React.FC<AddBoardDrawerProps> = ({ open, onClose }) => {
  const handleSubmit = async (values: BoardFormData) => {
    console.log('Form values:', values);
    // TODO: Replace with actual API call
  };

  return (
    <MasterFormDrawer
      entityType="board"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default AddBoardDrawer;
