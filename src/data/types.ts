export type Department =
  | 'Design'
  | 'Marketing'
  | 'Data'
  | 'Finance'
  | 'Dev'
  | 'QA'
  | 'HR'
  | 'Product';

export const departments: Department[] = [
  'Design', 'Marketing', 'Data', 'Finance', 'Dev',
  'QA', 'HR', 'Product',
];

export const DEPT_COLORS: Record<Department, string> = {
  Design: '#8b5cf6',
  Marketing: '#f59e0b',
  Data: '#06b6d4',
  Finance: '#10b981',
  Dev: '#3b82f6',
  QA: '#ef4444',
  HR: '#ec4899',
  Product: '#6366f1',
};

export const DEPT_EMOJIS: Record<Department, string> = {
  Design: '🎨',
  Marketing: '📣',
  Data: '📊',
  Finance: '💰',
  Dev: '💻',
  QA: '🧪',
  HR: '🤝',
  Product: '🚀',
};

export interface Employee {
  id: number;
  name: string;
  title: string;
  photo: string;
  dateOfBirth: string; // ISO date YYYY-MM-DD
  location: string;
  badgeId: string;
  joinedDate: string; // ISO date YYYY-MM-DD
  department: Department;
}
