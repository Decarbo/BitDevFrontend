import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import PleaseLogin from './constant/Pleaselogin';

const ProtectedRoute = ({ children }) => {
	const user = useSelector((state) => state.user);


	if (!user || !user._id) {
		return (
			<PleaseLogin/>
		);
	}


	return children;
};

export default ProtectedRoute;
