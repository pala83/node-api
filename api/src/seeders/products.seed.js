import { productRepository } from "../repositories/product.repository.js";

export const products = [
  {
    name: "Torta Marquise",
    description:
      "Clasica torta de chocolate semiamargo con base crujiente y centro cremoso.",
    price: 28.5,
    sku: "REP-MARQ-001",
    stock: 12,
    category: ["Torta"],
  },
  {
    name: "Rogel",
    description:
      "Capas de masa crocante rellenas de dulce de leche y cubiertas con merengue italiano.",
    price: 25.9,
    sku: "REP-ROGEL-002",
    stock: 10,
    category: ["Torta"],
  },
  {
    name: "Pavlova de Frutos Rojos",
    description:
      "Merengue crujiente por fuera y suave por dentro con crema y frutos rojos frescos.",
    price: 30,
    sku: "REP-PAVL-003",
    stock: 8,
    category: ["Torta", "Especialidad"],
  },
  {
    name: "Lemon Pie",
    description:
      "Tarta de masa sable con cremoso relleno de limon y merengue dorado.",
    price: 22.5,
    sku: "REP-LEMON-004",
    stock: 15,
    category: ["Tarta"],
  },
  {
    name: "Cake Navideño",
    description:
      "Budin especiado con frutas confitadas, nueces y un toque de canela.",
    price: 34.99,
    sku: "REP-XMAS-005",
    stock: 6,
    category: ["Torta", "Festivo"],
  },
  {
    name: "Carrot Cake",
    description:
      "Bizcocho humedo de zanahoria y nueces con frosting de queso crema.",
    price: 26.75,
    sku: "REP-CARROT-006",
    stock: 14,
    category: ["Torta", "Especialidad"],
  },
  {
    name: "Apple Crumble",
    description:
      "Manzanas caramelizadas con canela y cobertura crocante de streusel.",
    price: 19.9,
    sku: "REP-APPLE-007",
    stock: 18,
    category: ["Tarta", "Postre"],
  },
  {
    name: "Trufas de Chocolate",
    description:
      "Bombones artesanales de ganache de chocolate belga espolvoreados con cacao.",
    price: 14.5,
    sku: "REP-TRUF-008",
    stock: 40,
    category: ["Bocado"],
  },
  {
    name: "Cheesecake de Maracuya",
    description:
      "Tarta cremosa de queso sobre base de galleta con coulis de maracuya.",
    price: 27.9,
    sku: "REP-CHEESE-009",
    stock: 11,
    category: ["Tarta", "Postre"],
  },
  {
    name: "Macarons Surtidos",
    description:
      "Caja de macarons franceses en variedad de sabores y colores pastel.",
    price: 18,
    sku: "REP-MACAR-010",
    stock: 22,
    category: ["Bocado", "Especialidad"],
  },
  {
    name: "Budin de limón",
    description:
      "Budin esponjoso con ralladura de limón y glaseado cítrico por encima.",
    price: 16.5,
    sku: "PAN-BUDIN-011",
    stock: 20,
    category: ["Panaderia"],
  },
  {
    name: "Medialunas de manteca",
    description:
      "Medialunas hojaldradas y doradas, perfectas para acompañar el desayuno o merienda con unos mates.",
    price: 12,
    sku: "PAN-MEDIAL-012",
    stock: 30,
    category: ["Panaderia"],
  },
  {
    name: "Facturas surtidas",
    description:
      "Caja de facturas surtidas con dulce de leche: vigilantes, cañoncitos, berlinesas y bolas de fraile.",
    price: 15,
    sku: "PAN-FACTUR-013",
    stock: 25,
    category: ["Panaderia"],
  },
  {
    name: "Pan frances",
    description:
      "Pan de corteza crujiente y miga suave, ideal para acompañar comidas o hacer sandwiches.",
    price: 10,
    sku: "PAN-PANFR-014",
    stock: 50,
    category: ["Panaderia"],
  },
  {
    name: "Sanguche completo de pastrón",
    description:
      "Sanguche de pan casero con pastrón, lechuga, tomate, morrón, pepino y mayonesa casera.",
    price: 18,
    sku: "SAL-SANGU-015",
    stock: 20,
    category: ["Salado"],
  },
  {
    name: "Tarta de jamón y queso",
    description:
      "Tarta de jamón y queso con base de masa crujiente y cobertura de queso rallado.",
    price: 22,
    sku: "SAL-TARTA-016",
    stock: 15,
    category: ["Salado", "Tarta"],
  },
  {
    name: "Rosca de anís",
    description:
      "Rosca tradicional con sabor a anís, ideal para acompañar el mate o café.",
    price: 20,
    sku: "PAN-ROSCA-017",
    stock: 18,
    category: ["Panaderia"],
  },
  {
    name: "Cachitos de jamón y queso",
    description:
      "Cachitos hojaldrados rellenos de jamón y queso, perfectos para desayunos o meriendas.",
    price: 14,
    sku: "SAL-CACH-018",
    stock: 25,
    category: ["Salado", "Panaderia"],
  },
  {
    name: "Brioche con creema pastelera",
    description:
      "Brioche suave y esponjosa rellena de creema pastelera, ideal para el desayuno o merienda.",
    price: 16,
    sku: "SAL-BRIO-019",
    stock: 20,
    category: ["Bocado", "Pasteleria"],
  },
  {
    name: "Fugazza con queso",
    description:
      "Fugazza con masa esponjosa, cubierta de cebolla, queso derretido y orégano.",
    price: 18,
    sku: "SAL-FUGAZ-020",
    stock: 20,
    category: ["Salado"],
  },
  {
    name: "Alfajor de maicena",
    description:
      "Alfajor relleno de dulce de leche y cubierto con coco, con base de galleta de maicena.",
    price: 12,
    sku: "DUL-ALFA-021",
    stock: 30,
    category: ["Bocado"],
  }
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
