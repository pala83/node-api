import { Outlet } from 'react-router-dom';

export const AdminLayout = () => {
	return (
		<main className='w-screen h-full max-h-screen flex justify-center items-center'>
			<Outlet />
		</main>
	);
};
