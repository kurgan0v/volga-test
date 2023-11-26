import { motion } from "framer-motion"
import React from "react";
const AnimateWrapper = ({children, margin = ""}:{children: React.ReactNode, margin?: string}) => {
    return (
        <motion.div
            initial={{ opacity: 0, translateY: 100 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{margin}}
            transition={{
                duration: 0.5,
                ease: [0, 0.3, 0.71, 1.01]
            }}
        >
            {children}
        </motion.div>
    );
};

export default AnimateWrapper;