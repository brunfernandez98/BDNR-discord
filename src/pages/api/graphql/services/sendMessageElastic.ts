import { v4 as uuidv4 } from 'uuid';

import { MessageInputElastic } from '@/data/types';

export const sendMessageElastic = async (
  {
    message_id,
    channel,
    user,
    text,
    links,
    hashtags,
    mentioned_users,
    pinned,
    creation_date,
  }: MessageInputElastic,
  context: any
) => {
  try {
    const id = uuidv4();

    const formattedCreationDate = creation_date || new Date().toISOString();

    const document = {
      message_id: id,
      channel,
      user,
      text,
      links,
      hashtags,
      mentioned_users,
      pinned,
      creation_date: formattedCreationDate,
    };

    await context.elasticClient.index({
      index: 'messages',
      body: document,
    });

    return {
      error: null,
      message: 'Mensaje agregado exitosamente',
    };
  } catch (error) {
    console.error('Error al agregar el mensaje:', error);
    return {
      error: 'Error al agregar el mensaje',
      message: null,
    };
  }
};
