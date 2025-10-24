# 🌳 Plataforma Castanheir@s - Protótipo Extrativista

Protótipo funcional de uma plataforma de gestão de projetos para comunidades extrativistas, desenvolvido com **Next.js (App Router)**, **JavaScript** e **Tailwind CSS**.

## 📋 Sobre o Projeto

A Plataforma Castanheir@s é um sistema de gestão voltado para projetos extrativistas, organizado em três eixos estratégicos:

- **EIXO 1 – Reestruturação**: Ações voltadas para reestruturação produtiva
- **EIXO 2 – Cooperação, Empreendedorismo e Inovação**: Fomento à cooperação e inovação
- **EIXO 3 – Aceleração**: Aceleração de processos e resultados

## 🚀 Funcionalidades

### Telas Principais

1. **Home (Tela Inicial)**
   - Cards com os 3 eixos estratégicos
   - Listagem de atividades por eixo
   - Gráficos de pizza e barra mostrando execução
   - Ações rápidas: Acompanhar Projeto, Acompanhar Atividade, Novo Projeto

2. **Acompanhar Atividade**
   - Listagem de todas as atividades
   - Visualização de projetos por atividade
   - Tabela com % de execução e ações
   - Gráfico de progresso geral

3. **Acompanhar Projeto**
   - Visualização detalhada do projeto
   - Abas: Dados do Projeto, Financeiro, Cronograma de Repasse, Execução, Cronograma Físico
   - KPIs: Valor total, % concluído, marcos
   - Gerenciamento de marcos (adicionar, marcar como concluído, excluir)
   - Cronograma financeiro com parcelas

4. **Novo Projeto**
   - Formulário completo para criação de projetos
   - Validação de campos obrigatórios
   - Seleção de atividade/eixo
   - Definição de datas, valores e responsáveis

5. **Cadastros**
   - Hub central de cadastros
   - CRUD genérico para 7 entidades:
     - Beneficiários
     - Financeiras
     - Executores
     - Eixos
     - Diagnósticos
     - Atividades
     - Responsáveis

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** (App Router)
- **React 18**
- **JavaScript** (sem TypeScript)
- **Tailwind CSS** - Estilização
- **Zustand** - Gerenciamento de estado global
- **Recharts** - Gráficos interativos
- **Lucide React** - Ícones
- **UUID** - Geração de IDs únicos

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Passos

1. Clone ou navegue até o diretório do projeto:

```bash
cd plataforma-extrativista-prototipo
```

2. Instale as dependências:

```bash
npm install
```

ou

