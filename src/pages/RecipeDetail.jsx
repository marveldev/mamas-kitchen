import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Users, ChefHat, Plus } from "lucide-react"
import { nigerianRecipes } from "../data/recipes"
import { useApp } from "../context/AppContext"
import { Snackbar } from "../components"

const RecipeDetail = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { addToShoppingList } = useApp()
	const [SnackbarIsVisible, setSnackbarIsVisible] = useState(true)

	const recipe = nigerianRecipes.find((r) => r.id === parseInt(id))

	if (!recipe) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="text-6xl mb-4">😕</div>
					<p className="text-gray-600">Recipe not found</p>
				</div>
			</div>
		)
	}

	const addIngredientToList = (ingredient) => {
		addToShoppingList({
			name: ingredient,
			quantity: 1,
			unit: "",
			recipeId: recipe.id,
			recipeName: recipe.name,
		})

		setSnackbarIsVisible(true)
	}

	const addAllIngredients = () => {
		recipe.ingredients.forEach((ingredient) => {
			addIngredientToList(ingredient)
		})
	}

	return (
		<div className="min-h-screen bg-gray-50 pb-20">
			{/* Header */}
			<div className="relative">
				<img
					src={recipe.image}
					alt={recipe.name}
					className="w-full h-64 object-cover"
				/>
				<div className="absolute inset-0 bg-black/30" />

				<button
					onClick={() => navigate(-1)}
					className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
					<ArrowLeft size={24} />
				</button>

				<div className="absolute bottom-4 left-4 right-4">
					<h1 className="text-3xl font-bold text-white mb-2">{recipe.name}</h1>
					<div className="flex items-center gap-4 text-white/90">
						<div className="flex items-center gap-1">
							<Clock size={16} />
							<span className="text-sm">{recipe.cookTime}</span>
						</div>
						<div className="flex items-center gap-1">
							<Users size={16} />
							<span className="text-sm">{recipe.servings} servings</span>
						</div>
						<div className="flex items-center gap-1">
							<ChefHat size={16} />
							<span className="text-sm">{recipe.difficulty}</span>
						</div>
					</div>
				</div>
			</div>

			<div className="px-4 py-6 max-w-md mx-auto">
				{/* Description */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-6">
					<p className="text-gray-700 leading-relaxed">{recipe.description}</p>
				</motion.div>

				{/* Ingredients */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="bg-white rounded-xl p-6 mb-6 shadow-sm">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-bold text-gray-900">Ingredients</h2>
						<button
							onClick={addAllIngredients}
							className="flex items-center gap-2 text-orange-600 text-sm font-medium hover:text-orange-700 transition-colors">
							<Plus size={16} />
							Add All
						</button>
					</div>

					<div className="space-y-3">
						{recipe.ingredients.map((ingredient, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.05 * index }}
								className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
								<span className="text-gray-700">{ingredient}</span>
								<button
									onClick={() => addIngredientToList(ingredient)}
									className="p-1 text-orange-600 hover:bg-orange-50 rounded-md transition-colors">
									<Plus size={16} />
								</button>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Instructions */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="bg-white rounded-xl p-6 shadow-sm">
					<h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>

					<div className="space-y-4">
						{recipe.instructions.map((instruction, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.05 * index }}
								className="flex gap-4">
								<div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
									{index + 1}
								</div>
								<p className="text-gray-700 leading-relaxed pt-1">
									{instruction}
								</p>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>

			<Snackbar
				message="All ingredients added!"
				isVisible={SnackbarIsVisible}
				onClose={() => setSnackbarIsVisible(false)}
			/>
		</div>
	)
}

export default RecipeDetail
