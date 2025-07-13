import React, { useState } from 'react';
import { FaFire, FaHeart, FaComments, FaUserPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false);
	const user = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handellogout = async () => {
		setShowMenu(false);
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_BASE}/logout`,
				{},
				{
					withCredentials: true,
				}
			);
			dispatch(removeUser());
			return navigate('/');
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<nav className="fixed top-0 left-0 w-full bg-black/20 text-white shadow-md z-50 text-sm md:text-lg ">
			<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
				{/* Logo */}
				<Link to="/">
					<div className="text-indigo-300  font-bold tracking-wider">BitDev</div>
				</Link>

				{/* Navigation Icons */}
				<div className="flex space-x-2 text-xl md:space-x-4 ">
					<Link to="/feed">
						<button className="hover:text-red-500 transition">
							<FaFire />
						</button>
					</Link>
					<Link to="/connections">
						<button className="hover:text-red-500 transition">
							<FaHeart />
						</button>
					</Link>
					<Link to="/requests">
						<button className="hover:text-blue-500 transition">
							<FaUserPlus />
						</button>
					</Link>
					<button className="hover:text-blue-500 transition">
						<FaComments />
					</button>
				</div>

				{/* Profile Avatar */}
				{user ? (
					<div className="relative flex justify-center items-center gap-2">
						<div>
							<span className="font-bold "> {user.firstName}</span>
						</div>
						<button
							onClick={() => setShowMenu(!showMenu)}
							className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-300 hover:border-red-500 transition">
							<img
								src={user?.user?.photoURL || user?.photoURL}
								alt="Profile"
								className="w-full h-full object-cover"
							/>
						</button>

						{showMenu && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className="absolute right-0 top-14 w-40 bg-[#2C2C2C] rounded-lg shadow-lg p-2 z-50">
								<Link to="/profile">
									<button
										onClick={() => setShowMenu(false)}
										className="w-full text-left text-sm px-4 py-2 hover:bg-[#FF4D67] hover:text-white rounded-md">
										Go to Profile
									</button>
								</Link>
								<button
									onClick={handellogout}
									className="w-full text-left text-sm px-4 py-2 hover:bg-[#FF4D67] hover:text-white rounded-md">
									Logout
								</button>
							</motion.div>
						)}
					</div>
				) : (
					<Link to="/login">
						<button className="text-sm px-4 py-1 bg-indigo-500 rounded-lg cursor-pointer">Login</button>
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
