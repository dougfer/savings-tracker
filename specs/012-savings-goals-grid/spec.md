# Feature Specification: Savings Goals Grid

**Feature Branch**: `012-savings-goals-grid`  
**Created**: 2026-06-13  
**Status**: Draft  
**Input**: User description: "A tela de listagem de objetivos financeiros deve apresentar ao usuário uma visão consolidada de todos os seus objetivos cadastrados, permitindo acompanhar rapidamente o progresso de cada um deles através de informações resumidas exibidas em formato de grid."

Constituição do projeto (produto, UX, UI, conteúdo, mobile-first, a11y, performance, técnico): `.specify/memory/constitution.md`. Requisitos e critérios de sucesso DEVEM permanecer testáveis e alinhados a esses princípios.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visualizar objetivos financeiros em grid (Priority: P1)

O usuário acessa a tela de objetivos e visualiza todos os seus objetivos financeiros organizados em um grid responsivo. Cada objetivo é representado por um card contendo nome, percentual de progresso com barra visual, valor acumulado, valor alvo e data de vencimento. A quantidade de colunas se adapta automaticamente ao tamanho da tela — múltiplas colunas em desktop, colunas reduzidas em tablet e coluna única em mobile. O usuário escaneia rapidamente o grid e identifica o status de cada meta sem precisar navegar entre telas.

**Why this priority**: É a entrega central da feature — sem a visualização do grid, o usuário não consegue acompanhar seus objetivos de forma consolidada. O grid é o ponto de entrada para todo o acompanhamento financeiro e o principal mecanismo de visibilidade do progresso das metas.

**Independent Test**: Pode ser testado renderizando a página com dados mock de múltiplos objetivos e verificando que o grid exibe todos os cards corretamente, com informações completas (nome, percentual, valores, data), e que o layout se adapta a diferentes larguras de viewport. Entrega valor mesmo sem estado vazio ou navegação.

**Acceptance Scenarios**:

1. **Given** que o usuário possui 6 objetivos cadastrados, **When** acessar a tela de objetivos em desktop (1024px+), **Then** o grid exibe todos os 6 cards em múltiplas colunas, cada card contendo nome, barra de progresso, percentual, valor atual, valor alvo e data de vencimento.
2. **Given** que o usuário possui 3 objetivos cadastrados, **When** acessar a tela em tablet (768px), **Then** o grid ajusta automaticamente para menos colunas mantendo todos os cards visíveis e legíveis.
3. **Given** que o usuário possui objetivos cadastrados, **When** acessar a tela em mobile (375px), **Then** o grid exibe os cards em coluna única ocupando a largura total da tela.
4. **Given** um objetivo com progresso de 35% (R$ 3.500 de R$ 10.000), **When** o card é exibido no grid, **Then** o percentual "35%" aparece, a barra de progresso preenche 35% da largura e o valor "R$ 3.500 de R$ 10.000" é exibido.
5. **Given** um objetivo com progresso de 100% (valor acumulado igual ou superior ao alvo), **When** o card é exibido no grid, **Then** o progresso é exibido como 100% sem ultrapassar o limite.
6. **Given** um objetivo com data de vencimento 15/12/2026, **When** o card é exibido, **Then** a data é apresentada no formato "Vence em 15/12/2026".

---

### User Story 2 - Visualizar estado vazio (Priority: P2)

O usuário que ainda não possui objetivos cadastrados acessa a tela e encontra uma mensagem clara informando a ausência de metas, acompanhada de orientação sobre como começar. O estado vazio evita que o usuário confunda a ausência de dados com um erro de carregamento.

**Why this priority**: O estado vazio é essencial para a primeira experiência do usuário — sem ele, uma tela em branco gera confusão e transmite a impressão de falha. No entanto, o grid com dados é a funcionalidade principal e entrega mais valor imediato.

**Independent Test**: Pode ser testado renderizando a página com uma lista vazia de objetivos e verificando que a mensagem principal e a mensagem complementar são exibidas conforme o texto definido. Entrega valor independentemente dos demais cenários.

**Acceptance Scenarios**:

1. **Given** que o usuário não possui objetivos cadastrados, **When** acessar a tela de objetivos, **Then** a mensagem "Você ainda não possui objetivos financeiros." é exibida como título do estado vazio.
2. **Given** que o usuário não possui objetivos cadastrados, **When** acessar a tela, **Then** a mensagem complementar "Crie seu primeiro objetivo para começar a acompanhar suas metas." é exibida abaixo do título.
3. **Given** o estado vazio sendo exibido, **When** o usuário visualiza a tela, **Then** o layout permanece centralizado e legível em qualquer tamanho de tela (mobile, tablet, desktop).

---

### User Story 3 - Navegar para detalhe do objetivo (Priority: P3)

O usuário visualiza o grid de objetivos e seleciona um card para acessar a visualização detalhada daquele objetivo. A interação de clique/toque no card conduz o usuário a uma tela onde poderá ver informações completas e realizar ações sobre a meta selecionada.

**Why this priority**: A navegação conecta o grid à visualização detalhada, completando o fluxo de exploração dos objetivos. É importante para a experiência completa, mas o grid já entrega valor como ferramenta de acompanhamento consolidado mesmo sem essa interação. Nesta fase, utiliza dados mockados como destino.

**Independent Test**: Pode ser testado renderizando o grid com dados mock e clicando em um card, verificando que ocorre a transição para a visualização detalhada do objetivo selecionado (com dados mockados). Entrega valor como demonstração do fluxo de navegação.

