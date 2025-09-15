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
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Tabs,
  Tab,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  Search,
  FilterList,
  Add,
  Edit,
  MoreVert,
  Email,
  Phone,
  CalendarToday,
  Schedule,
} from '@mui/icons-material';
import UserAvatar from '../common/UserAvatar';
import StatusChip from '../common/StatusChip';

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  joinDate: string;
  lastLogin: string;
  phone?: string;
  employeeId: string;
  manager: string;
  location: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissionCount: number;
  color: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    department: 'Engineering',
    role: 'Senior Developer',
    status: 'active',
    joinDate: 'Jan 15, 2022',
    lastLogin: '2 hours ago',
    phone: '+1 (555) 123-4567',
    employeeId: 'EMP001',
    manager: 'Sarah Johnson',
    location: 'New York Office',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Engineering',
    role: 'Engineering Manager',
    status: 'active',
    joinDate: 'Mar 15, 2021',
    lastLogin: '1 hour ago',
    employeeId: 'EMP002',
    manager: 'Michael Chen',
    location: 'New York Office',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike.wilson@company.com',
    department: 'Marketing',
    role: 'Marketing Specialist',
    status: 'pending',
    joinDate: 'Feb 10, 2023',
    lastLogin: 'Never',
    employeeId: 'EMP003',
    manager: 'Emily Rodriguez',
    location: 'Los Angeles Office',
  },
];

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Supervisor',
    description: 'Team supervisors overseeing daily operations',
    userCount: 1,
    permissionCount: 10,
    color: '#ff9800',
  },
  {
    id: '2',
    name: 'Administrator',
    description: 'System administrators with full access',
    userCount: 1,
    permissionCount: 12,
    color: '#f44336',
  },
  {
    id: '3',
    name: 'Manager',
    description: 'Department managers with team oversight',
    userCount: 2,
    permissionCount: 7,
    color: '#2196f3',
  },
];

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(mockUsers[0]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Users
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage users, roles, and permissions
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Panel - Users List */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Users
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  size="small"
                  sx={{ borderRadius: 2 }}
                >
                  Create User
                </Button>
              </Box>

              <TextField
                fullWidth
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                {filteredUsers.map((user) => (
                  <ListItem
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: 2,
                      mb: 1,
                      bgcolor: selectedUser?.id === user.id ? 'primary.light' : 'transparent',
                      '&:hover': {
                        bgcolor: selectedUser?.id === user.id ? 'primary.light' : 'action.hover',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <UserAvatar name={user.name} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight={500}>
                            {user.name}
                          </Typography>
                          <StatusChip status={user.status} />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" display="block">
                            {user.email}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {user.department} • {user.role}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Middle Panel - Roles */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Roles
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  size="small"
                  sx={{ borderRadius: 2 }}
                >
                  Add Role
                </Button>
              </Box>

              <TextField
                fullWidth
                placeholder="Search roles..."
                size="small"
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  1 users
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={30}
                  sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                />
                <Typography variant="caption" color="text.secondary">
                  10 permissions
                </Typography>
              </Box>

              <List>
                {mockRoles.map((role) => (
                  <ListItem
                    key={role.id}
                    sx={{
                      border: `2px solid ${role.color}`,
                      borderRadius: 2,
                      mb: 2,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      p: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: role.color,
                          borderRadius: '50%',
                        }}
                      />
                      <Typography variant="subtitle2" fontWeight={600}>
                        {role.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {role.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                      <Typography variant="caption">
                        👥 {role.userCount} user{role.userCount !== 1 ? 's' : ''}
                      </Typography>
                      <Typography variant="caption">
                        🔑 {role.permissionCount} permission{role.permissionCount !== 1 ? 's' : ''}
                      </Typography>
                    </Box>
                    <Box sx={{ width: '100%', mt: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={(role.permissionCount / 12) * 100}
                        sx={{ height: 4, borderRadius: 2 }}
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Panel - User Details */}
        <Grid item xs={12} md={4}>
          {selectedUser && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <UserAvatar name={selectedUser.name} sx={{ width: 56, height: 56 }} />
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {selectedUser.name}
                      </Typography>
                      <StatusChip status={selectedUser.status} />
                      <Typography variant="body2" color="text.secondary">
                        {selectedUser.department}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    Edit
                  </Button>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Email fontSize="small" color="action" />
                    <Typography variant="body2" fontWeight={500}>
                      Email:
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                    {selectedUser.email}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Phone fontSize="small" color="action" />
                    <Typography variant="body2" fontWeight={500}>
                      Phone:
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                    {selectedUser.phone || 'Not provided'}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CalendarToday fontSize="small" color="action" />
                    <Typography variant="body2" fontWeight={500}>
                      Joined:
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                    {selectedUser.joinDate}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Schedule fontSize="small" color="action" />
                    <Typography variant="body2" fontWeight={500}>
                      Last Login:
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                    {selectedUser.lastLogin}
                  </Typography>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    sx={{ mb: 2 }}
                  >
                    <Tab label="Overview" />
                    <Tab label="Permissions" />
                    <Tab label="Audit Log" />
                  </Tabs>

                  {activeTab === 0 && (
                    <Box>
                      <Typography variant="h6" fontWeight={600} mb={2}>
                        User Information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" fontWeight={500}>
                            Employee ID
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedUser.employeeId}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" fontWeight={500}>
                            Department
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedUser.department}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" fontWeight={500}>
                            Manager
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedUser.manager}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" fontWeight={500}>
                            Location
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedUser.location}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserManagement;