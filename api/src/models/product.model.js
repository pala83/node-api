import { z } from 'zod';

// Categorias reales de la pasteleria (coinciden con los seeders y el front).
export const CATEGORY_VALUES = [
  'Torta',
  'Tarta',
  'Postre',
  'Bocado',
  'Panaderia',
  'Pasteleria',
  'Salado',
  'Especialidad',
  'Festivo',
];

const CATEGORIES = z.enum(CATEGORY_VALUES);

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
  price: z.number().positive(),
  sku: z.string().min(1),
  stock: z.number().int().nonnegative(),
  category: z.array(CATEGORIES).min(1),
  imageUrl: z.string().url().optional(),
  reviews: z.number().min(0).max(5).optional(),
});

export const productUpdateSchema = productSchema.partial();
