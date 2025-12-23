import type { FastifyInstance } from 'fastify';
import { UnitService } from '../services/unitService.js';

export async function unitRoutes(app: FastifyInstance) {
  const unitService = new UnitService();

  app.get('/units', async (req, reply) => {
    const { cidade, uf, page, limit } = req.query as Record<string, string | undefined>;
    const p = page ? parseInt(page) : 1;
    const l = limit ? parseInt(limit) : 50;

    // Normalize filters to lowercase
    const filters = {
      cidade: cidade?.toLowerCase(),
      uf: uf?.toUpperCase(), // UF é sempre uppercase
    };

    const result = await unitService.getUnitsPaginated(filters, p, l);
    return reply.send({ success: true, ...result });
  });

  // Busca por nome (RECURSO) dentro de cidade/UF
  app.get('/units/search', async (req, reply) => {
    const { cidade, uf, nome, page, limit } = req.query as Record<string, string | undefined>;
    if (!nome) {
      return reply.status(400).send({ success: false, message: 'Parametro nome é obrigatório' });
    }

    const p = page ? parseInt(page) : 1;
    const l = limit ? parseInt(limit) : 50;

    const filters = {
      cidade: cidade?.toLowerCase(),
      uf: uf?.toUpperCase(),
      nome: nome?.toLowerCase(),
    };

    const result = await unitService.getUnitsPaginated(filters, p, l);
    return reply.send({ success: true, ...result });
  });
}
