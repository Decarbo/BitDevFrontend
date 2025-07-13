import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUserPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addRequest } from '../utils/requestSlice';

const ConnectionRequests = () => {
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const fetchRequests = async () => {
		try {
			const res = await axios.get(`${import.meta.env.VITE_API_BASE}/user/requests/recieved`, {
				withCredentials: true,
			});
			setRequests(res?.data?.connectionRequests || []);
			dispatch(addRequest(res?.data?.connectionRequests));
		} catch (err) {
			console.error('Error fetching requests:', err);
		} finally {
			setLoading(false);
		}
	};

	const handleResponse = async (id, status) => {
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_BASE}/request/review/${status}/${id}`,
				{}, // body is empty
				{ withCredentials: true }
			);
			console.log(res.data);
			// remove the accepted/rejected request from UI
			setRequests((prev) => prev.filter((r) => r._id !== id));
		} catch (err) {
			console.error('Failed to update request status:', err.response?.data || err.message);
		}
	};
	useEffect(() => {
		fetchRequests();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black text-white px-4 py-16">
			<h1 className="text-3xl font-bold text-center text-indigo-400 flex items-center justify-center gap-2 mb-10">
				<FaUserPlus /> Connection Requests
			</h1>

			{loading ? (
				<p className="text-center text-gray-400 animate-pulse">Loading requests...</p>
			) : requests.length === 0 ? (
				<p className="text-center text-gray-500">No new connection requests.</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
					{requests.map((req, index) => {
						const user = req.fromUserId;
						return (
							<motion.div
								key={req._id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className="bg-[#2C2C2C] p-6 rounded-xl shadow-lg text-center">
								<img
									src={user.photoURL}
									alt={user.firstName}
									className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500 mx-auto mb-4"
								/>
								<h3 className="text-xl font-semibold">
									{user.firstName} {user.lastName}
								</h3>
								<p className="text-gray-400 text-sm mb-4">{user.skills?.length > 0 ? user.skills.join(', ') : 'No skills listed'}</p>

								<div className="flex justify-center gap-4">
									<button
										onClick={() => handleResponse(req._id, 'accepted')}
										className="bg-indigo-500/20 px-4 py-2 rounded-full text-white text-sm hover:bg-indigo-500 cursor-pointer transition-all duration-300">
										Accept
									</button>
									<button
										onClick={() => handleResponse(req._id, 'rejected')}
										className="bg-red-500/20 px-4 py-2 rounded-full text-white text-sm hover:bg-red-500 cursor-pointer transition-all duration-300">
										Reject
									</button>
								</div>
							</motion.div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default ConnectionRequests;
