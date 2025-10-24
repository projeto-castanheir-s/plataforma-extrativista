'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Card from '@/components/Card';
import DataTable from '@/components/DataTable';
import PrimaryButton from '@/components/PrimaryButton';
import useStore from '@/lib/store';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

// Configurações de campos para cada entidade
const entidadeConfig = {
  beneficiarios: {
    nome: 'Beneficiários',
    campos: [
      { key: 'nome', label: 'Nome', type: 'text', required: true },
      { key: 'tipo', label: 'Tipo', type: 'select', options: ['Cooperativa', 'Associação', 'Comunidade'], required: true },
      { key: 'documento', label: 'CNPJ', type: 'text', required: true },
      { key: 'contato', label: 'Contato', type: 'text', required: true }
    ],
    colunas: ['nome', 'tipo', 'documento', 'contato']
  },
  financeiras: {
    nome: 'Financeiras',
    campos: [
      { key: 'nome', label: 'Nome do Banco', type: 'text', required: true },
      { key: 'agencia', label: 'Agência', type: 'text', required: true },
      { key: 'conta', label: 'Conta', type: 'text', required: true },
      { key: 'gerente', label: 'Gerente', type: 'text', required: false }
    ],
    colunas: ['nome', 'agencia', 'conta', 'gerente']
  },
  executores: {
    nome: 'Executores',
    campos: [
      { key: 'nome', label: 'Nome', type: 'text', required: true },
      { key: 'especialidade', label: 'Especialidade', type: 'text', required: true },
      { key: 'contato', label: 'Contato', type: 'text', required: true }
    ],
    colunas: ['nome', 'especialidade', 'contato']
  },
  eixos: {
    nome: 'Eixos',
    campos: [
      { key: 'nome', label: 'Nome do Eixo', type: 'text', required: true },
      { key: 'descricao', label: 'Descrição', type: 'textarea', required: true },
      { key: 'cor', label: 'Cor (hex)', type: 'color', required: true }
    ],
    colunas: ['nome', 'descricao', 'cor']
  },
  diagnosticos: {
    nome: 'Diagnósticos',
    campos: [
      { key: 'titulo', label: 'Título', type: 'text', required: true },
      { key: 'data', label: 'Data', type: 'date', required: true },
      { key: 'responsavel', label: 'Responsável', type: 'text', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Em Andamento', 'Concluído', 'Pendente'], required: true }
    ],
    colunas: ['titulo', 'data', 'responsavel', 'status']
  },
  atividades: {
    nome: 'Atividades',
    campos: [
      { key: 'nome', label: 'Nome', type: 'text', required: true },
      { key: 'descricao', label: 'Descrição', type: 'textarea', required: true },
      { key: 'percentualExecucao', label: '% Execução', type: 'number', required: true },
      { key: 'valorTotal', label: 'Valor Total', type: 'number', required: true }
    ],
    colunas: ['nome', 'descricao', 'percentualExecucao', 'valorTotal']
  },
  responsaveis: {
    nome: 'Responsáveis',
    campos: [
      { key: 'nome', label: 'Nome', type: 'text', required: true },
      { key: 'cargo', label: 'Cargo', type: 'text', required: true },
      { key: 'email', label: 'E-mail', type: 'email', required: true },
      { key: 'telefone', label: 'Telefone', type: 'text', required: true }
    ],
    colunas: ['nome', 'cargo', 'email', 'telefone']
  }
};

export default function CadastroEntidadePage({ params }) {
  const router = useRouter();
  const { entidade } = params;
  
  const store = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const config = entidadeConfig[entidade];

  if (!config) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Entidade não encontrada</h2>
            <button
              onClick={() => router.push('/cadastros')}
              className="text-primary-600 hover:text-primary-700"
            >
              Voltar para Cadastros
            </button>
          </div>
        </main>
      </>
    );
  }

  const dados = store[entidade] || [];

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    const initialData = {};
    config.campos.forEach(campo => {
      initialData[campo.key] = campo.type === 'number' ? 0 : '';
    });
    setFormData(initialData);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setIsAdding(false);
    setFormData({ ...item });
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      store.deleteItem(entidade, id);
    }
  };

  const handleSave = () => {
    if (editingId) {
      store.updateItem(entidade, editingId, formData);
      setEditingId(null);
    } else {
      store.addItem(entidade, formData);
      setIsAdding(false);
    }
    setFormData({});
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({});
  };

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const renderFormField = (campo) => {
    const value = formData[campo.key] || '';

    switch (campo.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleChange(campo.key, e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder={campo.label}
            required={campo.required}
          />
        );
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleChange(campo.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required={campo.required}
          >
            <option value="">Selecione...</option>
            {campo.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleChange(campo.key, parseFloat(e.target.value) || 0)}
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder={campo.label}
            required={campo.required}
          />
        );
      case 'color':
        return (
          <div className="flex gap-2">
            <input
              type="color"
              value={value}
              onChange={(e) => handleChange(campo.key, e.target.value)}
              className="h-10 w-20 border border-gray-300 rounded-md"
              required={campo.required}
            />
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(campo.key, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="#000000"
              required={campo.required}
            />
          </div>
        );
      default:
        return (
          <input
            type={campo.type}
            value={value}
            onChange={(e) => handleChange(campo.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder={campo.label}
            required={campo.required}
          />
        );
    }
  };

  // Configurar colunas da tabela
  const columns = [
    ...config.colunas.map(col => ({
      header: config.campos.find(c => c.key === col)?.label || col,
      accessor: col,
      render: (row) => {
        const campo = config.campos.find(c => c.key === col);
        if (campo?.type === 'color') {
          return (
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded border border-gray-300"
                style={{ backgroundColor: row[col] }}
              />
              <span>{row[col]}</span>
            </div>
          );
        }
        if (campo?.type === 'date') {
          return new Date(row[col]).toLocaleDateString('pt-BR');
        }
        if (col === 'valorTotal') {
          return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(row[col]);
        }
        return row[col];
      }
    })),
    {
      header: 'Ações',
      accessor: 'id',
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
            title="Editar"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded"
            title="Excluir"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          <button onClick={() => router.push('/')} className="hover:text-primary-600">
            Home
          </button>
          <span>/</span>
          <button onClick={() => router.push('/cadastros')} className="hover:text-primary-600">
            Cadastros
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{config.nome}</span>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{config.nome}</h2>
            <p className="text-gray-600 mt-1">{dados.length} registro(s) cadastrado(s)</p>
          </div>
          {!isAdding && !editingId && (
            <PrimaryButton onClick={handleAdd} className="flex items-center gap-2">
              <Plus size={18} />
              Adicionar
            </PrimaryButton>
          )}
        </div>

        {/* Formulário */}
        {(isAdding || editingId) && (
          <Card title={editingId ? 'Editar Registro' : 'Novo Registro'} className="mb-6">
            <div className="space-y-4">
              {config.campos.map(campo => (
                <div key={campo.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {campo.label} {campo.required && <span className="text-red-500">*</span>}
                  </label>
                  {renderFormField(campo)}
                </div>
              ))}
              <div className="flex gap-3 pt-4">
                <PrimaryButton onClick={handleSave} className="flex items-center gap-2">
                  <Save size={18} />
                  Salvar
                </PrimaryButton>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  <X size={18} />
                  Cancelar
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Tabela */}
        <Card>
          <DataTable columns={columns} data={dados} />
        </Card>
      </main>
    </>
  );
}
