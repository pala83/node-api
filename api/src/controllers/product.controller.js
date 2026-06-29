import { productService } from '../services/product.service.js';

export const productController = {
  async getAll(req, res, next) {
    try {
      const products = await productService.getAll();
      res.json(products);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const product = await productService.getById(req.params.id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const product = await productService.update(req.params.id, req.body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      await productService.remove(req.params.id);
      res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
      next(err);
    }
  },
};
