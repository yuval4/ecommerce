# NestJS Project with MongoDB and Transactions 🚀

This project is based on **NestJS** 🐱‍🏍 and connects to a **MongoDB** database 🗄️ with **Transactions** support. In MongoDB, to use transactions, you need to run a **Replica Set** even in local environments 🖥️.

## 📦 Project Structure

This is a **monorepo** that includes multiple services:

- `products` 🛒 – Manages products and categories
- `orders` 📦 – Manages orders and product-orders
- `gateway` 🌉 – Apollo Federation gateway for stitching all services

## ⚙️ Environment Variables

### 🔹 Products Service (`apps/products`)

Create a `.env` file inside `apps/products`:

```env
PORT=3002

DATABASE_URI=mongodb://localhost:27017/?replicaSet=rs0
DATABASE_NAME=ecommerce
```

### 🔹 Orders Service (`apps/orders`)

Create a `.env` file inside `apps/orders`:

```env
PORT=3001

DATABASE_URI=mongodb://localhost:27017/?replicaSet=rs0
DATABASE_NAME=ecommerce
```

### 🔹 Gateway Service (`apps/gateway`)

Create a `.env` file inside `apps/gateway`:

```env
PORT=3000

ORDERS_SERVICE_URL=http://localhost:3001/graphql
PRODUCTS_SERVICE_URL=http://localhost:3002/graphql
```

## How to Run the Project:

### Prerequisites:

- **Node.js** (version 14 or higher) 🌐
- **MongoDB** (in Replica Set mode) 🔧

### Step 1: Run MongoDB with Replica Set

1. Run MongoDB with the `--replSet` parameter:

   ```bash
   mongod --replSet rs0 --port 27017 --dbpath /path/to/your/data/db --bind_ip 127.0.0.1
   ```

````

2. In MongoDB shell (mongosh), initiate the Replica Set:

   ```bash
   rs.initiate()
   ```

3. Check that the Replica Set is running:
   ```bash
   rs.status()
   ```

### Step 2: Configure NestJS 🔧

1. Install the project dependencies:

   ```bash
   npm install
   ```

2. Update the MongoDB connection in NestJS to include the replicaSet parameter:
   ```bash
   MongooseModule.forRoot('mongodb://localhost:27017/yourDatabase?replicaSet=rs0')
   ```

### Step 3: Run the Application 🚀

1. Start the NestJS server locally:

   ```bash
   npm run dev:orders
   ```

   ```bash
   npm run dev:products
   ```

   ```bash
   npm run dev:gateway
   ```

2. Now you can perform your GraphQL queries and utilize transactions in the system 💻.

### Description 📜

This project includes Product and Order modules, with functionalities for creating, updating, and deleting entities. Each order creation also creates a ProductOrder and performs transactions to ensure data integrity 💪.
````
