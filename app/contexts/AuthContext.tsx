import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';


interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
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

  useEffect(() => {
    // Firebase auth state listener will go here
    setLoading(false); // Temporary - will be replaced with Firebase
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Firebase login will go here
      console.log('Login function - will be replaced with Firebase');
      return { success: false, error: 'Backend removed - Firebase setup pending' };
    } catch (error: any) {
      return { 
        success: false, 
        error: 'Login failed' 
      };
    }
  };

  const register = async (userData: any) => {
    try {
      // Firebase registration will go here
      console.log('Register function - will be replaced with Firebase');
      return { success: false, error: 'Backend removed - Firebase setup pending' };
    } catch (error: any) {
      return { 
        success: false, 
        error: 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    // Firebase logout will go here
    setUser(null);
    console.log('Logout function - will be replaced with Firebase');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;