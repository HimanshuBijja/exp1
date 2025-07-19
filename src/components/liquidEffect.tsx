"use client";

import { motion } from "motion/react";

export default function LiquidEffect() {
    return (
        <div className="flex justify-center items-center h-screen bg-test-bg relative border-t-2">
            <motion.div
            animate={{
                rotate : 360,
            }}
            transition={{
                duration: 16,
                repeat: Infinity,
                ease: "linear"
            }}
            >
                <div className="relative">
                    <div className="h-80 w-80 bg-test-surface relative rounded-full blur-xl flex justify-center items-center">
                        <motion.div 
                        animate={{
                            x: [0,75,0],
                            y: [0,75,0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        
                        className="h-50 w-50 bg-test-surface absolute -top-10 -left-10 rounded-full blur-xl "/>
                        <motion.div 
                        
                        animate={{
                            // x: [-75,0,-75],
                            y: [-75,0,-75],
                        }}
                        transition={{
                            // delay: 1,
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        
                        className="h-50 w-50 bg-test-surface absolute -bottom-15  rounded-full blur-xl "/>
                        <motion.div 
                        animate={{
                            x: [-75,0,-75],
                            // y: [75,0,75],
                        }}
                        transition={{
                            delay: 1,
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        
                        className="h-50 w-50 bg-test-surface absolute  -right-15 rounded-full blur-xl "/>
                    </div>
                </div>
            </motion.div>
                <div className="absolute inset-0 backdrop-blur-[8px] z-60"></div>
                <div className="absolute inset-0 bg-test-surface mix-blend-color-burn z-50"></div>
                <div className="absolute inset-0 bg-test-bg mix-blend-color-dodge  z-40"></div>
        </div>
    );
}
