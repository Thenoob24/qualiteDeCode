import express from 'express';
import PokemonCardRouter from './Routers/PokemonCardRouter';

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Ensure this middleware is set up

const pokemonCardRouter = new PokemonCardRouter('/pokemon-cards');
app.use('/api', pokemonCardRouter.router);

export const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export function stopServer() {
  server.close();
}
