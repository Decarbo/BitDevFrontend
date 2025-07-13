import React from 'react';
import { Link } from 'react-router';
import { FaLock } from 'react-icons/fa';

const PleaseLogin = () => {
	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
			<div className="text-center max-w-md">
				<FaLock className="text-5xl text-indigo-500 mx-auto mb-6 animate-pulse" />
				<h2 className="text-3xl font-bold mb-4">Please Login to Continue</h2>
				<p className="text-gray-400 mb-6">You must be logged in to access this feature. Join our dev community and start connecting today!</p>
				<Link to="/login">
					<button className="bg-indigo-500 hover:bg-indigo-600 transition px-6 py-3 rounded-full font-semibold text-white">Please Login 😢</button>
				</Link>
			</div>
		</div>
	);
};

export default PleaseLogin;
