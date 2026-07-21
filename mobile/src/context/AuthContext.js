import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name, email, role }
  const [accounts, setAccounts] = useState([]); // registered { name, email, password }

  // Create an account (does NOT log the user in — they go to Login next)
  const register = async ({ name, email, password }) => {
    const exists = accounts.some(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (exists) {
      return { ok: false, error: 'An account with this email already exists.' };
    }
    setAccounts((prev) => [
      ...prev,
      { name: name.trim(), email: email.trim(), password },
    ]);
    return { ok: true };
  };

  // Validate credentials against registered accounts
  const login = async (email, password) => {
    const match = accounts.find(
      (a) =>
        a.email.toLowerCase() === email.trim().toLowerCase() &&
        a.password === password
    );
    if (!match) {
      return { ok: false, error: 'Invalid email or password.' };
    }
    setUser({ name: match.name, email: match.email, role: 'patient' });
    return { ok: true };
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, accounts, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
