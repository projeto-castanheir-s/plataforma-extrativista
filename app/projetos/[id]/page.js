'use client';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Tabs from '@/components/Tabs';
import Kpi from '@/components/Kpi';
import ProgressBadge from '@/components/ProgressBadge';
import MilestoneList from '@/components/MilestoneList';
import DataTable from '@/components/DataTable';
import BarChartWidget from '@/components/BarChartWidget';
import useStore from '@/lib/store';
import { Calendar, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';

export default function ProjetoPage({ params }) {
  const router = useRouter();
  const { id } = params;
  
  const { 
    getProjetoById, 
    getAtividadeById, 
    getEixoById,
    getMarcosByProjeto,
    getCronogramaByProjeto,
    addMarco,
    updateMarco,
    deleteMarco
  } = useStore();

  const projeto = getProjetoById(id);

  if (!projeto) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Projeto não encontrado</h2>
            <button
              onClick={() => router.push('/')}
              className="text-primary-600 hover:text-primary-700"
            >
              Voltar para Home
            </button>
          </div>
        </main>
      </>
    );
  }

  const atividade = getAtividadeById(projeto.atividadeId);
  const eixo = atividade ? getEixoById(atividade.eixoId) : null;
  const marcos = getMarcosByProjeto(id);
  const cronograma = getCronogramaByProjeto(id);

  // Calcular totais financeiros
  const valorTotal = cronograma.reduce((acc, cr) => acc + cr.valor, 0);
  const valorPago = cronograma
    .filter(cr => cr.status === 'Pago')
    .reduce((acc, cr) => acc + cr.valor, 0);
  const percentualFinanceiro = valorTotal > 0 ? Math.round((valorPago / valorTotal) * 100) : 0;

  // Handlers para marcos
  const handleAddMarco = (novoMarco) => {
    addMarco({ ...novoMarco, projetoId: id });
  };

  const handleToggleMarco = (marcoId) => {
    const marco = marcos.find(m => m.id === marcoId);
    if (marco) {
      updateMarco(marcoId, { concluido: !marco.concluido });
    }
  };

  const handleDeleteMarco = (marcoId) => {
    deleteMarco(marcoId);
  };

  // Abas do projeto
  const tabs = [
    {
      label: 'Dados do Projeto',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Nome do Projeto</h4>
              <p className="text-lg font-semibold text-gray-900">{projeto.nome}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Responsável</h4>
              <p className="text-lg font-semibold text-gray-900">{projeto.responsavel}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Eixo</h4>
              <p className="text-lg font-semibold text-gray-900">{eixo?.nome}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Atividade</h4>
              <p className="text-lg font-semibold text-gray-900">{atividade?.nome}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Data de Início</h4>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(projeto.dataInicio).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Data de Término</h4>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(projeto.dataFim).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Valor Total</h4>
              <p className="text-lg font-semibold text-gray-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(projeto.valorTotal)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
              <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                {projeto.status}
              </span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Descrição</h4>
            <p className="text-gray-700 leading-relaxed">{projeto.descricao}</p>
          </div>

          {/* Módulos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card title="Módulo Executor" className="bg-gradient-to-br from-blue-50 to-blue-100">
              <p className="text-sm text-gray-700 mb-4">
                Informações sobre a execução física do projeto
              </p>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                Ver Detalhes →
              </button>
            </Card>
            <Card title="Módulo Financeiro" className="bg-gradient-to-br from-green-50 to-green-100">
              <p className="text-sm text-gray-700 mb-4">
                Informações financeiras e orçamentárias
              </p>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                Ver Detalhes →
              </button>
            </Card>
          </div>
        </div>
      )
    },
    {
      label: 'Financeiro',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Kpi 
              label="Valor Total"
              value={valorTotal}
              percentage={percentualFinanceiro}
            />
            <div className="bg-green-50 rounded-lg p-6">
              <div className="text-sm font-medium text-green-700 mb-2">Valor Pago</div>
              <div className="text-2xl font-bold text-green-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(valorPago)}
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-6">
              <div className="text-sm font-medium text-yellow-700 mb-2">Saldo Pendente</div>
              <div className="text-2xl font-bold text-yellow-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(valorTotal - valorPago)}
              </div>
            </div>
          </div>

          <Card title="Resumo Financeiro">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <BarChartWidget 
                  data={[
                    { name: 'Pago', value: percentualFinanceiro },
                    { name: 'Pendente', value: 100 - percentualFinanceiro }
                  ]}
                  title="Status Financeiro"
                  color="#10b981"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Total de Parcelas</span>
                  <span className="text-lg font-bold text-gray-900">{cronograma.length}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Parcelas Pagas</span>
                  <span className="text-lg font-bold text-green-600">
                    {cronograma.filter(cr => cr.status === 'Pago').length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Parcelas Atrasadas</span>
                  <span className="text-lg font-bold text-red-600">
                    {cronograma.filter(cr => cr.status === 'Atrasado').length}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      label: 'Cronograma de Repasse',
      content: (
        <Card title="Parcelas do Cronograma">
          <DataTable 
            columns={[
              {
                header: 'Parcela',
                accessor: 'parcela',
                render: (row) => <span className="font-semibold">Parcela {row.parcela}</span>
              },
              {
                header: 'Valor',
                accessor: 'valor',
                render: (row) => (
                  <span className="font-medium">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(row.valor)}
                  </span>
                )
              },
              {
                header: 'Data Previsão',
                accessor: 'dataPrevisao',
                render: (row) => new Date(row.dataPrevisao).toLocaleDateString('pt-BR')
              },
              {
                header: 'Data Pagamento',
                accessor: 'dataPagamento',
                render: (row) => row.dataPagamento 
                  ? new Date(row.dataPagamento).toLocaleDateString('pt-BR')
                  : '-'
              },
              {
                header: 'Status',
                accessor: 'status',
                render: (row) => (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    row.status === 'Pago' ? 'bg-green-100 text-green-800' :
                    row.status === 'Atrasado' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {row.status}
                  </span>
                )
              }
            ]}
            data={cronograma}
          />
        </Card>
      )
    },
    {
      label: 'Execução',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Kpi 
              label="Execução Geral"
              value={`${projeto.percentualConcluido}%`}
              percentage={projeto.percentualConcluido}
            />
            <div className="bg-white rounded-lg p-6 border-2 border-primary-200">
              <div className="text-sm font-medium text-gray-700 mb-2">Marcos Concluídos</div>
              <div className="text-3xl font-bold text-primary-900">
                {marcos.filter(m => m.concluido).length} / {marcos.length}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {marcos.length > 0 
                  ? `${Math.round((marcos.filter(m => m.concluido).length / marcos.length) * 100)}% dos marcos`
                  : 'Nenhum marco cadastrado'}
              </div>
            </div>
          </div>

          <Card title="Progresso por Fase">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Planejamento</span>
                  <span className="text-sm font-semibold text-gray-900">100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Execução</span>
                  <span className="text-sm font-semibold text-gray-900">{projeto.percentualConcluido}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${projeto.percentualConcluido}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Monitoramento</span>
                  <span className="text-sm font-semibold text-gray-900">{Math.max(0, projeto.percentualConcluido - 10)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${Math.max(0, projeto.percentualConcluido - 10)}%` }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      label: 'Cronograma Físico',
      content: (
        <Card>
          <MilestoneList 
            milestones={marcos}
            onAdd={handleAddMarco}
            onToggle={handleToggleMarco}
            onDelete={handleDeleteMarco}
          />
        </Card>
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
          <button onClick={() => router.push('/atividades')} className="hover:text-primary-600">
            Atividades
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{projeto.nome}</span>
        </div>

        {/* Cabeçalho do Projeto */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{projeto.nome}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(projeto.dataInicio).toLocaleDateString('pt-BR')} - {new Date(projeto.dataFim).toLocaleDateString('pt-BR')}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign size={16} />
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(projeto.valorTotal)}
                </span>
              </div>
            </div>
            <ProgressBadge percentage={projeto.percentualConcluido} size="lg" />
          </div>

          {/* KPIs rápidos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="text-blue-600" size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-600">Execução</div>
                <div className="text-lg font-bold text-gray-900">{projeto.percentualConcluido}%</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="text-green-600" size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-600">Financeiro</div>
                <div className="text-lg font-bold text-gray-900">{percentualFinanceiro}%</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="text-purple-600" size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-600">Marcos</div>
                <div className="text-lg font-bold text-gray-900">
                  {marcos.filter(m => m.concluido).length}/{marcos.length}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="text-orange-600" size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-600">Responsável</div>
                <div className="text-sm font-semibold text-gray-900">{projeto.responsavel}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Abas */}
        <Card>
          <Tabs tabs={tabs} defaultTab={0} />
        </Card>
      </main>
    </>
  );
}
