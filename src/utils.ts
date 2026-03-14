export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birth = new Date(dateOfBirth);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function isBirthdayToday(dateOfBirth: string): boolean {
  const today = new Date();
  const birth = new Date(dateOfBirth);
  return today.getMonth() === birth.getMonth() && today.getDate() === birth.getDate();
}

export function isWorkAnniversaryToday(joinedDate: string): boolean {
  const today = new Date();
  const joined = new Date(joinedDate);
  return (
    today.getMonth() === joined.getMonth() &&
    today.getDate() === joined.getDate() &&
    today.getFullYear() !== joined.getFullYear()
  );
}

export function yearsAtCompany(joinedDate: string): number {
  const today = new Date();
  const joined = new Date(joinedDate);
  let years = today.getFullYear() - joined.getFullYear();
  const monthDiff = today.getMonth() - joined.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < joined.getDate())) {
    years--;
  }
  return years;
}

export function formatTenure(joinedDate: string): string {
  const years = yearsAtCompany(joinedDate);
  if (years < 1) return 'Joined this year';
  if (years === 1) return 'Joined 1 year ago';
  return `Joined ${years} years ago`;
}

export function formatDate(dateOfBirth: string): string {
  const date = new Date(dateOfBirth);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
