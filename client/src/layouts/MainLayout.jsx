import MobileActions from '@components/MobileActions/MobileActions';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
	return (
		<>	
			<main className="p-4 sm:ml-64">
				<Outlet />
			</main>
            <MobileActions />
		</>
	);
};
