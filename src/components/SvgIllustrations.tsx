/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2.2, ease: 'easeInOut' },
      opacity: { duration: 0.5 }
    }
  }
};

interface SvgWrapperProps {
  className?: string;
  size?: number;
}

// 1. V60 Dripper Icon
export function V60Icon({ className = '', size = 100 }: SvgWrapperProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="#3D2A1A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`opacity-80 select-none ${className}`}
    >
      {/* V60 Cup Rim */}
      <motion.path d="M 25 25 L 75 25" variants={pathVariants} />
      {/* V-shape body */}
      <motion.path d="M 25 25 L 45 60 C 47 64, 53 64, 55 60 L 75 25" variants={pathVariants} />
      {/* Ribbed lines inside to guide coffee */}
      <motion.path d="M 33 28 L 47 52" variants={pathVariants} />
      {/* Ribbed lines opposite */}
      <motion.path d="M 67 28 L 53 52" variants={pathVariants} />
      {/* Center alignment rib */}
      <motion.path d="M 50 25 L 50 58" variants={pathVariants} />
      {/* Thick base ring */}
      <motion.path d="M 35 64 L 65 64" variants={pathVariants} />
      {/* Glass server carafe below */}
      <motion.path d="M 40 68 C 30 74, 30 90, 42 92 L 58 92 C 70 90, 70 74, 60 68" variants={pathVariants} />
      {/* Small coffee level inside carafe */}
      <motion.path d="M 36 82 Q 50 84 64 82" variants={pathVariants} />
    </motion.svg>
  );
}

// 2. Gooseneck Pouring Kettle
export function KettleIcon({ className = '', size = 100 }: SvgWrapperProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="#3D2A1A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`opacity-80 select-none ${className}`}
    >
      {/* Kettle Base */}
      <motion.path d="M 35 85 L 75 85" variants={pathVariants} />
      {/* Trapezoidal kettle wall */}
      <motion.path d="M 35 85 L 40 50 L 70 50 L 75 85 Z" variants={pathVariants} />
      {/* Lid dome */}
      <motion.path d="M 44 50 C 44 42, 66 42, 66 50" variants={pathVariants} />
      {/* Handle knob */}
      <motion.path d="M 55 42 L 55 38" variants={pathVariants} />
      <motion.circle cx="55" cy="36" r="2.5" variants={pathVariants} />
      {/* Curved pouring spout - Gooseneck */}
      <motion.path d="M 38 72 C 22 75, 15 50, 24 38" variants={pathVariants} />
      {/* Little droplet suspending */}
      <motion.path d="M 23 44 C 21 44, 21 48, 23 48 C 25 48, 25 44, 23 44" variants={pathVariants} />
      {/* Strong grip loop Handle */}
      <motion.path d="M 72 58 C 84 56, 86 78, 74 81" variants={pathVariants} />
    </motion.svg>
  );
}

// 3. Precision Weighing Scale
export function ScaleIcon({ className = '', size = 100 }: SvgWrapperProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="#3D2A1A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`opacity-80 select-none ${className}`}
    >
      {/* Top hot plate */}
      <motion.path d="M 15 35 L 85 35" variants={pathVariants} />
      {/* Left/Right profile */}
      <motion.path d="M 15 35 L 18 52 C 18 57, 24 57, 24 57" variants={pathVariants} />
      <motion.path d="M 85 35 L 82 52 C 82 57, 76 57, 76 57" variants={pathVariants} />
      {/* Underbody panel */}
      <motion.path d="M 24 57 L 76 57" variants={pathVariants} />
      {/* Thick base plate */}
      <motion.path d="M 18 63 L 82 63 C 86 63, 86 68, 82 68 L 18 68 C 14 68, 14 63, 18 63" variants={pathVariants} />
      {/* Small digital screen recess */}
      <motion.rect x="38" y="44" width="24" height="9" rx="1.5" variants={pathVariants} />
      {/* Floating letters "02:15" and "324.2g" in wireframe indicators */}
      <motion.path d="M 42 49 L 45 49 M 48 49 L 51 49" variants={pathVariants} />
      <motion.p />
      {/* Mug placed on top */}
      <motion.path d="M 38 35 L 40 18 L 60 18 L 62 35" variants={pathVariants} />
      {/* Mug handle */}
      <motion.path d="M 60 22 C 66 22, 66 31, 60 31" variants={pathVariants} />
    </motion.svg>
  );
}

// 4. Vintage Hand-crank Grinder
export function GrinderIcon({ className = '', size = 100 }: SvgWrapperProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="#3D2A1A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`opacity-80 select-none ${className}`}
    >
      {/* Crank shaft central */}
      <motion.path d="M 50 35 L 50 18" variants={pathVariants} />
      {/* Wavy handle lever */}
      <motion.path d="M 50 18 C 55 12, 68 28, 74 16" variants={pathVariants} />
      {/* Wooden turn knob */}
      <motion.circle cx="75" cy="15" r="3.5" variants={pathVariants} />
      
      {/* Hopper dome top */}
      <motion.path d="M 32 35 C 32 26, 68 26, 68 35" variants={pathVariants} />
      {/* Opening hatch line */}
      <motion.path d="M 32 35 L 68 35" variants={pathVariants} />
      
      {/* Wooden Body Block */}
      <motion.rect x="32" y="35" width="36" height="42" rx="3" variants={pathVariants} />
      {/* Ornamental frame dividing drawer */}
      <motion.path d="M 32 62 L 68 62" variants={pathVariants} />
      {/* Ground collection drawer knob */}
      <motion.circle cx="50" cy="70" r="2" variants={pathVariants} />
      {/* Little table bracket feet */}
      <motion.path d="M 30 77 L 70 77" variants={pathVariants} />
      <motion.path d="M 34 77 L 34 82 L 30 82" variants={pathVariants} />
      <motion.path d="M 66 77 L 66 82 L 70 82" variants={pathVariants} />
    </motion.svg>
  );
}
