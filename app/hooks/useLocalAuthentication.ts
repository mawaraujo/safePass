import {useEffect, useState} from 'react';
import useAppState from './useAppState';
import {LocalAuthentication} from '../modules';

interface UseLocalAuthentication {
  authorized: boolean
}

export default function useLocalAuthentication(): UseLocalAuthentication {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const appState = useAppState();

  const handlePrompt = async () => {
    if (authorized) {
      return;
    }

    try {
      const response = await LocalAuthentication.authenticate({
        promptTitle: 'Hello worlds',
        promptSubTitle: 'Loginsss',
      });

      setAuthorized(response.success);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (appState.isActive) {
      handlePrompt();

    } else {
      setAuthorized(false);
    }
  }, [appState]);

  return {
    authorized,
  };
}