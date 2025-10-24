'use client';

export default function PrimaryButton({ children, onClick, type = 'button', className = '', disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 
        disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
