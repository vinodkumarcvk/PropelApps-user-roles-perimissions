import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  People,
  AdminPanelSettings,
  Key,
  Settings,
  Dashboard,
} from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  activeItem: string;
  onItemClick: (item: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Dashboard /> },
  { id: 'users', label: 'Users', icon: <People />, count: 247 },
  { id: 'roles', label: 'Roles', icon: <AdminPanelSettings />, count: 12 },
  { id: 'permissions', label: 'Permissions', icon: <Key />, count: 48 },
  { id: 'settings', label: 'Settings', icon: <Settings /> },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, activeItem, onItemClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerWidth = 280;

  const handleItemClick = (itemId: string) => {
    onItemClick(itemId);
    if (isMobile) {
      onClose();
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', bgcolor: 'primary.main', color: 'white' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="h6" fontWeight="bold">
          User Management
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
          Admin Portal
        </Typography>
      </Box>

      <List sx={{ px: 2, py: 3 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => handleItemClick(item.id)}
              selected={activeItem === item.id}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.15)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: activeItem === item.id ? 600 : 400,
                }}
              />
              {item.count && (
                <Chip
                  label={item.count}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontSize: '0.75rem',
                    height: 20,
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
        },
      }}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;