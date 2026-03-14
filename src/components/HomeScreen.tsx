import React from 'react';
import { employees } from '../data/employees';
import { departments, Department, DEPT_COLORS, DEPT_EMOJIS } from '../data/types';
import { isBirthdayToday, isWorkAnniversaryToday, isNewJoiner } from '../utils';
import FeaturedCard from './FeaturedCard';

interface Props {
  onNavigateDepartment: (dept: Department) => void;
}

const HomeScreen: React.FC<Props> = ({ onNavigateDepartment }) => {
  const birthdayPeople = employees.filter(e => isBirthdayToday(e.dateOfBirth));
  const anniversaryPeople = employees.filter(e => isWorkAnniversaryToday(e.joinedDate));
  const newJoiners = employees.filter(e => isNewJoiner(e.joinedDate));

  const deptCounts = departments.reduce((acc, d) => {
    acc[d] = employees.filter(e => e.department === d).length;
    return acc;
  }, {} as Record<Department, number>);

  const hasFeatured = birthdayPeople.length > 0 || anniversaryPeople.length > 0 || newJoiners.length > 0;

  return (
    <div className="home">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">
            <span className="header-logo">✦</span> BlueTile
          </h1>
          <p className="header-subtitle">Get to know the awesome humans behind the work</p>
        </div>
      </header>

      <main className="home-main">
        {/* Featured Section */}
        {hasFeatured && (
          <section className="home-section">
            <h2 className="section-title">Happening Today</h2>
            <div className="featured-scroll">
              {birthdayPeople.map(e => (
                <FeaturedCard key={`b-${e.id}`} employee={e} tag="birthday" />
              ))}
              {anniversaryPeople.map(e => (
                <FeaturedCard key={`a-${e.id}`} employee={e} tag="anniversary" />
              ))}
              {newJoiners.map(e => (
                <FeaturedCard key={`n-${e.id}`} employee={e} tag="new" />
              ))}
            </div>
          </section>
        )}

        {!hasFeatured && (
          <section className="home-section">
            <h2 className="section-title">Happening Today</h2>
            <p className="section-empty">No birthdays, anniversaries, or new joiners today — but every day is special!</p>
          </section>
        )}

        {/* Department Tabs */}
        <section className="home-section">
          <h2 className="section-title">Departments</h2>
          <div className="dept-grid">
            {departments.map(d => (
              <button
                key={d}
                className="dept-tab"
                style={{ '--dept-color': DEPT_COLORS[d] } as React.CSSProperties}
                onClick={() => onNavigateDepartment(d)}
              >
                <span className="dept-emoji">{DEPT_EMOJIS[d]}</span>
                <span className="dept-name">{d}</span>
                <span className="dept-count">{deptCounts[d]} people</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeScreen;
