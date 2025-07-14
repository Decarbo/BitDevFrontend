import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { Provider } from 'react-redux';
import appstore, { persistor } from './store'; // 👈 import your store and persistor
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={appstore}>
			<PersistGate
				loading={null}
				persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</StrictMode>
);
