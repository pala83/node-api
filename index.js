class Auto {
    constructor(marca, modelo, año, color) {
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.color = color;
    }
}

const vehiculos = [
    new Auto('Toyota', 'Corolla', 2020, 'Rojo'),
    new Auto('Honda', 'Civic', 2019, 'Azul'),
    new Auto('Ford', 'Mustang', 2021, 'Negro'),
    new Auto('BMW', 'X5', 2022, 'Blanco'),
    new Auto('Audi', 'A4', 2023, 'Plateado'),
    new Auto('Nissan', 'Sentra', 2020, 'Blanco'),
    new Auto('Chevrolet', 'Camaro', 2021, 'Rojo'),
    new Auto('Fiat', '600', 1960, 'Amarillo'),
    new Auto('Siam Di Tella', '1500', 1960, 'Verde'),
    new Auto('Peugeot', '404', 1960, 'Blanco'),
    new Auto('Ford', 'Falcon', 1960, 'Negro'),
    new Auto('Volkswagen', 'Golf', 2020, 'Gris'),
    new Auto('Mercedes', 'C-Class', 2021, 'Blanco')
]

const autosFiltrados = vehiculos.filter(auto =>
    Number(auto.año) > 2018
);

console.log(autosFiltrados.forEach(auto =>
    console.log(`Marca: ${auto.marca}, Modelo: ${auto.modelo}, Año: ${auto.año}`)
));