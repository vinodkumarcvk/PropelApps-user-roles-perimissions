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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Search,
  Add,
  MoreVert,
  Edit,
  Delete,
  ExpandMore,
  Security,
  Key,
  AdminPanelSettings,
  People,
  Settings,
  Visibility,
  Create,
  DeleteOutline,
  Update,
} from '@mui/icons-material';

interface Permission {
  id: string;
  name: string;
  key: string;
  description: string;
  category: string;
  type: 'read' | 'write' | 'delete' | 'admin';
  rolesCount: number;
  usersCount: number;
  isActive: boolean;
  createdDate: string;
  lastModified: string;
}

interface PermissionCategory {
  name: string;
  icon: React.ReactNode;
  permissions: Permission[];
  color: string;
}

const mockPermissions: Permission[] = [
  {
    id: '1',
    name: 'View Users',
    key: 'users.read',
    description: 'Ability to view user profiles and basic information',
    category: 'User Management',
    type: 'read',
    rolesCount: 4,
    usersCount: 45,
    isActive: true,
    createdDate: '2023-01-15',
    lastModified: '2023-11-20',
  },
  {
    id: '2',
    name: 'Create Users',
    key: 'users.create',
    description: 'Ability to create new user accounts',
    category: 'User Management',
    type: 'write',
    rolesCount: 2,
    usersCount: 8,
    isActive: true,
    createdDate: '2023-01-15',
    lastModified: '2023-10-15',
  },
  {
    id: '3',
    name: 'Edit Users',
    key: 'users.update',
    description: 'Ability to modify existing user information',
    category: 'User Management',
    type: 'write',
    rolesCount: 3,
    usersCount: 15,
    isActive: true,
    createdDate: '2023-01-15',
    lastModified: '2023-09-30',
  },
  {
    id: '4',
    name: 'Delete Users',
    key: 'users.delete',
    description: 'Ability to permanently delete user accounts',
    category: 'User Management',
    type: 'delete',
    rolesCount: 1,
    usersCount: 2,
    isActive: true,
    createdDate: '2023-01-15',
    lastModified: '2023-08-20',
  },
  {
    id: '5',
    name: 'Manage Roles',
    key: 'roles.manage',
    description: 'Full access to create, edit, and delete roles',
    category: 'Role Management',
    type: 'admin',
    rolesCount: 1,
    usersCount: 2,
    isActive: true,
    createdDate: '2023-01-20',
    lastModified: '2023-07-15',
  },
  {
    id: '6',
    name: 'View Reports',
    key: 'reports.read',
    description: 'Access to view system and user reports',
    category: 'Reporting',
    type: 'read',
    rolesCount: 3,
    usersCount: 25,
    isActive: true,
    createdDate: '2023-02-01',
    lastModified: '2023-06-10',
  },
  {
    id: '7',
    name: 'System Administration',
    key: 'system.admin',
    description: 'Full system administrative privileges',
    category: 'System',
    type: 'admin',
    rolesCount: 1,
    usersCount: 2,
    isActive: true,
    createdDate: '2023-01-10',
    lastModified: '2023-12-01',
  },
];

