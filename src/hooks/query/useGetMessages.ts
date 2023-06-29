import { useCallback, useState } from 'react';

import { MessageResponse } from '@/data/types';

import { getMessagesService } from '@/services/getMessagesService';

const useGetMessages = () => {
  const [error, setError] = useState<null | string>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MessageResponse[]>();

  const handleGetMessage = useCallback(
    async (channel_id: number, server_id: number) => {
      setLoading(true);
      try {
        const messageResponse = await getMessagesService(channel_id, server_id);
        setData(messageResponse.data);
      } catch (err) {
        setError('Error interno');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { error, loading, handleGetMessage, data };
};

export default useGetMessages;
