import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Deleting existing Pokemon cards...');
    await prisma.pokemonCard.deleteMany();
    await prisma.$queryRaw`ALTER SEQUENCE "PokemonCard_id_seq" RESTART WITH 1`;

    console.log('Deleting existing types...');
    await prisma.type.deleteMany();
    await prisma.$queryRaw`ALTER SEQUENCE "Type_id_seq" RESTART WITH 1`;

    console.log('Creating new types...');
    await prisma.type.createMany({
      data: [
        { id: 1, name: 'Normal' },
        { id: 2, name: 'Fire' },
        { id: 3, name: 'Water' },
        { id: 4, name: 'Grass' },
        { id: 5, name: 'Electric' },
        { id: 6, name: 'Ice' },
        { id: 7, name: 'Fighting' },
        { id: 8, name: 'Poison' },
        { id: 9, name: 'Ground' },
        { id: 10, name: 'Flying' },
        { id: 11, name: 'Psychic' },
        { id: 12, name: 'Bug' },
        { id: 13, name: 'Rock' },
        { id: 14, name: 'Ghost' },
        { id: 15, name: 'Dragon' },
        { id: 16, name: 'Dark' },
        { id: 17, name: 'Steel' },
        { id: 18, name: 'Fairy' },
      ],
    });

    console.log('Creating new Pokemon cards...');
    await prisma.pokemonCard.createMany({
      data: [
        {
          name: 'Bulbizarre',
          pokedexId: 1,
          typeId: 4,
          lifePoints: 45,
          size: 7,
          weight: 69,
          imageUrl: 'https://assets.pokemon.com/assets/cms2/img/cards/web/EX1/EX1_EN_1.png',
          weaknessId: 2, // Fire
        },
        {
          name: 'Salameche',
          pokedexId: 4,
          typeId: 2,
          lifePoints: 39,
          size: 6,
          weight: 85,
          imageUrl: 'https://assets.pokemon.com/assets/cms2/img/cards/web/EX1/EX1_EN_4.png',
          weaknessId: 3, // Water
        },
        {
          name: 'Carapuce',
          pokedexId: 7,
          typeId: 3,
          lifePoints: 44,
          size: 5,
          weight: 90,
          imageUrl: 'https://assets.pokemon.com/assets/cms2/img/cards/web/EX1/EX1_EN_7.png',
          weaknessId: 4, // Grass
        },
      ],
    });

    console.log('Seed completed!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
