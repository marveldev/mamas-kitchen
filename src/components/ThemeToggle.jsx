import React from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

const ThemeToggle = () => {
	const { isDarkMode, toggleTheme } = useTheme()

	return (
		<motion.button
			whileTap={{ scale: 0.9 }}
			onClick={toggleTheme}
			className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200 border border-red-400">
			<motion.div
				initial={false}
				animate={{ rotate: isDarkMode ? 180 : 0 }}
				transition={{ duration: 0.3 }}>
				{isDarkMode ? (
					<Moon className="text-yellow-300" size={20} />
				) : (
					<Sun className="text-yellow-400" size={20} />
				)}
			</motion.div>
		</motion.button>
	)
}

export default ThemeToggle
