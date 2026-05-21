import User, * as UserModel from '../models/user.model.js';

async function getAllUsers() {
    return await UserModel.getAll();
}

async function getUserById(id) {
    const user = await UserModel.getById(id);
    if (!user) throw new Error('Usuario con ID ' + id + ' no encontrado');
    return user;
}

async function createUser(data) {
    const dto = 

}