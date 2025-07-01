-- CreateTable
CREATE TABLE "Expensa" (
    "id" TEXT NOT NULL,
    "consorcioId" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "montoTotal" DOUBLE PRECISION NOT NULL,
    "fechaEmision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaVencimiento" TIMESTAMP(3) NOT NULL,
    "detalles" JSONB,

    CONSTRAINT "Expensa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expensa" ADD CONSTRAINT "Expensa_consorcioId_fkey" FOREIGN KEY ("consorcioId") REFERENCES "Consorcio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
