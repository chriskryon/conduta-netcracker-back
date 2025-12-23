import Fastify from 'fastify';
import cors from '@fastify/cors';
import { unitRoutes } from './routes/unitRoutes.js';
import { csvRoutes } from './routes/csvRoutes.js';

const app = Fastify({
  logger: true,
});

// CORS: aceitar requisições de qualquer origem
app.register(cors, {
  origin: true,
});

// Registrar rotas
app.register(unitRoutes);
app.register(csvRoutes);

// Health check
app.get('/health', async (request, reply) => {
  return { status: 'ok' };
});

// Iniciar servidor
async function start() {
  try {
    const port = Number(process.env.PORT ?? '5000');
    await app.listen({ port, host: '0.0.0.0' });
    app.log.info(`🚀 Servidor rodando em http://0.0.0.0:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
