import { useCallback, useState } from 'react';

import { MessageInputElastic } from '@/data/types';

import { sendMessageElasticService } from '@/services/sendMessageService';

const useSendMessageElastic = () => {
  const [error, setError] = useState<null | string>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);

  const handleSendMessage = useCallback(
    async (message: MessageInputElastic) => {
      setLoading(true);
      try {
        const result = await sendMessageElasticService(message);
        setMessage(result.message);
      } catch (err) {
        setMessageError('Ocurrio un error al ingresar un mensaje');
        setError('Error interno');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    error,
    loading,
    handleSendMessage,
    message,
    messageError,
    setMessage,
    setMessageError,
  };
};

export default useSendMessageElastic;
