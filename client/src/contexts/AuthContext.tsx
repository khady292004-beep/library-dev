import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, LoginCredentials, RegisterData, AuthResponse } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredUser(): User | null {
  try {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.memberSince = new Date(parsed.memberSince);
      return parsed;
    }
  } catch {
    localStorage.removeItem('user');
  }
  return null;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getStoredUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Chercher le compte enregistré dans localStorage
      const registeredUsers: User[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const found = registeredUsers.find(u => u.email === credentials.email);

      if (!found) {
        throw new Error('Aucun compte trouvé avec cet email. Veuillez vous inscrire.');
      }

      // Vérifier le mot de passe (pour la démo, on utilise le mot de passe stocké)
      const storedPassword = localStorage.getItem(`password_${found.id}`);
      if (!storedPassword || storedPassword !== credentials.password) {
        throw new Error('Mot de passe incorrect. Veuillez réessayer.');
      }

      found.memberSince = new Date(found.memberSince);
      setUser(found);
      localStorage.setItem('user', JSON.stringify(found));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur de connexion';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Vérifier si l'email existe déjà
      const registeredUsers: User[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      if (registeredUsers.some(u => u.email === data.email)) {
        throw new Error('Un compte avec cet email existe déjà.');
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        memberSince: new Date(),
        isActive: true,
      };

      // Sauvegarder dans la liste des comptes enregistrés
      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      // Sauvegarder le mot de passe séparément pour la démo
      localStorage.setItem(`password_${newUser.id}`, data.password);

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur d\'inscription';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userProfile');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider');
  }
  return context;
};
