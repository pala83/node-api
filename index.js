import axios from 'axios';

// Aca estaria resuelto con promesas simples
const API_URL = 'https://rickandmortyapi.com/api/';
const args = process.argv.slice(2);

const lugares = axios.get(`${API_URL}location`)
    .then(response => {
        return response.data.results;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        return [];
    })
    .finally(() => {
        console.log('Petición finalizada');
    });

const limite = Number.parseInt(args[0], 10);
const resultados = await lugares;

if (Number.isNaN(limite)) {
    console.warn('El argumento proporcionado no es un número válido. Mostrando todos los lugares.');
}

const response = Number.isNaN(limite) || limite <= 0
    ? resultados
    : resultados.slice(0, limite);

console.log('Lugares: ', response);

// Aca estaria resuelto con funciones utilizando async/await
async function obtenerPersonajes() {
    const limite = Number.parseInt(args[0], 10);

    try {
        const response = await axios.get(`${API_URL}character`);
        const resultados = response.data.results;

        if (Number.isNaN(limite)) {
            console.warn('El argumento proporcionado no es un número válido. Mostrando todos los personajes.');
        }

        const personajes = Number.isNaN(limite) || limite <= 0
            ? resultados
            : resultados.slice(0, limite);

        console.log('Personajes: ', personajes);
        console.log(args);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    } finally {
        console.log('Petición finalizada');
    }
}

await obtenerPersonajes();