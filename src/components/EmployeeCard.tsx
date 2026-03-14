import React from 'react';
import { Employee } from '../data/types';
import { getBadgeById } from '../data/badges';
import {
  calculateAge,
  isBirthdayToday,
  isWorkAnniversaryToday,
  formatDate,
  formatTenure,
  yearsAtCompany,
} from '../utils';

interface Props {
  employee: Employee;
}

const EmployeeCard: React.FC<Props> = ({ employee }) => {
  const badge = getBadgeById(employee.badgeId);
  const age = calculateAge(employee.dateOfBirth);
  const hasBirthday = isBirthdayToday(employee.dateOfBirth);
  const hasAnniversary = isWorkAnniversaryToday(employee.joinedDate);
  const tenure = formatTenure(employee.joinedDate);
  const anniversaryYears = yearsAtCompany(employee.joinedDate);

  return (
    <div className={`card${hasAnniversary ? ' card--anniversary' : ''}${hasBirthday ? ' card--birthday' : ''}`}>
      {hasAnniversary && (
        <div className="anniversary-stars">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.5 + Math.random() * 1.5}s`,
                fontSize: `${0.4 + Math.random() * 0.5}rem`,
              }}
            >
              ✦
            </span>
          ))}
        </div>
      )}

      <div className="card-photo-wrapper">
        <img
          className="card-photo"
          src={employee.photo}
          alt={employee.name}
          loading="lazy"
        />
        {hasBirthday && (
          <div className="birthday-indicator" title="Birthday today!">🎂</div>
        )}
        {hasAnniversary && (
          <div className="anniversary-indicator" title={`${anniversaryYears} year anniversary!`}>🎉</div>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-name">
          {employee.name}
          {hasBirthday && <span className="birthday-cake">🎂</span>}
        </h3>
        <p className="card-title">{employee.title}</p>
        <div className="card-department">{employee.department}</div>

        {hasAnniversary && (
          <div className="anniversary-banner">
            {anniversaryYears} Year Anniversary
          </div>
        )}

        <div className="card-details">
          <div className="card-detail">
            <span className="detail-icon">📍</span>
            <span>{employee.location}</span>
          </div>
          <div className="card-detail">
            <span className="detail-icon">🎂</span>
            <span>{formatDate(employee.dateOfBirth)} · {age}</span>
          </div>
          <div className="card-detail">
            <span className="detail-icon">📅</span>
            <span>{tenure}</span>
          </div>
        </div>

        <div className="card-badge">
          {badge && (
            <div
              className="card-badge-inner"
              style={{
                backgroundColor: badge.color + '12',
                color: badge.color,
                borderColor: badge.color + '30',
              }}
            >
              <span className="badge-emoji">{badge.emoji}</span>
              <span className="badge-title">{badge.title}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
