import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animalData } from '../../data/kidsContent';
import styles from './Animals.module.css';

const Animals = () => {
  const [category, setCategory] = useState('wild');

  return (
    <div className={styles.animalsPage}>
      <header className={styles.header}>
        <div className="container">
          <h1 className="bubble-font">Our Animal Friends 🐾</h1>
          <p>Who's your favorite?! Choose a category and meet them.</p>
        </div>
      </header>

      <div className="container">
        <div className={styles.categorySwitcher}>
          <button 
            className={clsx(styles.switchBtn, category === 'wild' && styles.active)}
            onClick={() => setCategory('wild')}
          >
            🦁 Wild Animals
          </button>
          <button 
            className={clsx(styles.switchBtn, category === 'domestic' && styles.active)}
            onClick={() => setCategory('domestic')}
          >
            🐶 Domestic Animals
          </button>
        </div>

        <motion.div 
          key={category}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className={styles.animalGrid}
        >
          {animalData[category].map((animal) => (
            <AnimalCard key={animal.name} animal={animal} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const AnimalCard = ({ animal }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={styles.animalCard}
    >
      <div className={styles.imgWrapper}>
        <img src={animal.image} alt={animal.name} className={styles.animalImg} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.name}>
          {animal.name.split('').map((char, index) => (
            <motion.span
              key={index}
              whileHover={{ 
                scale: 1.5, 
                color: 'var(--primary)',
                transition: { type: 'spring', stiffness: 300 } 
              }}
              className={styles.letter}
            >
              {char}
            </motion.span>
          ))}
        </h2>
        <p className={styles.desc}>{animal.description}</p>
      </div>
    </motion.div>
  );
};

function clsx(...args) {
  return args.filter(Boolean).join(' ');
}

export default Animals;
