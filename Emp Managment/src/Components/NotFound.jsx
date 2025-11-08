import React from "react";
import { Link } from "react-router-dom";
import { motion, rgba } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-green-100 text-center px-4">
     

     
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-7xl">😵‍💫</span>
      </motion.div>

      <motion.h1
        className="text-7xl font-extrabold text-gray-800 mt-6"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, }}
        transition={{ duration: 1, delay:0.5, repeat:Infinity }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-xl text-gray-700 mt-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          🏠 Back to Dashboard
        </Link>
      </motion.div>

      <motion.p
        className="text-sm text-gray-600 mt-8 italic"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Maybe you took a wrong turn somewhere... 🤔
      </motion.p>
    </div>
  );
};

export default NotFound;
