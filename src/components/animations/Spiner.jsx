import React from "react";
import { motion } from "framer-motion";


const styleContainer = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const styleSpan = {
    display: "block",
    width: 200,
    height: 200,
    border: "7px solid #eee",
    borderTop: "7px solid #2D3134",
    borderRadius: "50%",
    boxSizing: "border-box"
};

const spinTransition = {
    repeat: Infinity,
    ease: "easeInOut",
    duration: 1
};

export const Spinner = () => {
    return (
        <div style={styleContainer}>
            <h1 className="me-5">Procesando su Solicitud...</h1>
            <motion.span
                style={styleSpan}
                animate={{ rotate: 360 }}
                transition={spinTransition}
            />
        </div>
    );
};