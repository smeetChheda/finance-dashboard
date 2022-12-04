import { createContext } from 'react';

export const UserContext = createContext({
    token: null,
    setToken: null,
    sidebarOpen: true,
    setSidebarOpen: null,
});