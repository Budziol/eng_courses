-- DropIndex
DROP INDEX "Meeting_userId_idx";

-- CreateIndex
CREATE INDEX "Meeting_userId_date_status_idx" ON "Meeting"("userId", "date", "status");
