import React from 'react';
import { motion } from 'framer-motion';
import { numberData } from '../../data/kidsContent';
import styles from './Numbers.module.css';

const Numbers = () => {
  return (
    <div className={styles.numbersPage}>
      <header className={styles.header}>
        <div className="container">
          <h1 className="bubble-font">Counting Fun! 1-100</h1>
          <p>Let's count together, one by one! ⭐</p>
        </div>
      </header>

      <main className="container">
        <div className={styles.numbersGrid}>
          {numberData.map((num, index) => (
            <NumberCard key={num.value} num={num} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
};

const NumberCard = ({ num, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={styles.numberCard}
    >
      <div className={styles.numberDisplay}>
        <span className={styles.value}>{num.value}</span>
        <span className={styles.spelling}>{num.spelling}</span>
      </div>
      
      <div className={styles.itemsList}>
        {/* Only show up to 10 items for visual clarity if number is large */}
        {Array.from({ length: Math.min(num.value, 12) }).map((_, i) => (
          <motion.img 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            key={i} 
            src={num.itemImg} 
            alt={num.itemName} 
            className={styles.itemIcon} 
            style={num.itemStyle}
          />
        ))}
        {num.value > 12 && (
          <span className={styles.plusMore}>+ {num.value - 12} more!</span>
        )}
      </div>
    </motion.div>
  );
};

export default Numbers;
