import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Edit3, Check, X, ShoppingBag } from "lucide-react"
import { useApp } from "../context/AppContext"

const ShoppingList = () => {
	const {
		shoppingList,
		addToShoppingList,
		removeFromShoppingList,
		updateShoppingListItem,
	} = useApp()
	const [newItem, setNewItem] = useState({ name: "", quantity: 1, unit: "" })
	const [editingId, setEditingId] = useState(null)
	const [editItem, setEditItem] = useState({})
	const [showAddForm, setShowAddForm] = useState(false)

	const handleAddItem = () => {
		if (newItem.name.trim()) {
			addToShoppingList(newItem)
			setNewItem({ name: "", quantity: 1, unit: "" })
			setShowAddForm(false)
		}
	}

	const startEditing = (item) => {
		setEditingId(item.id)
		setEditItem({ ...item })
	}

	const saveEdit = () => {
		updateShoppingListItem(editingId, editItem)
		setEditingId(null)
		setEditItem({})
	}

	const cancelEdit = () => {
		setEditingId(null)
		setEditItem({})
	}

	const groupedItems = shoppingList.reduce((groups, item) => {
		const recipe = item.recipeName || "Other Items"
		if (!groups[recipe]) {
			groups[recipe] = []
		}
		groups[recipe].push(item)
		return groups
	}, {})

	return (
		<div className="min-h-screen bg-gray-50 pb-20">
			{/* Header */}
			<div className="bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-700 dark:to-red-700 px-4 pt-12 pb-8">
				<div className="max-w-md mx-auto">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex items-center justify-between mb-4">
						<div>
							<h1 className="text-2xl font-bold text-white">Shopping List</h1>
							<p className="text-orange-100 dark:text-orange-200 text-sm">
								{shoppingList.length} items
							</p>
						</div>

						<button
							onClick={() => setShowAddForm(!showAddForm)}
							className="p-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors shadow-lg">
							<Plus size={24} />
						</button>
					</motion.div>

					{/* Add Item Form */}
					<AnimatePresence>
						{showAddForm && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								className="bg-gray-50 rounded-xl p-4 mb-4">
								<div className="space-y-3">
									<input
										type="text"
										placeholder="Item name"
										value={newItem.name}
										onChange={(e) =>
											setNewItem({ ...newItem, name: e.target.value })
										}
										className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
									/>
									<div className="flex gap-2">
										<input
											type="number"
											placeholder="Qty"
											value={newItem.quantity}
											onChange={(e) =>
												setNewItem({
													...newItem,
													quantity: parseInt(e.target.value) || 1,
												})
											}
											className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
										/>
										<input
											type="text"
											placeholder="Unit"
											value={newItem.unit}
											onChange={(e) =>
												setNewItem({ ...newItem, unit: e.target.value })
											}
											className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
										/>
									</div>
									<div className="flex gap-2">
										<button
											onClick={handleAddItem}
											className="flex-1 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
											Add Item
										</button>
										<button
											onClick={() => setShowAddForm(false)}
											className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
											Cancel
										</button>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			{/* Shopping List */}
			<div className="px-4 py-6">
				<div className="max-w-md mx-auto">
					{shoppingList.length > 0 ? (
						<div className="space-y-6">
							{Object.entries(groupedItems).map(([recipeName, items]) => (
								<motion.div
									key={recipeName}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									className="bg-white rounded-xl shadow-sm overflow-hidden">
									<div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3">
										<h3 className="font-semibold text-white">{recipeName}</h3>
									</div>

									<div className="p-4 space-y-3">
										<AnimatePresence>
											{items.map((item) => (
												<motion.div
													key={item.id}
													layout
													initial={{ opacity: 0, x: -20 }}
													animate={{ opacity: 1, x: 0 }}
													exit={{ opacity: 0, x: 20 }}
													className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
													{editingId === item.id ? (
														<div className="flex-1 flex items-center gap-2">
															<input
																type="text"
																value={editItem.name}
																onChange={(e) =>
																	setEditItem({
																		...editItem,
																		name: e.target.value,
																	})
																}
																className="flex-1 p-1 text-sm border border-gray-200 rounded"
															/>
															<input
																type="number"
																value={editItem.quantity}
																onChange={(e) =>
																	setEditItem({
																		...editItem,
																		quantity: parseInt(e.target.value) || 1,
																	})
																}
																className="w-12 p-1 text-sm border border-gray-200 rounded"
															/>
															<input
																type="text"
																value={editItem.unit}
																onChange={(e) =>
																	setEditItem({
																		...editItem,
																		unit: e.target.value,
																	})
																}
																className="w-16 p-1 text-sm border border-gray-200 rounded"
															/>
														</div>
													) : (
														<div className="flex-1">
															<div className="font-medium text-gray-900">
																{item.name}
															</div>
															<div className="text-sm text-gray-600">
																{item.quantity} {item.unit}
															</div>
														</div>
													)}

													<div className="flex items-center gap-2">
														{editingId === item.id ? (
															<>
																<button
																	onClick={saveEdit}
																	className="p-1 text-green-600 hover:bg-green-50 rounded">
																	<Check size={16} />
																</button>
																<button
																	onClick={cancelEdit}
																	className="p-1 text-gray-600 hover:bg-gray-100 rounded">
																	<X size={16} />
																</button>
															</>
														) : (
															<>
																<button
																	onClick={() => startEditing(item)}
																	className="p-1 text-blue-600 hover:bg-blue-50 rounded">
																	<Edit3 size={16} />
																</button>
																<button
																	onClick={() =>
																		removeFromShoppingList(item.id)
																	}
																	className="p-1 text-red-600 hover:bg-red-50 rounded">
																	<Trash2 size={16} />
																</button>
															</>
														)}
													</div>
												</motion.div>
											))}
										</AnimatePresence>
									</div>
								</motion.div>
							))}
						</div>
					) : (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-center py-12">
							<div className="text-6xl mb-4">
								<ShoppingBag className="mx-auto text-gray-300" size={80} />
							</div>
							<p className="text-gray-600 mb-2">Your shopping list is empty</p>
							<p className="text-sm text-gray-500 mb-6">
								Add items manually or from recipe ingredients
							</p>
							<button
								onClick={() => setShowAddForm(true)}
								className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
								Add First Item
							</button>
						</motion.div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ShoppingList
