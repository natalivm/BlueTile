import { Category } from '../data/categories';

interface Props {
  categories: Category[];
  onSelect: (category: Category) => void;
}

const USERNAME = 'User2455';
const COUNTRY = 'UNITED STATES';
const COINS = 2000;
const PROGRESS_CURRENT = 6;
const PROGRESS_TOTAL = 30;
const LEVEL = 7;
const CART_BADGE = 1;

function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path}`;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export default function GameMenu({ categories, onSelect }: Props) {
  const progressPct = Math.min(100, (PROGRESS_CURRENT / PROGRESS_TOTAL) * 100);
  const levelCategory = categories[(LEVEL - 1) % categories.length];

  return (
    <div className="home-screen">
      <header className="home-top">
        <button className="icon-btn settings-btn" aria-label="Settings">
          <span className="settings-gear">⚙</span>
        </button>
        <div className="coin-pill">
          <span className="coin-icon" aria-hidden="true">🪙</span>
          <span className="coin-amount">{COINS.toLocaleString()}</span>
          <span className="coin-plus" aria-label="Add coins">+</span>
        </div>
      </header>

      <section className="profile-card">
        <div className="avatar-wrap">
          <div className="avatar-circle" aria-hidden="true">🐶</div>
          <button className="avatar-edit" aria-label="Edit profile">✎</button>
        </div>
        <div className="greeting">
          <span className="greeting-text">{getGreeting()}, </span>
          <span className="greeting-user">{USERNAME}</span>
        </div>
        <div className="country">{COUNTRY}</div>
        <div className="progress-row">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
            <span className="progress-text">{PROGRESS_CURRENT}/{PROGRESS_TOTAL}</span>
          </div>
          <span className="gift-box" aria-hidden="true">🎁</span>
        </div>
      </section>

      <div className="level-area">
        <button className="level-btn" onClick={() => onSelect(levelCategory)}>
          LEVEL {LEVEL}
        </button>
      </div>

      <nav className="bottom-nav" aria-label="Primary navigation">
        <button className="nav-item" aria-label="Calendar">
          <img src={asset('icons/1.png')} alt="" className="nav-icon" onError={iconFallback('📅')} />
        </button>
        <button className="nav-item" aria-label="Themes">
          <img src={asset('icons/2.png')} alt="" className="nav-icon" onError={iconFallback('🌸')} />
        </button>
        <button className="nav-item nav-item-active" aria-label="Home" aria-current="page">
          <img src={asset('icons/3.png')} alt="" className="nav-icon" onError={iconFallback('🏠')} />
        </button>
        <button className="nav-item" aria-label="Notes">
          <img src={asset('icons/4.png')} alt="" className="nav-icon" onError={iconFallback('📓')} />
        </button>
        <button className="nav-item" aria-label="Shop">
          <img src={asset('icons/5.png')} alt="" className="nav-icon" onError={iconFallback('🛒')} />
          {CART_BADGE > 0 && <span className="nav-badge">{CART_BADGE}</span>}
        </button>
      </nav>
    </div>
  );
}

function iconFallback(emoji: string) {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.dataset.fallback) return;
    img.dataset.fallback = '1';
    const span = document.createElement('span');
    span.className = 'nav-icon nav-icon-fallback';
    span.textContent = emoji;
    img.replaceWith(span);
  };
}
