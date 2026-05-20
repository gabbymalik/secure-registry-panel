import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

const STORAGE_KEY = 'app_users';
const SESSION_KEY = 'app_current_user';

// Seed admin user
const seedAdmin = () => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const adminExists = users.some((u: User) => u.email === 'admin@example.com');
  
  if (!adminExists) {
    const admin: User = {
      id: 'admin-1',
      name: 'System Admin',
      email: 'admin@example.com',
      password: 'password123', // In real apps, this would be hashed
      role: 'admin',
      createdAt: new Date().toISOString(),
    };
    users.push(admin);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }
};

seedAdmin();

export const getUsers = (): User[] => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  // Remove passwords before returning if needed, but for this mock we might need them for login check
  return users;
};

export const saveUser = (user: Omit<User, 'id' | 'role' | 'createdAt'>) => {
  const users = getUsers();
  if (users.some(u => u.email === user.email)) {
    throw new Error('User already exists');
  }

  const newUser: User = {
    ...user,
    id: crypto.randomUUID(),
    role: 'user',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return newUser;
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(SESSION_KEY);
  return user ? JSON.parse(user) : null;
};

export const login = (email: string, password: string): User => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const { password: _, ...userWithoutPassword } = user;
  localStorage.setItem(SESSION_KEY, JSON.stringify(userWithoutPassword));
  return userWithoutPassword as User;
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(getCurrentUser());

  const handleLogin = (u: User) => setUser(u);
  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return { user, login: handleLogin, logout: handleLogout };
};