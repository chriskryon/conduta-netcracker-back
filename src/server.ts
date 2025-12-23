import Fastify from 'fastify';
import { unitRoutes } from './routes/unitRoutes.js';
import { csvRoutes } from './routes/csvRoutes.js';

const app = Fastify({
  logger: true,
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
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 Servidor rodando em http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
