import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PokemonCard {
  id: number;
  name: string;
  pokedexId: number;
  typeId: number;
  lifePoints: number;
  size: number;
  weight: number;
  imageUrl: string;

  constructor(id: number,name: string,pokedexId: number,typeId: number,lifePoints: number,size: number,weight: number,imageUrl: string) 
  {
    this.id = id;
    this.name = name;
    this.pokedexId = pokedexId;
    this.typeId = typeId;
    this.lifePoints = lifePoints;
    this.size = size;
    this.weight = weight;
    this.imageUrl = imageUrl;
  }

  static async create()
    {
        return await prisma.pokemonCard.create({
        data: {
            name: 'Pikachu',
            pokedexId: 25,
            typeId: 5,
            lifePoints: 100,
            size: 40,
            weight: 6,
            imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        },
        });
    }

  static async findMany() 
  {
    return await prisma.pokemonCard.findMany();
  }
}