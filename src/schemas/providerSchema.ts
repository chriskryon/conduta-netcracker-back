import { z } from 'zod';

export const providerRowSchema = z.object({
  TIPO: z.string().trim().min(1).optional(),
  UNIMED: z.string().trim().optional(),
  NOME: z.string().trim().min(1),
  NOME_2: z.string().trim().optional(),
  CIDADE: z.string().trim().min(1),
  UF: z.string().trim().length(2),
  TELEFONE: z.string().trim().optional(),
  ENDERECO_COMPLETO: z.string().trim().optional(),
  ENDERECO: z.string().trim().optional(),
  NUMERO: z.string().trim().optional(),
  COMPLEMENTO: z.string().trim().optional(),
  BAIRRO: z.string().trim().optional(),
  CEP: z
    .string()
    .trim()
    .regex(/^\d{5}-?\d{3}$/,{message:'CEP deve ser no formato 00000-000 ou 00000000'})
    .optional(),
  ESPECIALIDADE: z.string().trim().optional(),
  CPF_CNPJ: z.string().trim().optional(),
  SUPERIOR: z.string().trim().optional(),
  SENIOR: z.string().trim().optional(),
});

export type ProviderRow = z.infer<typeof providerRowSchema>;
