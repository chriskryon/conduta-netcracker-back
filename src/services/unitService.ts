import { CsvService } from './csvService.js';
import { isAffirmative, paginate, type PaginatedResult } from '../utils/helpers.js';
import type { ProviderRow } from '../schemas/providerSchema.js';

export interface UnitCard {
  nome: string;
  cidade: string;
  uf: string;
  enderecoCompleto?: string;
  especialidades: string[];
  superior: boolean;
  senior: boolean;
  tipo?: string;
  unimed?: string;
  telefone?: string;
}

export class UnitService {
  private csv = new CsvService();

  async getUnits(filters: { cidade?: string; uf?: string; nome?: string }): Promise<UnitCard[]> {
    const rows = await this.csv.getProviders(filters);
    return this.aggregateUnits(rows);
  }

  async getUnitsPaginated(
    filters: { cidade?: string; uf?: string; nome?: string },
    page: number = 1,
    limit: number = 50
  ): Promise<PaginatedResult<UnitCard>> {
    const rows = await this.csv.getProviders(filters);
    const units = this.aggregateUnits(rows);
    return paginate(units, page, limit);
  }

  private aggregateUnits(rows: ProviderRow[]): UnitCard[] {
    const map = new Map<string, UnitCard & { _especialidades: Set<string> }>();

    const keyOf = (r: ProviderRow) =>
      `${r.NOME.trim().toLowerCase()}|${r.CIDADE.trim().toLowerCase()}|${r.UF.trim().toUpperCase()}`;

    for (const r of rows) {
      const key = keyOf(r);
      const existing = map.get(key);

      if (!existing) {
        map.set(key, {
          nome: r.NOME.trim(),
          cidade: r.CIDADE.trim(),
          uf: r.UF.trim().toUpperCase(),
          enderecoCompleto: r.ENDERECO_COMPLETO?.trim(),
          tipo: r.TIPO?.trim(),
          unimed: r.UNIMED?.trim(),
          telefone: r.TELEFONE?.trim(),
          especialidades: [],
          superior: isAffirmative(r.SUPERIOR ?? undefined),
          senior: isAffirmative(r.SENIOR ?? undefined),
          _especialidades: new Set<string>(),
        });
      } else {
        existing.superior = existing.superior || isAffirmative(r.SUPERIOR ?? undefined);
        existing.senior = existing.senior || isAffirmative(r.SENIOR ?? undefined);
      }

      const unit = map.get(key)!;
      const espec = (r.ESPECIALIDADE ?? '').trim();
      if (espec) unit._especialidades.add(espec);
    }

    return Array.from(map.values()).map(({ _especialidades, ...card }) => ({
      ...card,
      especialidades: Array.from(_especialidades).sort(),
    }));
  }
}
