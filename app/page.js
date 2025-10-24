'use client';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Card from '@/components/Card';
import PrimaryButton from '@/components/PrimaryButton';
import ProgressBadge from '@/components/ProgressBadge';
import PieChartWidget from '@/components/PieChartWidget';
import BarChartWidget from '@/components/BarChartWidget';
import useStore from '@/lib/store';
import { Activity, FolderPlus, BarChart3 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { eixos, atividades, getAtividadesByEixo, getPercentualEixo } = useStore();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Ações Principais */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Bem-vindo à Plataforma Castanheir@s
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/projetos/1')}
              className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-primary-600"
            >
              <div className="p-3 bg-primary-100 rounded-lg">
                <BarChart3 className="text-primary-600" size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Acompanhar Projeto</h3>
                <p className="text-sm text-gray-500">Visualizar detalhes de projetos</p>
              </div>
            </button>

            <button
              onClick={() => router.push('/atividades')}
              className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-600"
            >
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="text-green-600" size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Acompanhar Atividade</h3>
                <p className="text-sm text-gray-500">Ver atividades por eixo</p>
              </div>
            </button>

            <button
              onClick={() => router.push('/projetos/novo')}
              className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-600"
            >
              <div className="p-3 bg-orange-100 rounded-lg">
                <FolderPlus className="text-orange-600" size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Novo Projeto</h3>
                <p className="text-sm text-gray-500">Criar um novo projeto</p>
              </div>
            </button>
          </div>
        </div>

        {/* Eixos */}
        <div className="space-y-8">
          {eixos.map((eixo) => {
            const atividadesDoEixo = getAtividadesByEixo(eixo.id);
            const percentualEixo = getPercentualEixo(eixo.id);
            
            // Dados para gráfico de pizza
            const pieData = atividadesDoEixo.map(a => ({
              name: a.nome.substring(0, 20) + (a.nome.length > 20 ? '...' : ''),
              value: a.percentualExecucao
            }));

            // Dados para gráfico de barras
            const barData = atividadesDoEixo.map(a => ({
              name: a.nome.substring(0, 15) + (a.nome.length > 15 ? '...' : ''),
              value: a.percentualExecucao
            }));

            return (
              <Card key={eixo.id} className="border-t-4" style={{ borderTopColor: eixo.cor }}>
                <div className="space-y-6">
                  {/* Cabeçalho do Eixo */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{eixo.nome}</h3>
                      <p className="text-gray-600 mt-1">{eixo.descricao}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">Execução Média</div>
                      <ProgressBadge percentage={percentualEixo} size="lg" />
                    </div>
                  </div>

                  {/* Lista de Atividades */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {atividadesDoEixo.map((atividade) => (
                      <div
                        key={atividade.id}
                        onClick={() => router.push(`/atividades?id=${atividade.id}`)}
                        className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 text-sm leading-tight flex-1">
                            {atividade.nome}
                          </h4>
                          <ProgressBadge percentage={atividade.percentualExecucao} size="sm" />
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{atividade.descricao}</p>
                        <div className="text-xs text-gray-500">
                          Valor: {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(atividade.valorTotal)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Gráficos */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
                    <div>
                      <PieChartWidget 
                        data={pieData}
                        title="Distribuição de Execução por Atividade"
                      />
                    </div>
                    <div>
                      <BarChartWidget 
                        data={barData}
                        title="Comparativo de Execução"
                        color={eixo.cor}
                      />
                    </div>
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
