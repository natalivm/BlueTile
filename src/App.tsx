import React, { useState, useCallback } from 'react';
import { Department } from './data/types';
import HomeScreen from './components/HomeScreen';
import AllEmployees from './components/AllEmployees';
import BottomNav, { Tab } from './components/BottomNav';

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>('home');
  const [selectedDept, setSelectedDept] = useState<Department | 'all'>('all');

  const handleNavigateDepartment = useCallback((dept: Department) => {
    setSelectedDept(dept);
    setTab('employees');
  }, []);

  const handleTabChange = useCallback((newTab: Tab) => {
    if (newTab === 'home') {
      setSelectedDept('all');
    }
    setTab(newTab);
  }, []);

  return (
    <div className="app">
      {tab === 'home' && (
        <HomeScreen onNavigateDepartment={handleNavigateDepartment} />
      )}
      {tab === 'employees' && (
        <AllEmployees initialDepartment={selectedDept} />
      )}
      <BottomNav active={tab} onChange={handleTabChange} />
    </div>
  );
};

export default App;
