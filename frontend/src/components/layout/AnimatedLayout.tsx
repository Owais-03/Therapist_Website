import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

export default function AnimatedLayout(props){
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          {props.children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
