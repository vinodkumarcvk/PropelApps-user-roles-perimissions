import React from 'react';
import { Chip, ChipProps } from '@mui/material';

interface StatusChipProps extends Omit<ChipProps, 'color'> {
  status: 'active' | 'inactive' | 'pending' | 'blocked';
}

const StatusChip: React.FC<StatusChipProps> = ({ status, ...props }) => {
  const getStatusColor = (status: string): ChipProps['color'] => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'pending':
        return 'warning';
      case 'blocked':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Chip
      label={getStatusText(status)}
      color={getStatusColor(status)}
      size="small"
      variant="filled"
      {...props}
    />
  );
};

export default StatusChip;