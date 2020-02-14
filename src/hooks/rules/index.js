import { useState, useEffect } from 'react';
import API from 'api';
import LogRocket from 'logrocket';
import { Notify } from '@credijusto/ui-components';

export const useLoanRules = (type) => {
  const [rules, setRules] = useState([]);

  useEffect(
    () => {
      const getRules = async () => {
        try {
          setRules(await API.SimpleCredit.Rules(type));
        } catch (error) {
          LogRocket.captureException(error);
          Notify.error('Ocurrió un error al obtener las reglas');
        }
      };
      getRules();
    },
    [type]
  );

  return rules;
};

export const useLeaseRules = (type) => {
  const [rules, setRules] = useState([]);

  useEffect(
    () => {
      const getRules = async () => {
        try {
          setRules(await API.Lease.Rules(type));
        } catch (error) {
          LogRocket.captureException(error);
          Notify.error('Ocurrió un error al obtener las reglas');
        }
      };
      getRules();
    },
    [type]
  );

  return rules;
};
