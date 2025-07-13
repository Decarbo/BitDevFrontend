import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaUserFriends, FaCommentDots } from 'react-icons/fa';

const MyConnections = () => {
	const [connections, setConnections] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchConnections = async () => {
			try {
				const res = await axios.get('/user/connections', {
					withCredentials: true,
				});
				setConnections(res?.data?.data || []);
			} catch (error) {
				console.error('Failed to fetch connections:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchConnections();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black text-white px-6 py-16">
			<h1 className="text-3xl font-bold text-center text-indigo-100 flex items-center justify-center gap-2 mb-10">
				<FaUserFriends /> My Connections
			</h1>

			{loading ? (
				<p className="text-center text-gray-400 animate-pulse">Loading connections...</p>
			) : connections.length === 0 ? (
				<p className="text-center text-gray-500">You haven't connected with any developers yet.</p>
			) : (
				<ul className="max-w-3xl mx-auto divide-y divide-gray-700">
					{connections.map((user, index) => (
						<motion.li
							key={user._id}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							viewport={{ once: true }}
							className="flex items-center justify-between py-4 px-4 my-2 bg-indigo-50/20 hover:bg-indigo-50/30 rounded-md transition">
							<div className="flex items-center gap-4">
								<img
									src={user.photoURL}
									alt={user.firstName}
									className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
								/>
								<div>
									<h3 className="text-lg font-semibold">
										{user.firstName} {user.lastName}
									</h3>
									<p className="text-sm text-gray-400">{user.skills?.length > 0 ? user.skills.join(', ') : 'No skills listed'}</p>
								</div>
							</div>

							<button className="text-indigo-500 hover:text-indigo-400 transition text-xl">
								<FaCommentDots />
							</button>
						</motion.li>
					))}
				</ul>
			)}
		</div>
	);
};

export default MyConnections;
