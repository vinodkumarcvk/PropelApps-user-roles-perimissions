import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Dashboard from '../components/dashboard/Dashboard';
import UsersPage from './UsersPage';
import RolesPage from './RolesPage';
import PermissionsPage from './PermissionsPage';

const DashboardPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('users');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuItemClick = (item: string) => {
    setActiveItem(item);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UsersPage />;
      case 'roles':
        return <RolesPage />;
      case 'permissions':
        return <PermissionsPage />;
      case 'settings':
        return (
          <Box sx={{ p: 3 }}>
            <div>Settings content coming soon...</div>
          </Box>
        );
      default:
        return <UsersPage />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        open={sidebarOpen}
        onClose={handleSidebarToggle}
        activeItem={activeItem}
        onItemClick={handleMenuItemClick}
      />
      
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Header onMenuToggle={handleSidebarToggle} sidebarOpen={sidebarOpen} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: '64px', // Height of AppBar
            overflow: 'auto',
            backgroundColor: 'background.default',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;