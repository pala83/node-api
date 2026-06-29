import { Button } from '@components/Button.jsx';

export const ConfirmDialog = ({
	open,
	title,
	message,
	confirmButtonText = 'Eliminar',
	cancelButtonText = 'Cancelar',
	onConfirm,
	onCancel,
	loading = false,
}) => {
	if (!open) return null;
	return (
		<div className="fixed inset-0 z-60 flex items-center justify-center">
			{/* backdrop: clickable and keyboard-accessible */}
			<button
				type="button"
				aria-label="Close dialog"
				onClick={onCancel}
				onKeyDown={(e) => (e.key === 'Escape' ? onCancel() : null)}
				className="absolute inset-0 bg-black/50"
			/>

			<div className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 rounded-md shadow-lg p-4">
				<h3 className="text-lg font-semibold mb-2">{title}</h3>
				<p className="text-sm text-gray-600 mb-4">{message}</p>

				<div className="flex justify-end gap-2">
					<Button variant="ghost" onClick={onCancel} disabled={loading}>
						{cancelButtonText}
					</Button>
					<Button
						onClick={onConfirm}
						className="bg-red-600 text-white flex items-center"
						disabled={loading}
					>
						{loading && (
							<svg
								className="w-4 h-4 mr-2 animate-spin"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<title>Loading</title>
								<circle
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
									opacity="0.25"
								/>
								<path
									d="M22 12a10 10 0 00-10-10"
									stroke="currentColor"
									strokeWidth="4"
									strokeLinecap="round"
								/>
							</svg>
						)}
						{confirmButtonText}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDialog;
