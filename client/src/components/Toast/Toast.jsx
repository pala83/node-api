import {
	CircleCheck,
	CircleX,
	Info,
	TriangleAlert,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

const typeStyles = {
	success: {
		accent: 'border-green-500',
		icon: <CircleCheck className="w-5 h-5 text-green-400" aria-hidden="true" />,
	},
	warning: {
		accent: 'border-yellow-500',
		icon: (
			<TriangleAlert className="w-5 h-5 text-yellow-400" aria-hidden="true" />
		),
	},
	info: {
		accent: 'border-blue-500',
		icon: <Info className="w-5 h-5 text-blue-400" aria-hidden="true" />,
	},
	danger: {
		accent: 'border-red-500',
		icon: <CircleX className="w-5 h-5 text-red-400" aria-hidden="true" />,
	},
	apu: {
		accent: 'border-orange-500',
		icon: (
			<div className="w-20 h-30 overflow-hidden rounded-t-lg">
				<img
					src="/apu.png"
					alt="Apu"
					className="w-full h-30 object-cover object-top"
				/>
			</div>
		),
	},
};

function ToastItem({
	id,
	type = 'info',
	title,
	text,
	duration = 10000,
	onRemove,
}) {
	const [visible, setVisible] = useState(false);

	const startDismiss = useCallback(() => {
		setVisible(false);
		setTimeout(() => onRemove(id), 200);
	}, [id, onRemove]);

	useEffect(() => {
		const raf = requestAnimationFrame(() => setVisible(true));
		const timer = setTimeout(() => startDismiss(), duration);
		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(timer);
		};
	}, [duration, startDismiss]);

	const { accent, icon } = typeStyles[type] ?? typeStyles.info;
	
	// Mensaje especial para Apu
	const displayTitle = type === 'apu' ? 'Gracias, vuelva prontos' : title;
	const displayText = type === 'apu' ? '' : text;

	return (
		<button
			type="button"
			onClick={startDismiss}
			className={[
				'pointer-events-auto w-80 max-w-[90vw] text-left rounded-lg border border-gray-700 bg-gray-900 text-white shadow-lg',
				'pl-3 pr-4 py-3 flex items-start gap-3 relative',
				'transition-all duration-200 ease-out',
				visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
				accent,
			].join(' ')}
		>
			<div className="mt-0.5">{icon}</div>
			<div className="flex-1">
				{displayTitle && (
					<div className="text-sm font-semibold leading-5 pt-3">{displayTitle}</div>
				)}
				{displayText && <div className="prose prose-invert">{displayText}</div>}
				<div className="mt-1 text-[11px] opacity-60">Click para cerrar</div>
			</div>
		</button>
	);
}

export function ToastContainer({ toasts, onRemove }) {
	const portalEl = useMemo(() => document.body, []);
	if (!portalEl) return null;
	return createPortal(
		<div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
			{toasts.map((t) => (
				<ToastItem key={t.id} {...t} onRemove={onRemove} />
			))}
		</div>,
		portalEl,
	);
}
