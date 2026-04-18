-- AlterEnum
ALTER TYPE "Lvl" ADD VALUE 'Beginner';

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- CreateIndex
CREATE INDEX "User_lastName_idx" ON "User"("lastName");
