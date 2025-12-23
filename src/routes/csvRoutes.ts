import type { FastifyInstance } from 'fastify';
import { CsvService } from '../services/csvService.js';
import { CsvFormatterService } from '../services/csvFormatterService.js';
import { paginate } from '../utils/helpers.js';

export async function csvRoutes(app: FastifyInstance) {
  const csvService = new CsvService();
  const formatter = new CsvFormatterService();

  app.get('/csv', async (req, reply) => {
    const { cidade, uf, page, limit } = req.query as Record<string, string | undefined>;

    // Normalize filters to lowercase
    const filters = {
      cidade: cidade?.toLowerCase(),
      uf: uf?.toUpperCase(), // UF é sempre uppercase
    };

    const rows = await csvService.getProviders(filters);
    const formatted = formatter.formatAndSort(rows);

    const p = page ? parseInt(page) : 1;
    const l = limit ? parseInt(limit) : 20;
    const result = paginate(formatted, p, l);

    return reply.send({ success: true, ...result });
  });
}
