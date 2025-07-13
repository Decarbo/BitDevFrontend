import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaCodeBranch, FaCommentDots, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

const UserCard = ({ data }) => {
	// console.log(data);
	const [developers, setDevelopers] = useState(data || []);
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		setDevelopers(data || []);
	}, [data]);

	const handleSwipe = (direction) => {
		setDevelopers((prev) => prev.slice(1));
		console.log(direction === 'right' ? 'Interested' : 'Rejected');
	};

	const dragConstraints = { left: 0, right: 0 };

	const ressend = async () => {
		axios.post('/request/send/:status/:toUserId');
	};
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black pt-16 px-6">
			<h2 className="text-3xl font-bold text-indigo-50 mb-8 text-center">let's Connect to 💻 Developers </h2>

			<div className="flex justify-center items-center min-h-[60vh] relative">
				{developers.length > 0 ? (
					<>
						{/* Show up to 3 users in a stack */}
						{developers.slice(0, 3).map((developer, index) => (
							<motion.div
								key={developer._id}
								drag={index === 0 ? 'x' : false}
								dragConstraints={index === 0 ? dragConstraints : undefined}
								onDragEnd={
									index === 0
										? (event, info) => {
												if (info.offset.x > 150) handleSwipe('right');
												else if (info.offset.x < -150) handleSwipe('left');
										  }
										: undefined
								}
								className={`bg-indigo-100/20 text-indigo-50 w-80 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center absolute ${index === 0 ? 'cursor-grab z-30' : 'z-20'}`}
								style={{
									transform: index === 0 ? 'translateY(0)' : `translateY(${index * 8}px) scale(${1 - index * 0.05})`,
									opacity: index === 0 ? 1 : 0.8 - index * 0.2,
								}}
								whileTap={index === 0 ? { scale: 0.95 } : undefined}>
								<img
									src={developer.photoURL}
									alt={developer.firstName}
									className="w-24 h-24 rounded-full object-cover border-4 border-[#FF4D67] mb-4 select-auto"
								/>
								<h3 className="text-xl font-semibold ">
									{developer.firstName} {developer.lastName}
								</h3>
								<p className="text-sm text-gray-400 mb-4">{developer.skills.length > 0 ? developer.skills.join(', ') : 'No skills listed'}</p>
								<div className="flex gap-4 text-[#FF4D67]">
									<button className="hover:scale-110 transition">
										<FaHeart className="text-xl" />
									</button>
									<button className="hover:scale-110 transition">
										<FaCommentDots className="text-xl" />
									</button>
									<button className="hover:scale-110 transition">
										<FaCodeBranch className="text-xl" />
									</button>
								</div>
							</motion.div>
						))}
					</>
				) : (
					<p className="text-gray-400">No more developers to show!</p>
				)}
			</div>
		</div>
	);
};

export default UserCard;