**Acceptance Scenarios**:

1. **Given** que o usuário visualiza o grid com múltiplos objetivos, **When** seleciona (clica/toca) um card específico, **Then** o sistema navega para a visualização detalhada correspondente àquele objetivo.
2. **Given** que o usuário visualiza o grid, **When** seleciona um card, **Then** o objetivo exibido na tela de detalhe corresponde ao objetivo selecionado (ID, nome, valores consistentes com o card).

---

### Edge Cases

- O que acontece quando a lista de objetivos contém apenas 1 item? O grid exibe o card único sem quebrar o layout — em mobile ocupa a largura total, em desktop respeita a largura de uma coluna do grid.
- Como o grid se comporta com muitos objetivos (ex.: 20+ itens)? O grid expande verticalmente com scroll, mantendo a organização em colunas e a performance de renderização.
- O que acontece quando o valor alvo de um objetivo é zero? O percentual é exibido como 0% e a barra de progresso permanece vazia, sem erros de divisão por zero.
- Como a interface responde quando todos os objetivos estão 100% concluídos? Todos os cards exibem o estado de concluído com o indicador visual apropriado, sem distinção inadequada entre eles.
- O que acontece se a data de vencimento já passou (data no passado)? A data é exibida normalmente no formato definido; não há tratamento visual diferenciado para datas vencidas nesta fase.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE exibir uma coleção de objetivos financeiros cadastrados pelo usuário.
- **FR-002**: O sistema DEVE apresentar os objetivos em formato de grid responsivo, com quantidade de colunas adaptada ao tamanho da tela (múltiplas colunas em desktop, colunas reduzidas em tablet, coluna única em mobile).
- **FR-003**: Cada card do grid DEVE exibir: nome do objetivo, percentual de progresso com barra visual, valor acumulado atual, valor total da meta e data de vencimento.
- **FR-004**: O percentual de progresso DEVE representar a razão `valorAtual / valorObjetivo`, limitado ao valor máximo de 100%.
- **FR-005**: O sistema DEVE exibir um estado vazio com título e mensagem complementar quando o usuário não possuir objetivos cadastrados.
- **FR-006**: O sistema DEVE permitir a seleção de um card para navegar à visualização detalhada do objetivo correspondente, utilizando dados mockados como destino.
- **FR-007**: O sistema DEVE exibir um título de seção identificando a tela de objetivos.
- **FR-008**: O sistema DEVE utilizar exclusivamente dados mockados como fonte de dados nesta fase do projeto.
- **FR-009**: O sistema DEVE estruturar a listagem de forma a suportar futura integração com APIs sem alteração estrutural dos componentes (separação entre camada de dados e apresentação).

### Key Entities

- **SavingsGoal (Objetivo Financeiro)**: Representa uma meta financeira do usuário exibida no grid. Atributos: identificador único (`id`), nome (`name`), valor acumulado atual (`currentAmount`), valor alvo (`targetAmount`), percentual de progresso (`progressPercentage`), data de vencimento (`dueDate`). O percentual é um valor derivado da razão entre `currentAmount` e `targetAmount`, limitado a 100%.
- **Goal Card**: Componente de apresentação que renderiza as informações de um SavingsGoal. Já especificado na feature `011-goal-card` e consumido como dependência por esta feature.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue visualizar todos os seus objetivos financeiros em uma única tela, identificando nome, progresso e valores de cada meta em até 5 segundos de observação do grid.
- **SC-002**: O grid adapta-se corretamente a todos os breakpoints definidos (mobile 320px, tablet 768px, desktop 1024px+) sem quebra de layout, perda de conteúdo ou necessidade de scroll horizontal.
- **SC-003**: O estado vazio é exibido com as mensagens corretas sempre que a lista de objetivos estiver vazia, sem falsos positivos (exibir grid vazio sem mensagem) ou falsos negativos (exibir estado vazio com dados disponíveis).
- **SC-004**: A navegação por seleção de card conduz o usuário à visualização detalhada do objetivo correto em 100% dos casos.
- **SC-005**: 100% dos casos de borda identificados (lista unitária, muitos objetivos, valor alvo zero, data vencida) são tratados sem quebra visual ou estado inconsistente.
- **SC-006**: A tela carrega e exibe o grid com dados mockados em até 2 segundos em condições normais de uso.

## Assumptions

- O componente Goal Card (card individual) já está especificado na feature `011-goal-card` e será consumido como dependência por esta feature. Esta especificação trata exclusivamente da página/grid que organiza e exibe múltiplos cards.
- Os dados são fornecidos via mock na camada de dados da feature, permitindo substituição futura por chamadas de API sem alterar os componentes de apresentação.
- O título da seção e a estrutura da página seguem o padrão de layout estabelecido na feature `009-area-logada` (dashboard com header e área de conteúdo).
- A formatação de moeda segue o padrão brasileiro (R$ 1.000,00) conforme definido nas features anteriores.
- A formatação de datas segue o padrão brasileiro (DD/MM/AAAA).
- O design system e tokens visuais estabelecidos em `002-design-tokens-style-guide` serão utilizados para todos os estilos, cores e espaçamentos.
- O layout mobile-first segue os princípios definidos na constituição do projeto.
- A funcionalidade de criação de novos objetivos está fora do escopo desta feature e será tratada em especificação separada.
- A feature não inclui filtros, ordenação ou busca — apenas a exibição em grid de todos os objetivos.
