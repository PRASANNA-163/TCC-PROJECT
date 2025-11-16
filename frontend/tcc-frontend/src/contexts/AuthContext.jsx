import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};



/*
// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// --- THE TOKEN KEY IS NOW 'admin_token' ---
const TOKEN_KEY = 'admin_token';

//axios.defaults.baseURL = 'https://tcc-backend-d9bn.onrender.com';
// 1. Set up Axios to use the correct token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY); // <-- UPDATED
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY); // <-- UPDATED
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          localStorage.removeItem(TOKEN_KEY); // <-- UPDATED
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem(TOKEN_KEY); // <-- UPDATED
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token); // <-- UPDATED
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY); // <-- UPDATED
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

*/


// frontend/tcc-frontend/src/contexts/AuthContext.jsx
// (Full Code - REPLACE YOURS)

/*

import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// --- THE TOKEN KEY IS 'admin_token' ---
const TOKEN_KEY = 'admin_token';

// --- THIS IS THE FIX ---
// Tell axios to use your new Render URL as the base for all API calls
axios.defaults.baseURL = 'https://tcc-backend-d9bn.onrender.com/api'; 
// --- END FIX ---


// 1. Set up Axios to use the correct token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY); 
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          localStorage.removeItem(TOKEN_KEY); 
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem(TOKEN_KEY); 
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token); 
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY); 
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

*/