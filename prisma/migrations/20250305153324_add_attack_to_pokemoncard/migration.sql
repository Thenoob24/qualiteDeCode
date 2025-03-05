-- AlterTable
ALTER TABLE "PokemonCard" ADD COLUMN     "attackId" INTEGER;

-- CreateTable
CREATE TABLE "PokemonAttack" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "damages" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "PokemonAttack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PokemonCard" ADD CONSTRAINT "PokemonCard_attackId_fkey" FOREIGN KEY ("attackId") REFERENCES "PokemonAttack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonAttack" ADD CONSTRAINT "PokemonAttack_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
