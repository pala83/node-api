import productImages from '../data/productImages.json';

const DEFAULT_IMAGE = '/default-product.png';

// Resuelve la imagen de un producto por su SKU contra el mapa generado al subir
// las imágenes a imgbb (client/src/data/productImages.json). Si el SKU todavía no
// tiene imagen en imgbb, usa `fallback` (por ej. una URL ya guardada) y, en última
// instancia, la imagen por defecto.
export const getProductImage = (sku, fallback) =>
	(sku && productImages[sku]) || fallback || DEFAULT_IMAGE;
