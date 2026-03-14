import React, { useState, useMemo } from 'react';
import { employees } from '../data/employees';
import { departments, Department } from '../data/types';
import EmployeeCard from './EmployeeCard';

interface Props {
  initialDepartment?: Department | 'all';
}

const AllEmployees: React.FC<Props> = ({ initialDepartment = 'all' }) => {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState<Department | 'all'>(initialDepartment);

  const filtered = useMemo(() => {
    let list = employees;

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
  }, [search, department]);

  return (
    <div className="all-employees">
      <header className="header">
        <div className="header-content">
          <div className="header-title-row">
            <h1 className="header-title">All Employees</h1>
            <span className="header-count">{filtered.length} people</span>
          </div>

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
                <button className="search-clear" onClick={() => setSearch('')}>✕</button>
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
        </div>
      </header>

      <main className="main">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <span className="empty-emoji">🔎</span>
            <p className="empty-text">No matches found. Try a different search.</p>
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

export default AllEmployees;
