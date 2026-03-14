import React, { useRef, useState, useEffect } from 'react';
import { Employee } from '../data/types';
import { getBadgeById } from '../data/badges';
import { isNewJoiner } from '../utils';

const PHOTO_KEY_PREFIX = 'bluetile-photo-';

const BG_COLORS = [
  '#6366f1', '#06b6d4', '#f59e0b', '#ec4899',
  '#10b981', '#8b5cf6', '#ef4444', '#3b82f6',
];

interface Props {
  employee: Employee;
  index: number;
  tag: 'birthday' | 'anniversary' | 'new';
}

const tagConfig = {
  birthday: { label: '🎂 Birthday Today', className: 'tag--birthday' },
  anniversary: { label: '🎉 Work Anniversary', className: 'tag--anniversary' },
  new: { label: '✨ New Joiner', className: 'tag--new' },
};

const FeaturedCard: React.FC<Props> = ({ employee, index, tag }) => {
  const badge = getBadgeById(employee.badgeId);
  const bgColor = BG_COLORS[index % BG_COLORS.length];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const newJoiner = isNewJoiner(employee.joinedDate);

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
  const { label, className } = tagConfig[tag];

  return (
    <div className="featured-card">
      <div className="featured-photo-wrapper" style={{ backgroundColor: bgColor }}>
        <img className="featured-photo" src={photoSrc} alt={employee.name} loading="lazy" />
        <button
          className="photo-upload-btn"
          title="Upload photo"
          onClick={() => fileInputRef.current?.click()}
        >+</button>
        <input ref={fileInputRef} type="file" accept="image/*" className="photo-upload-input" onChange={handlePhotoUpload} />
        <span className={`featured-tag ${className}`}>{label}</span>
      </div>
      <div className="featured-body">
        <h3 className="featured-name">{employee.name}</h3>
        <p className="featured-title">{employee.title}</p>
        <div className="featured-meta">
          <span className="card-department">{employee.department}</span>
          {newJoiner && tag !== 'new' && <span className="tag--new-small">NEW</span>}
        </div>
        {badge && (
          <div
            className="featured-badge"
            style={{ backgroundColor: badge.color + '14', color: badge.color, borderColor: badge.color + '30' }}
          >
            <span>{badge.emoji}</span> <span>{badge.title}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedCard;
