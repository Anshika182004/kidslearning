import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { alphabetData } from '../../data/kidsContent';
import styles from './Alphabets.module.css';

const Alphabets = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);

  return (
    <div className={styles.alphabetsPage}>
      <header className={styles.header}>
        <div className="container">
          <h1 className="bubble-font">Wonderful Alphabets</h1>
          <p>Learn your A-B-Cs with cute friends! 🦒🍎</p>
        </div>
      </header>

      <main className="container">
        <motion.div 
          layout
          className={styles.grid}
        >
          {alphabetData.map((item) => (
            <motion.div
              layoutId={`card-${item.letter}`}
              key={item.letter}
              className={styles.alphabetCard}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedLetter(item)}
            >
              <div className={styles.letterWrapper}>
                <span className={styles.letter}>{item.letter}</span>
              </div>
              <p className={styles.word}>{item.word}</p>
              <img src={item.image} alt={item.word} className={styles.mainImg} />
              <div className={styles.hint}>Click to see more! ✨</div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Expanded Overlay */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.overlay}
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div 
              layoutId={`card-${selectedLetter.letter}`}
              className={styles.expandedCard}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setSelectedLetter(null)}>
                <X size={32} />
              </button>
              
              <div className={styles.expandedLayout}>
                <div className={styles.leftCol}>
                  <h1 className={styles.bigLetter}>{selectedLetter.letter}</h1>
                  <h2 className={styles.bigWord}>{selectedLetter.word}</h2>
                  <img src={selectedLetter.image} alt={selectedLetter.word} className={styles.bigImg} />
                </div>
                
                <div className={styles.rightCol}>
                  <h3 className="bubble-font">More words for {selectedLetter.letter}:</h3>
                  <div className={styles.extraGrid}>
                    {selectedLetter.extraWords && selectedLetter.extraWords.length > 0 ? (
                      selectedLetter.extraWords.map((ex, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          key={ex.word} 
                          className={styles.extraItem}
                        >
                          <img src={ex.img} alt={ex.word} />
                          <span>{ex.word}</span>
                        </motion.div>
                      ))
                    ) : (
                      <p className={styles.moreComing}>More fun words coming soon! 🎈</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Alphabets;
