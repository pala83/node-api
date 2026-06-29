import { Button } from '@components/Button';
import { InputForm } from '@components/InputForm';

export const ProductFormUI = ({
	product,
	errors,
	loading,
	onChange,
	onFileChange,
	onSubmit,
}) => {
	return (
        <form className="space-y-4 w-md px-5" onSubmit={onSubmit}>
            <h1 className='text-3xl font-bold'>Agregar producto</h1>
            <InputForm
                label="Nombre:"
                name="name"
                value={product.name}
                onChange={onChange}
                error={errors.name}
                required
            />
            <InputForm
                label="Precio:"
                type="number"
                name="price"
                value={product.price}
                onChange={onChange}
                error={errors.price}
                required
            />
            <InputForm
                label="Categoria:"
                name="category"
                value={product.category}
                onChange={onChange}
                error={errors.category}
                required
            />
            <InputForm
                label="Descripcion:"
                type="textarea"
                placeholder="Descripcion resumida del producto..."
                name="description"
                value={product.description}
                onChange={onChange}
                error={errors.description}
                required
            />
            <InputForm
                label="Stock:"
                type="number"
                name="stock"
                value={product.stock}
                onChange={onChange}
                error={errors.stock}
                required
            />
            <InputForm
                label="Imagen:"
                name="image"
                type="file"
                onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
                error={errors.file}
            />
            <Button type="submit" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar Producto'}
            </Button>
        </form>
	);
};
