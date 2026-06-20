# node-api — Contexto del proyecto

## Descripción
API REST construida con Node.js + Express que expone un CRUD de productos usando Firebase Admin SDK (Firestore) como base de datos.

## Stack
- **Runtime**: Node.js v24 (ESModules — `"type": "module"` en package.json)
- **Framework**: Express 5
- **Base de datos**: Firestore via `firebase-admin`
- **Validación**: Zod
- **Logging**: Morgan
- **Package manager**: pnpm

## Estructura
```
src/
├── app.js                  # Express: middlewares globales y rutas
├── index.js                # Entry point — arranca el servidor en puerto 3000
├── firebase.js             # Inicializa firebase-admin y exporta `db`
├── models/
│   └── product.model.js    # Schemas Zod (productSchema, productUpdateSchema)
├── repositories/
│   └── product.repository.js  # Acceso directo a Firestore
├── services/
│   └── product.service.js  # Lógica de negocio, lanza errores con statusCode
├── controllers/
│   └── product.controller.js  # Manejo de req/res, delega a services
├── routes/
│   └── product.routes.js   # Define los endpoints REST
└── middlewares/
    ├── validate.js         # Middleware Zod — valida req.body contra un schema
    └── errorHandler.js     # notFound (404) y errorHandler (4xx/5xx) globales
```

## Endpoints
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/products | Lista todos los productos |
| GET | /api/products/:id | Obtiene un producto por ID |
| POST | /api/products | Crea un producto (body validado con Zod) |
| PUT | /api/products/:id | Actualiza parcialmente un producto |
| DELETE | /api/products/:id | Elimina un producto |

## Modelo de Product (Firestore)
```js
{
  name: string,
  description: string,
  price: number (positivo),
  sku: string,
  stock: number (entero, >= 0),
  category: array de enum ['Alimento','Bebida','Herramienta','Limpieza',
                            'Electrodomestico','Juguete','Tecnologia','Mueble','Otro']
}
```

## Manejo de errores
- `400` — Validación Zod fallida (campos inválidos o faltantes)
- `401` — No autenticado
- `403` — Sin permisos
- `404` — Ruta no definida o recurso no encontrado
- `500` — Error interno o Firestore no responde

Los errores con `statusCode` en el objeto `Error` son capturados por `errorHandler.js` y devuelven el mensaje apropiado. Los 500 loggean el stack completo en consola.

## Variables de entorno
- `GOOGLE_APPLICATION_CREDENTIALS` — Ruta al JSON de credenciales de Firebase

## Comandos
```bash
pnpm dev    # node --watch src/index.js
pnpm start  # node src/index.js
pnpm test   # jest (ESM)
```
