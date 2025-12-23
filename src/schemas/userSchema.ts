import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  age: z.number().int().positive('Idade deve ser positiva').optional(),
});

export const updateUserSchema = createUserSchema.partial();

export const userIdSchema = z.object({
  id: z.string().uuid('ID deve ser um UUID válido'),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type UserIdDTO = z.infer<typeof userIdSchema>;
