import { CircleAlert } from 'lucide-react';

export const InputForm = ({
	label,
	name,
	value,
	type = 'text',
	placeholder = '',
	onChange,
	error,
	required = false,
}) => {
	const inputProps = {
		className: error
			? 'w-full rounded-sm border border-red-500 bg-neutral-50 px-2 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-75 dark:bg-neutral-900/50 dark:focus-visible:outline-white'
			: 'w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-75 dark:border-neutral-700 dark:bg-neutral-900/50 dark:focus-visible:outline-white',
		type,
		name,
		onChange,
		placeholder,
		required,
	};

	const textareaProps = {
		...inputProps,
		className:
			'w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2.5 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-75 dark:border-neutral-700 dark:bg-neutral-900/50 dark:focus-visible:outline-white',
		rows: 3,
	};

	const fileInputProps = {
		...inputProps,
		className: error
			? 'w-full overflow-clip rounded-sm border border-red-500 bg-neutral-50/50 text-sm text-red-500 file:mr-4 file:border-none file:bg-neutral-50 file:px-4 file:py-2 file:font-medium file:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-75 dark:bg-neutral-900/50 dark:file:bg-neutral-900 dark:file:text-white dark:focus-visible:outline-white'
			: 'w-full overflow-clip rounded-sm border border-neutral-300 bg-neutral-50/50 text-sm file:mr-4 file:border-none file:bg-neutral-50 file:px-4 file:py-2 file:font-medium file:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-75 dark:border-neutral-700 dark:bg-neutral-900/50 dark:file:bg-neutral-900 dark:file:text-white dark:focus-visible:outline-white',
	};

	if (type === 'file') {
		inputProps.accept = 'image/*';
	} else {
		inputProps.value = value;
	}

	return (
		<div className="flex my-3 w-full flex-col gap-1 text-neutral-600 dark:text-neutral-300">
			<label
				className={
					error
						? 'flex w-fit items-center gap-1 pl-0.5 text-sm text-red-500'
						: 'w-fit pl-0.5 text-sm'
				}
				htmlFor={name}
			>
				{error && <CircleAlert className="w-4 h-4" aria-hidden="true" />}
				{label}
			</label>
			{type === 'textarea' ? (
				<textarea {...textareaProps} />
			) : (
				<input {...(type === 'file' ? fileInputProps : inputProps)} />
			)}
			{type === 'file' && (
				<small className="pl-0.5">PNG, JPG, WebP - Max 5MB</small>
			)}
			{error && <small className="pl-0.5 text-red-500">{error}</small>}
		</div>
	);
};
