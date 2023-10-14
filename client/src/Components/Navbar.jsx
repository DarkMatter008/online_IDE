import Select from 'react-select';
import Toggle from "react-toggle";
import React, { useState } from 'react'
import './Navbar.css'


const Navbar = ({ userLang, setUserLang, userTheme,
	setUserTheme, fontSize, setFontSize }) => {
	const languages = [
		{ value: "c", label: "C" },
		{ value: "cpp", label: "C++" },
		{ value: "python", label: "Python" },
		{ value: "java", label: "Java" },
	];
	const themes = [
		{ value: "vs-dark", label: "Dark" },
		{ value: "light", label: "Light" },
	]

    // const [isDark, setIsDark] = useState(true);
	return (
		<div className="navbar">
			<h1>Sanjiban's Code Compiler</h1>
			<Select  className='lang' options={languages} value={userLang}
				onChange={(e) => setUserLang(e.value)}
				placeholder={userLang} />

			<h3>Font Size</h3>
			<input type="range" min="18" max="30"
				value={fontSize} step="2"
				onChange={(e) => { setFontSize(e.target.value) }} />

			<Select className='themes' options={themes} value={userTheme}
				onChange={(e) => setUserTheme(e.value)}
				placeholder={userTheme} />

            {/* <Toggle
                checked={userTheme}
                onChange={({ target }) => setUserTheme(target.checked)}
                icons={{ checked: "🌙", unchecked: "🔆" }}
                aria-label="Dark mode toggle"
                /> */}
		</div>
	)
}

export default Navbar
