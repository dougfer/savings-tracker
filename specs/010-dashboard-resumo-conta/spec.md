# Feature Specification: Dashboard - Resumo da Conta

**Feature Branch**: `010-dashboard-resumo-conta`  
**Created**: 2026-06-07  
**Status**: Draft  
**Input**: User description: "Exibir no dashboard inicial um resumo consolidado da conta do usuário através de um layout em grid, apresentando informações financeiras e de progresso dos objetivos cadastrados."

Constituição do projeto (produto, UX, UI, conteúdo, mobile-first, a11y, performance, técnico): `.specify/memory/constitution.md`. Requisitos e critérios de sucesso DEVEM permanecer testáveis e alinhados a esses princípios.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visualizar resumo financeiro da conta (Priority: P1)

O usuário acessa o dashboard da Área Logada e visualiza imediatamente um resumo consolidado da sua conta: valor total guardado, quantidade de objetivos ativos, quantidade de objetivos concluídos e um gráfico de barras com a evolução mensal dos depósitos.

**Why this priority**: O resumo financeiro é o propósito central do dashboard — é a primeira tela que o usuário vê após autenticar-se e deve comunicar instantaneamente a situação da conta, conforme o Princípio de Clareza e Confiança da constituição do projeto.

**Independent Test**: Pode ser testado fornecendo dados de conta simulados e verificando que todos os cards de resumo e o gráfico são exibidos corretamente no dashboard.

**Acceptance Scenarios**:

1. **Given** que há dados de conta disponíveis (total guardado > 0, objetivos cadastrados), **When** o dashboard é carregado, **Then** o usuário vê o valor total guardado, o número de objetivos ativos, o número de objetivos concluídos e o gráfico de barras com valores por mês.
2. **Given** que há dados de conta disponíveis em um dispositivo desktop, **When** o dashboard é carregado, **Then** o gráfico de barras exibe os últimos 12 meses.
3. **Given** que há dados de conta disponíveis em um dispositivo tablet ou mobile, **When** o dashboard é carregado, **Then** o gráfico de barras exibe os últimos 6 meses.

---

### User Story 2 - Visualizar estado vazio do dashboard (Priority: P2)

O usuário acessa o dashboard mas ainda não possui dados registrados (sem metas cadastradas, sem depósitos realizados). O dashboard exibe uma representação visual indicando que não há dados a serem exibidos, mantendo a estrutura do grid intacta.

**Why this priority**: O estado vazio é uma transição natural para novos usuários e deve ser tratado com clareza, evitando uma tela em branco que transmite insegurança ou falha. Está alinhado ao Princípio de UX (estados vazios úteis).

**Independent Test**: Pode ser testado renderizando o dashboard sem dados e verificando que todos os cards exibem indicadores visuais de estado vazio (ex.: valor zero formatado, contagem zero, gráfico sem barras).

**Acceptance Scenarios**:

1. **Given** que não há dados de conta (sem metas, sem depósitos), **When** o dashboard é carregado, **Then** todos os cards de resumo exibem valores zerados ou indicadores visuais de ausência de dados, e o gráfico de barras não exibe barras.
2. **Given** que não há dados de conta, **When** o dashboard é carregado, **Then** a estrutura do grid de cards permanece visível e organizada, sem elementos quebrados ou ausentes.

---

### User Story 3 - Visualizar dashboard em diferentes tamanhos de tela (Priority: P3)

O usuário acessa o dashboard a partir de diferentes dispositivos (desktop, tablet, mobile) e o layout em grid se adapta adequadamente a cada tamanho de tela, reorganizando os cards de resumo e ajustando o período do gráfico conforme especificado.

**Why this priority**: A responsividade é mandatória pelo Princípio Mobile-First da constituição, mas é uma adaptação de apresentação do conteúdo definido em P1 e P2 — sem os dados, a adaptação não tem propósito.

**Independent Test**: Pode ser testado renderizando o dashboard em viewports de diferentes tamanhos e verificando que o grid se reorganiza conforme esperado e que o gráfico exibe o número correto de meses para cada breakpoint.

**Acceptance Scenarios**:

1. **Given** que o usuário está em um dispositivo desktop (largura >= 1024px), **When** o dashboard é carregado, **Then** os cards de resumo são dispostos em uma linha e o gráfico ocupa a largura completa abaixo.
2. **Given** que o usuário está em um dispositivo tablet (largura entre 768px e 1023px), **When** o dashboard é carregado, **Then** os cards de resumo são dispostos em duas colunas e o gráfico ocupa a largura completa abaixo.
3. **Given** que o usuário está em um dispositivo mobile (largura < 768px), **When** o dashboard é carregado, **Then** os cards de resumo são dispostos em uma coluna e o gráfico ocupa a largura completa abaixo.

