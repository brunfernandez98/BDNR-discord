import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

import cassandraClient from '@/pages/api/graphql/repositories/cassandra';
import elasticClient from '@/pages/api/graphql/repositories/elasticSearch';
import resolvers from '@/pages/api/graphql/resolvers';
import typeDefs from '@/pages/api/graphql/schema';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

cassandraClient
  .connect()
  .then(() => {
    console.log('Conexión establecida con Cassandra');
  })
  .catch((error) => {
    console.error('Error al conectar a Cassandra:', error);
  });

// req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req, cassandraClient, elasticClient }),
});

export default handler;

export async function GET(request: any) {
  return handler(request);
}

export async function POST(request: any) {
  return handler(request);
}
