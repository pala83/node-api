// src/router/product.router.js

import ProductService from '../service/product.service.js';

export default async function Router() {
    const args = process.argv.slice(2);

    const method = args[0];
    const route = args[1];

    try {
        switch (method) {
            case 'GET':
                if (route === 'products') {
                    const products = await ProductService.getAllProducts();
                    console.log(products);
                } else if (route.startsWith('products/')) {
                    const id = route.split('/')[1];
                    const product = await ProductService.getProductById(id);
                    console.log(product);
                }
                break;

            case 'POST':
                if (route === 'products') {
                    const title = args[2];
                    const price = args[3];
                    const category = args[4];

                    const newProduct = await ProductService.create({
                        title,
                        price,
                        category
                    });

                    console.log(newProduct);
                }
                break;

            case 'DELETE':
                if (route.startsWith('products/')) {
                    const id = route.split('/')[1];
                    const result = await ProductService.delete(id);
                    console.log(result);
                }
                break;

            default:
                console.log('Método no soportado');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}