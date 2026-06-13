# Feature Specification: Goal Card

**Feature Branch**: `011-goal-card`  
**Created**: 2026-06-11  
**Status**: Draft  
**Input**: User description: "Implementação do componente Goal Card, responsável por apresentar de forma visual e intuitiva o progresso de um objetivo financeiro cadastrado pelo usuário. O componente deverá exibir informações essenciais do objetivo, como nome, valor acumulado, valor alvo e percentual de conclusão, fornecendo feedback claro sobre a evolução da meta e incentivando o acompanhamento contínuo do progresso."

Constituição do projeto (produto, UX, UI, conteúdo, mobile-first, a11y, performance, técnico): `.specify/memory/constitution.md`. Requisitos e critérios de sucesso DEVEM permanecer testáveis e alinhados a esses princípios.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visualizar progresso de um objetivo ativo (Priority: P1)

O usuário acessa a lista de objetivos e visualiza um card para cada objetivo financeiro ativo. Cada card exibe o nome do objetivo, o valor já acumulado, o valor alvo total e uma barra de progresso com o percentual de conclusão. As informações são apresentadas de forma hierárquica: o percentual em destaque, seguido do valor acumulado sobre o valor alvo, e uma barra visual que reforça o progresso. O usuário compreende em segundos o quanto já economizou e o quanto ainda falta para atingir a meta.

**Why this priority**: É a entrega central da feature — sem a exibição básica do progresso, o Goal Card não cumpre seu propósito. O feedback visual imediato sobre a evolução da meta é o principal incentivo para o usuário continuar poupando.

**Independent Test**: Pode ser testado renderizando um Goal Card com dados mock de um objetivo ativo (parcialmente concluído) e verificando que nome, valores, percentual e barra de progresso são exibidos corretamente. Entrega valor mesmo sem os demais estados.

**Acceptance Scenarios**:

1. **Given** um objetivo com 30% de progresso (R$ 3.000 acumulados de R$ 10.000), **When** o card é renderizado, **Then** o nome do objetivo é exibido, o percentual "30%" aparece em destaque, o valor "R$ 3.000 / R$ 10.000" é exibido, e a barra de progresso preenche 30% da largura total.
2. **Given** um objetivo com 0% de progresso (R$ 0 acumulados), **When** o card é renderizado, **Then** o percentual "0%" é exibido, a barra de progresso aparece vazia (0% de preenchimento), e o valor alvo é exibido corretamente.
3. **Given** um objetivo com 99% de progresso, **When** o card é renderizado, **Then** o percentual "99%" é exibido e a barra de progresso preenche 99% da largura sem ultrapassar o limite do contêiner.
4. **Given** um objetivo com nome longo (ex.: "Viagem para o Japão em 2027 com a família"), **When** o card é renderizado, **Then** o nome é exibido sem transbordar o card (truncado com reticências se necessário).

---

### User Story 2 - Identificar objetivo concluído (Priority: P2)

O usuário visualiza objetivos que já foram 100% concluídos. O card do objetivo concluído se diferencia visualmente do card de objetivos ativos através de um indicador de conclusão (tag "Concluído") e uma diferenciação de cor ou estilo, permitindo que o usuário reconheça imediatamente quais metas foram atingidas.

**Why this priority**: A distinção visual entre metas ativas e concluídas é essencial para o reforço positivo — o usuário precisa sentir progresso e realização. Sem essa diferenciação, metas concluídas e ativas se confundem, reduzindo a motivação.

**Independent Test**: Pode ser testado renderizando um Goal Card com dados mock de um objetivo 100% concluído e verificando que o indicador visual de conclusão é exibido e que o estilo difere de um card de objetivo ativo.

**Acceptance Scenarios**:

1. **Given** um objetivo com 100% de progresso (valor acumulado igual ao valor alvo), **When** o card é renderizado, **Then** a tag "Concluído" (ou "Completed") é exibida, a barra de progresso está 100% preenchida, e o estilo visual do card difere do estilo de objetivos ativos (ex.: cor de fundo ou borda diferente).
2. **Given** um objetivo com 100% de progresso, **When** o card é renderizado, **Then** o card não exibe elementos interativos que sugiram ações pendentes (ex.: botão "Adicionar depósito" fica oculto ou desabilitado).

---

### User Story 3 - Card com data prevista de conclusão (Priority: P3)

O usuário visualiza no card do objetivo a data prevista para conclusão (prazo definido ao criar o objetivo). A data é exibida em formato legível e contextual, ajudando o usuário a entender se está no ritmo planejado para atingir a meta dentro do prazo.

**Why this priority**: A data de conclusão adiciona contexto temporal ao progresso e incentiva disciplina, mas o card já cumpre seu propósito principal sem essa informação. Pode ser implementada como aprimoramento após o núcleo do componente estar funcional.

**Independent Test**: Pode ser testado renderizando um Goal Card com dados mock que incluam uma data prevista e verificando que a data aparece formatada corretamente no card.

