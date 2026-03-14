import React from 'react';

export type Tab = 'home' | 'employees';

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const BottomNav: React.FC<Props> = ({ active, onChange }) => {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${active === 'home' ? 'active' : ''}`}
        onClick={() => onChange('home')}
      >
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="nav-label">Home</span>
      </button>
      <button
        className={`nav-item ${active === 'employees' ? 'active' : ''}`}
        onClick={() => onChange('employees')}
      >
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span className="nav-label">All Employees</span>
      </button>
    </nav>
  );
};

export default BottomNav;
