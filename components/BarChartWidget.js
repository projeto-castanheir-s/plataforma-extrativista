'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BarChartWidget({ data, title, dataKey = 'value', nameKey = 'name', color = '#3b82f6' }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Nenhum dado disponível
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && <h4 className="text-sm font-semibold text-gray-700 mb-4">{title}</h4>}
      <ResponsiveContainer width="100%" height={280} minWidth={280}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey={nameKey} 
            tick={{ fontSize: 10 }}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={70}
          />
          <YAxis 
            tick={{ fontSize: 10 }}
            width={35}
          />
          <Tooltip 
            formatter={(value) => `${value}%`}
            contentStyle={{ fontSize: '11px' }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '10px' }}
            iconSize={8}
          />
          <Bar dataKey={dataKey} fill={color} name="Execução (%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
