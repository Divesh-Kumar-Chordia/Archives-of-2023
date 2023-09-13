import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TimeTracker from './components/TimeTracker';
import Journal from './components/Journal';
import TagManagement from './components/TagManagement';
import Settings from './components/Settings';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/time-tracker" element={<TimeTracker />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/tag-management" element={<TagManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;