```bash
yarn install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

ou

```bash
yarn dev
```

4. Abra o navegador e acesse:

```
http://localhost:3000
```

## 🎨 Estrutura do Projeto

```
plataforma-extrativista-prototipo/
├── app/                          # Rotas Next.js (App Router)
│   ├── layout.js                 # Layout raiz
│   ├── page.js                   # Página inicial (Home)
│   ├── globals.css               # Estilos globais
│   ├── atividades/
│   │   └── page.js               # Acompanhar Atividade
│   ├── projetos/
│   │   ├── [id]/
│   │   │   └── page.js           # Acompanhar Projeto (detalhe)
│   │   └── novo/
│   │       └── page.js           # Novo Projeto
│   └── cadastros/
│       ├── page.js               # Hub de Cadastros
│       └── [entidade]/
│           └── page.js           # CRUD genérico
├── components/                   # Componentes reutilizáveis
│   ├── Header.js                 # Cabeçalho com navegação
│   ├── Card.js                   # Card com título e conteúdo
│   ├── PrimaryButton.js          # Botão azul padrão
│   ├── ProgressBadge.js          # Badge de percentual
│   ├── Kpi.js                    # Indicador de KPI
│   ├── PieChartWidget.js         # Gráfico de pizza
│   ├── BarChartWidget.js         # Gráfico de barras
│   ├── DataTable.js              # Tabela com paginação
│   ├── Tabs.js                   # Sistema de abas
│   └── MilestoneList.js          # Lista de marcos
├── lib/                          # Lógica e dados
│   ├── seed.js                   # Dados mock iniciais
│   └── store.js                  # Store Zustand (estado global)
├── package.json                  # Dependências
├── tailwind.config.js            # Configuração Tailwind
├── postcss.config.js             # Configuração PostCSS
└── next.config.js                # Configuração Next.js
```

## 📊 Dados de Exemplo

O sistema vem com dados mock pré-cadastrados:

- **3 Eixos estratégicos**
- **9 Atividades** (3 por eixo)
- **5 Projetos** incluindo:
  - Projeto de construção de Instalações para Farmácia (37% execução)
  - Projeto de Capacitação de gestão de negócios para Mulheres (21% execução)
- **Marcos do projeto** (início, fases intermediárias, fim)
- **Cronogramas de repasse** com parcelas e status
- **Cadastros auxiliares**: Beneficiários, Financeiras, Executores, etc.

## 🎯 Funcionalidades por Tela

### Home
- ✅ 3 cards de ação rápida no topo
- ✅ Seção por eixo com cards de atividades
- ✅ Gráfico de pizza por eixo
- ✅ Gráfico de barras por eixo
- ✅ Percentual de execução agregado

### Acompanhar Atividade
- ✅ Lista de todas as atividades
- ✅ Filtro por atividade específica
- ✅ Tabela de projetos relacionados
- ✅ Percentual de execução por projeto
- ✅ Botão "Detalhe" para cada projeto
- ✅ Gráfico de progresso da atividade

### Acompanhar Projeto
- ✅ **Aba Dados do Projeto**: Informações gerais, módulos executor e financeiro
- ✅ **Aba Financeiro**: KPIs financeiros, gráficos, resumo de parcelas
- ✅ **Aba Cronograma de Repasse**: Tabela detalhada de parcelas com status
- ✅ **Aba Execução**: Progresso por fase, marcos concluídos
- ✅ **Aba Cronograma Físico**: Lista de marcos com gestão completa (adicionar, marcar, excluir)
- ✅ KPIs no topo: Execução, Financeiro, Marcos, Responsável

### Novo Projeto
- ✅ Formulário completo com validação
- ✅ Campos: Nome, Atividade, Descrição, Valor, Datas, Responsável
- ✅ Validação de campos obrigatórios
- ✅ Validação de datas (término após início)
- ✅ Redirecionamento automático após criação

### Cadastros
- ✅ Hub visual com 7 tipos de cadastro
- ✅ CRUD completo para todas as entidades
- ✅ Formulários dinâmicos por tipo de entidade
- ✅ Edição inline na tabela
- ✅ Confirmação antes de excluir
- ✅ Paginação automática nas tabelas

## 🎨 Design e UX

- ✅ Botões azuis para ações principais
- ✅ Cards arredondados com sombra leve
- ✅ Layout responsivo (1-3 colunas)
- ✅ Cabeçalho fixo com navegação
- ✅ Breadcrumbs em páginas internas
- ✅ Feedback visual (hover, focus, active)
- ✅ Cores semânticas (verde=pago, vermelho=atrasado, amarelo=pendente)
- ✅ Ícones intuitivos (lucide-react)

## 💾 Gerenciamento de Estado

O projeto utiliza **Zustand** para gerenciamento de estado global:

- Estado armazenado **em memória** (sem backend)
- Funções CRUD para todas as entidades
- Cálculos automáticos de percentuais
- Relacionamentos entre entidades (Eixo → Atividade → Projeto → Marcos)

## 🔄 Rotas do Sistema

| Rota | Descrição |
|------|-----------|
| `/` | Tela Inicial (Home) |
| `/atividades` | Lista de todas as atividades |
| `/atividades?id={id}` | Detalhes de uma atividade específica |
| `/projetos/[id]` | Detalhes completos do projeto |
| `/projetos/novo` | Formulário de novo projeto |
| `/cadastros` | Hub de cadastros |
| `/cadastros/[entidade]` | CRUD de entidade específica |

## 🚀 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linter

## 📝 Notas Importantes

1. **Dados em Memória**: Todos os dados são armazenados em memória. Recarregar a página restaura os dados iniciais.

2. **Sem Backend**: Este é um protótipo front-end. Para persistência real, integre com uma API.

3. **Validações**: Formulários possuem validações básicas client-side.

4. **Responsividade**: O layout se adapta a diferentes tamanhos de tela (mobile, tablet, desktop).

5. **Navegação**: Todas as rotas são funcionais e navegáveis via botões, links e breadcrumbs.

## 🎓 Casos de Uso

1. **Visualizar panorama geral**: Acesse a Home para ver todos os eixos e atividades
2. **Criar novo projeto**: Use o botão "Novo Projeto" no cabeçalho ou na Home
3. **Acompanhar execução**: Clique em qualquer atividade para ver seus projetos
4. **Gerenciar marcos**: Entre em um projeto, vá até "Cronograma Físico" e adicione/edite marcos
5. **Cadastrar entidades**: Acesse "Cadastros" e escolha a entidade desejada

## 🤝 Contribuindo

Este é um protótipo educacional. Para contribuir:

1. Faça fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é um protótipo para fins educacionais e de demonstração.

---

**Desenvolvido para o Projeto Castanheir@s** 🌳
