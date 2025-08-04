import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppProvider } from "./context/AppContext"
import { ThemeProvider } from "./context/ThemeContext"
import Navigation from "./components/Navigation"
import { Home, Recipes, RecipeDetail, ShoppingList, AIChat } from "./pages"

const App = () => {
	return (
		<ThemeProvider>
			<AppProvider>
				<Router>
					<div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/recipes" element={<Recipes />} />
							<Route path="/recipe/:id" element={<RecipeDetail />} />
							<Route path="/shopping" element={<ShoppingList />} />
							<Route path="/chat" element={<AIChat />} />
						</Routes>
						<Navigation />
					</div>
				</Router>
			</AppProvider>
		</ThemeProvider>
	)
}

export default App
