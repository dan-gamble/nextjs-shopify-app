-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "shopifyDomain" TEXT NOT NULL,
    "shopifyToken" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop.shopifyDomain_unique" ON "Shop"("shopifyDomain");
