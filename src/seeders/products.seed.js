import { productRepository } from "../repositories/product.repository.js";

export const products = [
  {
    name: "Torta Marquise",
    description:
      "Clasica torta de chocolate semiamargo con base crujiente y centro cremoso.",
    price: 28.5,
    sku: "REP-MARQ-001",
    stock: 12,
    category: ["Alimento"],
  },
  {
    name: "Rogel",
    description:
      "Capas de masa crocante rellenas de dulce de leche y cubiertas con merengue italiano.",
    price: 25.9,
    sku: "REP-ROGEL-002",
    stock: 10,
    category: ["Alimento"],
  },
  {
    name: "Pavlova de Frutos Rojos",
    description:
      "Merengue crujiente por fuera y suave por dentro con crema y frutos rojos frescos.",
    price: 30,
    sku: "REP-PAVL-003",
    stock: 8,
    category: ["Alimento"],
  },
  {
    name: "Lemon Pie",
    description:
      "Tarta de masa sable con cremoso relleno de limon y merengue dorado.",
    price: 22.5,
    sku: "REP-LEMON-004",
    stock: 15,
    category: ["Alimento"],
  },
  {
    name: "Cake Navideño",
    description:
      "Budin especiado con frutas confitadas, nueces y un toque de canela.",
    price: 34.99,
    sku: "REP-XMAS-005",
    stock: 6,
    category: ["Alimento"],
  },
  {
    name: "Carrot Cake",
    description:
      "Bizcocho humedo de zanahoria y nueces con frosting de queso crema.",
    price: 26.75,
    sku: "REP-CARROT-006",
    stock: 14,
    category: ["Alimento"],
  },
  {
    name: "Apple Crumble",
    description:
      "Manzanas caramelizadas con canela y cobertura crocante de streusel.",
    price: 19.9,
    sku: "REP-APPLE-007",
    stock: 18,
    category: ["Alimento"],
  },
  {
    name: "Trufas de Chocolate",
    description:
      "Bombones artesanales de ganache de chocolate belga espolvoreados con cacao.",
    price: 14.5,
    sku: "REP-TRUF-008",
    stock: 40,
    category: ["Alimento"],
  },
  {
    name: "Cheesecake de Maracuya",
    description:
      "Tarta cremosa de queso sobre base de galleta con coulis de maracuya.",
    price: 27.9,
    sku: "REP-CHEESE-009",
    stock: 11,
    category: ["Alimento"],
  },
  {
    name: "Macarons Surtidos",
    description:
      "Caja de macarons franceses en variedad de sabores y colores pastel.",
    price: 18,
    sku: "REP-MACAR-010",
    stock: 22,
    category: ["Alimento"],
  },
];

export const seedProducts = async () => {
  for (const product of products) {
    const existing = await productRepository.findBySku(product.sku);
    if (existing) {
      console.log(`⏭  Producto omitido (SKU ya existe): ${product.sku}`);
      continue;
    }
    await productRepository.create(product);
    console.log(`✅ Producto creado: ${product.name} (${product.sku})`);
  }
};
