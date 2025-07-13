// import axios from 'axios';
// import React, { useEffect } from 'react';

// import { useDispatch, useSelector } from 'react-redux';
// import { addfeed } from '../utils/feedSlice';
// import UserCard from './UserCard';
// import { FaLock } from 'react-icons/fa';
// import { Link } from 'react-router';
// import ShimmerCard from './constant/ShimmerCard';

// const Feed = () => {
// 	const feed = useSelector((store) => store.feed);
// 	const dispatch = useDispatch();
// 	const fetchData = async () => {
// 		if (feed) return;
// 		try {
// 			const res = await axios.get('http://localhost:7777/user/feed', {
// 				withCredentials: true,
// 			});
// 			console.log(res.data);
// 			dispatch(addfeed(res.data));
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};
// 	useEffect(() => {
// 		fetchData();
// 	}, []);

// 	return <div className="bg-gradient-to-br from-indigo-900 to-black">{feed?.length > 0 ? <UserCard data={feed} /> : <ShimmerCard />}</div>;
// };

// export default Feed;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';
import { FaHeart, FaTimes } from 'react-icons/fa';
import ShimmerCard from './constant/ShimmerCard';
const Feed = () => {
	const [developers, setDevelopers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [message, setMessage] = useState('');
	const controls = useAnimation();

	const fetchFeed = async () => {
		try {
			const res = await axios.get(`${import.meta.env.VITE_API_BASE}/user/feed`, {
				withCredentials: true,
			});
			setDevelopers(res.data || []);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFeed();
	}, []);

	const handleConnection = async (status, toUserId) => {
		try {
			const res = await axios.post(`${import.meta.env.VITE_API_BASE}/request/send/${status}/${toUserId}`, {}, { withCredentials: true });
			setMessage(res.data.message);
		} catch (err) {
			console.error(err);
			setMessage(err?.response?.data?.message || 'Something went wrong');
		} finally {
			setCurrentIndex((prev) => prev + 1);
		}
	};

	const handleDragEnd = (event, info) => {
		if (info.offset.x > 150) {
			handleConnection('intrested', developers[currentIndex]._id);
		} else if (info.offset.x < -150) {
			handleConnection('ignored', developers[currentIndex]._id);
		}
	};

	if (loading) {
		return <ShimmerCard />;
	}

	if (currentIndex >= developers.length) {
		return <p className="text-center bg-gradient-to-br from-indigo-900 to-black min-h-screen flex flex-col justify-center items-center text-lg text-gray-400 py-10">🎉 No more developers to show! Sorry we have limited users.</p>;
	}

	const dev = developers[currentIndex];

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black text-white px-6 py-20 flex flex-col items-center justify-center">
			<h1 className="text-xl  text-center md:text-3xl font-bold text-indigo-400 mb-6">🔥 Discover Developers</h1>

			{message && <p className="text-center text-sm text-green-400 mb-4">{message}</p>}

			<motion.div
				className="bg-indigo-50/20 text-white w-full max-w-sm p-6 rounded-xl flex flex-col items-center justify-center shadow-lg cursor-grab"
				initial={{ opacity: 0, y: 120 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0 }}
				drag="x"
				onDragEnd={handleDragEnd}
				dragConstraints={{ left: 0, right: 0 }}
				whileTap={{ scale: 0.95 }}
				key={dev._id}>
				<img
					src={dev.photoURL}
					alt={dev.firstName}
					className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover mb-4"
				/>
				<h2 className="text-xl font-semibold">
					{dev.firstName} {dev.lastName}
				</h2>
				<p className="text-gray-400 text-sm mt-2">{dev.skills?.length ? dev.skills.join(', ') : 'No skills listed'}</p>

				{/* <div className="flex gap-6 mt-6">
					<button
						onClick={() => {
							controls.start({ x: -300, opacity: 0 });
							setTimeout(() => handleConnection('ignored', dev._id), 200);
						}}
						className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full flex items-center gap-2">
						<FaTimes /> Ignore
					</button>

					<button
						onClick={() => {
							controls.start({ x: 300, opacity: 0 });
							setTimeout(() => handleConnection('intrested', dev._id), 200);
						}}
						className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
						<FaHeart /> Connect
					</button>
				</div> */}
			</motion.div>
		</div>
	);
};

export default Feed;
