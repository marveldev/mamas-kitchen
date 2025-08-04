import { Clock, Users } from "lucide-react"
import { motion } from "framer-motion"

const RecipeCard = ({ recipe, onClick, className = "", viewMode = "grid" }) => {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			onClick={() => onClick(recipe)}
			className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 ${className}`}>
			{/* Only show image in grid view */}
			{viewMode !== "list" && (
				<div className="relative h-48 overflow-hidden">
					<img
						src={recipe.image}
						alt={recipe.name}
						className="w-full h-full object-cover"
					/>
					<div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
						<span
							className={`text-xs font-medium ${
								recipe.difficulty === "Easy"
									? "text-green-600"
									: recipe.difficulty === "Medium"
									? "text-yellow-600"
									: "text-red-600"
							}`}>
							{recipe.difficulty}
						</span>
					</div>
				</div>
			)}

			<div className="p-4">
				<h3 className="font-bold text-lg text-gray-900 mb-2">{recipe.name}</h3>
				<p className="text-gray-600 text-sm mb-3 line-clamp-2">
					{recipe.description}
				</p>

				<div className="flex items-center justify-between text-sm text-gray-500">
					<div className="flex items-center gap-1">
						<Clock size={16} />
						<span>{recipe.cookTime}</span>
					</div>
					<div className="flex items-center gap-1">
						<Users size={16} />
						<span>{recipe.servings} servings</span>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default RecipeCard
