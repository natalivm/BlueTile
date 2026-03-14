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
