import LocalRepository from './local.repository.js';

class ProductRepository extends LocalRepository {
    constructor(){
        super('products.json');
    }

}

export default new ProductRepository();