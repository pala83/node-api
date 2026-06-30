# node-api — API REST de Productos y Autenticación

API REST construida con **Node.js + Express 5** que expone un CRUD de productos y un módulo de autenticación con **JWT** (access + refresh tokens). Usa **Firebase (Firestore)** como base de datos a través del SDK cliente, validación con **Zod** y hashing de contraseñas con **argon2**.

## 🌐 URL del deploy

```
https://node-api-gray-beta.vercel.app
```

Todos los ejemplos de este documento usan esa URL. Para uso local, reemplazá por `http://localhost:3000`.

---

## 🧱 Stack

- **Runtime:** Node.js 22 (ESModules)
- **Framework:** Express 5
- **Base de datos:** Firestore (`firebase` SDK cliente)
- **Auth:** JWT (`jsonwebtoken`) + `argon2`
- **Validación:** Zod
- **Logging:** Morgan
- **Deploy:** Vercel (serverless)

---

## 🚀 Correr el proyecto localmente

```bash
# 1. Instalar dependencias
pnpm install

# 2. Crear un archivo .env (ver variables abajo)

# 3. Levantar en modo desarrollo (con watch)
pnpm dev

# 4. O en modo producción
pnpm start

# 5. Cargar datos de ejemplo (productos + usuarios)
pnpm seed

# 6. Ejecutar los tests
pnpm test
```

### Variables de entorno (`.env`)

```env
# Servidor
PORT=3000

# Configuración de Firebase (SDK cliente)
API_KEY=...
AUTH_DOMAIN=...
PROJECT_ID=...
STORAGE_BUCKET=...
MESSAGING_SENDER_ID=...
APP_ID=...
MEASUREMENT_ID=...

# Secretos JWT
JWT_SECRET=...
JWT_REFRESH_SECRET=...

# Origen(es) permitidos por CORS (coma-separados). Vacío en dev = localhost.
CORS_ORIGINS=
```

---

## 🚢 Despliegue en Vercel (un solo proyecto)

Todo el monorepo se despliega como **un único proyecto Vercel** con **Root Directory = raíz**
del repo. El `vercel.json` de la raíz construye las dos cosas y las sirve en el **mismo dominio**:

- **Cliente** (`client/`) → build estático con `@vercel/static-build` (Vite, output `client/dist`).
- **API** (`api/`) → serverless function con `@vercel/node` sobre `api/index.js` (exporta la app
  de Express; `app.listen` solo corre fuera de Vercel, guard `if (!process.env.VERCEL)`).
- **Ruteo**: `/api/*` → la API; el resto → el SPA (`index.html`).

### Configuración del proyecto Vercel
- **Root Directory**: la **raíz** del repo (NO `client` ni `api`).
- **Build**: lo define el `vercel.json` de la raíz (no hace falta tocar Build/Output Command).
- Requiere `pnpm-lock.yaml` y `pnpm-workspace.yaml` versionados (Vercel detecta pnpm y resuelve el workspace).

### Environment Variables (todas en el mismo proyecto)
- API: `API_KEY`, `AUTH_DOMAIN`, `PROJECT_ID`, `STORAGE_BUCKET`, `MESSAGING_SENDER_ID`, `APP_ID`,
  `MEASUREMENT_ID`, `JWT_SECRET`, `JWT_REFRESH_SECRET`.
- Cliente: **`VITE_API_URL=/api`** (ruta relativa: cliente y API comparten dominio) y `VITE_IMGBB_API_KEY`.
- `CORS_ORIGINS`: **opcional en este esquema** — al ser mismo dominio no hay request cross-origin.
  (Local sí lo usa: el cliente en `:5173` pega a la API en `:3000`.)

> Como cliente y API quedan en el **mismo origen**, no hay CORS en producción y `VITE_API_URL`
> es simplemente `/api`. En local, `client/.env` usa `VITE_API_URL=http://localhost:3000/api`.

### Variables de entorno (setup local)
La plantilla **`/.env.local`** (en la raíz, versionada, solo documentación) lista
todas las variables necesarias. Cada quien debe crear, con valores reales:
- **`api/.env`** — backend (Firebase, JWT, `CORS_ORIGINS`, `PORT`). Gitignored.
- **`client/.env`** — frontend (`VITE_API_URL` con `/api`, `VITE_IMGBB_API_KEY`). Gitignored.

