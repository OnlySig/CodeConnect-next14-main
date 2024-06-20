import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function connectToDatabase() {
  try {
    await db.$connect();
    console.log("Conexão com o banco de dados estabelecida.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
}

connectToDatabase();

export default db;