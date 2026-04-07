import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home/Home';
import Alphabets from './pages/Alphabets/Alphabets';
import Numbers from './pages/Numbers/Numbers';
import Animals from './pages/Animals/Animals';
import Shapes from './pages/Shapes/Shapes';
import QuizContainer from './pages/Quiz/QuizContainer';

function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/alphabets" element={<Alphabets />} />
          <Route path="/numbers" element={<Numbers />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/shapes" element={<Shapes />} />
          <Route path="/quiz" element={<QuizContainer />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;
