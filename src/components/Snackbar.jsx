import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const Snackbar = ({ message, isVisible, onClose }) => {
	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => {
				onClose()
			}, 5000)

			return () => clearTimeout(timer)
		}
	}, [isVisible, onClose])

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: -20, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{ type: "spring", stiffness: 500, damping: 30 }}
					className="fixed bottom-20 left-0 right-0 mx-auto w-[90%] max-w-sm bg-green-400 border border-red-200 rounded-lg shadow-lg p-4 flex items-center">
					<CheckCircle2 className="text-red-600 mr-2 flex-shrink-0" size={20} />
					<p className="text-black text-sm flex-grow font-bold">{message}</p>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default Snackbar
