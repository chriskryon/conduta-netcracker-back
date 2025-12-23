import { FastifyInstance } from 'fastify';
import { CsvService } from '../services/csvService.js';

export async function providerRoutes(app: FastifyInstance) {
  const csvService = new CsvService();

  app.get('/providers', async (req, reply) => {
    const { cidade, uf, especialidade, nome, limit } = req.query as Record<string, string | undefined>;
    const data = await csvService.getProviders({ cidade, uf, especialidade, nome });
    const limited = typeof limit === 'string' ? data.slice(0, Math.max(0, parseInt(limit))) : data;
    return reply.send({ success: true, count: limited.length, data: limited });
  });

  app.get('/providers/health', async () => ({ status: 'ok' }));
}
