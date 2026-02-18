// RBAC Types and Permissions
import type { TariffKey } from '../config/tariffs';

// Роли для административной панели
export type AdminRole = 'architect' | 'admin' | 'curator';

// Роли для студентов (старая система)
export type Role = 'super_admin' | 'manager' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  tariff: TariffKey;
  status: 'active' | 'blocked';
  registeredAt: string;
  lastLogin: string;
  revenue?: number;
  completedLessons?: number;
  phone?: string;
  city?: string;
  accessUntil?: string;
  manager?: string;
  profession?: string;
  telegramNick?: string;
}

// Пользователь админ-панели
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: AdminRole;
  addedAt: string;
  lastActive: string;
}

export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [
    { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'content', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'finances', actions: ['read'] },
    { resource: 'logs', actions: ['read'] },
    { resource: 'settings', actions: ['create', 'read', 'update', 'delete'] },
  ],
  manager: [
    { resource: 'users', actions: ['read', 'update'] },
    { resource: 'content', actions: ['create', 'read', 'update'] },
    { resource: 'logs', actions: ['read'] },
  ],
  user: [
    { resource: 'profile', actions: ['read', 'update'] },
    { resource: 'courses', actions: ['read'] },
  ],
};

export const hasPermission = (
  role: Role,
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete'
): boolean => {
  const permissions = ROLE_PERMISSIONS[role];
  const resourcePermission = permissions.find((p) => p.resource === resource);
  return resourcePermission?.actions.includes(action) ?? false;
};

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  timestamp: string;
  details?: string;
}