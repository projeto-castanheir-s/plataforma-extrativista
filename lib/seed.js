import { v4 as uuidv4 } from 'uuid';

// Dados iniciais do sistema
export const initialData = {
  eixos: [
    {
      id: '1',
      nome: 'EIXO 1 – Reestruturação',
      descricao: 'Ações voltadas para reestruturação produtiva',
      cor: '#3b82f6'
    },
    {
      id: '2',
      nome: 'EIXO 2 – Cooperação, Empreendedorismo e Inovação',
      descricao: 'Fomento à cooperação e inovação',
      cor: '#10b981'
    },
    {
      id: '3',
      nome: 'EIXO 3 – Aceleração',
      descricao: 'Aceleração de processos e resultados',
      cor: '#f59e0b'
    }
  ],

  atividades: [
    // EIXO 1
    {
      id: 'a1',
      eixoId: '1',
      nome: 'Construção de Infraestrutura',
      descricao: 'Obras de infraestrutura produtiva',
      percentualExecucao: 37,
      valorTotal: 5000000.00
    },
    {
      id: 'a2',
      eixoId: '1',
      nome: 'Modernização de Equipamentos',
      descricao: 'Aquisição e instalação de equipamentos',
      percentualExecucao: 52,
      valorTotal: 3500000.00
    },
    {
      id: 'a3',
      eixoId: '1',
      nome: 'Reforma de Unidades Produtivas',
      descricao: 'Reforma e adequação de espaços',
      percentualExecucao: 68,
      valorTotal: 2200000.00
    },
    
    // EIXO 2
    {
      id: 'a4',
      eixoId: '2',
      nome: 'Capacitação em Gestão',
      descricao: 'Programas de capacitação gerencial',
      percentualExecucao: 21,
      valorTotal: 850000.00
    },
    {
      id: 'a5',
      eixoId: '2',
      nome: 'Fomento ao Associativismo',
      descricao: 'Fortalecimento de cooperativas',
      percentualExecucao: 45,
      valorTotal: 1200000.00
    },
    {
      id: 'a6',
      eixoId: '2',
      nome: 'Inovação Tecnológica',
      descricao: 'Implementação de tecnologias sustentáveis',
      percentualExecucao: 33,
      valorTotal: 980000.00
    },
    
    // EIXO 3
    {
      id: 'a7',
      eixoId: '3',
      nome: 'Certificação e Rastreabilidade',
      descricao: 'Implantação de sistemas de certificação',
      percentualExecucao: 58,
      valorTotal: 750000.00
    },
    {
      id: 'a8',
      eixoId: '3',
      nome: 'Acesso a Mercados',
      descricao: 'Estratégias de comercialização',
      percentualExecucao: 72,
      valorTotal: 650000.00
    },
    {
      id: 'a9',
      eixoId: '3',
      nome: 'Marketing e Branding',
      descricao: 'Fortalecimento da marca',
      percentualExecucao: 41,
      valorTotal: 420000.00
    }
  ],

  projetos: [
    {
      id: 'p1',
      atividadeId: 'a1',
      nome: 'Projeto de construção de Instalações para Farmácia',
      descricao: 'Construção de uma unidade de processamento farmacêutico de produtos da floresta',
      valorTotal: 2325792.00,
      percentualConcluido: 37,
      dataInicio: '2024-03-15',
      dataFim: '2025-12-20',
      responsavel: 'Maria Silva',
      status: 'Em Andamento'
    },
    {
      id: 'p2',
      atividadeId: 'a4',
      nome: 'Projeto de Capacitação de gestão de negócios para Mulheres',
      descricao: 'Programa de capacitação voltado para mulheres extrativistas em gestão empresarial',
      valorTotal: 485000.00,
      percentualConcluido: 21,
      dataInicio: '2024-06-01',
      dataFim: '2025-05-30',
      responsavel: 'Ana Paula Costa',
      status: 'Em Andamento'
    },
    {
      id: 'p3',
      atividadeId: 'a2',
      nome: 'Aquisição de Máquinas para Beneficiamento',
      descricao: 'Compra e instalação de equipamentos para beneficiamento de castanha',
      valorTotal: 1850000.00,
      percentualConcluido: 52,
      dataInicio: '2024-01-10',
      dataFim: '2025-03-15',
      responsavel: 'João Santos',
      status: 'Em Andamento'
    },
    {
      id: 'p4',
      atividadeId: 'a7',
      nome: 'Implementação de Sistema de Rastreabilidade',
      descricao: 'Implantação de sistema digital de rastreamento da cadeia produtiva',
      valorTotal: 420000.00,
      percentualConcluido: 58,
      dataInicio: '2024-02-20',
      dataFim: '2025-01-10',
      responsavel: 'Carlos Mendes',
      status: 'Em Andamento'
    },
    {
      id: 'p5',
      atividadeId: 'a8',
      nome: 'Programa de Acesso a Novos Mercados',
      descricao: 'Desenvolvimento de canais de comercialização nacional e internacional',
      valorTotal: 380000.00,
      percentualConcluido: 72,
      dataInicio: '2024-04-01',
      dataFim: '2024-11-30',
      responsavel: 'Fernanda Lima',
      status: 'Em Andamento'
    }
  ],

  marcos: [
    // Projeto p1
    { id: 'm1', projetoId: 'p1', nome: 'Início do Projeto', data: '2024-03-15', concluido: true },
    { id: 'm2', projetoId: 'p1', nome: 'Aprovação do Projeto Executivo', data: '2024-05-20', concluido: true },
    { id: 'm3', projetoId: 'p1', nome: 'Conclusão da Fundação', data: '2024-08-10', concluido: true },
    { id: 'm4', projetoId: 'p1', nome: 'Finalização da Estrutura', data: '2024-12-15', concluido: false },
    { id: 'm5', projetoId: 'p1', nome: 'Instalação de Equipamentos', data: '2025-06-30', concluido: false },
    { id: 'm6', projetoId: 'p1', nome: 'Fim do Projeto', data: '2025-12-20', concluido: false },
    
    // Projeto p2
    { id: 'm7', projetoId: 'p2', nome: 'Início do Projeto', data: '2024-06-01', concluido: true },
    { id: 'm8', projetoId: 'p2', nome: 'Seleção de Participantes', data: '2024-07-15', concluido: true },
    { id: 'm9', projetoId: 'p2', nome: 'Módulo 1 - Gestão Financeira', data: '2024-10-30', concluido: false },
    { id: 'm10', projetoId: 'p2', nome: 'Módulo 2 - Marketing', data: '2025-02-28', concluido: false },
    { id: 'm11', projetoId: 'p2', nome: 'Fim do Projeto', data: '2025-05-30', concluido: false },
    
    // Projeto p3
    { id: 'm12', projetoId: 'p3', nome: 'Início do Projeto', data: '2024-01-10', concluido: true },
    { id: 'm13', projetoId: 'p3', nome: 'Aquisição de Equipamentos', data: '2024-06-20', concluido: true },
    { id: 'm14', projetoId: 'p3', nome: 'Instalação e Testes', data: '2024-11-15', concluido: false },
    { id: 'm15', projetoId: 'p3', nome: 'Fim do Projeto', data: '2025-03-15', concluido: false },
  ],

  cronogramaRepasse: [
    // Projeto p1
    { id: 'cr1', projetoId: 'p1', parcela: 1, valor: 465158.40, dataPrevisao: '2024-03-15', dataPagamento: '2024-03-20', status: 'Pago' },
    { id: 'cr2', projetoId: 'p1', parcela: 2, valor: 465158.40, dataPrevisao: '2024-06-15', dataPagamento: '2024-06-18', status: 'Pago' },
    { id: 'cr3', projetoId: 'p1', parcela: 3, valor: 465158.40, dataPrevisao: '2024-09-15', dataPagamento: null, status: 'Atrasado' },
    { id: 'cr4', projetoId: 'p1', parcela: 4, valor: 465158.40, dataPrevisao: '2024-12-15', dataPagamento: null, status: 'Pendente' },
    { id: 'cr5', projetoId: 'p1', parcela: 5, valor: 465158.40, dataPrevisao: '2025-06-15', dataPagamento: null, status: 'Pendente' },
    
    // Projeto p2
    { id: 'cr6', projetoId: 'p2', parcela: 1, valor: 121250.00, dataPrevisao: '2024-06-01', dataPagamento: '2024-06-05', status: 'Pago' },
    { id: 'cr7', projetoId: 'p2', parcela: 2, valor: 121250.00, dataPrevisao: '2024-09-01', dataPagamento: null, status: 'Atrasado' },
    { id: 'cr8', projetoId: 'p2', parcela: 3, valor: 121250.00, dataPrevisao: '2024-12-01', dataPagamento: null, status: 'Pendente' },
    { id: 'cr9', projetoId: 'p2', parcela: 4, valor: 121250.00, dataPrevisao: '2025-03-01', dataPagamento: null, status: 'Pendente' },
  ],

  beneficiarios: [
    { id: 'b1', nome: 'Cooperativa Castanheiros do Norte', tipo: 'Cooperativa', documento: '12.345.678/0001-90', contato: '(91) 3234-5678' },
    { id: 'b2', nome: 'Associação Mulheres da Floresta', tipo: 'Associação', documento: '23.456.789/0001-12', contato: '(91) 3345-6789' },
    { id: 'b3', nome: 'Comunidade São João', tipo: 'Comunidade', documento: '34.567.890/0001-34', contato: '(91) 3456-7890' },
    { id: 'b4', nome: 'Cooperativa Agroextrativista Vale Verde', tipo: 'Cooperativa', documento: '45.678.901/0001-56', contato: '(91) 3567-8901' },
    { id: 'b5', nome: 'Associação de Produtores Rurais Esperança', tipo: 'Associação', documento: '56.789.012/0001-78', contato: '(91) 3678-9012' }
  ],

  financeiras: [
    { id: 'f1', nome: 'Banco do Brasil', agencia: '1234-5', conta: '12345-6', gerente: 'Paulo Santos' },
    { id: 'f2', nome: 'Caixa Econômica Federal', agencia: '2345-6', conta: '23456-7', gerente: 'Maria Oliveira' },
    { id: 'f3', nome: 'Banco da Amazônia', agencia: '3456-7', conta: '34567-8', gerente: 'José Silva' },
    { id: 'f4', nome: 'Cooperativa de Crédito Rural', agencia: '4567-8', conta: '45678-9', gerente: 'Ana Costa' }
  ],

  executores: [
    { id: 'e1', nome: 'Construtora Floresta Verde Ltda', especialidade: 'Construção Civil', contato: '(91) 3234-1111' },
    { id: 'e2', nome: 'Consultoria Amazônia Sustentável', especialidade: 'Consultoria e Capacitação', contato: '(91) 3345-2222' },
    { id: 'e3', nome: 'TechnoAgro Equipamentos', especialidade: 'Fornecimento de Equipamentos', contato: '(91) 3456-3333' },
    { id: 'e4', nome: 'Instituto de Desenvolvimento Comunitário', especialidade: 'Capacitação e Assistência Técnica', contato: '(91) 3567-4444' }
  ],

  diagnosticos: [
    { id: 'd1', titulo: 'Diagnóstico de Infraestrutura', data: '2024-01-15', responsavel: 'Equipe Técnica A', status: 'Concluído' },
    { id: 'd2', titulo: 'Levantamento de Capacidades Produtivas', data: '2024-02-10', responsavel: 'Equipe Técnica B', status: 'Concluído' },
    { id: 'd3', titulo: 'Análise de Mercado Regional', data: '2024-03-05', responsavel: 'Consultoria Externa', status: 'Em Andamento' },
    { id: 'd4', titulo: 'Diagnóstico Socioambiental', data: '2024-04-20', responsavel: 'Instituto Ambiental', status: 'Concluído' }
  ],

  responsaveis: [
    { id: 'r1', nome: 'Maria Silva', cargo: 'Coordenadora de Projetos', email: 'maria.silva@plataforma.org', telefone: '(91) 98765-4321' },
    { id: 'r2', nome: 'Ana Paula Costa', cargo: 'Gerente de Capacitação', email: 'ana.costa@plataforma.org', telefone: '(91) 98876-5432' },
    { id: 'r3', nome: 'João Santos', cargo: 'Coordenador Técnico', email: 'joao.santos@plataforma.org', telefone: '(91) 98987-6543' },
    { id: 'r4', nome: 'Carlos Mendes', cargo: 'Analista de Sistemas', email: 'carlos.mendes@plataforma.org', telefone: '(91) 99098-7654' },
    { id: 'r5', nome: 'Fernanda Lima', cargo: 'Gerente Comercial', email: 'fernanda.lima@plataforma.org', telefone: '(91) 99109-8765' }
  ]
};

export default initialData;
