-- AlterEnum
ALTER TYPE "NivelPermissao" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "emailValidated" BOOLEAN NOT NULL DEFAULT false;
