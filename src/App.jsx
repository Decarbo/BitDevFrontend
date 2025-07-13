import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Body from './components/Body';
import Login from './components/Login';
import { Provider } from 'react-redux';
import appstore from './utils/appStore';
import Home from './components/Home';
import Feed from './components/Feed';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import MyConnections from './components/MyConnections';
import ConnectionRequests from './components/ConnectionRequests';

function App() {
	return (
		<Provider store={appstore}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Body />}>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/login"
							element={<Login />}
						/>
						<Route
							path="/feed"
							element={
								<ProtectedRoute>
									<Feed />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/connections"
							element={
								<ProtectedRoute>
									<MyConnections />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/requests"
							element={
								<ProtectedRoute>
									<ConnectionRequests />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/profile"
							element={<Profile />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
