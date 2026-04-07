import React from 'react';
import Navbar from './Navbar';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.mainContent}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className="container">
          <p>© 2026 StarBright Kids Learning. All rights reserved.</p>
          <p>Made with ❤️ for kids everywhere.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
