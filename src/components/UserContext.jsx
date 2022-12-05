import { createContext } from 'react';

export const UserContext = createContext({
    token: null,
    setToken: null,
    user: true,
    setUser: null,
    balance: null,
    setBalance: null
});