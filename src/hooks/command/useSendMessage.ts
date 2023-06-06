import { useCallback, useState } from 'react';

import { MessageInput } from '@/data/types';

import { sendMessageService } from '@/services/sendMessageService';

const useSendMessage = () => {
  const [error, setError] = useState<null | string>();
  const [loading, setLoading] = useState(false);

  const handleSendMessage = useCallback(async (message: MessageInput) => {
    setLoading(true);
    try {
      const result = await sendMessageService(message);
      return result;
    } catch (err) {
      setError('Error interno');
    } finally {
      setLoading(false);
    }
  }, []);

  return { error, loading, handleSendMessage };
};

export default useSendMessage;
