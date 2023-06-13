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
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
	const userRef = useRef(); // Enables us to set the focus on the user input when the component loads.
	const errRef = useRef(); // Enables us to set the focus on an error if we encounter one so it can be read by a screen reader for accessibility.

	// User field states.
	const [user, setUser] = useState('');
	const [validName, setValidName] = useState(false); // Is tied to whether the name validates or not.
	const [userFocus, setUserFocus] = useState(false); // Is tied to whether we are focused on the user input field or not.

	// Password field states.
	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false); // Is tied to whether the password validates or not
	const [pwdFocus, setPwdFocus] = useState(false); // Is tied to whether we are focused on the password input field or not.

	// Match Password states.
	const [matchPwd, setMatchPwd] = useState('');
	const [validMatchPwd, setValidMatchPwd] = useState(false); // Is tied to whether the repeated password matches or not.
	const [matchFocus, setMatchFocus] = useState(false); // Is tied to whether we are focused on the confirm password input field or not.

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false); // If we successfully submit the form or not.

	// To set the focus on the username input when the component loads.
	useEffect(() => {
		userRef.current.focus();
	}, []);

	// Another useEffect to validate the username.
	// user is now in the dependency array. When the value changes it runs a validation
	useEffect(() => {
		const result = USER_REGEX.test(user);
		console.log(result);
		console.log(user);
		setValidName(result);
	}, [user]);

	useEffect(() => {
		const result = PWD_REGEX.test(pwd);
		console.log(result);
		console.log(pwd);
		setValidPwd(result);
		const match = pwd === matchPwd;
		setValidMatchPwd(match);
	}, [pwd, matchPwd]);

	// If the user changes one of the fields inside the dependency array, we clear out the error message
	useEffect(() => {
		setErrMsg('');
	}, [user, pwd, matchPwd]);

	return (
		<section>
			<p
				ref={errRef}
				className={errMsg ? 'errmsg' : 'offscreen'}
				aria-live="assertive" // Means if there is an error it will be read out by a screen reader
			>
				{errMsg}{' '}
			</p>
			<h1>Register</h1>
			<form>
				{/* USERNAME INPUT */}

				<label htmlFor="username">
					Username:
					<span className={validName ? 'valid' : 'hide'}>
						{' '}
						<FaCheck />
					</span>
					<span className={validName || !user ? 'hide' : 'invalid'}>
						<FaTimes />
					</span>
				</label>
				<input
					type="text"
					id="username" // must match the htmlFor attribute
					ref={userRef} // Allows us to set focus on the input.
					autoComplete="off" // We don't want to see previous values that others may have entered in this field
					required
					onChange={(e) => setUser(e.target.value)}
					aria-invalid={validName ? 'false' : 'true'} // Set to true when the component loads because when at that point we will not have a valid name. Helps screen reader announce whether the input needs adjusting before the form is submitted
					aria-describedby="uidnote" // Tells the screen reader how to describe this input area. Screen reader first reads the label > type > aria-invalid > aria-describedby
					onFocus={() => setUserFocus(true)}
					onBlur={() => setUserFocus(false)} // When you leave the input field
				/>
				{/* This is the paragraph describing the input field above. */}
				<p
					id="uidnote"
					className={
						userFocus && user && !validName ? 'instructions' : 'offscreen'
					}
				>
					<FaInfoCircle /> 4 to 24 characters <br />
					Must begin with a letter <br />
					Letters, numbers, underscores, hyphens allowed.
				</p>

				{/* PASSWORD INPUT */}

				<label htmlFor="password">
					Password:
					<span className={validPwd ? 'valid' : 'hide'}>
						<FaCheck />
					</span>
					<span className={validPwd || !pwd ? 'hide' : 'invalid'}>
						<FaTimes />
					</span>
				</label>
				<input
					type="password"
					id="password"
					required
					onChange={(e) => setPwd(e.target.value)}
					aria-invalid={validPwd ? 'false' : 'true'}
					aria-describedby="pwdnote"
					onFocus={() => setPwdFocus(true)}
					onBlur={() => setPwdFocus(false)}
				/>
				<p
					id="pwdnote"
					className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
				>
					<FaInfoCircle />
					8 to 24 characters <br />
					Must include upper and lowercase letters, a number, and a special
					character. <br />
					Allowed special characters:{' '}
					<span aria-label="exclamation mark">!</span>
					<span aria-label="at symbol">@</span>
					<span aria-label="hashtag">#</span>
					<span aria-label="dollar sign">$</span>
					<span aria-label="percent">%</span>
					{/* aria-label attributes enable screen readers to read the description of each element */}
				</p>

				{/* CONFIRM PASSWORD INPUT */}
				<label htmlFor="confirm_pwd">
					Confirm Password:
					<span className={validMatchPwd && matchPwd ? 'valid' : 'hide'}>
						<FaCheck />
					</span>
					<span className={validMatchPwd || !matchPwd ? 'hide' : 'invalid'}>
						<FaTimes />
					</span>
				</label>
				<input
					type="password"
					id="confirm_pwd"
					required
					onChange={(e) => setMatchPwd(e.target.value)}
					aria-invalid={validMatchPwd ? 'false' : 'true'}
					aria-describedby="confirmnote"
					onFocus={() => setMatchFocus(true)}
					onBlur={() => setMatchFocus(false)}
				/>
				<p
					id="confirmnote"
					className={
						matchFocus && !validMatchPwd ? 'instructions' : 'offscreen'
					}
				>
					<FaInfoCircle />
					Must match the first password input field.
				</p>
			</form>
		</section>
	);
};

export default Register;
