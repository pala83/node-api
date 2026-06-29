import { useAuthContext } from '@contexts/AuthContext/useAuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRouts = ({ children }) => {
	const { user } = useAuthContext();
	if (!user) {
		return <Navigate to="/" replace />;
	}

	return children;
};
