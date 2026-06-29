import { Button } from "@components/Button";
import { useAuthContext } from "@contexts/AuthContext/useAuthContext";
import { useToast } from "@contexts/ToastContext/useToast";
import { deleteProduct } from "@services/products";
import { useState } from "react";

export const Item = ({
	id,
	name,
	price,
	description,
	imageUrl,
	reviews = 0,
	children,
	onDeleted,
}) => {
    const { isLoggedIn } = useAuthContext();
	const { showToast } = useToast();
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		
		setIsDeleting(true);
		try {
			const result = await deleteProduct(id);
			if (result) {
				showToast({
                    type: 'danger',
                    title: `QEPD ${name} 🪦`,
                    text: `El cliente ya no podra disfrutar de ${name}, porque ha dejado de existir. ☹️`,
                });
				// Llamar al callback para actualizar la lista en el padre
				if (onDeleted) {
					onDeleted(id);
				}
			} else {
				showToast({
                    type: 'warning',
                    title: 'Eliminación cancelada 🎉',
                    text: `Se arrepintio de su decision, ${name} sigue entre nosotros.`,
                })
			}
		} catch (error) {
			console.error('Error deleting product:', error);
			showToast({
                type: 'success',
                title: 'Ups! algo ha fallado. 😯',
                text: `No se pudo eliminar ${name}, intente nuevamente más tarde.`,
            })
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<article className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
			<div className="relative flex justify-center items-center h-56 overflow-hidden">
				<img
					className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
					src={imageUrl}
					alt=""
					aria-hidden="true"
				/>
				<img
					className="relative h-full w-auto object-contain z-10"
					src={imageUrl}
					alt={description || name}
					loading="lazy"
				/>
			</div>

			<div className="p-5">
				<h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
					{name}
				</h3>

				<div className="flex items-center mt-2.5 mb-5">
					<div className="flex items-center space-x-1">
						{(() => {
							const starIds = ['one', 'two', 'three', 'four', 'five'];
							const filled = Math.round(reviews);
							return starIds.map((id, idx) => {
								const isFilled = idx < filled;
								return (
									<svg
										key={`${name}-star-${id}`}
										className={`w-4 h-4 ${isFilled ? 'text-yellow-300' : 'text-gray-200 dark:text-gray-600'}`}
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 22 20"
									>
										<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
									</svg>
								);
							});
						})()}
					</div>
					<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
						{Number.isFinite(reviews) ? reviews.toFixed(1) : '0.0'}
					</span>
				</div>
				<p className={`prose prose-invert mb-3 ${children ? '' : 'h-22 overflow-hidden text-ellipsis line-clamp-3'}`}>
					{description}
				</p>
				<div
					className={`flex flex-wrap items-center ${children ? 'gap-2 justify-end' : 'justify-between'} `}
				>
					<span className="text-3xl font-bold text-gray-900 dark:text-white">
						${price}
					</span>
					{children ? (
						children
					) : (
						<span className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							Ver detalle
						</span>
					)}
				</div>
                {!children && isLoggedIn && (
                    <Button
                        type="button"
                        variant="danger"
                        className="w-full py-3 mt-4"
						onClick={handleDelete}
						disabled={isDeleting}
                    >
                        {isDeleting ? '🗑️ Eliminando...' : '💀 Destruir para 100mpre'}
                    </Button>
                )}
			</div>
		</article>
	);
};
