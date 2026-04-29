import { API_URL } from "../config/db.config.js";

class ProductRepository {
    async getAll() {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error(`Fakestore no me quiere devolver los productos: ${response.statusText}`);
        }
        return await response.json();
    }

    async getById(id) {
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error(`Fakestore no me quiere devolver el producto de ID ${id}: ${response.statusText}`);
        }
        return await response.json();
    }

    async create(data) {
        const response = await fetch(`${API_URL}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Fakestore no me quiere crear el producto: ${response.statusText}`);
        }
        return await response.json();
    }

    async delete(id) {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Fakestore no quiere eliminar el producto de ID ${id}: ${response.statusText}`);
        }
        return await response.json();
    }
}

export default new ProductRepository();