'use client';
import { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import PrimaryButton from './PrimaryButton';

export default function MilestoneList({ milestones, onAdd, onToggle, onDelete }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newMilestone, setNewMilestone] = useState({ nome: '', data: '' });

  const handleAdd = () => {
    if (newMilestone.nome && newMilestone.data) {
      onAdd(newMilestone);
      setNewMilestone({ nome: '', data: '' });
      setIsAdding(false);
    }
  };

  const sortedMilestones = [...milestones].sort((a, b) => 
    new Date(a.data) - new Date(b.data)
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-gray-900">Marcos do Projeto</h4>
        {!isAdding && onAdd && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <Plus size={20} />
            Adicionar Marco
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Marco
            </label>
            <input
              type="text"
              value={newMilestone.nome}
              onChange={(e) => setNewMilestone({ ...newMilestone, nome: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Ex: Conclusão da Fase 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data
            </label>
            <input
              type="date"
              value={newMilestone.data}
              onChange={(e) => setNewMilestone({ ...newMilestone, data: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2">
            <PrimaryButton onClick={handleAdd}>Salvar</PrimaryButton>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewMilestone({ nome: '', data: '' });
              }}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {sortedMilestones.map((milestone) => (
          <div
            key={milestone.id}
            className={`flex items-center gap-4 p-4 rounded-lg border ${
              milestone.concluido ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
            }`}
          >
            <button
              onClick={() => onToggle && onToggle(milestone.id)}
              className="flex-shrink-0"
            >
              {milestone.concluido ? (
                <CheckCircle2 size={24} className="text-green-600" />
              ) : (
                <Circle size={24} className="text-gray-400" />
              )}
            </button>
            <div className="flex-1">
              <h5 className={`font-medium ${milestone.concluido ? 'text-green-900 line-through' : 'text-gray-900'}`}>
                {milestone.nome}
              </h5>
              <p className="text-sm text-gray-500">
                {new Date(milestone.data).toLocaleDateString('pt-BR')}
              </p>
            </div>
            {onDelete && (
              <button
                onClick={() => onDelete(milestone.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      {sortedMilestones.length === 0 && !isAdding && (
        <div className="text-center text-gray-500 py-8">
          Nenhum marco cadastrado ainda
        </div>
      )}
    </div>
  );
}
