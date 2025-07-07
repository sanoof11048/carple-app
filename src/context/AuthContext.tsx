import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  isDriver: boolean;
  isVerified: boolean;
  rating: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing auth token
    const token = localStorage.getItem('authToken');
    if (token) {
      // Mock user data for demo
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
        isDriver: true,
        isVerified: true,
        rating: 4.8
      });
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login implementation
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email,
      phone: '+1234567890',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
      isDriver: true,
      isVerified: true,
      rating: 4.8
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'mock-token');
  };

  const signup = async (userData: any) => {
    // Mock signup implementation
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
      isVerified: false,
      rating: 0
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'mock-token');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};