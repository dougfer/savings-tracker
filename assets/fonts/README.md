# Fontes (002)

As famílias **Inter** e **Bricolage Grotesque** são carregadas via `@expo-google-fonts/inter` e `@expo-google-fonts/bricolage-grotesque` em `src/app/_layout.tsx` (mapa em `src/lib/fonts/app-fonts.ts`), para evitar duplicar ficheiros `.ttf` grandes no Git.

Se o produto exigir **bundles offline** sem dependências npm, copiar os `.ttf` necessários (ver `specs/002-design-tokens-style-guide/exports/typography-from-figma.md`) para esta pasta e trocar `useFonts` para `require('./Inter-400.ttf')` com os nomes registados alinhados ao `tailwind.config.js`.
