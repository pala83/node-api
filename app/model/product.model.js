export default class Product {
    constructor(title, price, description = "", category, image = "") {
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
    }
}