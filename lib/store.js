import { create } from 'zustand';
import initialData from './seed';
import { v4 as uuidv4 } from 'uuid';

const useStore = create((set, get) => ({
  // Estado inicial
  eixos: initialData.eixos,
  atividades: initialData.atividades,
  projetos: initialData.projetos,
  marcos: initialData.marcos,
  cronogramaRepasse: initialData.cronogramaRepasse,
  beneficiarios: initialData.beneficiarios,
  financeiras: initialData.financeiras,
  executores: initialData.executores,
  diagnosticos: initialData.diagnosticos,
  responsaveis: initialData.responsaveis,

  // CRUD de Projetos
  addProjeto: (projeto) => {
    const novoProjeto = {
      ...projeto,
      id: uuidv4(),
      percentualConcluido: 0,
      status: 'Em Andamento'
    };
    set((state) => ({ projetos: [...state.projetos, novoProjeto] }));
    return novoProjeto;
  },

  updateProjeto: (id, dadosAtualizados) => {
    set((state) => ({
      projetos: state.projetos.map((p) => 
        p.id === id ? { ...p, ...dadosAtualizados } : p
      )
    }));
  },

  deleteProjeto: (id) => {
    set((state) => ({
      projetos: state.projetos.filter((p) => p.id !== id),
      marcos: state.marcos.filter((m) => m.projetoId !== id),
      cronogramaRepasse: state.cronogramaRepasse.filter((cr) => cr.projetoId !== id)
    }));
  },

  getProjetoById: (id) => {
    return get().projetos.find((p) => p.id === id);
  },

  getProjetosByAtividade: (atividadeId) => {
    return get().projetos.filter((p) => p.atividadeId === atividadeId);
  },

  // CRUD de Marcos
  addMarco: (marco) => {
    const novoMarco = {
      ...marco,
      id: uuidv4(),
      concluido: false
    };
    set((state) => ({ marcos: [...state.marcos, novoMarco] }));
    return novoMarco;
  },

  updateMarco: (id, dadosAtualizados) => {
    set((state) => ({
      marcos: state.marcos.map((m) => 
        m.id === id ? { ...m, ...dadosAtualizados } : m
      )
    }));
  },

  deleteMarco: (id) => {
    set((state) => ({
      marcos: state.marcos.filter((m) => m.id !== id)
    }));
  },

  getMarcosByProjeto: (projetoId) => {
    return get().marcos.filter((m) => m.projetoId === projetoId);
  },

  // CRUD de Cronograma de Repasse
  getCronogramaByProjeto: (projetoId) => {
    return get().cronogramaRepasse.filter((cr) => cr.projetoId === projetoId);
  },

  // CRUD Genérico para Cadastros
  addItem: (entidade, item) => {
    const novoItem = {
      ...item,
      id: uuidv4()
    };
    set((state) => ({
      [entidade]: [...state[entidade], novoItem]
    }));
    return novoItem;
  },

  updateItem: (entidade, id, dadosAtualizados) => {
    set((state) => ({
      [entidade]: state[entidade].map((item) => 
        item.id === id ? { ...item, ...dadosAtualizados } : item
      )
    }));
  },

  deleteItem: (entidade, id) => {
    set((state) => ({
      [entidade]: state[entidade].filter((item) => item.id !== id)
    }));
  },

  getAtividadesByEixo: (eixoId) => {
    return get().atividades.filter((a) => a.eixoId === eixoId);
  },

  getEixoById: (id) => {
    return get().eixos.find((e) => e.id === id);
  },

  getAtividadeById: (id) => {
    return get().atividades.find((a) => a.id === id);
  },

  // Calcular percentual médio de execução por eixo
  getPercentualEixo: (eixoId) => {
    const atividades = get().getAtividadesByEixo(eixoId);
    if (atividades.length === 0) return 0;
    const soma = atividades.reduce((acc, a) => acc + a.percentualExecucao, 0);
    return Math.round(soma / atividades.length);
  }
}));

export default useStore;
