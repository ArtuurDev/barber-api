-- CreateEnum
CREATE TYPE "NivelPermissao" AS ENUM ('CLIENT', 'BARBER');

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "permission" "NivelPermissao" NOT NULL DEFAULT 'CLIENT';
