-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createdBy" TEXT NOT NULL DEFAULT 'system',
ADD COLUMN     "deletedBy" TEXT,
ADD COLUMN     "deletedOn" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedBy" TEXT NOT NULL DEFAULT 'system';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT NOT NULL DEFAULT 'system',
ADD COLUMN     "deletedBy" TEXT,
ADD COLUMN     "deletedOn" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT NOT NULL DEFAULT 'system';
