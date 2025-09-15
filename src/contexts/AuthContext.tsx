import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication - replace with real API calls
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Accept multiple demo credentials
      const validCredentials = [
        { email: 'admin@company.com', password: 'password', name: 'Admin User', role: 'System Administrator' },
        { email: 'user@company.com', password: 'password', name: 'John Doe', role: 'User' },
        { email: 'manager@company.com', password: 'password', name: 'Jane Smith', role: 'Manager' }
      ];
      
      const user = validCredentials.find(cred => cred.email === email && cred.password === password);
      
      if (user) {
        const mockUser: User = {
          id: '1',
          email: user.email,
          name: user.name,
          role: user.role,
        };
        setUser(mockUser);
        localStorage.setItem('authToken', 'mock-token');
        localStorage.setItem('userData', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  // Check for existing session on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    if (token) {
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      }
    }
    setLoading(false);
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};