# Research: Design tokens + Style Guide (NativeWind / Expo)

**Date**: 2026-05-12  
**Sources:** [NativeWind Theme](https://www.nativewind.dev/docs/customization/theme), Tailwind CSS v3 theme docs, stack do repo (`package.json`, `tailwind.config.js`, `metro.config.js`), Figma (URLs em `contracts/figma-source-map.md`).

## 1. Fonte única em código (NativeWind + Tailwind 3)

**Decision:** Definir tokens em **`tailwind.config.js`** (`theme.extend`) como fonte de verdade para `className`, alinhado ao preset `nativewind/preset` já usado.

**Rationale:** A documentação NativeWind v4 indica que o tema segue o mesmo modelo que Tailwind CSS; o projeto já usa Tailwind 3.4 + NativeWind 4.2 + `withNativeWind` com `global.css` — evitar um segundo sistema arbitrário.

**Alternatives considered:** Só Gluestack `$tokens` sem Tailwind extend (rejeitado: pedido explícito de melhores práticas NativeWind e utilitários); valores hardcoded em componentes (rejeitado: spec e produto).

## 2. Helpers RN no tema

**Decision:** Usar `nativewind/theme` (`platformSelect`, `hairlineWidth`, `fontScale` / `fontScaleSelect`, etc.) **apenas** quando houver necessidade comprovada (cabelo de linha, diferenças iOS/Android documentadas no Figma).

**Rationale:** Documentação oficial expõe estes helpers para casos dinâmicos; uso indiscriminado aumenta complexidade.

**Alternatives considered:** Ignorar helpers — válido na primeira iteração se o Figma for agnóstico de plataforma.

## 3. Variáveis CSS e dark mode

**Decision:** Fase inicial foca **tema único** documentado no Figma; se o Figma incluir dark mode, mapear para `darkMode: 'class'` ou media conforme decisão conjunta design/dev. Opcionalmente espelhar variáveis em `global.css` **só** se o time validar padrão único com NativeWind no Web.

**Rationale:** A spec (002) admite um tema primeiro; evitar especulação sem frames.

**Alternatives considered:** `prefers-color-scheme` automático sem frames — rejeitado até haver paridade Figma.

## 4. Tipografia (Inter + Bricolage Grotesque)

**Decision:** Carregar fontes com **`expo-font`** no arranque da app (ex.: `_layout.tsx` ou provider dedicado), com fallback do sistema até `loadAsync` concluir; mapear `fontFamily` no Tailwind para `Inter` e `Bricolage Grotesque` conforme nomes registados no `expo-font`.

**Rationale:** `<link>` Google Fonts aplica-se ao Web; em iOS/Android o bundle via Expo é o caminho suportado e previsível.

**Alternatives considered:** `@expo-google-fonts/*` — boa opção se existir pacote estável para as famílias exatas; avaliar na implementação.

## 5. Gluestack UI e coexistência

**Decision:** Manter `GluestackUIProvider` com `@gluestack-ui/config` **estendido** ou **sobreposto** com valores idênticos aos do Tailwind para tokens usados por componentes existentes (`AppText` com `$textLight900`, etc.).

**Rationale:** Fundação (001) escolheu Gluestack + NativeWind com “uma única fonte de tokens”; hoje há divergência potencial — esta feature fecha o gap sem big-bang rewrite.

**Alternatives considered:** Remover Gluestack — fora de escopo e contradiz a fundação.

## 6. Figma como autoridade de valor

**Decision:** Nenhum hex/rem/radius é inventado no código sem correspondência no Figma (nós listados em `figma-source-map.md`). Sombras/elevação: se não existir secção explícita no Figma, **parar e perguntar ao design** antes de definir níveis.

**Rationale:** Requisito explícito do utilizador neste plano.

## 7. Estrutura de ficheiros sugerida (implementação futura)

**Decision:** Concentrar definições de tema em:

- `tailwind.config.js` (extend completo)
- Opcional: `src/lib/design-tokens.ts` ou `src/theme/tailwind-theme-extend.ts` **só** se o ficheiro JS ficar ilegível — preferir um único `tailwind.config.js` até ~200–300 linhas.

**Rationale:** Menos indirection para tooling Metro/Jest.

## 8. Testes

**Decision:** Smoke tests opcionais: componente “swatch” ou teste que verifica que classes chave existem (onde viável); prioridade em **lint** de proibição de literais via ESLint (fase posterior, fora deste research se não existir plugin acordado).

**Rationale:** Tokens são principalmente regressão visual e revisão de código.
