import { isAffirmative } from '../utils/helpers.js';
import type { ProviderRow } from '../schemas/providerSchema.js';

export interface CsvRow {
  TIPO: string;
  RECURSO: string;
  CIDADE: string;
  UF: string;
  TELEFONE: string;
  ENDERECO_COMPLETO: string;
  BAIRRO: string;
  ESPECIALIDADE: string;
  SUPERIOR: boolean;
  SENIOR: boolean;
}

export class CsvFormatterService {
  formatRow(r: ProviderRow): CsvRow {
    return {
      TIPO: r.TIPO ?? '',
      RECURSO: r.NOME,
      CIDADE: r.CIDADE,
      UF: r.UF,
      TELEFONE: r.TELEFONE ?? '',
      ENDERECO_COMPLETO: r.ENDERECO_COMPLETO ?? '',
      BAIRRO: r.BAIRRO ?? '',
      ESPECIALIDADE: r.ESPECIALIDADE ?? '',
      SUPERIOR: isAffirmative(r.SUPERIOR),
      SENIOR: isAffirmative(r.SENIOR),
    };
  }

  formatAndSort(rows: ProviderRow[]): CsvRow[] {
    const formatted = rows.map((r) => this.formatRow(r));
    formatted.sort((a, b) => a.RECURSO.localeCompare(b.RECURSO, 'pt-BR'));
    return formatted;
  }
}
