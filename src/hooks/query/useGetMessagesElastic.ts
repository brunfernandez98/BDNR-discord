import { useCallback, useState } from 'react';

import { MessageResponse } from '@/data/types';

import { queryMessagesServiceElastic } from '@/services/getMessagesService';

const useGetMessages = () => {
  const [error, setError] = useState<null | string>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MessageResponse[]>();

  const handleGetMessage = useCallback(
    async (searchQuery: string, searchOption: string, selectedDate: string) => {
      setLoading(true);
      try {
        const messageResponse = await queryMessagesServiceElastic(
          searchQuery,
          searchOption,
          selectedDate
        );
        console.log(messageResponse.data);
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
