const valores = [
    200.50,
    150.75,
    300.00,
    250.25,
    1900.25,
    418970.00,
    500.00,
    750.50,
    1200.00,
    350.75,
    1425000.00,
    7427000.00,
    250000.00,
    300000.00,
    450000.00,
    600000.00,
    800000.00,
    1000000.00,
    1250000.00,
    1500000.00
]

const valorMasIVA = valores.map(valor => {
    let iva = valor * 0.21;
    console.log(`Valor: $${valor} + $${iva} IVA => Total: $${valor + iva}`);
    return valor * 1.21;
});

console.log('valores + IVA:', valorMasIVA);