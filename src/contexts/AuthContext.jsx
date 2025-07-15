import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('bloodConnect_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const storedUsers = JSON.parse(localStorage.getItem('bloodConnect_users') || '[]');
    const user = storedUsers.find(u => u.email === email && u.password === password);

    if (user) {
      const userProfile = { id: user.id, email: user.email, name: user.name };
      setUser(userProfile);
      localStorage.setItem('bloodConnect_user', JSON.stringify(userProfile));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const storedUsers = JSON.parse(localStorage.getItem('bloodConnect_users') || '[]');
    const existingUser = storedUsers.find(u => u.email === email);

    if (existingUser) {
      setIsLoading(false);
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    storedUsers.push(newUser);
    localStorage.setItem('bloodConnect_users', JSON.stringify(storedUsers));

    const userProfile = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(userProfile);
    localStorage.setItem('bloodConnect_user', JSON.stringify(userProfile));

    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bloodConnect_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
