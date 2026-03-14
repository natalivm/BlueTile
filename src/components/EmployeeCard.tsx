import React, { useRef, useState, useEffect } from 'react';
import { Employee, DEPT_COLORS } from '../data/types';
import { getBadgeById } from '../data/badges';
import {
  calculateAge,
  isBirthdayToday,
  isWorkAnniversaryToday,
  formatDate,
  formatTenure,
  yearsAtCompany,
} from '../utils';

const PHOTO_KEY_PREFIX = 'bluetile-photo-';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bgColor = DEPT_COLORS[employee.department];

  const [customPhoto, setCustomPhoto] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(PHOTO_KEY_PREFIX + employee.id);
    if (saved) setCustomPhoto(saved);
  }, [employee.id]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      localStorage.setItem(PHOTO_KEY_PREFIX + employee.id, dataUrl);
      setCustomPhoto(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const photoSrc = customPhoto || employee.photo;

  return (
    <div className={`card${hasAnniversary ? ' card--anniversary' : ''}${hasBirthday ? ' card--birthday' : ''}`} style={{ '--dept-color': bgColor } as React.CSSProperties}>
      {hasAnniversary && (
        <div className="anniversary-stars">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
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

      <div className="card-photo-wrapper" style={{ backgroundColor: bgColor }}>
        <img
          className="card-photo"
          src={photoSrc}
          alt={employee.name}
          loading="lazy"
        />
        <button
          className="photo-upload-btn"
          title="Upload photo"
          onClick={() => fileInputRef.current?.click()}
        >
          +
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="photo-upload-input"
          onChange={handlePhotoUpload}
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
        <div className="card-meta">
          <span className="card-department">{employee.department}</span>
          <span className="card-location">📍 {employee.location}</span>
        </div>

        {hasAnniversary && (
          <div className="anniversary-banner">
            {anniversaryYears} Year Anniversary
          </div>
        )}

        <div className="card-details">
          <span className="card-detail">🎂 {formatDate(employee.dateOfBirth)} · {age}</span>
          <span className="card-detail">📅 {tenure}</span>
        </div>

        {badge && (
          <div
            className="card-badge"
            style={{
              backgroundColor: badge.color + '14',
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
  );
};

export default EmployeeCard;
