import LocalRepository from './local.repository.js';

class UserRepository extends LocalRepository {
    constructor(){
        super('users.json');
    }

}

export default new UserRepository();