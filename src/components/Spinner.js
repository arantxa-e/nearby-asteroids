import React from 'react'
import { motion } from "framer-motion";

const Spinner = () => {
    const loadingContainerVariants = {
        start: {
          transition: {
            staggerChildren: 0.2,
          },
        },
        end: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }

      const loadingCircleVariants = {
        start: {
          y: "0%",
        },
        end: {
          y: "50%",
        },
      }
      
      const loadingCircleTransition = {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut",
      }
      

    return (
        <div className="spinner-container">
            <motion.div
                className="spinner-inner-container"
                variants={loadingContainerVariants}
                initial="start"
                animate="end"
                >
                <motion.span
                    className="spinner-circle a"
                    variants={loadingCircleVariants}
                    transition={loadingCircleTransition}
                />
                <motion.span
                    className="spinner-circle b"
                    variants={loadingCircleVariants}
                    transition={loadingCircleTransition}
                />
                <motion.span
                    className="spinner-circle c"
                    variants={loadingCircleVariants}
                    transition={loadingCircleTransition}
                />
                <br />
                <span class="loading-text">Loading</span>
                </motion.div>
                
        </div>
    )
}

export default Spinner;