> ⚠️ El cliente es Vite: **no** crear un `client/.env.local` en blanco — Vite lo carga
> con prioridad sobre `client/.env` y pisaría los valores reales. Por eso la plantilla
> vive en la raíz (donde no la carga ninguna herramienta).

Luego: `pnpm dev` levanta API (watch) + cliente (Vite); `pnpm build` buildea el cliente.

---

## 📦 Estructura de los datos

### Product

| Campo | Tipo | Requerido | Reglas |
|-------|------|-----------|--------|
| `name` | string | ✅ | mínimo 1 carácter |
| `price` | number | ✅ | positivo |
| `stock` | number | ✅ | entero ≥ 0 |
| `sku` | string | ✅ | mínimo 1 carácter, **único** en la base |
| `description` | string | ❌ | (Stock Keeping Unit) mínimo 1 carácter si se envía |
| `category` | string[] | ❌ | array de valores del enum (ver abajo) |

**Categorías permitidas (enum):**
```
Alimento · Bebida · Herramienta · Limpieza · Electrodomestico ·
Juguete · Tecnologia · Mueble · Otro
```

Ejemplo de Product almacenado:
```json
{
  "id": "02n80IVQ56eBzbHltOio",
  "name": "Carrot Cake",
  "description": "Bizcocho humedo de zanahoria y nueces con frosting de queso crema.",
  "price": 26.75,
  "sku": "REP-CARROT-006",
  "stock": 14,
  "category": ["Alimento"]
}
```

### User

| Campo | Tipo | Requerido | Reglas |
|-------|------|-----------|--------|
| `name` | string | ✅ | mínimo 1 carácter |
| `email` | string | ✅ | formato email, **único** en la base |
| `password` | string | ✅ | mínimo 8 caracteres (se guarda hasheada con argon2) |
| `balance` | number | — | histórico de gasto del usuario |
| `purchases` | array | — | historial de compras: `[{ sku, quantity }]` |

Ejemplo de purchase:
```json
{ "sku": "REP-MARQ-001", "quantity": 2 }
```

---

## 🔐 Autenticación

- El **access token** (`token`) expira en **1h**; el **refresh token** en **7d**.
- El refresh token se persiste en Firestore y **se rota** en cada `/refresh`.
- Para endpoints protegidos, enviá el access token en el header:
  ```
  Authorization: Bearer <token>
  ```

