'use client';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Card from '@/components/Card';
import { Users, Building2, Briefcase, Target, FileText, Activity, UserCheck } from 'lucide-react';

export default function CadastrosPage() {
  const router = useRouter();

  const cadastros = [
    {
      id: 'beneficiarios',
      nome: 'Beneficiários',
      descricao: 'Cooperativas, associações e comunidades',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      id: 'financeiras',
      nome: 'Financeiras',
      descricao: 'Bancos e instituições financeiras',
      icon: Building2,
      color: 'bg-green-500'
    },
    {
      id: 'executores',
      nome: 'Executores',
      descricao: 'Empresas e consultores executores',
      icon: Briefcase,
      color: 'bg-purple-500'
    },
    {
      id: 'eixos',
      nome: 'Eixos',
      descricao: 'Eixos estratégicos do programa',
      icon: Target,
      color: 'bg-orange-500'
    },
    {
      id: 'diagnosticos',
      nome: 'Diagnósticos',
      descricao: 'Diagnósticos e estudos realizados',
      icon: FileText,
      color: 'bg-red-500'
    },
    {
      id: 'atividades',
      nome: 'Atividades',
      descricao: 'Atividades por eixo',
      icon: Activity,
      color: 'bg-yellow-500'
    },
    {
      id: 'responsaveis',
      nome: 'Responsáveis',
      descricao: 'Coordenadores e gestores',
      icon: UserCheck,
      color: 'bg-indigo-500'
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
          <span className="text-gray-900 font-medium">Cadastros</span>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Cadastros</h2>
          <p className="text-gray-600">Gerencie as entidades do sistema</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cadastros.map((cadastro) => {
            const Icon = cadastro.icon;
            return (
              <button
                key={cadastro.id}
                onClick={() => router.push(`/cadastros/${cadastro.id}`)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 text-left border-2 border-transparent hover:border-primary-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`${cadastro.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {cadastro.nome}
                    </h3>
                    <p className="text-sm text-gray-600">{cadastro.descricao}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </>
  );
}
