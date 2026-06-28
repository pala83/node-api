import { seedProducts } from "./products.seed.js";
import { seedUsers } from "./users.seed.js";

// Runner de seeders. Se ejecuta manualmente con `pnpm seed`.
// El orden importa: primero productos, luego usuarios (sus compras
// referencian los SKU de los productos ya existentes).
const run = async () => {
  console.log("🌱 Ejecutando seeders...\n");

  console.log("— Productos —");
  await seedProducts();

  console.log("\n— Usuarios —");
  await seedUsers();

  console.log("\n✅ Seeders finalizados.");
};

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error al ejecutar los seeders:", err);
    process.exit(1);
  });
