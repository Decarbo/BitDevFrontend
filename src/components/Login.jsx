import axios from 'axios';
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isSignup, setIsSignup] = useState(false);
	const [error, setError] = useState('');
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		emailId: '',
		password: '',
		age: '',
		gender: '',
		about: '',
		skills: '', // comma-separated values e.g., "React,NodeJS"
	});
	console.log(formData.password);
	// console.log(formData);
	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
		if (error) setError(' ');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (isSignup) {
				// Handle signup
				const res = await axios.post(`${import.meta.env.VITE_API_BASE}/signup`, formData, {
					withCredentials: true,
				});

				dispatch(addUser(res.data.user));
				console.log('Signup success:', res.data);
				navigate('/feed');
				window.location.reload();
			} else {
				// Handle login
				console.log(`${import.meta.env.VITE_API_BASE}/login`);
				const res = await axios.post(
					`${import.meta.env.VITE_API_BASE}/login`,
					{
						emailId: formData.emailId,
						password: formData.password,
					},
					{
						withCredentials: true,
					}
				);
				dispatch(addUser(res.data.user));

				console.log('Login success:', res.data);
				navigate('/feed');
				window.location.reload();
			}
		} catch (error) {
			setError(error?.response?.data || error?.message);
			console.log(error);
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-black">
			<div className="bg-indigo-100 p-8 mt-16 rounded-3xl shadow-xl w-full max-w-lg text-center">
				<h2 className="text-2xl font-bold text-gray-800 mb-6">{isSignup ? 'Create Account 💖' : 'Welcome Back ❤️'}</h2>

				<form
					onSubmit={handleSubmit}
					className="space-y-4 ">
					{isSignup && (
						<>
							<label className="block text-left text-sm font-medium text-gray-700 mb-1">
								First Name <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								name="firstName"
								placeholder="First Name"
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
								value={formData.firstName}
								onChange={handleChange}
								required
							/>
							<input
								type="text"
								name="lastName"
								placeholder="Last Name"
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
								value={formData.lastName}
								onChange={handleChange}
							/>
							<label className="block text-left text-sm font-medium text-gray-700 mb-1">
								Age <span className="text-red-500">*</span>
							</label>
							<input
								type="number"
								name="age"
								placeholder="Age"
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
								value={formData.age}
								onChange={handleChange}
								required
							/>
							<select
								name="gender"
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
								value={formData.gender}
								onChange={handleChange}
								required>
								<option value="">Select Gender</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
							</select>
							<textarea
								name="about"
								placeholder="About you"
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
								value={formData.about}
								onChange={handleChange}
								rows={2}
							/>
							<input
								type="text"
								name="skills"
								placeholder="Skills (comma separated)"
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
								value={formData.skills}
								onChange={handleChange}
							/>
						</>
					)}
					<label className="block text-left text-sm font-medium text-gray-700 mb-1">
						Email Id <span className="text-red-500">*</span>
					</label>
					<input
						type="email"
						name="emailId"
						placeholder="EmailId"
						className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
						value={formData.emailId}
						onChange={handleChange}
						required
					/>
					<label className="block text-left text-sm font-medium text-gray-700 mb-1">
						Password <span className="text-red-500">*</span>
					</label>
					<input
						type="password"
						name="password"
						placeholder="Password"
						className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
						value={formData.password}
						onChange={handleChange}
						required
					/>

					<button
						type="submit"
						className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition cursor-pointer">
						{isSignup ? 'Sign Up' : 'Log In'}
					</button>
				</form>

				<p className="text-red-500 text-sm mt-2">{error && error}</p>
				<div className="my-4 text-gray-400 text-sm">or</div>

				<button className="flex items-center justify-center gap-2 w-full border border-gray-300 py-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
					<FaGoogle className="text-red-500" />
					Continue with Google
				</button>

				<p className="mt-6 text-sm text-gray-600">
					{isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
					<span
						className="text-indigo-500 cursor-pointer hover:underline"
						onClick={(e) => setIsSignup(!isSignup)}>
						{isSignup ? 'Log In' : 'Sign Up'}
					</span>
				</p>
			</div>
		</div>
	);
};

export default Login;
