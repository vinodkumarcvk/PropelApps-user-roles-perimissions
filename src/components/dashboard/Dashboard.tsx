import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  People,
  Security,
  Assignment,
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold" color={color}>
            {value}
          </Typography>
          <Chip
            label={change}
            size="small"
            color="success"
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </Box>
        <Avatar sx={{ bgcolor: `${color}15`, color: color }}>
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '247',
      change: '+12%',
      icon: <People />,
      color: '#1976d2',
    },
    {
      title: 'Active Sessions',
      value: '89',
      change: '+5%',
      icon: <TrendingUp />,
      color: '#4caf50',
    },
    {
      title: 'Roles Defined',
      value: '12',
      change: '+2',
      icon: <Security />,
      color: '#ff9800',
    },
    {
      title: 'Permissions',
      value: '48',
      change: '+8',
      icon: <Assignment />,
      color: '#9c27b0',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Welcome to the User Management Platform
      </Typography>

      <Grid container spacing={3} mb={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Recent Activity
              </Typography>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Activity monitoring will be displayed here...
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Quick Actions
              </Typography>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Quick action buttons will be displayed here...
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;