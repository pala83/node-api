# Panadería - E-commerce App

Aplicación de e-commerce desarrollada con React para la gestión y visualización de productos de panadería, con panel de administración integrado.

## Tecnologías Utilizadas

- **React 19** - Biblioteca principal para la construcción de la interfaz de usuario mediante componentes reutilizables y hooks.
- **Vite** - Build tool y servidor de desarrollo de alto rendimiento con Hot Module Replacement (HMR).
- **Bun** - Runtime de JavaScript utilizado como gestor de paquetes y para ejecutar scripts del proyecto.
- **Tailwind CSS** - Framework de CSS utilitario para el diseño y estilos de la aplicación.
- **Biome** - Herramienta de linting y formateo de código para mantener la consistencia del proyecto.
- **React Router** - Librería para el manejo de rutas y navegación entre vistas.

## Configuración del Entorno LOCAL

### Archivo `.env`

Crea un archivo `.env` en la **raíz del proyecto** (mismo nivel que `package.json`) con las siguientes variables:

```env
VITE_API_BASE=https://api.mockapi.io/api/v1/tu-endpoint
VITE_IMGBB_API_KEY=tu-clave-de-imgbb
```

**Descripción de las variables:**
- `VITE_API_BASE`: URL base de tu proyecto en MockAPI
- `VITE_IMGBB_API_KEY`: Clave de API de ImgBB para subir imágenes

> **Nota**: Las variables de entorno en Vite deben comenzar con el prefijo `VITE_` para ser accesibles en el cliente.

> **Nota**: Si no tenes ganas de usar tus keys proba el **deploy** o robate las keys del **deploy**.

## Instalación y Ejecución

```bash
# Instalar dependencias
bun install

# Ejecutar en modo desarrollo
bun run dev

# Compilar para producción
bun run build

# Vista previa de producción
bun run preview
```


## Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables de UI
├── contexts/       # Contextos de React (Auth, Cart, Toast)
├── layouts/        # Layouts principales (Main, Admin)
├── services/       # Servicios de API
└── utils/          # Utilidades y validaciones
```

## Credenciales de Acceso

### Panel de Administración
- **Usuario**: `admin`
- **Contraseña**: `1234`
- **Ruta**: `/admin`

El panel de administración permite:
- Crear nuevos productos
- Eliminar productos existentes
- Subir imágenes de productos



## APIs Externas

### MockAPI
- **Propósito**: Backend simulado para operaciones CRUD de productos.
- **Uso**: Almacenamiento y gestión de la base de datos de productos (nombre, precio, descripción, categoría, etc.).
- **Endpoints**: `/products` para crear, leer, actualizar y eliminar productos.

### ImgBB
- **Propósito**: Servicio de hosting de imágenes.
- **Uso**: Almacenamiento de imágenes de productos subidas desde el panel de administración.
- **Integración**: Las URLs generadas se guardan en MockAPI como referencias a las imágenes de los productos.

## Características

- ✅ Catálogo de productos con filtrado por categorías
- ✅ Carrito de compras con persistencia
- ✅ Sistema de autenticación para administradores
- ✅ Panel de administración CRUD
- ✅ Notificaciones toast personalizadas
- ✅ Diseño responsive con Tailwind CSS
- ✅ Imágenes optimizadas con efecto blur horizontal