Respuesta típica de `login` / `register`:
```json
{
  "token": "<access_token>",
  "refreshToken": "<refresh_token>",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

---

## 📋 Endpoints

| Método | Ruta | Auth | Descripción |
|--------|------|:----:|-------------|
| GET | `/` | — | Health-check |
| POST | `/api/auth/register` | — | Registra un usuario |
| POST | `/api/auth/login` | — | Inicia sesión, devuelve tokens |
| POST | `/api/auth/refresh` | — | Rota el refresh token y emite uno nuevo |
| POST | `/api/auth/logout` | — | Invalida el refresh token |
| GET | `/api/products` | — | Lista todos los productos |
| GET | `/api/products/:id` | — | Obtiene un producto por ID |
| POST | `/api/products` | 🔒 | Crea un producto |
| PUT | `/api/products/:id` | 🔒 | Actualiza parcialmente un producto |
| DELETE | `/api/products/:id` | 🔒 | Elimina un producto |

> 🔒 = requiere header `Authorization: Bearer <token>`. La lectura (`GET`) es pública; **crear, editar y eliminar** requieren un access token válido (obtenido vía `/api/auth/login`).

---

## 🩺 Health-check

### `GET /`

```bash
curl https://node-api-gray-beta.vercel.app/
```

**Respuesta `200`:**
```json
{ "message": "Servidor funcionando correctamente" }
```

---

## 👤 Autenticación

### `POST /api/auth/register`

Body:
```json
{ "name": "Juan Perez", "email": "juan@email.com", "password": "miPassword123" }
```

```bash
curl -X POST https://node-api-gray-beta.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Perez","email":"juan@email.com","password":"miPassword123"}'
```

**Respuestas:** `201` (creado, devuelve tokens) · `400` (validación) · `409` (email ya en uso).

---

### `POST /api/auth/login`

Body:
```json
{ "email": "user@email.com", "password": "strongPass123" }
```

```bash
curl -X POST https://node-api-gray-beta.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@email.com","password":"strongPass123"}'
```

**Respuestas:** `200` (devuelve `token`, `refreshToken`, `user`) · `401` (credenciales incorrectas).

> 💡 Para guardar el token en una variable y reusarlo:
> ```bash
> TOKEN=$(curl -s -X POST https://node-api-gray-beta.vercel.app/api/auth/login \
>   -H "Content-Type: application/json" \
>   -d '{"email":"user@email.com","password":"strongPass123"}' \
>   | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
> ```

---

### `POST /api/auth/refresh`

Body:
```json
{ "refreshToken": "<refresh_token>" }
```

```bash
curl -X POST https://node-api-gray-beta.vercel.app/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<refresh_token>"}'
```

**Respuestas:** `200` (nuevos `token` y `refreshToken`) · `401` (falta el token) · `403` (refresh token inválido o expirado).

---

### `POST /api/auth/logout`

Body:
```json
{ "refreshToken": "<refresh_token>" }
```

```bash
curl -X POST https://node-api-gray-beta.vercel.app/api/auth/logout \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<refresh_token>"}'
```

**Respuestas:** `204` (sin contenido) · `401` (falta el token).

---

## 🛒 Productos

### `GET /api/products`

```bash
curl https://node-api-gray-beta.vercel.app/api/products
```

**Respuesta `200`:** array de productos.

---

### `GET /api/products/:id`

```bash
curl https://node-api-gray-beta.vercel.app/api/products/REEMPLAZAR_ID
```

**Respuestas:** `200` (producto) · `404` (no encontrado).

---

### `POST /api/products` 🔒

Requiere autenticación. Body (`name`, `price`, `stock`, `sku` requeridos; `description` y `category` opcionales):
```json
{
  "name": "Lemon Pie",
  "description": "Tarta de masa sable con relleno de limon y merengue.",
  "price": 22.5,
  "sku": "REP-LEMON-099",
  "stock": 15,
  "category": ["Alimento"]
}
```

```bash
curl -X POST https://node-api-gray-beta.vercel.app/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Lemon Pie",
    "description": "Tarta de masa sable con relleno de limon y merengue.",
    "price": 22.5,
    "sku": "REP-LEMON-099",
    "stock": 15,
    "category": ["Alimento"]
  }'
```

**Respuestas:** `201` (creado) · `400` (validación) · `401` (sin token o inválido) · `409` (SKU ya existe).

---

### `PUT /api/products/:id` 🔒

Requiere autenticación. Actualización parcial: enviá solo los campos a modificar.
```json
{ "price": 24.9, "stock": 8 }
```

```bash
curl -X PUT https://node-api-gray-beta.vercel.app/api/products/REEMPLAZAR_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"price":24.9,"stock":8}'
```

**Respuestas:** `200` (actualizado) · `400` (validación) · `401` (sin token o inválido) · `404` (no encontrado).

---

### `DELETE /api/products/:id` 🔒

Requiere autenticación.

```bash
curl -X DELETE https://node-api-gray-beta.vercel.app/api/products/REEMPLAZAR_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Respuestas:** `200` (`{ "message": "Product deleted" }`) · `401` (sin token o inválido) · `404` (no encontrado).

---

## ⚠️ Códigos de error

| Código | Significado |
|--------|-------------|
| `400` | Error de validación (Zod) — campos inválidos o faltantes |
| `401` | No autenticado / credenciales incorrectas / token faltante |
| `403` | Refresh token inválido o expirado |
| `404` | Ruta no definida o recurso no encontrado |
| `409` | Conflicto — email o SKU ya existente |
| `500` | Error interno del servidor |

Formato de error:
```json
{ "error": "Mensaje descriptivo" }
```

Los errores de validación incluyen además un objeto `details` con los campos afectados:
```json
{
  "error": "Validation error",
  "details": { "price": ["Invalid input: expected number, received undefined"] }
}
```

---

## 🧪 Ejemplo de flujo completo (CRUD con curl)

```bash
BASE="https://node-api-gray-beta.vercel.app"

# 1. Login y guardar token
TOKEN=$(curl -s -X POST "$BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@email.com","password":"strongPass123"}' \
  | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')

# 2. Crear producto
curl -X POST "$BASE/api/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Trufas","price":14.5,"stock":40,"sku":"REP-TRUF-099","category":["Alimento"]}'

# 3. Listar productos
curl "$BASE/api/products"
```
