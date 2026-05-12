# Contract: layout de módulo `src/features/<feature>/`

## MUST

- Pasta `screens/` — componentes usados como alvo direto das rotas em `src/app`.
- Ficheiro `README.md` curto opcional explicando o propósito da feature (uma frase).

## SHOULD

- `components/` — apenas UI que **não** pertence naturalmente a `src/components/ui|layout|feedback`.
- `hooks/` — hooks cuja semântica é específica da feature.
- `services.ts` ou pasta `services/` — efeitos laterais da feature (quando existirem).

## MUST NOT

- Importar de outra pasta `src/features/<other>/` diretamente (usar `src/lib`, `src/services` ou eventos futuros).
- Colocar rotas Expo Router dentro de `features/` (rotas ficam só em `src/app`).

## Route wiring

Rotas em `src/app` SHOULD ter no máximo ~15 linhas: composição, providers locais, e `export default` delegando ao screen em `features/`.
