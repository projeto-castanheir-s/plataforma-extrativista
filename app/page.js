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
      <main className="container mx-auto px-4 py-4 sm:py-8">
        {/* Ações Principais */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Bem-vindo à Plataforma Castanheir@s
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <button
              onClick={() => router.push('/projetos/1')}
              className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-primary-600 text-left"
            >
              <div className="p-2 sm:p-3 bg-primary-100 rounded-lg flex-shrink-0">
                <BarChart3 className="text-primary-600" size={20} />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Acompanhar Projeto</h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">Visualizar detalhes de projetos</p>
              </div>
            </button>

            <button
              onClick={() => router.push('/atividades')}
              className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-600 text-left"
            >
              <div className="p-2 sm:p-3 bg-green-100 rounded-lg flex-shrink-0">
                <Activity className="text-green-600" size={20} />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Acompanhar Atividade</h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">Ver atividades por eixo</p>
              </div>
            </button>

            <button
              onClick={() => router.push('/projetos/novo')}
              className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-600 text-left"
            >
              <div className="p-2 sm:p-3 bg-orange-100 rounded-lg flex-shrink-0">
                <FolderPlus className="text-orange-600" size={20} />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Novo Projeto</h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">Criar um novo projeto</p>
              </div>
            </button>
          </div>
        </div>

        {/* Eixos */}
        <div className="space-y-6 sm:space-y-8">
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
                <div className="space-y-4 sm:space-y-6">
                  {/* Cabeçalho do Eixo */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{eixo.nome}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mt-1">{eixo.descricao}</p>
                    </div>
                    <div className="text-left sm:text-right flex sm:block items-center gap-2 sm:gap-0">
                      <div className="text-xs sm:text-sm text-gray-500 sm:mb-1">Execução Média</div>
                      <ProgressBadge percentage={percentualEixo} size="lg" />
                    </div>
                  </div>

                  {/* Lista de Atividades */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
                    {atividadesDoEixo.map((atividade) => (
                      <div
                        key={atividade.id}
                        onClick={() => router.push(`/atividades?id=${atividade.id}`)}
                        className="p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <h4 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight flex-1 pr-2">
                            {atividade.nome}
                          </h4>
                          <ProgressBadge percentage={atividade.percentualExecucao} size="sm" />
                        </div>
                        <p className="text-xs text-gray-600 mb-2 sm:mb-3 line-clamp-2">{atividade.descricao}</p>
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
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