---

### Edge Cases

- O que acontece quando o valor total guardado é um número muito grande (ex.: milhões)? O sistema deve formatar o valor de forma legível sem quebrar o layout do card.
- Como o dashboard se comporta quando há dezenas ou centenas de objetivos ativos? A contagem deve ser exibida corretamente, sem truncamento.
- Como o gráfico de barras se comporta quando todos os valores mensais são zero? Deve exibir barras com altura zero, mantendo os rótulos dos meses visíveis.
- O que acontece quando há valores mensais com grande discrepância (ex.: um mês com valor muito alto e os demais baixos)? O gráfico deve escalar adequadamente sem distorcer a visualização.
- Como o dashboard se comporta durante a transição entre breakpoints (ex.: redimensionamento da janela)? O grid deve se reorganizar sem flicker ou perda de estado visual.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE exibir um card com o valor total guardado pelo usuário (somatório de todos os depósitos realizados).
- **FR-002**: O sistema DEVE exibir um card com o número de objetivos ativos (metas em andamento, não concluídas).
- **FR-003**: O sistema DEVE exibir um card com o número de objetivos concluídos (metas atingidas).
- **FR-004**: O sistema DEVE exibir um gráfico de barras com os valores guardados por mês, onde cada barra representa o total depositado em um mês específico.
- **FR-005**: O gráfico de barras DEVE exibir os últimos 12 meses em dispositivos desktop (largura >= 1024px).
- **FR-006**: O gráfico de barras DEVE exibir os últimos 6 meses em dispositivos tablet (largura >= 768px e < 1024px) e mobile (largura < 768px).
- **FR-007**: O layout DEVE utilizar um sistema de grid para organizar os cards de resumo e o gráfico de barras.
- **FR-008**: O grid DEVE adaptar-se a três breakpoints: desktop (>= 1024px), tablet (768px a 1023px) e mobile (< 768px).
- **FR-009**: O sistema DEVE exibir uma representação visual de estado vazio quando não houver dados disponíveis (valores zerados nos cards, gráfico sem barras).
- **FR-010**: Os valores monetários DEVEM ser exibidos em formato de moeda legível (ex.: "R$ 1.500,00"), adequado ao locale do usuário.
- **FR-011**: A estrutura do componente DEVE permitir a adição futura de um estado de loading sem necessidade de reestruturação significativa.

### Key Entities

- **Resumo da Conta**: Agregação dos dados financeiros do usuário exibidos no dashboard. Composto por: total guardado (valor monetário), quantidade de objetivos ativos (número inteiro), quantidade de objetivos concluídos (número inteiro) e valores mensais (lista de pares mês/valor para o gráfico de barras).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue identificar seu total guardado e a quantidade de objetivos ativos e concluídos em até 5 segundos após acessar o dashboard.
- **SC-002**: O gráfico de barras exibe corretamente o número de meses correspondente ao dispositivo do usuário (12 meses em desktop, 6 meses em tablet/mobile).
- **SC-003**: O layout em grid adapta-se corretamente aos 3 breakpoints definidos sem perda de informação ou quebra visual.
- **SC-004**: O estado vazio é apresentado com todos os cards visíveis e valores zerados, sem elementos ausentes ou quebrados.
- **SC-005**: Usuários em dispositivos mobile conseguem visualizar e compreender todas as informações do dashboard sem necessidade de scroll horizontal.
- **SC-006**: O dashboard renderiza em até 2 segundos em condições normais de dispositivo.

## Assumptions

- Os dados exibidos (total guardado, objetivos, valores mensais) serão fornecidos ao componente via props ou contexto, sem acoplamento com fonte de dados específica.
- O locale padrão para formatação monetária será português brasileiro (pt-BR), consistente com o restante da aplicação.
- O gráfico de barras será implementado com componentes nativos do ecossistema React Native compatíveis com iOS, Android e Web (não serão utilizadas bibliotecas de gráficos externas sem validação prévia de compatibilidade cross-platform).
- O componente de dashboard residirá em `src/features/overview/` seguindo a arquitetura Feature First já estabelecida no projeto.
- Os tokens de design (cores, tipografia, espaçamento) do Design System do projeto são suficientes para construir os cards de resumo e o gráfico de barras.
- A estrutura para estado de loading será prevista (ex.: props condicionais, slots para skeleton), mas sua implementação visual não faz parte desta especificação.
- O período de meses exibido no gráfico é calculado a partir do mês atual para trás (ex.: se o mês atual é junho, exibir de julho do ano anterior até junho para desktop).
- A transição entre breakpoints (redimensionamento) é tratada de forma responsiva, sem necessidade de recarregamento da tela.
