import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'user' | 'moderator';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@nexus.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@nexus.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date('2024-01-01'),
    },
  },
  'user@nexus.com': {
    password: 'user123',
    user: {
      id: '2',
      email: 'user@nexus.com',
      name: 'John Doe',
      role: 'user',
      createdAt: new Date('2024-03-15'),
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('nexus_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email.toLowerCase()];
    if (!mockUser || mockUser.password !== password) {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }
    
    setUser(mockUser.user);
    localStorage.setItem('nexus_user', JSON.stringify(mockUser.user));
    setIsLoading(false);
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (mockUsers[email.toLowerCase()]) {
      setIsLoading(false);
      throw new Error('Email already exists');
    }
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: 'user',
      createdAt: new Date(),
    };
    
    setUser(newUser);
    localStorage.setItem('nexus_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexus_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}