import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { nigerianRecipes } from "../data/recipes"
import { RecipeCard, SearchBar, ThemeToggle } from "../components"

const Home = () => {
	const [searchTerm, setSearchTerm] = useState("")
	const navigate = useNavigate()

	const filteredRecipes = nigerianRecipes
		.filter(
			(recipe) =>
				recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.slice(0, 10)

	const handleRecipeClick = (recipe) => {
		navigate(`/recipe/${recipe.id}`)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-dark-bg dark:to-dark-surface pb-20 transition-colors duration-300">
			{/* Header */}
			<div className="bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-700 dark:to-red-700 px-4 pt-12 pb-8">
				<div className="max-w-md mx-auto">
					<div className="absolute right-8">
						<ThemeToggle />
					</div>

					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center mb-6">
						<h1 className="text-3xl font-bold text-white mb-2">
							🍲 Mama's Kitchen
						</h1>
						<p className="text-orange-100 dark:text-orange-200">
							Discover authentic Nigerian recipes
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}>
						<SearchBar
							value={searchTerm}
							onChange={setSearchTerm}
							placeholder="Search Nigerian recipes..."
						/>
					</motion.div>
				</div>
			</div>

			{/* Featured Section */}
			<div className="px-4 py-6">
				<div className="max-w-md mx-auto">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}>
						<h2 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
							Popular Recipes
						</h2>

						{filteredRecipes.length > 0 ? (
							<div className="space-y-4">
								{filteredRecipes.map((recipe, index) => (
									<motion.div
										key={recipe.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.1 * index }}>
										<RecipeCard recipe={recipe} onClick={handleRecipeClick} />
									</motion.div>
								))}
							</div>
						) : (
							<div className="text-center py-12">
								<div className="text-6xl mb-4">🔍</div>
								<p className="text-gray-600 dark:text-dark-text-secondary">
									No recipes found
								</p>
								<p className="text-sm text-gray-500 dark:text-dark-text-muted mt-1">
									Try searching for something else
								</p>
							</div>
						)}
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default Home
