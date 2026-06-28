import { productRepository } from '../repositories/product.repository.js';

const notFound = () => {
  const err = new Error('Product not found');
  err.statusCode = 404;
  return err;
};

const skuConflict = () => {
  const err = new Error('Product SKU already exists');
  err.statusCode = 409;
  return err;
};

export const productService = {
  async getAll() {
    return productRepository.findAll();
  },

  async getById(id) {
    const product = await productRepository.findById(id);
    if (!product) throw notFound();
    return product;
  },

  async create(data) {
    const existing = await productRepository.findBySku(data.sku);
    if (existing) throw skuConflict();
    return productRepository.create(data);
  },

  async update(id, data) {
    const product = await productRepository.update(id, data);
    if (!product) throw notFound();
    return product;
  },

  async remove(id) {
    const deleted = await productRepository.remove(id);
    if (!deleted) throw notFound();
  },
};
