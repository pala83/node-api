import userRepository from '../repositories/user.repository.js';

class UserController {
    async getAll(req, res, next) {
        try {
            const users = await userRepository.getAll();
            res.status(200).json({ status: 'success', result: users.length, data: users });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userRepository.getById({ id });
            if (!user) {
                const error = new Error(`El usuario con ID ${id} no existe`);
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ status: 'success', data: user });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const user = await userRepository.create({ inputData: req.body });
            res.status(201).json({ status: 'success', data: user });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            if (!await userRepository.delete({ id })) {
                const error = new Error(`El usuario con ID ${id} no existe`);
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
            const user = await userRepository.update({ id, updatedData: req.body });
            if (!user) {
                const error = new Error(`El usuario con ID ${id} no existe`);
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ status: 'success', data: user });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();