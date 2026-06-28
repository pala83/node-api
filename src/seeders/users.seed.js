import argon2 from "argon2";
import { userRepository } from "../repositories/user.repository.js";
import { products } from "./products.seed.js";

const priceBySku = Object.fromEntries(products.map((p) => [p.sku, p.price]));

const usersSeeders = [
  {
    name: "Ana Perez",
    email: "ana@email.com",
    password: "strongPass123",
    purchases: [
      { sku: "REP-MARQ-001", quantity: 2 },
      { sku: "REP-TRUF-008", quantity: 3 },
    ],
  },
  {
    name: "Bruno Gomez",
    email: "bruno@email.com",
    password: "strongPass123",
    purchases: [
      { sku: "REP-LEMON-004", quantity: 1 },
      { sku: "REP-MACAR-010", quantity: 4 },
      { sku: "REP-CHEESE-009", quantity: 1 },
    ],
  },
  {
    name: "Carla Diaz",
    email: "carla@email.com",
    password: "strongPass123",
    purchases: [
      { sku: "REP-XMAS-005", quantity: 1 },
      { sku: "REP-CARROT-006", quantity: 2 },
      { sku: "REP-PAVL-003", quantity: 1 },
    ],
  },
  {
    name: "Diego Ruiz",
    email: "diego@email.com",
    password: "strongPass123",
    purchases: [
      { sku: "REP-APPLE-007", quantity: 5 },
      { sku: "REP-ROGEL-002", quantity: 2 },
    ],
  },
];

// balance = suma de (precio del producto * cantidad)
const computeBalance = (purchases) => {
  const total = purchases.reduce((acc, { sku, quantity }) => {
    const price = priceBySku[sku];
    if (price === undefined) {
      throw new Error(`SKU inexistente en el seeder de productos: ${sku}`);
    }
    return acc + price * quantity;
  }, 0);
  // redondeo a 2 decimales
  return Math.round(total * 100) / 100;
};

export const seedUsers = async () => {
  for (const user of usersSeeders) {
    const existing = await userRepository.findByEmail(user.email);
    if (existing) {
      console.log(`⏭  Usuario omitido (email ya existe): ${user.email}`);
      continue;
    }

    const balance = computeBalance(user.purchases);
    const hashedPassword = await argon2.hash(user.password);

    await userRepository.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      balance,
      purchases: user.purchases,
    });

    console.log(`✅ Usuario creado: ${user.name} (${user.email}) — balance: ${balance}`);
  }
};
