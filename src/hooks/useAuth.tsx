import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';

// Test mode - bypass authentication entirely
const TEST_MODE = true;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user for testing
const createMockUser = (): User => ({
  id: 'test-user-123',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'test@example.com',
  email_confirmed_at: new Date().toISOString(),
  phone: '',
  confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: {
    full_name: 'Test User'
  },
  identities: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  is_anonymous: false
});

// Mock session for testing
const createMockSession = (user: User): Session => ({
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: 'bearer',
  user
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (TEST_MODE) {
      // In test mode, immediately set a mock user
      const mockUser = createMockUser();
      const mockSession = createMockSession(mockUser);
      
      setUser(mockUser);
      setSession(mockSession);
      setLoading(false);
      return;
    }

    // Normal auth flow (disabled in test mode)
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    if (TEST_MODE) {
      // In test mode, simulate successful signup
      const mockUser = createMockUser();
      const mockSession = createMockSession(mockUser);
      
      setUser(mockUser);
      setSession(mockSession);
      return { error: null };
    }
    
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    if (TEST_MODE) {
      // In test mode, simulate successful login
      const mockUser = createMockUser();
      const mockSession = createMockSession(mockUser);
      
      setUser(mockUser);
      setSession(mockSession);
      return { error: null };
    }
    
    return { error: null };
  };

  const signOut = async () => {
    if (TEST_MODE) {
      // In test mode, simulate successful logout
      setUser(null);
      setSession(null);
      return { error: null };
    }
    
    return { error: null };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};