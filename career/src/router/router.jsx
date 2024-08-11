import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/home.jsx';
import Quiz from '../pages/Quiz/quiz.jsx';
import Header from '../components/header/header.jsx';

const AppRouter = () => (
  <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  </Router>
);

export default AppRouter;