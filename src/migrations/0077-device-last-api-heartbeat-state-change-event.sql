ALTER TABLE "device"
ADD COLUMN IF NOT EXISTS "last api heartbeat state change event" TIMESTAMP NULL;
