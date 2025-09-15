import React from 'react';
import { Button, CircularProgress, ButtonProps } from '@mui/material';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText = 'Loading...',
  children,
  disabled,
  ...props
}) => {
  return (
    <Button
      disabled={loading || disabled}
      {...props}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : props.startIcon}
    >
      {loading ? loadingText : children}
    </Button>
  );
};

export default LoadingButton;