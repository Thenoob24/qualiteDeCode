-- AlterTable
ALTER TABLE "PokemonCard" ADD COLUMN     "weaknessId" INTEGER;

-- AddForeignKey
ALTER TABLE "PokemonCard" ADD CONSTRAINT "PokemonCard_weaknessId_fkey" FOREIGN KEY ("weaknessId") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
