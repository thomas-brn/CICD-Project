-- CreateTable
CREATE TABLE "city" (
    "id" SERIAL NOT NULL,
    "department_code" TEXT NOT NULL,
    "insee_code" TEXT,
    "zip_code" TEXT,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);
