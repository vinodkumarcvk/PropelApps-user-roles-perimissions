import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import LoginForm from '../components/forms/LoginForm';
import '../styles/globals.scss';

const LoginPage: React.FC = () => {
  return (
    <Box
      className="full-height flex-center"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="sm">
        <Box textAlign="center" mb={4} className="fade-in">
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            color="white"
            mb={2}
            sx={{
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            User Management Platform
          </Typography>
          <Typography
            variant="h6"
            color="white"
            sx={{
              opacity: 0.9,
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            Secure access to your admin dashboard
          </Typography>
        </Box>
        <LoginForm />
      </Container>
    </Box>
  );
};

export default LoginPage;