import React from "react"
import { NavLink } from "react-router-dom"
import { Home, Book, ShoppingCart, Bot } from "lucide-react"

const Navigation = () => {
	const navItems = [
		{ path: "/", icon: Home, label: "Home" },
		{ path: "/recipes", icon: Book, label: "Recipes" },
		{ path: "/shopping", icon: ShoppingCart, label: "Shopping" },
		{ path: "/chat", icon: Bot, label: "AI Chat" },
	]

	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-700 dark:to-red-700 px-4 py-2 z-50">
			<div className="flex justify-around items-center max-w-md mx-auto">
				{navItems.map(({ path, icon: Icon, label }) => (
					<NavLink
						key={path}
						to={path}
						className={({ isActive }) =>
							`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
								isActive
									? "text-orange-600 bg-orange-50"
									: "text-white hover:text-orange-200"
							}`
						}>
						<Icon size={24} />
						<span className="text-xs mt-1 font-medium">{label}</span>
					</NavLink>
				))}
			</div>
		</nav>
	)
}

export default Navigation
