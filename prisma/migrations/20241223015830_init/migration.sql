-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "authId" UUID NOT NULL,
    "fullName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "phoneNumber" TEXT,
    "avatar" TEXT,
    "coursesId" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
