import React, {createContext, useCallback, useEffect, useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {showError} from "./errors";
import {get, post} from "./api";

export const UserContext = createContext({
  user: null,
  authenticate: () => {},
  logout: () => {},
});

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const history = useHistory();

  const authenticate = useCallback(() => {
    get('/auth/me').then((userData) => {
      setUser(userData.data.email);
      if(location.pathname === '/auth') {
        history.replace('/upload');
      }
    }).catch(err => {
      if(location.pathname !== '/auth') {
        history.replace('/auth');
      }
    });
  }, [location, history]);

  const logout = useCallback(() => {
    post('/auth/logout').then(() => {
      setUser(null);
      history.replace('/auth');
    }).catch(err => {
      showError('There was an error while logging out');
    })
  }, [history]);

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <UserContext.Provider value={{user, authenticate, logout}}>
      {children}
    </UserContext.Provider>
  )
};
