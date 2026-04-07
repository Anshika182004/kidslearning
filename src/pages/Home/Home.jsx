import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, Smile, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const sections = [
    { 
      id: 'alphabets', title: 'Learn Alphabets', 
      desc: 'Discover the world of A to Z with fun pictures and words!', 
      color: 'var(--primary)', icon: <Star />, path: '/alphabets' 
    },
    { 
      id: 'numbers', title: 'Fun with Numbers', 
      desc: 'Count from 1 to 100 with our interactive counting stars!', 
      color: 'var(--secondary)', icon: <Zap />, path: '/numbers' 
    },
    { 
      id: 'animals', title: 'Animal Kingdom', 
      desc: 'Meet your favorite wild and domestic animal friends.', 
      color: 'var(--blue)', icon: <Heart />, path: '/animals' 
    },
    { 
      id: 'shapes', title: 'Shape Explorer', 
      desc: 'Circles, Squares, Triangles and more in one place.', 
      color: 'var(--purple)', icon: <Smile />, path: '/shapes' 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={clsx('container', styles.heroContainer)}>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={styles.heroContent}
          >
            <h1 className={styles.title}>Welcome to <span className="gradient-text">StarBright</span></h1>
            <p className={styles.subtitle}>The brightest way to learn and play! 🚀</p>
            <div className={styles.heroButtons}>
              <Link to="/quiz" className={styles.btnPrimary}>Start Quiz Time!</Link>
              <Link to="/alphabets" className={styles.btnSecondary}>Explore ABC</Link>
            </div>
          </motion.div>
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className={styles.heroImage}
          >
            <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=600" alt="Learning is fun" />
          </motion.div>
        </div>
      </section>

      {/* Sections List */}
      <section className={styles.sectionsList}>
        <div className="container">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={styles.grid}
          >
            {sections.map((sec) => (
              <motion.div 
                key={sec.id} 
                variants={itemVariants}
                className={styles.sectionCard}
                style={{ '--accent-color': sec.color }}
              >
                <div className={styles.cardIcon}>{sec.icon}</div>
                <h2 className="bubble-font">{sec.title}</h2>
                <p>{sec.desc}</p>
                <Link to={sec.path} className={styles.learnMore}>
                  Explore Now <ArrowRight size={18} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Us */}
      <section className={styles.aboutUs}>
        <div className="container">
          <div className={styles.aboutContent}>
            <h2 className="bubble-font">About Our Magic World</h2>
            <p>
              StarBright is a safe, fun, and colorful space for kids to learn at their own pace. 
              Our mission is to make foundation learning an adventure!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper for CLSX because I can't import comfortably in this block easily without ensuring it's in scope if I split.
function clsx(...args) {
  return args.filter(Boolean).join(' ');
}

export default Home;
