'use client';

export default function ProgressBadge({ percentage, size = 'md' }) {
  const getColor = (perc) => {
    if (perc >= 75) return 'bg-green-100 text-green-800';
    if (perc >= 50) return 'bg-blue-100 text-blue-800';
    if (perc >= 25) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  return (
    <span className={`inline-flex items-center font-semibold rounded-full ${getColor(percentage)} ${sizeClasses[size]}`}>
      {percentage}%
    </span>
  );
}
