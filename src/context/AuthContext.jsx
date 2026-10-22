import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('devmatch-user') || 'null'); }
    catch { return null; }
  });

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    login: (userPayload) => {
      const nextUser = { name: userPayload.name || userPayload.email?.split('@')[0] || 'Student', email: userPayload.email };
      sessionStorage.setItem('devmatch-user', JSON.stringify(nextUser));
      setUser(nextUser);
    },
    logout: () => { sessionStorage.removeItem('devmatch-user'); setUser(null); }
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
