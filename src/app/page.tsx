"use client";

import Noise from "@/components/Noise";
import { motion } from "motion/react";
import { div } from "motion/react-client";
import Image from "next/image";
import Spider from "@/components/spider";









export default function Home() {
    return (
        <>
        {/* <div className="flex justify-center items-center h-screen bg-gray-50">
            <motion.div 
            transition={{ duration: 1,
            
            }}
            className="px-12 py-6 border-2 bg-cyan-400">hello</motion.div>
        </div> */}
            {/* <Noise/> */}
            {/* hello */}
            <Spider/>
            </>
    );
}
