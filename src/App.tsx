import React, { useState, useMemo } from 'react';
import { employees } from './data/employees';
import { departments, Department } from './data/types';
import EmployeeCard from './components/EmployeeCard';
import { isBirthdayToday, isWorkAnniversaryToday } from './utils';

type Filter = 'all' | 'birthday' | 'anniversary';

const App: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [department, setDepartment] = useState<Department | 'all'>('all');

  const filtered = useMemo(() => {
    let list = employees;

    if (filter === 'birthday') {
      list = list.filter(e => isBirthdayToday(e.dateOfBirth));
    } else if (filter === 'anniversary') {
      list = list.filter(e => isWorkAnniversaryToday(e.joinedDate));
    }

    if (department !== 'all') {
      list = list.filter(e => e.department === department);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        e =>
          e.name.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.title.toLowerCase().includes(q),
      );
    }

    return list;
  }, [search, filter, department]);

  const birthdayCount = useMemo(
    () => employees.filter(e => isBirthdayToday(e.dateOfBirth)).length,
    [],
  );

  const anniversaryCount = useMemo(
    () => employees.filter(e => isWorkAnniversaryToday(e.joinedDate)).length,
    [],
  );

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-title-row">
            <h1 className="header-title">
              <span className="header-logo">✦</span> BlueTile
            </h1>
            <span className="header-count">{employees.length} people</span>
          </div>
          <p className="header-subtitle">Get to know the awesome humans behind the work</p>

          <div className="toolbar">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search by name, title, or location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch('')}>
                  ✕
                </button>
              )}
            </div>

            <select
              className="department-select"
              value={department}
              onChange={e => setDepartment(e.target.value as Department | 'all')}
            >
              <option value="all">All Departments</option>
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'birthday' ? 'active' : ''}`}
              onClick={() => setFilter('birthday')}
            >
              🎂 Birthdays{birthdayCount > 0 && ` (${birthdayCount})`}
            </button>
            <button
              className={`filter-btn ${filter === 'anniversary' ? 'active' : ''}`}
              onClick={() => setFilter('anniversary')}
            >
              🎉 Anniversaries{anniversaryCount > 0 && ` (${anniversaryCount})`}
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <span className="empty-emoji">
              {filter === 'birthday' ? '🎂' : filter === 'anniversary' ? '🎉' : '🔎'}
            </span>
            <p className="empty-text">
              {filter === 'birthday'
                ? 'No birthdays today — but every day is special!'
                : filter === 'anniversary'
                  ? 'No work anniversaries today — stay tuned!'
                  : 'No matches found. Try a different search.'}
            </p>
          </div>
        ) : (
          <div className="grid">
            {filtered.map(employee => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
