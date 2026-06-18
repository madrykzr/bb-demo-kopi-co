/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

interface WordRevealProps {
  text: string;
  className?: string;
}

export default function WordReveal({ text, className = '' }: WordRevealProps) {
  const words = text.split(/\s+/);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.035, // slow, deliberate speed
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0.15,
      y: 2,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1], // elegant cubic curve
      },
    },
  };

  return (
    <motion.p
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-12%' }}
      className={`inline-block font-serif-source text-lg md:text-xl text-coffee/95 leading-relaxed ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="inline-block mr-[0.28em] select-text"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
