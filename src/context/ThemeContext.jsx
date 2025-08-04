import React, { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error("useTheme must be used within ThemeProvider")
	}
	return context
}

export const ThemeProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("darkMode")
			if (saved !== null) {
				return JSON.parse(saved)
			}
			return window.matchMedia("(prefers-color-scheme: dark)").matches
		}
		return false
	})

	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(isDarkMode))
		if (isDarkMode) {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}
	}, [isDarkMode])

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode)
	}

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
