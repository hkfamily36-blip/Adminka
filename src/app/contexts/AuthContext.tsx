import { createContext, useContext, useState, ReactNode } from 'react';
import { Role, User } from '../types/rbac';

interface AuthContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock current user - в продакшене это будет из API
const mockCurrentUser: User = {
  id: 'admin-1',
  name: 'Анастасия Сухарева',
  email: 'anastasia@school.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  role: 'super_admin',
  tariff: 'mentor',
  status: 'active',
  registeredAt: '2024-01-01',
  lastLogin: '2026-02-08',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(mockCurrentUser);

  const isAdmin = currentUser.role === 'super_admin' || currentUser.role === 'manager';
  const isSuperAdmin = currentUser.role === 'super_admin';

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, isAdmin, isSuperAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
