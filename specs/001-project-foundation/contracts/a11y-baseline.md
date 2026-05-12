# Contract: baseline de acessibilidade (fundação)

Alinhado à constituição e FR-006 da spec.

## MUST

- Todos os controlos interativos com **rótulo acessível** (`accessibilityLabel` ou equivalente Gluestack/RN quando aplicável).
- Ordem de foco linear previsível em ecrãs de exemplo; sem armadilhas de foco.
- Estados de **foco visíveis** em Web; em nativo, respeitar feedback de toque e hints.
- Não depender de **hover** na Web sem comportamento equivalente via teclado/foco.

## SHOULD

- Agrupar conteúdo relacionado com headings/regiões quando o ecrã tiver múltiplas secções.
- Contraste mínimo **WCAG AA** para texto primário em temas default do DS.

## Out of scope (esta feature)

- Auditoria completa WCAG nível AAA em todas as combinações de SO.
- Suporte a leitores de ecrã em fluxos de negócio ainda inexistentes.
