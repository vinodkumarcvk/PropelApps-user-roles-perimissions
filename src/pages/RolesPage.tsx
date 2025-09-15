import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  LinearProgress,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Search,
  Add,
  MoreVert,
  Edit,
  Delete,
  People,
  Security,
  AdminPanelSettings,
  SupervisorAccount,
  Person,
} from '@mui/icons-material';

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissionCount: number;
  totalPermissions: number;
  color: string;
  icon: React.ReactNode;
  permissions: string[];
  createdDate: string;
  lastModified: string;
}

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Super Administrator',
    description: 'Full system access with all administrative privileges',
    userCount: 2,
    permissionCount: 15,
    totalPermissions: 15,
    color: '#f44336',
    icon: <AdminPanelSettings />,
    permissions: ['user.create', 'user.read', 'user.update', 'user.delete', 'role.manage', 'system.admin'],
    createdDate: '2023-01-15',
    lastModified: '2023-12-01',
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Department managers with team oversight capabilities',
    userCount: 8,
    permissionCount: 10,
    totalPermissions: 15,
    color: '#2196f3',
    icon: <SupervisorAccount />,
    permissions: ['user.read', 'user.update', 'team.manage', 'reports.view'],
    createdDate: '2023-01-20',
    lastModified: '2023-11-15',
  },
  {
    id: '3',
    name: 'Team Lead',
    description: 'Team leaders with project management responsibilities',
    userCount: 15,
    permissionCount: 8,
    totalPermissions: 15,
    color: '#ff9800',
    icon: <People />,
    permissions: ['user.read', 'project.manage', 'task.assign'],
    createdDate: '2023-02-01',
    lastModified: '2023-10-20',
  },
  {
    id: '4',
    name: 'Employee',
    description: 'Standard employee access with basic permissions',
    userCount: 156,
    permissionCount: 5,
    totalPermissions: 15,
    color: '#4caf50',
    icon: <Person />,
    permissions: ['profile.read', 'profile.update', 'task.view'],
    createdDate: '2023-01-10',
    lastModified: '2023-09-30',
  },
  {
    id: '5',
    name: 'Guest',
    description: 'Limited access for temporary or external users',
    userCount: 23,
    permissionCount: 2,
    totalPermissions: 15,
    color: '#9e9e9e',
    icon: <Security />,
    permissions: ['profile.read'],
    createdDate: '2023-03-01',
    lastModified: '2023-08-15',
  },
];

const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | 'delete' | 'view'>('add');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, role: Role) => {
    setAnchorEl(event.currentTarget);
    setSelectedRole(role);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRole(null);
  };

  const handleOpenDialog = (type: 'add' | 'edit' | 'delete' | 'view', role?: Role) => {
    setDialogType(type);
    setSelectedRole(role || null);
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRole(null);
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPermissionPercentage = (role: Role) => {
    return (role.permissionCount / role.totalPermissions) * 100;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Roles Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Define and manage user roles and their associated permissions
        </Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenDialog('add')}
                sx={{ borderRadius: 2 }}
              >
                Create New Role
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {filteredRoles.map((role) => (
          <Grid item xs={12} md={6} lg={4} key={role.id}>
            <Card 
              sx={{ 
                height: '100%',
                border: `2px solid ${role.color}20`,
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out',
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: role.color, width: 48, height: 48 }}>
                      {role.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {role.name}
                      </Typography>
                      <Chip
                        label={`${role.userCount} users`}
                        size="small"
                        variant="outlined"
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </Box>
                  <IconButton
                    onClick={(e) => handleMenuOpen(e, role)}
                    size="small"
                  >
                    <MoreVert />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                  {role.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      Permissions
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {role.permissionCount}/{role.totalPermissions}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getPermissionPercentage(role)}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: `${role.color}20`,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: role.color,
                      },
                    }}
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Created: {role.createdDate}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    onClick={() => handleOpenDialog('view', role)}
                    sx={{ color: role.color }}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleOpenDialog('view', selectedRole!)}>
          <Security sx={{ mr: 2 }} />
          View Permissions
        </MenuItem>
        <MenuItem onClick={() => handleOpenDialog('edit', selectedRole!)}>
          <Edit sx={{ mr: 2 }} />
          Edit Role
        </MenuItem>
        <MenuItem onClick={() => handleOpenDialog('delete', selectedRole!)}>
          <Delete sx={{ mr: 2 }} />
          Delete Role
        </MenuItem>
      </Menu>

      {/* Role Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogType === 'add' && 'Create New Role'}
          {dialogType === 'edit' && 'Edit Role'}
          {dialogType === 'delete' && 'Delete Role'}
          {dialogType === 'view' && `${selectedRole?.name} - Permissions`}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'delete' ? (
            <Box>
              <Typography sx={{ mb: 2 }}>
                Are you sure you want to delete the role "{selectedRole?.name}"?
              </Typography>
              <Typography variant="body2" color="error">
                This will affect {selectedRole?.userCount} users who currently have this role.
              </Typography>
            </Box>
          ) : dialogType === 'view' ? (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Role Information
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight={500}>Users Assigned:</Typography>
                  <Typography variant="body2">{selectedRole?.userCount}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight={500}>Permissions:</Typography>
                  <Typography variant="body2">
                    {selectedRole?.permissionCount}/{selectedRole?.totalPermissions}
                  </Typography>
                </Grid>
              </Grid>
              
              <Typography variant="h6" sx={{ mb: 2 }}>
                Assigned Permissions
              </Typography>
              <List>
                {selectedRole?.permissions.map((permission, index) => (
                  <ListItem key={index} divider>
                    <ListItemText
                      primary={permission}
                      secondary="Permission description would go here"
                    />
                    <Chip label="Active" color="success" size="small" />
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Role Name"
                  defaultValue={selectedRole?.name || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  defaultValue={selectedRole?.description || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Role Color</InputLabel>
                  <Select
                    defaultValue={selectedRole?.color || '#2196f3'}
                    label="Role Color"
                  >
                    <MenuItem value="#f44336">Red</MenuItem>
                    <MenuItem value="#2196f3">Blue</MenuItem>
                    <MenuItem value="#4caf50">Green</MenuItem>
                    <MenuItem value="#ff9800">Orange</MenuItem>
                    <MenuItem value="#9c27b0">Purple</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            {dialogType === 'view' ? 'Close' : 'Cancel'}
          </Button>
          {dialogType !== 'view' && (
            <Button
              variant="contained"
              color={dialogType === 'delete' ? 'error' : 'primary'}
              onClick={handleCloseDialog}
            >
              {dialogType === 'add' && 'Create Role'}
              {dialogType === 'edit' && 'Save Changes'}
              {dialogType === 'delete' && 'Delete Role'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RolesPage;