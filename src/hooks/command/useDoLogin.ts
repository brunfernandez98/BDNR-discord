import { useCallback, useState } from 'react';

import { useAppDispatch } from '@/hooks';

import { UserCredential } from '@/data/types';

import { setUser } from '@/stores/mainSlice';

const useDoLogin = () => {
  const [error, setError] = useState<null | string>();
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleLogin = useCallback(
    async (credential: UserCredential) => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Esperar 3 segundos
        const result = await dispatch(setUser(credential));
        return result;
      } catch (err) {
        setError('Error interno');
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return { error, loading, handleLogin };
};

export default useDoLogin;
