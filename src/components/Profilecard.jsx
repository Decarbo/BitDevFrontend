import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import UserCard from './userCard';
const Profilecard = ({ data }) => {
	console.log(data);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		about: '',
		skills: '',
		photoURL: '',
	});
	useEffect(() => {
		if (data) {
			setFormData({
				firstName: data.firstName || '',
				lastName: data.lastName || '',
				about: data.about || '',
				skills: data.skills?.join(', ') || '',
				photoURL: data.photoURL || '',
			});
		}
	}, [data]);

	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		try {
			const res = await axios.patch(
				`${import.meta.env.VITE_API_BASE}/profile/edit`,
				{
					...formData,
					skills: formData.skills.split(',').map((skill) => skill.trim()),
				},
				{ withCredentials: true }
			);

			setSuccess('Profile updated successfully!');
			dispatch(addUser(res.data));
			console.log(res);
			setError('');
		} catch (err) {
			console.error(err);
			setError('Something went wrong. Try again.');
			setSuccess('');
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-black px-4 py-10">
			<div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">
				<h2 className="text-2xl font-bold text-center text-indigo-400 mb-6">Edit Your Profile</h2>

				<form
					onSubmit={handleSubmit}
					className="space-y-4">
					<input
						type="text"
						name="firstName"
						placeholder="First Name"
						value={formData.firstName}
						onChange={handleChange}
						className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						required
					/>
					<input
						type="text"
						name="lastName"
						placeholder="Last Name"
						value={formData.lastName}
						onChange={handleChange}
						className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						required
					/>
					<textarea
						name="about"
						placeholder="Short about"
						value={formData.about}
						onChange={handleChange}
						rows={3}
						className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
					<input
						type="text"
						name="skills"
						placeholder="Skills (comma-separated)"
						value={formData.skills}
						onChange={handleChange}
						className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
					<div className="flex  justify-center items-center gap-2">
						<input
							type="text"
							name="photoURL"
							placeholder="Profile Photo URL"
							value={formData.photoURL}
							onChange={handleChange}
							className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
						<img
							src={formData.photoURL}
							alt=""
							className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-300 hover:border-red-500 transition"
						/>{' '}
					</div>
					<button
						type="submit"
						className="w-full bg-indigo-500 text-white py-3 rounded-md font-semibold hover:bg-indigo-600 transition">
						Update Profile
					</button>
				</form>

				{success && <p className="text-green-400 text-sm mt-4">{success}</p>}
				{error && <p className="text-red-400 text-sm mt-4">{error}</p>}
			</div>
			{formData && (
				<div className="ml-10 bg-indigo-100/10 text-white w-80 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center border border-indigo-500">
					<img
						src={formData.photoURL || 'https://via.placeholder.com/100'}
						alt={formData.firstName}
						className="w-24 h-24 rounded-full object-cover border-4 border-[#FF4D67] mb-4"
					/>
					<h3 className="text-xl font-semibold">
						{formData.firstName || 'First'} {formData.lastName || 'Last'}
					</h3>
					<p className="text-sm italic text-gray-300 mb-2">{formData.about || 'A short bio will appear here.'}</p>
					<p className="text-sm text-indigo-200 mb-1">Skills: {formData.skills?.length > 0 ? formData.skills : 'No skills listed'}</p>
				</div>
			)}
		</div>
	);
};

export default Profilecard;
