import { useRef, useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';

/*
	USER REGEX rules:
		1. Must start with a lowercase or uppercase letter.
		2. Must be followed by 3 to 23 characters that can be lowercase letters, digits, hyphens or underscores
		3. In hoer, it must be 4 to 24 characters.
*/
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

/*
	PASSWORD REGEX rules:
		1. At least one lowercase letter
		2. At least one uppercase letter.
		3. At least one digit.
		4. At least one special character.
		5. The password itself can anywhere from 8 to 24 characters.
*/
const PWD_REGEX = /^(?=.*[a-z])(?=[A-Z])(?=.*[0-9])(?=.[!@#$%]).{8,24 }$/;

const Register = () => {
	return <div>Register</div>;
};

export default Register;
