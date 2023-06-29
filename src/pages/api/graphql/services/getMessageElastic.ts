import { MessageResponseElastic } from '@/data/types';

export const queryMessagesElastic = async (
  searchQuery: any,
  searchOption: string,
  selectedDate: any,
  context: any
): Promise<MessageResponseElastic[]> => {
  try {
    const body: any = {
      query: {
        bool: {
          must: [] as any[],
        },
      },
    };

    console.log(searchQuery);

    console.log('hola', searchOption);

    if (searchOption === 'link') {
      body.query.bool.must.push({ exists: { field: 'link' } });
    } else if (searchOption === 'creation_date' && selectedDate) {
      const rangeQuery = {
        range: { creation_date: { gte: new Date(selectedDate) } },
      };
      body.query.bool.must.push(rangeQuery);
    } else if (searchOption === 'channel') {
      body.query.bool.must.push({ match: { channel: searchQuery } });
    } else if (searchOption === 'server') {
      body.query.bool.must.push({ term: { server: searchQuery } });
    } else if (searchOption === 'hashtag') {
      body.query.bool.must.push({ term: { hashtags: searchQuery } });
    } else if (searchOption === 'text') {
      body.query.bool.must.push({ match: { text: searchQuery } });
    } else if (
      searchOption === 'video' ||
      searchOption === 'file' ||
      searchOption === 'audio' ||
      searchOption === 'image'
    ) {
      body.query.bool.must.push({ multimedia: { field: searchOption } });
    }

    const result = await context.elasticClient.search({
      index: 'messages',
      body,
    });

    if (result?.hits?.total.value === 0) {
      return [];
    }

    const messages: MessageResponseElastic[] = result?.hits?.hits.map(
      (hit: any) => {
        const creationDate = new Date(hit._source.creation_date);
        const fecha = creationDate.toISOString().split('T')[0];
        const horas = creationDate.getHours().toString().padStart(2, '0');
        const minutos = creationDate.getMinutes().toString().padStart(2, '0');
        return { ...hit._source, ...{ fecha, horas, minutos } };
      }
    );

    return messages;
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    return [];
  }
};
