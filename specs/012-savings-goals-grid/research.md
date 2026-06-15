# Research: Savings Goals Grid

**Feature**: 012-savings-goals-grid  
**Date**: 2026-06-13

## Decision Log

### R1: Layout Strategy — Flexbox com colunas proporcionais

**Decision**: Usar Flexbox (`flex-row`) com proporções `flex-[2]` (≈66%) e `flex-1` (≈33%) para o grid desktop de duas colunas, com `max-w-[838px]` na coluna larga para evitar esticamento em ultrawide.

**Rationale**:
- O design (app.pen node `R5d4a6`) mostra um grid com duas colunas assimétricas: a coluna esquerda ocupa 838px (~2/3) e a direita ocupa o restante (~1/3) em viewport 1440px.
- CSS Grid não é suportado nativamente pelo React Native; `flexbox` é a abordagem padrão.
- A proporção `flex-[2]` + `flex-1` aproxima o split 2/3 e é responsiva por natureza (as colunas encolhem proporcionalmente em viewports menores).
- Em ultrawide (acima de 1600px), o layout root já limita a `max-w-[1600px]`, e a coluna larga tem `max-w-[838px]` para evitar cards excessivamente largos.

**Alternatives considered**:
- CSS Grid via web-only: rejeitado — o projeto é universal (mobile + web), precisa de solução cross-platform.
- Colunas de largura fixa (838px + fill): funcionaria no desktop mas não encolheria proporcionalmente em telas intermediárias.
- `Dimensions` API + cálculo manual: desnecessariamente complexo para este caso.

---

### R2: Localização — Extensão da feature `overview` existente

**Decision**: Adicionar os componentes do grid diretamente em `src/features/overview/components/`, estendendo a `dashboard-screen.tsx` existente.

**Rationale**:
- Esclarecimento do usuário: o grid de objetivos é parte da tela de dashboard, abaixo do `DashboardSummary`, não uma feature ou tela separada.
- O `GoalCard` já reside em `overview/components/goal-card/`. Centralizar o grid no mesmo módulo mantém coesão do domínio.
- Tipos `Goal`, `GoalSize` e mocks existentes são reutilizados diretamente, sem imports entre features.
- A `dashboard-screen.tsx` existente é estendida (não substituída) para compor `DashboardSummary` + goals grid.
- Nenhuma rota nova — o grid é parte da rota existente `(logged)/index.tsx`.

**Alternatives considered**:
- Feature separada `src/features/goals/`: rejeitado pelo usuário — o grid pertence ao dashboard.
- Tela separada com rota própria: rejeitado — o grid fica abaixo dos cards de resumo na mesma página.

---

### R3: Responsive Breakpoints

**Decision**: Usar classes responsivas do NativeWind: `lg:` para desktop (1024px+), `md:` para tablet (768px+), base/mobile como default.

**Rationale**:
- NativeWind replica o sistema de breakpoints do Tailwind CSS (`sm:`, `md:`, `lg:`, `xl:`).
- O design tem 3 variantes (desktop, tablet, mobile) que mapeiam para `lg:`, `md:`, e default respectivamente.
- Mobile-first: classes base são mobile, sobrescritas por `md:` e depois `lg:`.
- Consistente com o restante do projeto (dashboard-screen usa `md:px-6 lg:px-0`).

**Alternatives considered**:
- `useWindowDimensions` hook + renderização condicional: rejeitado — mais verboso e menos idiomático que classes Tailwind.
- `useResponsive` hook existente no projeto: complementar, usado para lógica condicional (ex: esconder preview cards no mobile).

---

### R4: Estado Vazio — Preview Cards vs Mensagem Simples

**Decision**: Implementar estado vazio com mensagem + preview cards no desktop/tablet (conforme design `K5sDC`/`CtBCr`), e apenas mensagem + CTA no mobile (conforme design `dsM96`).

**Rationale**:
- O design do app.pen mostra que no desktop/tablet o estado vazio inclui cards de exemplo com opacity reduzida, para que o usuário visualize como o grid ficará quando populado.
- No mobile, o espaço é limitado e cards de exemplo ocupariam muito espaço sem benefício suficiente.
- A mensagem principal e complementar estão sempre presentes em todos os breakpoints.
- O botão "Create your first goal" existe no layout mas sem ação por enquanto.

**Alternatives considered**:
- Estado vazio simples em todos os breakpoints: rejeitado — não segue o design e perde oportunidade de preview.
- Preview cards em todos os breakpoints: rejeitado — poluiria o mobile com informação redundante.

---

### R5: Mock Data Structure

**Decision**: Criar `mocks/goals-list-data.ts` com 8 objetivos representando estados variados: sem progresso, em andamento, próximo da conclusão, concluído, sem data de vencimento.

**Rationale**:
- Segue o padrão estabelecido em `overview/mocks/goal-data.ts` e `overview/mocks/dashboard-data.ts`.
- 8 objetivos são suficientes para demonstrar as duas linhas do grid desktop (4 cards por linha no padrão 2/3+1/3 alternado).
- Estados variados validam todos os cenários de renderização do `GoalCard`.
- A estrutura usa o tipo `Goal` existente, sem acoplamento com fonte de dados real.

**Alternatives considered**:
- Menos objetivos (4): insuficiente para demonstrar o layout de duas linhas com alternância.
- Dados randômicos: rejeitado — mock determinístico facilita testes e debugging.

---

### R6: Navegação — Expo Router `Link` com `goal.id`

**Decision**: Usar `Link` do Expo Router com rota `/goals/${goal.id}` envolvendo cada `GoalCard`. Nesta fase, a rota de detalhe renderiza dados mockados.

**Rationale**:
- O projeto usa Expo Router (file-based routing). A navegação declarativa com `<Link>` é o padrão.
- A rota de detalhe (`/goals/[id]`) não existe ainda — será criada como placeholder com dados mock.
- A estrutura com `goal.id` como parâmetro prepara para navegação real quando houver backend.
- Mantém a separação: o grid não precisa saber como o detalhe é implementado.

**Alternatives considered**:
- `router.push()` imperativo: aceitável como fallback, mas `Link` é mais idiomático e acessível.
- Navegação desabilitada: rejeitado — requisito funcional FR-06 exige seleção de card.

---

### R7: Botões Filters e Sort By — Placeholder sem ação

**Decision**: Renderizar os botões "Filters" e "Sort By" sem ação (sem `onPress` handler ou com handler vazio), conforme especificado pelo usuário.

**Rationale**:
- O usuário explicitamente declarou: "Os botões de Filters, SortBy e Create your first goal, por enquanto não terão nenhuma ação, mas devem existir no layout."
- Os botões fazem parte do design e devem estar presentes visualmente.
- Implementação futura de filtros/ordenação adicionará a lógica sem alterar a estrutura do componente header.

**Alternatives considered**:
- Ocultar botões: rejeitado — o design os inclui; remover agora exigiria re-adicionar depois.
- Implementar filtros mock: rejeitado — escopo futuro, adicionaria complexidade desnecessária agora.

---

## Resolved Clarifications

Nenhuma NEEDS CLARIFICATION no Technical Context. Todas as decisões foram baseadas no design (app.pen), no código existente e nas instruções do usuário.
