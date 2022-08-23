ALTER TABLE "application"
RENAME COLUMN "organization" TO "belongs to-organization";

ALTER TABLE "application"
RENAME CONSTRAINT "application_organization_fkey" TO "application_belongs to-organization_fkey";

ALTER INDEX "application_organization_idx" RENAME TO "application_belongs_to_organization_idx";
