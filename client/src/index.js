import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContext } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContext.Provider value={{}}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContext.Provider>
);

