import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaLaptopCode, FaRocket, FaHandshake } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Home = () => {
	const user = useSelector((store) => store.user);
	const navigate = useNavigate();
	const handleClick = () => {
		if (user && user._id) {
			navigate('/feed');
		} else {
			navigate('/login');
		}
	};
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black   bg-cover bg-center bg-no-repeat  bg-blend-overlay text-white flex flex-col items-center justify-center px-6">
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
				className="text-center max-w-2xl mt-16">
				<h1 className="text-4xl md:text-4xl font-bold mb-4 ">Connect with Developers Who Build the Future</h1>
				<p className="text-gray-600 text-lg md:text-lg mb-8">Meet passionate coders, team up on side projects, find collaborators, and ignite ideas that change the world.</p>
				<AnimatePresence>
					<motion.button
						onClick={handleClick}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.95 }}
						className=" px-8 py-3 bg-gradient-to-br from-indigo-400 via-indigo-500  text-lg rounded-full font-semibold hover:bg-[#fff] cursor-pointer transition">
						Join the Dev Revolution
					</motion.button>
				</AnimatePresence>
			</motion.div>

			{/* Features Section */}
			<div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
				{features.map((feature, i) => (
					<motion.div
						key={i}
						whileHover={{ scale: 1.02 }}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: i * 0.2 }}
						viewport={{ once: true }}
						className="bg-[#2C2C2C]/20 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center">
						<div className="text-4xl mb-4 text-cyan-200">{feature.icon}</div>
						<h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
						<p className="text-gray-400 text-sm">{feature.description}</p>
					</motion.div>
				))}
			</div>
		</div>
	);
};

const features = [
	{
		icon: <FaLaptopCode />,
		title: 'Build Meaningful Projects',
		description: 'Team up with like-minded devs and bring your ideas to life with code that matters.',
	},
	{
		icon: <FaHandshake />,
		title: 'Find Your Dev Partner',
		description: 'Match with developers who share your skills, interests, and ambitions.',
	},
	{
		icon: <FaRocket />,
		title: 'Launch Fast, Fail Smarter',
		description: 'Accelerate your learning and success by building and shipping with a community that gets it.',
	},
];

export default Home;
