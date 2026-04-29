import ProductSerice from "../service/product.service.js";

class ProductController {
    async getAll(req, res) {
        try {
            const products = await ProductSerice.getAllProducts();
            res.status(200).json({ success: true, data: products });
        } catch (error) {
            res.status(500).json({ success: false, message: "Aca esta fallano en el controller, asi que fijate en que le estas pifiando" });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductSerice.getProductById(id);
            res.status(200).json({ success: true, data: product });
        } catch (error) {
            res.status(404).json({ success: false, message: "Producto no encontrado" });
        }
    }

    async create(req, res) {
        try {
            const { title, price, category } = req.body;
            const newProduct = await ProductSerice.create({ title, price, category });
            res.status(201).json({ success: true, data: newProduct });
        } catch (error) {
            res.status(400).json({ success: false, message: "Error al crear el producto" });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await ProductSerice.delete(id);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            res.status(404).json({ success: false, message: "Producto no encontrado" });
        }
    }
}