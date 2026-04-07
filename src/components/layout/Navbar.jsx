import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import styles from './Navbar.module.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/alphabets', label: 'ABC' },
  { path: '/numbers', label: '123' },
  { path: '/animals', label: 'Animals' },
  { path: '/shapes', label: 'Shapes' },
  { path: '/quiz', label: 'Quiz Time' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav className={clsx(styles.navbar, scrolled && styles.scrolled)}>
      <div className={clsx('container', styles.navContainer)}>
        <NavLink to="/" className={styles.logo}>
          <Rocket className={styles.logoIcon} />
          <span className="bubble-font">StarBright</span>
        </NavLink>

        {/* Desktop Nav */}
        <div className={styles.desktopNav}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="underline"
                  className={styles.underline}
                />
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={styles.mobileNav}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => clsx(styles.mobileNavLink, isActive && styles.active)}
              >
                {link.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