**Acceptance Scenarios**:

1. **Given** um objetivo com data prevista "2026-12-31", **When** o card é renderizado, **Then** a data é exibida no formato "31 Dez 2026" ou similar legível.
2. **Given** um objetivo sem data prevista definida, **When** o card é renderizado, **Then** a informação de data não é exibida (campo opcional).

---

### Edge Cases

- O que acontece quando o valor alvo é zero ou negativo? O sistema trata valores inválidos exibindo o percentual como 0% e a barra vazia, sem quebrar o layout.
- Como o card se comporta com valores monetários muito altos (ex.: R$ 9.999.999,99)? Os valores são formatados com separadores de milhar e sem quebra de layout.
- O que ocorre quando o valor acumulado excede o valor alvo (ex.: depósito extra fez ultrapassar)? O percentual é limitado a 100% e a barra não ultrapassa 100% da largura.
- Como o card responde a diferentes tamanhos de tela (mobile vs tablet vs desktop)? O card adapta-se mantendo legibilidade — no mobile ocupa largura total, em telas maiores pode ser exibido em grid de 2 ou 3 colunas.
- O que acontece se o nome do objetivo estiver vazio? O card exibe um nome padrão como "Objetivo sem nome" para evitar estado visual quebrado.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O componente DEVE exibir o nome do objetivo financeiro de forma legível e hierarquicamente adequada.
- **FR-002**: O componente DEVE exibir o valor acumulado atual formatado como moeda (R$).
- **FR-003**: O componente DEVE exibir o valor alvo total formatado como moeda (R$).
- **FR-004**: O componente DEVE calcular e exibir o percentual de conclusão com base na razão entre valor acumulado e valor alvo.
- **FR-005**: O componente DEVE renderizar uma barra de progresso visual cujo preenchimento seja proporcional ao percentual de conclusão (0% a 100%).
- **FR-006**: O componente DEVE diferenciar visualmente objetivos concluídos (100%) de objetivos ativos (abaixo de 100%), incluindo um indicador textual de conclusão.
- **FR-007**: O componente DEVE exibir a data prevista de conclusão quando disponível, em formato legível.
- **FR-008**: O componente DEVE limitar o percentual de progresso ao intervalo 0%–100%, mesmo quando o valor acumulado excede o valor alvo.
- **FR-009**: O componente DEVE truncar nomes de objetivos que excedam o espaço disponível, utilizando reticências.
- **FR-010**: O componente DEVE manter legibilidade e proporções visuais adequadas em todos os breakpoints (mobile, tablet, desktop), conforme princípio mobile-first da constituição do projeto.
- **FR-011**: O componente DEVE ser acessível a leitores de tela, informando nome do objetivo, percentual de progresso e status (ativo/concluído) via semântica adequada.

### Key Entities

- **Goal (Objetivo)**: Representa uma meta financeira cadastrada pelo usuário. Atributos essenciais: identificador único, nome, valor acumulado atual, valor alvo, data de criação, data prevista de conclusão (opcional), status (ativo/concluído). O percentual de conclusão é derivado da razão entre valor acumulado e valor alvo.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue identificar o progresso de um objetivo (nome, percentual, valores) em até 3 segundos de observação do card.
- **SC-002**: O componente renderiza corretamente em todos os breakpoints suportados (mobile 320px, tablet 768px, desktop 1024px+) sem quebra de layout ou perda de legibilidade.
- **SC-003**: A barra de progresso reflete com precisão o percentual calculado (margem de erro visual imperceptível a olho nu).
- **SC-004**: Leitores de tela conseguem anunciar corretamente o nome do objetivo, o percentual de progresso e o status (ativo/concluído) para todos os estados do componente.
- **SC-005**: 100% dos casos de borda definidos (valores zerados, excesso de valor, nomes longos, data ausente) são tratados sem quebra visual ou estado inconsistente.

## Assumptions

- Os dados do objetivo serão fornecidos via props ao componente; o componente é puramente apresentacional (não busca dados de API nem gerencia estado global).
- Na fase atual do projeto, os dados virão de mocks (seguindo o padrão estabelecido em `010-dashboard-resumo-conta`), sem integração com backend.
- A formatação de moeda segue o padrão brasileiro (R$ 1.000,00) conforme localidade do público-alvo.
- O componente segue o design system estabelecido em `002-design-tokens-style-guide` e utiliza tokens de cor, tipografia e espaçamento existentes — sem valores hardcoded.
- A lista/página que exibe múltiplos Goal Cards (grid de objetivos) está fora do escopo desta especificação e será tratada em feature separada.
- O tipo `Goal` será definido como parte desta feature, estendendo ou complementando os tipos já existentes em `src/features/overview/types/`.
- O componente será organizado seguindo a estrutura Feature First do projeto, dentro de um diretório dedicado a `goal-card` ou `goals`.
