import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import Header from './components/header'; 
import NotesListPage from './pages/NotesListPage';
import NotesPage from './pages/NotesPage'

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className='app'>
          <Header />
          <Routes> {/* Changed to Routes */}
            <Route path='/' exact element={<NotesListPage />} /> {/* Changed component to element */}
            <Route path='/note/:id' element={<NotesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
