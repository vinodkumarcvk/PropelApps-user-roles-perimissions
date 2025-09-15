import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Card,
  CardContent,
  TextField,
  Alert,
  Box,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import LoadingButton from '../common/LoadingButton';
import { useAuth } from '../../contexts/AuthContext';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const { login, loading } = useAuth();

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      setError('');
      await login(values.email, values.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev);
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 400, 
        width: '100%',
        boxShadow: 3,
        borderRadius: 2,
      }}
      className="slide-up"
    >
      <CardContent sx={{ p: 4 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main" mb={1}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your account to continue
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 1 }}>
            {error}
          </Alert>
        )}

        <Box mb={2} p={2} bgcolor="info.light" borderRadius={1}>
          <Typography variant="body2" color="info.contrastText" fontWeight={500}>
            Demo Credentials:
          </Typography>
          <Typography variant="body2" color="info.contrastText">
            Admin: admin@company.com / password
          </Typography>
          <Typography variant="body2" color="info.contrastText">
            User: user@company.com / password
          </Typography>
          <Typography variant="body2" color="info.contrastText">
            Manager: manager@company.com / password
          </Typography>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, values, handleChange, handleBlur }) => (
            <Form>
              <Box mb={3}>
                <Field name="email">
                  {() => (
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>
              </Box>

              <Box mb={3}>
                <Field name="password">
                  {() => (
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                              size="small"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>
              </Box>

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                loading={loading}
                loadingText="Signing in..."
                sx={{ 
                  mb: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                Sign In
              </LoadingButton>

              <Box textAlign="center">
                <Link
                  href="#"
                  variant="body2"
                  color="primary"
                  underline="hover"
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot your password?
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default LoginForm;