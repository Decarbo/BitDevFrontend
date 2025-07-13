import React from 'react';
import { useSelector } from 'react-redux';
import PleaseLogin from './constant/PleaseLogin';

const ProtectedRoute = ({ children }) => {
	const user = useSelector((state) => state.user);

	if (!user || !user._id) {
		return (
			<div>
				<PleaseLogin />
			</div>
		);
	}

	return children;
};

export default ProtectedRoute;
