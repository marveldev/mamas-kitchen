import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Grid, List } from "lucide-react"
import { nigerianRecipes } from "../data/recipes"
import { RecipeCard, SearchBar } from "../components"

const Recipes = () => {
	const [searchTerm, setSearchTerm] = useState("")
	const [viewMode, setViewMode] = useState("grid") // 'grid' or 'list'
	const navigate = useNavigate()

	const filteredRecipes = nigerianRecipes.filter(
		(recipe) =>
			recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleRecipeClick = (recipe) => {
		navigate(`/recipe/${recipe.id}`)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-dark-bg dark:to-dark-surface pb-20 transition-colors duration-300">
			{/* Header */}
			<div className="bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-700 dark:to-red-700 px-4 pt-12 pb-8">
				<div className="max-w-md mx-auto">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex items-center justify-between mb-6">
						<div>
							<h1 className="text-2xl font-bold text-white ">All Recipes</h1>
							<p className="text-orange-100 dark:text-orange-200 text-sm">
								{filteredRecipes.length} Nigerian recipes
							</p>
						</div>

						<div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
							<button
								onClick={() => setViewMode("grid")}
								className={`p-2 rounded-md transition-colors ${
									viewMode === "grid"
										? "bg-white text-orange-600 shadow-sm"
										: "text-gray-600 hover:text-gray-900"
								}`}>
								<Grid size={20} />
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={`p-2 rounded-md transition-colors ${
									viewMode === "list"
										? "bg-white text-orange-600 shadow-sm"
										: "text-gray-600 hover:text-gray-900"
								}`}>
								<List size={20} />
							</button>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}>
						<SearchBar
							value={searchTerm}
							onChange={setSearchTerm}
							placeholder="Search recipes..."
						/>
					</motion.div>
				</div>
			</div>

			{/* Recipes Grid/List */}
			<div className="px-4 py-6">
				<div className="max-w-md mx-auto">
					{filteredRecipes.length > 0 ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
							className={viewMode === "grid" ? "space-y-4" : "space-y-3"}>
							{filteredRecipes.map((recipe, index) => (
								<motion.div
									key={recipe.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.05 * index }}>
									<RecipeCard
										recipe={recipe}
										onClick={handleRecipeClick}
										className={viewMode === "list" ? "flex-row h-30" : ""}
										viewMode={viewMode}
									/>
								</motion.div>
							))}
						</motion.div>
					) : (
						<div className="text-center py-12">
							<div className="text-6xl mb-4">🔍</div>
							<p className="text-gray-600">No recipes found</p>
							<p className="text-sm text-gray-500 mt-1">
								Try searching for something else
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Recipes
