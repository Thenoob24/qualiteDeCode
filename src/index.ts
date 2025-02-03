import express from 'express';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import prisma from './client';

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());



export const server = app.listen(port);

// Routes GET
app.get('/pokemons-cards', async (req: Request, res: Response) => {
  const pokemons = await prisma.pokemonCard.findMany();
  res.status(200).json(pokemons);
});

app.get('/pokemons-cards/:pokemonCardId', (req: Request, res: Response) => {
  res.status(200).send (`pokemon card ${req.params.pokemonCardId}`);
});

// Routes POST
app.post('/pokemon-cards', async (req: Request, res: Response) => {
  const { name, pokedexId, typeId, lifePoints, size, weight, imageUrl } = req.body;
  console.log(req.body);
  const newPokemonCard = await prisma.pokemonCard.create();
  res.status(201).json(newPokemonCard);
  res.status(201).send ('pokemon card created');
});

// Routes PATCH
app.patch('/pokemon-cards/:pokemonCardId', (req: Request, res: Response) => {
  res.status(200).send ('pokemon card updated');
});

// Routes DELETE
app.delete('/pokemon-cards/:pokemonCardId', (req: Request, res: Response) => {
  res.status(204).send ('pokemon card deleted');
});


export function stopServer() {
  server.close();
}
