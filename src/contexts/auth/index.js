import React, { useState, useEffect } from 'react';
import LogRocket from 'logrocket';
import PropTypes from 'prop-types';
import store from 'store';

import { Notify } from '@credijusto/ui-components';
import API from 'api';

const AuthContext = React.createContext();
export const PRICY_TOKEN = 'pricyToken';
export const GOOGLE_ID = 'googleId';
export const NAME = 'name';
export const EMAIL = 'email';

/**
 * Returns the user profile from the local storage
 * @returns {Object}
 */
const getProfile = () => {
  const googleId = store.get(GOOGLE_ID);
  const name = store.get(NAME);
  const email = store.get(EMAIL);
  return {
    googleId,
    name,
    email,
  };
};

export const AuthProvider = ({ children }) => {
  const [hasToken, setHasToken] = useState(!!store.get(PRICY_TOKEN));

  /**
   * Used to know if the user role is being retrieved
   * initialized in true due we need to ensure that
   * no initial render is made without that information
   */
  const [isLoading, setIsLoading] = useState(true);

  const setToken = (token) => {
    store.set(PRICY_TOKEN, token);
    if (token) setHasToken(true);
  };

  const setProfile = ({ googleId, name, email }) => {
    store.set(GOOGLE_ID, googleId);
    store.set(NAME, name);
    store.set(EMAIL, email);
  };

  const authenticate = async ({ tokenId, profileObj, isFirebaseLogin }) => {
    try {
      const { token } = await API.Login.authenticate({
        code: tokenId,
        ...(isFirebaseLogin && { login_method: 'firebase' }),
        ...(isFirebaseLogin && { email: profileObj.email }),
      });
      // First set the profile info
      setProfile(profileObj);
      // Then set the token to avoid errors in expected values
      setToken(token);
    } catch (error) {
      LogRocket.captureException(error);
      Notify.error('Ocurrió un error en el servidor al iniciar sesión.');
    }
  };

  const getToken = () => store.get(PRICY_TOKEN);

  const removeSession = () => {
    store.remove(PRICY_TOKEN);
    store.remove(GOOGLE_ID);
    store.remove(NAME);
    store.remove(EMAIL);

    setHasToken(false);
  };

  /**
   * This effect runs whenever the user logs in or logs out
   * is used to initialize logRocket and fetch user
   * information
   */
  useEffect(
    () => {
      if (hasToken) {
        const { googleId, email, name } = getProfile();
        LogRocket.identify(googleId, { email, name });
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
        setProfile,
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
