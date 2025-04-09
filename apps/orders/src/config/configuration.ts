export interface Config {
  port: number;
  connection: {
    uri: string;
    dbName: string;
  };
}

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  connection: {
    uri: process.env.DATABASE_URI || 'mongodb://localhost',
    dbName: process.env.DATABASE_NAME || 'products',
  },
});
