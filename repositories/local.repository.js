import { randomUUID } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class LocalRepository {
    constructor(filename) {
        this._filePath = path.join(__dirname, '../data', filename);
    }

    async _read() {
        try {
            const data = await readFile(this._filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if(error.code === 'ENOENT') {
                await this._write([]);
                return [];
            }
            throw error;
        }
    }

    async _write(data) {
        await writeFile(this._filePath, JSON.stringify(data, null, 2), 'utf8');
    }

    async getAll() {
        const data = await this._read();
        return data;
    }

    async getById({ id }) {
        const data = await this._read();
        const register = data.find((i) => i.id === id);
        return register;
    }

    async create({ inputData }) {
        const data = await this._read();
        const newRegister = {
            id: randomUUID(),
            ...inputData,
        };

        data.push(newRegister);
        await this._write(data);
        return newRegister;
    }

    async update({ id, updatedData }) {
        const data = await this._read();
        const index = data.findIndex((i) => i.id === id);
        if (index === -1) return null;
        data[index] = {
            ...data[index],
            ...updatedData,
        };
        await this._write(data);
        return data[index];
    }

    async delete({ id }) {
        const data = await this._read();
        const index = data.findIndex((i) => i.id === id);

        if (index === -1) return false;

        data.splice(index, 1);
        await this._write(data);
        return true;
    }
}

export default LocalRepository;