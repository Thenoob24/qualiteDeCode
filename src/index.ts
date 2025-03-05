import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import PokemonCardRouter from './Routers/PokemonCardRouter';
import UserRouter from './Routers/UserRouter';

dotenv.config(); // Load environment variables

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Ensure this middleware is set up

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokemon API',
      version: '1.0.0',
      description: 'API documentation for the Pokemon API',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./src/Routers/*.ts', './src/controllers/*.ts'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const pokemonCardRouter = new PokemonCardRouter('/pokemon-cards');
app.use(pokemonCardRouter.router);

const userRouter = new UserRouter('/users');
app.use(userRouter.router);

export const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export function stopServer() {
  server.close();
}

export default app;

