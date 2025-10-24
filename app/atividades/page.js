'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Card from '@/components/Card';
import DataTable from '@/components/DataTable';
import ProgressBadge from '@/components/ProgressBadge';
import PrimaryButton from '@/components/PrimaryButton';
import BarChartWidget from '@/components/BarChartWidget';
import useStore from '@/lib/store';

function AtividadesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const atividadeIdParam = searchParams.get('id');

  const { 
    atividades, 
    projetos, 
    getAtividadeById, 
    getEixoById, 
    getProjetosByAtividade 
  } = useStore();

  // Se não houver parâmetro, mostrar todas as atividades
  const atividadeSelecionada = atividadeIdParam 
    ? getAtividadeById(atividadeIdParam)
    : null;

  const projetosDaAtividade = atividadeSelecionada 
    ? getProjetosByAtividade(atividadeSelecionada.id)
    : [];

  const eixo = atividadeSelecionada 
    ? getEixoById(atividadeSelecionada.eixoId)
    : null;

  const columns = [
    {
      header: 'Projeto',
      accessor: 'nome',
      render: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.nome}</div>
          <div className="text-xs text-gray-500">{row.responsavel}</div>
        </div>
      )
    },
    {
      header: 'Valor Total',
      accessor: 'valorTotal',
      render: (row) => (
        <span className="font-medium">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(row.valorTotal)}
        </span>
      )
    },
    {
      header: '% Execução',
      accessor: 'percentualConcluido',
      render: (row) => <ProgressBadge percentage={row.percentualConcluido} />
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          row.status === 'Em Andamento' ? 'bg-blue-100 text-blue-800' :
          row.status === 'Concluído' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Ações',
      accessor: 'id',
      render: (row) => (
        <PrimaryButton
          onClick={() => router.push(`/projetos/${row.id}`)}
          className="text-sm px-4 py-1.5"
        >
          Detalhe
        </PrimaryButton>
      )
    }
  ];

  // Dados para gráfico
  const chartData = projetosDaAtividade.map(p => ({
    name: p.nome.substring(0, 20) + (p.nome.length > 20 ? '...' : ''),
    value: p.percentualConcluido
  }));

  // Se não houver atividade selecionada, mostrar lista de todas as atividades
  if (!atividadeSelecionada) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Acompanhar Atividades</h2>
            <p className="text-gray-600 mt-2">Selecione uma atividade para ver os projetos relacionados</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {atividades.map((atividade) => {
              const eixoAtiv = getEixoById(atividade.eixoId);
              const qtdProjetos = getProjetosByAtividade(atividade.id).length;
              
              return (
                <Card key={atividade.id} className="hover:shadow-lg transition-shadow cursor-pointer" title={atividade.nome}>
                  <div onClick={() => router.push(`/atividades?id=${atividade.id}`)}>
                    <div className="mb-4">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        {eixoAtiv?.nome}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{atividade.descricao}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {qtdProjetos} projeto{qtdProjetos !== 1 ? 's' : ''}
                      </div>
                      <ProgressBadge percentage={atividade.percentualExecucao} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </main>
      </>
    );
  }

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
          <span className="text-gray-900 font-medium">{atividadeSelecionada.nome}</span>
        </div>

        {/* Cabeçalho da Atividade */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {atividadeSelecionada.nome}
              </h2>
              <p className="text-gray-600 mb-4">{atividadeSelecionada.descricao}</p>
              {eixo && (
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {eixo.nome}
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Execução Geral</div>
              <ProgressBadge percentage={atividadeSelecionada.percentualExecucao} size="lg" />
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Total de Projetos</div>
            <div className="text-3xl font-bold text-gray-900">{projetosDaAtividade.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Valor Total</div>
            <div className="text-2xl font-bold text-gray-900">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(atividadeSelecionada.valorTotal)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Média de Execução</div>
            <div className="text-3xl font-bold text-gray-900">
              {projetosDaAtividade.length > 0
                ? Math.round(
                    projetosDaAtividade.reduce((acc, p) => acc + p.percentualConcluido, 0) /
                    projetosDaAtividade.length
                  )
                : 0}%
            </div>
          </div>
        </div>

        {/* Gráfico de Progresso */}
        {projetosDaAtividade.length > 0 && (
          <Card title="Progresso dos Projetos" className="mb-8">
            <BarChartWidget 
              data={chartData}
              title="Percentual de Execução por Projeto"
              color={eixo?.cor || '#3b82f6'}
            />
          </Card>
        )}

        {/* Tabela de Projetos */}
        <Card title="Projetos da Atividade">
          {projetosDaAtividade.length > 0 ? (
            <DataTable columns={columns} data={projetosDaAtividade} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              Nenhum projeto cadastrado nesta atividade ainda.
            </div>
          )}
        </Card>
      </main>
    </>
  );
}

export default function AtividadesPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Carregando...</div>
        </div>
      </>
    }>
      <AtividadesContent />
    </Suspense>
  );
}
