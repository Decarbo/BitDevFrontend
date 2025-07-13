import React from 'react';
import Profilecard from './Profilecard';
import { useSelector } from 'react-redux';

const Profile = () => {
	const userData = useSelector((store) => store.user);
	console.log(userData);
	return (
		<div>
			<Profilecard data={userData} />
		</div>
	);
};

export default Profile;
