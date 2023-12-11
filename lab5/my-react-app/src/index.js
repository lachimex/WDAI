import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import Layout from './layout/layout.js';
import Hello from './zad1/zad1.js';
import List2 from './zad2/List2.js'
import List4 from './zad4/List4.js';

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='zad1' element={<Hello />} />
            <Route path="zad2" element={<List2 />} />
            <Route path="zad4" element={<List4 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
