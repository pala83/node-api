import ProductRepository from "../repository/product.repository.js";
import ProductDTO from "../dto/product.dto.js";

class ProductService {
    async getAllProducts() {
        return await ProductRepository.getAll();
    }

    async getProductById(id) {
        const product = await ProductRepository.getById(id);
        if (!product) {
            throw new Error(`Producto con id ${id} no encontrado`);
        }
        return product;
    }

    async create(data) {
        const dto = new ProductDTO(data);
        return await ProductRepository.create(dto);
    }

    async delete(id) {
        const deleted = await ProductRepository.delete(id);
        if (!deleted) {
            throw new Error(`Producto con id ${id} no encontrado para eliminar`);
        }
        return deleted;
    }
}

export default new ProductService();