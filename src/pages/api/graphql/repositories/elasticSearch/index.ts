import { Client } from '@elastic/elasticsearch';

const elasticClient = new Client({
  cloud: {
    id: process.env.NEXT_PUBLIC_ELASTICSEARCH_CLOUD_ID || '',
  },
  auth: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
  },
});

export default elasticClient;
