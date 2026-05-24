import productRepository from '../repositories/product.repository.js';

class ProductController {
    async getAll(req, res, next) {
        try {
            const products = await productRepository.getAll();
            res.status(200).json({ status: 'success', result: products.length, data: products });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await productRepository.getById({ id });
            if (!product) {
                const error = new Error(`El producto con ID ${id} no existe`);
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ status: 'success', data: product });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const product = await productRepository.create({ inputData: req.body });
            res.status(201).json({ status: 'success', data: product });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            if (!await productRepository.delete({ id })) {
                const error = new Error(`El producto con ID ${id} no existe`);
                error.statusCode = 404;
                throw error;
            }
            res.status(204).json({ status: 'success', data: null });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const product = await productRepository.update({ id, updatedData: req.body });
            if (!product) {
                const error = new Error(`El producto con ID ${id} no existe`);
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ status: 'success', data: product });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();