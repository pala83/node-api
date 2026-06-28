import { z } from 'zod';

const CATEGORIES = z.enum([
  'Alimento',
  'Bebida',
  'Herramienta',
  'Limpieza',
  'Electrodomestico',
  'Juguete',
  'Tecnologia',
  'Mueble',
  'Otro',
]);

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
  price: z.number().positive(),
  sku: z.string().min(1),
  stock: z.number().int().nonnegative(),
  category: z.array(CATEGORIES).min(1).optional(),
});

export const productUpdateSchema = productSchema.partial();
