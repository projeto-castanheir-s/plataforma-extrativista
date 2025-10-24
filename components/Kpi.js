'use client';

export default function Kpi({ label, value, percentage, className = '' }) {
  const formatCurrency = (val) => {
    if (typeof val === 'number') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(val);
    }
    return val;
  };

  return (
    <div className={`bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 ${className}`}>
      <div className="text-sm font-medium text-primary-700 mb-2">{label}</div>
      <div className="text-2xl font-bold text-primary-900 mb-1">
        {typeof value === 'number' && label.toLowerCase().includes('valor') 
          ? formatCurrency(value) 
          : value}
      </div>
      {percentage !== undefined && (
        <div className="flex items-center mt-2">
          <div className="flex-1 bg-primary-200 rounded-full h-2 mr-3">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-primary-700">{percentage}%</span>
        </div>
      )}
    </div>
  );
}
