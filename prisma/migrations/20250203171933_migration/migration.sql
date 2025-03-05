-- CreateTable
CREATE TABLE "PokemonCard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pokedexId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "lifePoints" INTEGER NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "PokemonCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PokemonCard_name_key" ON "PokemonCard"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonCard_pokedexId_key" ON "PokemonCard"("pokedexId");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- AddForeignKey
ALTER TABLE "PokemonCard" ADD CONSTRAINT "PokemonCard_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
