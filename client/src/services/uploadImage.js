// Uso educativo: exponemos la clave y siempre llamamos directamente al endpoint oficial.
// Se envía la key en el FormData sin proxy intermedio.
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const ENDPOINT = 'https://api.imgbb.com/1/upload';

// Funcion con la que vamos a convertir la imagen (File) a cadena base64
// Base64 es una codificacion de texto que representa datos binarios (la imagen)
// El navegador genera un Data URL del estilo:
//    "data:image/png;base64,AAAA...."
// Para imgbb, hay que enviar **solo la parte base64** (sin el prefijo "data:...").

export const fileToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			// reader.result viene como "data:image/png;base64,AAAA..."
			const result = String(reader.result);
			const parts = result.split(',');

			if (parts.length < 2) {
				reject(new Error('Formato de Data URL inválido'));
				return;
			}

			const base64 = parts[1]; // sacamos el prefijo "data:...;base64,"
			resolve(base64);
		};

		reader.onerror = () => {
			reject(new Error('No se pudo leer el archivo'));
		};

		reader.readAsDataURL(file);
	});
};

export const uploadToImgbb = async (file) => {
	if (!file) throw new Error('No se recibió ningún archivo de imagen');
	if (!IMGBB_API_KEY) throw new Error('IMGBB API key no configurada');

	const form = new FormData();
	const base64 = await fileToBase64(file);
	form.append('image', base64);
	form.append('key', IMGBB_API_KEY);

	const response = await fetch(ENDPOINT, { method: 'POST', body: form });

	// Parseamos la respuesta como JSON
	let json;
	try {
		json = await response.json();
	} catch {
		throw new Error('La respuesta del servidor no es JSON válido');
	}

	// Manejo de errores de red o del propio API
	if (!response.ok || json?.success === false) {
		throw new Error(json?.error?.message || 'Error al subir la imagen');
	}

	// imgbb devuelve varias URLs posibles
	// - url: original
	// - display_url: via su CDN (la mas usada para mostrar)
	if (json?.data) {
		if (json.data.display_url) {
			return json.data.display_url;
		}

		if (json.data.url) {
			return json.data.url;
		}
	}

	// Si llegamos acá, no recibimos los campos esperados
	throw new Error('No se recibió una URL válida desde imgbb');
};
