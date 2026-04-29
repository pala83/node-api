export default class ProductDTO {
    constructor({ title, price, category }) {
        this.title = title;
        this.price = price;
        this.category = category;
    }

    validateTitle() {
        if (typeof this.title !== 'string' || this.title.trim() === '') {
            throw new Error('El título es obligatorio y debe ser una cadena de texto');
        }
        return this.title.trim();
    }

    validatePrice() {
        const parsedPrice = parseFloat(this.price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            throw new Error('El precio debe ser un número positivo');
        }
        this.price = parsedPrice;
    }

    validateCategory() {
        if (typeof this.category !== 'string' || this.category.trim() === '') {
            throw new Error('La categoría es obligatoria y debe ser una cadena de texto');
        }
        return this.category.trim();
    }
}