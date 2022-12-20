-- Boolean type conversions

ALTER TABLE "application type"
ALTER COLUMN "supports web url" SET DATA TYPE BOOLEAN USING b::BOOLEAN,
ALTER COLUMN "supports multicontainer" SET DATA TYPE BOOLEAN USING b::BOOLEAN,
ALTER COLUMN "supports gateway mode" SET DATA TYPE BOOLEAN USING b::BOOLEAN,
ALTER COLUMN "requires payment" SET DATA TYPE BOOLEAN USING b::BOOLEAN,
ALTER COLUMN "is legacy" SET DATA TYPE BOOLEAN USING b::BOOLEAN;

ALTER TABLE "application"
ALTER COLUMN "should track latest release" SET DATA TYPE BOOLEAN USING b::BOOLEAN,
ALTER COLUMN "is host" SET DATA TYPE BOOLEAN USING b::BOOLEAN,
ALTER COLUMN "is archived" SET DATA TYPE BOOLEAN USING b::BOOLEAN,
ALTER COLUMN "is public" SET DATA TYPE BOOLEAN USING b::BOOLEAN;

ALTER TABLE "device"
ALTER COLUMN "is online" SET DATA TYPE BOOLEAN USING b::BOOLEAN,
ALTER COLUMN "is connected to vpn" SET DATA TYPE BOOLEAN USING b::BOOLEAN,
ALTER COLUMN "is undervolted" SET DATA TYPE BOOLEAN USING b::BOOLEAN,
ALTER COLUMN "is web accessible" SET DATA TYPE BOOLEAN USING b::BOOLEAN;

ALTER TABLE "release"
ALTER COLUMN "is invalidated" SET DATA TYPE BOOLEAN USING b::BOOLEAN,
ALTER COLUMN "is passing tests" SET DATA TYPE BOOLEAN USING b::BOOLEAN,
ALTER COLUMN "is final" SET DATA TYPE BOOLEAN USING b::BOOLEAN;


-- JSON type conversions

ALTER TABLE "device type"
ALTER COLUMN "contract" SET DATA TYPE JSONB USING b::JSONB;

ALTER TABLE "image"
ALTER COLUMN "contract" SET DATA TYPE JSONB USING b::JSONB;

ALTER TABLE "release"
ALTER COLUMN "composition" SET DATA TYPE JSONB USING b::JSONB,
ALTER COLUMN "contract" SET DATA TYPE JSONB USING b::JSONB;
