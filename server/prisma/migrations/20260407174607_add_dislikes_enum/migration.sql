/*
  Warnings:

  - Changed the type of `value` on the `Like` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "VoteValue" AS ENUM ('LIKE', 'DISLIKE');

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "value",
ADD COLUMN     "value" "VoteValue" NOT NULL;
