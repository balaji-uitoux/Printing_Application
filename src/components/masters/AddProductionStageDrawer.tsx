import React from 'react';
import { MasterFormDrawer } from './MasterFormDrawer';
import type { ProductionStageFormData } from '../../types';

interface AddProductionStageDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AddProductionStageDrawer: React.FC<AddProductionStageDrawerProps> = ({ open, onClose }) => {
  const handleSubmit = async (values: ProductionStageFormData) => {
    console.log('Form values:', values);
    // TODO: Replace with actual API call
  };

  return (
    <MasterFormDrawer
      entityType="productionStage"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default AddProductionStageDrawer;
