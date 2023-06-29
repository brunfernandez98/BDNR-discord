import { Client } from '@elastic/elasticsearch';

const elasticClient = new Client({
  cloud: {
    id: 'BDNR-Discord:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyRjOWY1NjA2ZDFkOWE0YTI2YTRhODc0Y2IwMGE4YTI1MCRhZTVjZGQ5YzBjOTA0NmRjOGFlNGFhMmMyMjMzNzlhYQ==',
  },
  auth: {
    apiKey: 'MTNUQkFZa0JoQXhMWlo0M1Y1TWo6ejZzYjZRV3hTaC1ZdUxJVERhQl9tQQ==',
  },
});

export default elasticClient;
