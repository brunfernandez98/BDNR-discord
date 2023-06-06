import cassandra from 'cassandra-driver';

const cassandraClient = new cassandra.Client({
  contactPoints: [process.env.NEXT_PUBLIC_CASSANDRA_URL || 'localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'discord',
});

export default cassandraClient;