const PermissionsPage: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | 'delete'>('add');
  const [viewMode, setViewMode] = useState<'table' | 'category'>('category');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, permission: Permission) => {
    setAnchorEl(event.currentTarget);
    setSelectedPermission(permission);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPermission(null);
  };

  const handleOpenDialog = (type: 'add' | 'edit' | 'delete', permission?: Permission) => {
    setDialogType(type);
    setSelectedPermission(permission || null);
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPermission(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'read': return <Visibility />;
      case 'write': return <Create />;
      case 'delete': return <DeleteOutline />;
      case 'admin': return <AdminPanelSettings />;
      default: return <Key />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'read': return 'info';
      case 'write': return 'warning';
      case 'delete': return 'error';
      case 'admin': return 'secondary';
      default: return 'default';
    }
  };

  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch = permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.key.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || permission.category === filterCategory;
    const matchesType = filterType === 'all' || permission.type === filterType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const groupedPermissions = filteredPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'User Management': return <People />;
      case 'Role Management': return <AdminPanelSettings />;
      case 'Reporting': return <Settings />;
      case 'System': return <Security />;
      default: return <Key />;
    }
  };

  const categories = Array.from(new Set(permissions.map(p => p.category)));

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Permissions Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure system permissions and access controls
        </Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                placeholder="Search permissions..."
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
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filterCategory}
                  label="Category"
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={filterType}
                  label="Type"
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="read">Read</MenuItem>
                  <MenuItem value="write">Write</MenuItem>
                  <MenuItem value="delete">Delete</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant={viewMode === 'category' ? 'contained' : 'outlined'}
                onClick={() => setViewMode(viewMode === 'category' ? 'table' : 'category')}
                fullWidth
              >
                {viewMode === 'category' ? 'Table View' : 'Category View'}
              </Button>
            </Grid>
            <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenDialog('add')}
                sx={{ borderRadius: 2 }}
              >
                Add Permission
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {viewMode === 'category' ? (
        <Box>
          {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
            <Accordion key={category} defaultExpanded sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    {getCategoryIcon(category)}
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    {category}
                  </Typography>
                  <Chip
                    label={`${categoryPermissions.length} permissions`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {categoryPermissions.map((permission, index) => (
                    <React.Fragment key={permission.id}>
                      <ListItem>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
                          <Avatar sx={{ bgcolor: `${getTypeColor(permission.type)}.light`, width: 32, height: 32 }}>
                            {getTypeIcon(permission.type)}
                          </Avatar>
                        </Box>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body1" fontWeight={500}>
                                {permission.name}
                              </Typography>
                              <Chip
                                label={permission.type}
                                size="small"
                                color={getTypeColor(permission.type) as any}
                                variant="outlined"
                              />
                              {!permission.isActive && (
                                <Chip label="Inactive" size="small" color="error" variant="outlined" />
                              )}
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {permission.description}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Key: {permission.key} • {permission.rolesCount} roles • {permission.usersCount} users
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={(e) => handleMenuOpen(e, permission)}
                            size="small"
                          >
                            <MoreVert />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < categoryPermissions.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ) : (
        <Card>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Permission</TableCell>
                  <TableCell>Key</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Roles</TableCell>
                  <TableCell>Users</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPermissions.map((permission) => (
                  <TableRow key={permission.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {permission.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {permission.description}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {permission.key}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{permission.category}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={permission.type}
                        size="small"
                        color={getTypeColor(permission.type) as any}
                        variant="outlined"
                        icon={getTypeIcon(permission.type)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{permission.rolesCount}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{permission.usersCount}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={permission.isActive ? 'Active' : 'Inactive'}
                        size="small"
                        color={permission.isActive ? 'success' : 'error'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={(e) => handleMenuOpen(e, permission)}
                        size="small"
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleOpenDialog('edit', selectedPermission!)}>
          <Edit sx={{ mr: 2 }} />
          Edit Permission
        </MenuItem>
        <MenuItem onClick={() => handleOpenDialog('delete', selectedPermission!)}>
          <Delete sx={{ mr: 2 }} />
          Delete Permission
        </MenuItem>
      </Menu>

      {/* Permission Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'add' && 'Add New Permission'}
          {dialogType === 'edit' && 'Edit Permission'}
          {dialogType === 'delete' && 'Delete Permission'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'delete' ? (
            <Box>
              <Typography sx={{ mb: 2 }}>
                Are you sure you want to delete the permission "{selectedPermission?.name}"?
              </Typography>
              <Typography variant="body2" color="error">
                This permission is currently assigned to {selectedPermission?.rolesCount} roles and affects {selectedPermission?.usersCount} users.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Permission Name"
                  defaultValue={selectedPermission?.name || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Permission Key"
                  defaultValue={selectedPermission?.key || ''}
                  helperText="Unique identifier for this permission (e.g., users.read)"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  defaultValue={selectedPermission?.description || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    defaultValue={selectedPermission?.category || ''}
                    label="Category"
                  >
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    defaultValue={selectedPermission?.type || 'read'}
                    label="Type"
                  >
                    <MenuItem value="read">Read</MenuItem>
                    <MenuItem value="write">Write</MenuItem>
                    <MenuItem value="delete">Delete</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked={selectedPermission?.isActive ?? true}
                    />
                  }
                  label="Active Permission"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color={dialogType === 'delete' ? 'error' : 'primary'}
            onClick={handleCloseDialog}
          >
            {dialogType === 'add' && 'Add Permission'}
            {dialogType === 'edit' && 'Save Changes'}
            {dialogType === 'delete' && 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PermissionsPage;