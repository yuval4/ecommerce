export interface Config {
  port: number;
  subgraphs: {
    orders: string;
    products: string;
  };
}

export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  subgraphs: {
    orders: process.env.ORDERS_SERVICE_URL,
    products: process.env.PRODUCTS_SERVICE_URL,
  },
});
