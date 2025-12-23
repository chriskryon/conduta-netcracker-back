import path from 'path';
import { promises as fs } from 'fs';
import { parse } from 'csv-parse/sync';
import iconv from 'iconv-lite';
import { providerRowSchema, type ProviderRow } from '../schemas/providerSchema.js';

export interface ProviderFilters {
  cidade?: string;
  uf?: string;
  especialidade?: string;
  nome?: string;
}

function canonicalizeKey(key: string): string {
  const normalized = key
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, '_')
    .replace(/[^A-Za-z0-9_]/g, '')
    .toUpperCase();
  const alias: Record<string, string> = {
    UNIMED: 'UNIMED',
    RECURSO: 'NOME',
    RECURSO_COMPLETO: 'NOME_2',
    CIDADE: 'CIDADE',
    UF: 'UF',
    TELEFONE: 'TELEFONE',
    ENDERECO: 'ENDERECO',
    ENDERECO_COMPLETO: 'ENDERECO_COMPLETO',
    NUMERO: 'NUMERO',
    BAIRRO: 'BAIRRO',
    CEP: 'CEP',
    ESPECIALIDADE: 'ESPECIALIDADE',
    CPF_CNPJ: 'CPF_CNPJ',
    SUPERIOR: 'SUPERIOR',
    SENIOR: 'SENIOR',
    // Backward compatibility
    NOME: 'NOME',
    NOME_2: 'NOME_2',
    TIPO: 'TIPO',
  };
  return alias[normalized] ?? normalized;
}

export class CsvService {
  private csvPath: string;

  constructor(csvRelativePath = 'public/data.csv') {
    this.csvPath = path.resolve(process.cwd(), csvRelativePath);
  }

  async getProviders(filters: ProviderFilters = {}): Promise<ProviderRow[]> {
    const raw = await fs.readFile(this.csvPath);
    // Decode as Windows-1252 (Latin1) to handle common spreadsheet exports
    const csvContent = iconv.decode(raw, 'latin1');
    const rows = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      delimiter: ';',
      bom: true,
      relax_quotes: true,
      trim: true,
    });

    const validated: ProviderRow[] = [];
    for (const row of rows as Record<string, unknown>[]) {
      const normalized = Object.fromEntries(
        Object.entries(row).map(([k, v]) => [
          canonicalizeKey(k),
          typeof v === 'string' ? v.trim() : v,
        ])
      );
      const result = providerRowSchema.safeParse(normalized);
      if (result.success) {
        validated.push(result.data);
      }
    }

    return validated.filter((p) => {
      if (filters.cidade && p.CIDADE.toLowerCase() !== filters.cidade.toLowerCase()) return false;
      if (filters.uf && p.UF.toUpperCase() !== filters.uf.toUpperCase()) return false;
      if (
        filters.especialidade &&
        ((p.ESPECIALIDADE ?? '').toLowerCase().includes(filters.especialidade.toLowerCase()) === false)
      )
        return false;
      if (filters.nome) {
        const nome = filters.nome.toLowerCase();
        const n1 = p.NOME.toLowerCase().includes(nome);
        const n2 = (p.NOME_2 ?? '').toLowerCase().includes(nome);
        if (!n1 && !n2) return false;
      }
      return true;
    });
  }
}
