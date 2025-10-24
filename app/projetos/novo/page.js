'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Card from '@/components/Card';
import PrimaryButton from '@/components/PrimaryButton';
import useStore from '@/lib/store';
import { Save, X } from 'lucide-react';

export default function NovoProjetoPage() {
  const router = useRouter();
  const { atividades, eixos, responsaveis, addProjeto, getEixoById } = useStore();

  const [formData, setFormData] = useState({
    nome: '',
    atividadeId: '',
    descricao: '',
    valorTotal: '',
    dataInicio: '',
    dataFim: '',
    responsavel: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome do projeto é obrigatório';
    }

    if (!formData.atividadeId) {
      newErrors.atividadeId = 'Selecione uma atividade';
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (!formData.valorTotal || parseFloat(formData.valorTotal) <= 0) {
      newErrors.valorTotal = 'Valor total deve ser maior que zero';
    }

    if (!formData.dataInicio) {
      newErrors.dataInicio = 'Data de início é obrigatória';
    }

    if (!formData.dataFim) {
      newErrors.dataFim = 'Data de término é obrigatória';
    }

    if (formData.dataInicio && formData.dataFim && formData.dataInicio > formData.dataFim) {
      newErrors.dataFim = 'Data de término deve ser posterior à data de início';
    }

    if (!formData.responsavel.trim()) {
      newErrors.responsavel = 'Responsável é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const novoProjeto = {
      ...formData,
      valorTotal: parseFloat(formData.valorTotal)
    };

    const projetoCriado = addProjeto(novoProjeto);
    
    // Redirecionar para a página do projeto criado
    router.push(`/projetos/${projetoCriado.id}`);
  };

  const handleCancel = () => {
    router.push('/');
  };

  // Agrupar atividades por eixo
  const atividadesPorEixo = eixos.map(eixo => ({
    eixo,
    atividades: atividades.filter(a => a.eixoId === eixo.id)
  }));

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
          <span className="text-gray-900 font-medium">Novo Projeto</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card title="Criar Novo Projeto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome do Projeto */}
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Projeto *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.nome ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Projeto de construção de Instalações para Farmácia"
                />
                {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome}</p>}
              </div>

              {/* Atividade */}
              <div>
                <label htmlFor="atividadeId" className="block text-sm font-medium text-gray-700 mb-2">
                  Atividade *
                </label>
                <select
                  id="atividadeId"
                  name="atividadeId"
                  value={formData.atividadeId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.atividadeId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione uma atividade</option>
                  {atividadesPorEixo.map(({ eixo, atividades: atividadesEixo }) => (
                    <optgroup key={eixo.id} label={eixo.nome}>
                      {atividadesEixo.map(atividade => (
                        <option key={atividade.id} value={atividade.id}>
                          {atividade.nome}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {errors.atividadeId && <p className="mt-1 text-sm text-red-600">{errors.atividadeId}</p>}
              </div>

              {/* Descrição */}
              <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.descricao ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Descreva os objetivos e escopo do projeto"
                />
                {errors.descricao && <p className="mt-1 text-sm text-red-600">{errors.descricao}</p>}
              </div>

              {/* Valor Total */}
              <div>
                <label htmlFor="valorTotal" className="block text-sm font-medium text-gray-700 mb-2">
                  Valor Total (R$) *
                </label>
                <input
                  type="number"
                  id="valorTotal"
                  name="valorTotal"
                  value={formData.valorTotal}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.valorTotal ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.valorTotal && <p className="mt-1 text-sm text-red-600">{errors.valorTotal}</p>}
              </div>

              {/* Datas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Início *
                  </label>
                  <input
                    type="date"
                    id="dataInicio"
                    name="dataInicio"
                    value={formData.dataInicio}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.dataInicio ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dataInicio && <p className="mt-1 text-sm text-red-600">{errors.dataInicio}</p>}
                </div>

                <div>
                  <label htmlFor="dataFim" className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Término *
                  </label>
                  <input
                    type="date"
                    id="dataFim"
                    name="dataFim"
                    value={formData.dataFim}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.dataFim ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dataFim && <p className="mt-1 text-sm text-red-600">{errors.dataFim}</p>}
                </div>
              </div>

              {/* Responsável */}
              <div>
                <label htmlFor="responsavel" className="block text-sm font-medium text-gray-700 mb-2">
                  Responsável *
                </label>
                <select
                  id="responsavel"
                  name="responsavel"
                  value={formData.responsavel}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.responsavel ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione um responsável</option>
                  {responsaveis.map(resp => (
                    <option key={resp.id} value={resp.nome}>
                      {resp.nome} - {resp.cargo}
                    </option>
                  ))}
                  <option value="Outro">Outro</option>
                </select>
                {errors.responsavel && <p className="mt-1 text-sm text-red-600">{errors.responsavel}</p>}
              </div>

              {/* Botões */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <PrimaryButton type="submit" className="flex items-center gap-2">
                  <Save size={18} />
                  Salvar Projeto
                </PrimaryButton>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  <X size={18} />
                  Cancelar
                </button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </>
  );
}
