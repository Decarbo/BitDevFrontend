import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import appstore, { persistor } from './utils/appStore.js';

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
