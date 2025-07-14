import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Outlet, useNavigate } from 'react-router';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userData = useSelector((store) => store.user);
	const fetchuser = async () => {
		if (!userData) return;
		try {
			const res = await axios.get(`${import.meta.env.VITE_API_BASE}/profile/view`, {
				withCredentials: true,
			});
			dispatch(addUser(res.data));
		} catch (error) {
			navigate('/');
			console.log(error);
		}
	};
	useEffect(() => {
		fetchuser();
	}, []);
	return (
		<div className="font1 flex flex-col">
			<Navbar />
			<div className="flex-grow">
				<Outlet />
			</div>
		</div>
	);
};

export default Body;
