const args = process.argv.slice(2);
switch (args[0]) {
    case 'GET':
        console.log('Toma un dato');
        break;
    case 'POST':
        console.log(args[1] ? `Recibimos ${args[1]} satisfactoriamente` : 'El cuerpo de la petición está vacío');
        break;
    case 'PUT':
        console.log(args[1] ? `Modificamos el item con id: ${args[1]} satisfactoriamente` : 'El cuerpo de la petición está vacío');
        break;
    case 'DELETE':
        console.log(args[1] ? `El item con id: ${args[1]} se eliminó con éxito` : 'El cuerpo de la petición está vacío');
        break;
    default:
        console.log('Comando no reconocido. Usa "GET", "POST", "PUT" o "DELETE".');
}