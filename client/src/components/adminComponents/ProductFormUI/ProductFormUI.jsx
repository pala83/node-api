import { Button } from '@components/Button';
import { InputForm } from '@components/InputForm';

export const ProductFormUI = ({
	product,
	errors,
	loading,
	categories = [],
	onChange,
	onCategoryToggle,
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
            <fieldset className="flex flex-col gap-1 text-neutral-600 dark:text-neutral-300">
                <legend className="pl-0.5 text-sm">
                    Categorias (podés elegir varias):
                </legend>
                <div className="flex flex-wrap gap-2 pt-1">
                    {categories.map((category) => {
                        const checked = product.category.includes(category);
                        return (
                            <label
                                key={category}
                                className={`cursor-pointer select-none rounded-full border px-3 py-1 text-sm capitalize transition-colors ${
                                    checked
                                        ? 'border-blue-600 bg-blue-600 text-white'
                                        : 'border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={checked}
                                    onChange={() => onCategoryToggle(category)}
                                />
                                {category}
                            </label>
                        );
                    })}
                </div>
                {errors.category && (
                    <small className="pl-0.5 text-red-500">{errors.category}</small>
                )}
            </fieldset>
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
