import React from 'react';
import { motion } from 'framer-motion';

const ShimmerCard = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-black	 text-white">
			<p className="text-indigo-500 text-xl mb-6 animate-pulse">Loading developer profiles...</p>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
				className="bg-[#2C2C2C] w-80 h-[400px] p-6 rounded-2xl shadow-lg flex flex-col items-center text-center relative overflow-hidden">
				<div className="w-24 h-24 rounded-full bg-gray-700 mb-4 shimmer" />
				<div className="h-4 w-32 bg-gray-700 rounded mb-2 shimmer" />
				<div className="h-3 w-40 bg-gray-700 rounded mb-4 shimmer" />
				<div className="flex gap-4 mt-auto">
					<div className="w-10 h-10 bg-gray-700 rounded-full shimmer" />
					<div className="w-10 h-10 bg-gray-700 rounded-full shimmer" />
					<div className="w-10 h-10 bg-gray-700 rounded-full shimmer" />
				</div>
			</motion.div>
		</div>
	);
};

export default ShimmerCard;
