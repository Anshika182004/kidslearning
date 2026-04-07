import React from 'react';
import { motion } from 'framer-motion';
import { shapeData } from '../../data/kidsContent';
import styles from './Shapes.module.css';

const Shapes = () => {
  return (
    <div className={styles.shapesPage}>
      <header className={styles.header}>
        <div className="container">
          <h1 className="bubble-font">Shape Explorer 🎨</h1>
          <p>Everything has a shape! Let's learn them all.</p>
        </div>
      </header>

      <main className="container">
        <div className={styles.shapesGrid}>
          {shapeData.map((shape, index) => (
            <ShapeCard key={shape.name} shape={shape} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
};

const ShapeCard = ({ shape, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -15, rotate: index % 2 === 0 ? 2 : -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      viewport={{ once: true }}
      className={styles.shapeCard}
      style={{ '--shape-color': shape.color }}
    >
      <div className={styles.iconBox}>
        <img src={shape.image} alt={shape.name} className={styles.shapeImg} />
      </div>
      <div className={styles.info}>
        <h2 className="bubble-font">{shape.name}</h2>
        <p className={styles.props}>{shape.properties}</p>
        <div className={styles.spellingBadge}>
          {shape.name.toUpperCase()}
        </div>
      </div>
    </motion.div>
  );
};

export default Shapes;
