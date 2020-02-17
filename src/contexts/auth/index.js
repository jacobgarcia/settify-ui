import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import store from 'store';

import { Notify } from '@credijusto/ui-components';

const AuthContext = React.createContext();
export const SPOTIFY_TOKEN = 'spotifyToken';
export const TOKEN_EXPIRATION = 'tokenExpiration';
export const NAME = 'name';
export const EMAIL = 'email';

/**
 * Returns the user profile from the local storage
 * @returns {Object}
 */
const getProfile = () => {
  const name = store.get(NAME);
  const email = store.get(EMAIL);
  return {
    name,
    email,
  };
};

export const AuthProvider = ({ children }) => {
  const [hasToken, setHasToken] = useState(!!store.get(SPOTIFY_TOKEN));

  /**
   * Used to know if the user role is being retrieved
   * initialized in true due we need to ensure that
   * no initial render is made without that information
   */
  const [isLoading, setIsLoading] = useState(true);

  const setToken = (tokenData) => {
    store.set(SPOTIFY_TOKEN, tokenData);
    if (tokenData) setHasToken(true);
  };

  const authenticate = async (tokenData) => {
    try {
      // Then set the token to avoid errors in expected values
      setToken(tokenData);
    } catch (error) {
      Notify.error('Ocurrió un error en el servidor al iniciar sesión.');
    }
  };

  const getToken = () => store.get(SPOTIFY_TOKEN);

  const removeSession = () => {
    store.remove(SPOTIFY_TOKEN);
    store.remove(NAME);
    store.remove(EMAIL);

    setHasToken(false);
  };

  /**
   * This effect runs whenever the user logs in or logs out
   * is used to check expiration of the token
   */
  useEffect(
    () => {
      if (hasToken) {
        const { expiration } = getToken();
        if (Date.now() > expiration) {
          removeSession();
        }
      } else {
        setIsLoading(false);
      }
    },
    [hasToken]
  );

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        hasToken,
        getProfile,
        getToken,
        removeSession,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
