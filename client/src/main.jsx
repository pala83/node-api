import { Analytics } from '@vercel/analytics/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthProvider } from '@contexts/AuthContext/AuthProvider';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Analytics />
		<AuthProvider>
			<App />
		</AuthProvider>
	</StrictMode>,
);
