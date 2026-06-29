export const BUTTON_VARIANTS = {
	primary:
		'text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5 text-center hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed',
	secondary:
		'text-gray-900 bg-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-60 disabled:cursor-not-allowed',
	danger:
		'text-white bg-red-600 font-medium rounded-lg text-sm text-center hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-60 disabled:cursor-not-allowed',
	ghost:
		'bg-transparent text-gray-100 hover:bg-gray-800/50 rounded-md px-3 py-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed',
	counter:
		'w-10 sm:w-15 flex items-center justify-center text-base font-medium select-none bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed',
};

export const Button = ({
	onClick,
	children,
	type = 'button',
	className = '',
	variant = 'primary',
	disabled = false,
}) => {
	const variantClass = BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.primary;
	const finalClass = `${variantClass} ${className}`;

	return (
		<button
			type={type}
			onClick={onClick}
			className={finalClass}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
