import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const OrderPlaced = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-white px-4 overflow-hidden relative">
      {/* Floating Confetti Animation */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.2 }} 
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-pink-400 via-yellow-300 to-green-300 blur-3xl"
      ></motion.div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center gap-6 border border-gray-200 relative z-10"
      >
        {/* Success Icon */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.3, duration: 0.5 }}
          className="-mt-14 bg-white rounded-full p-2 shadow-lg"
        >
          <FaCheckCircle className="text-green-600 text-7xl animate-bounce" />
        </motion.div>

        {/* Order Placed Message */}
        <motion.h1 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5 }}
          className="text-4xl font-extrabold text-pink-700 text-center"
        >
          Your Order is Placed!
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.7 }}
          className="text-gray-600 text-center max-w-md"
        >
          Thank you for shopping with <span className="text-pink-700 font-semibold">lnKarT</span>.
          We'll notify you once your order is ready for delivery!
        </motion.p>

        {/* Animated Sparkles */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }} 
          animate={{ scale: 1, opacity: 0.4 }} 
          transition={{ delay: 0.9, duration: 0.5 }}
          className="absolute inset-0 flex justify-center items-center z-0"
        >
          <div className="w-40 h-40 rounded-full bg-gradient-to-r from-pink-400 to-pink-700 opacity-10 animate-pulse"></div>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div 
          initial={{ y: 10, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 1 }}
          className="relative z-10"
        >
          <Link
            to="/"
            className="px-6 py-2 rounded-full bg-pink-700 text-white hover:bg-pink-800 transition-transform transform hover:scale-105 shadow-md font-semibold"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderPlaced;
