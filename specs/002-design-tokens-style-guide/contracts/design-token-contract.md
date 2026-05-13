# Contract: Design tokens (NativeWind + Tailwind + Gluestack)

## 1. Fonte de verdade

1. **Figma** (nós em `figma-source-map.md`) define valores e nomenclatura de design.  
2. **`tailwind.config.js`** é a fonte de verdade em **código** para NativeWind (`className`).  
3. **Gluestack** deve **espelhar** os mesmos valores onde `$tokens` forem usados, até migração completa para classes.

## 2. Nomenclatura Tailwind

- **Semântica de cor:** usar chaves em inglês estável e alinhadas ao produto, por exemplo: `background`, `foreground`, `muted`, `muted-foreground`, `card`, `card-foreground`, `primary`, `primary-foreground`, `secondary`, `destructive`, `border`, `input`, `ring`. A lista exata deve refletir o que o Figma nomear; renomear só com acordo design/dev.  
- **Tipografia:** `font-sans` = Inter (corpo); `font-display` = Bricolage Grotesque (títulos) — ajustar se o Figma inverter papéis.  
- **Tamanhos:** preferir nomes de estilo (`text-body`, `text-heading-lg`) via `fontSize` extend **em vez de** `text-[17px]` arbitrário em JSX.  
- **Spacing / radius:** usar **exatamente** as chaves derivadas do Figma (não introduzir `p-13` se o Figma não tiver 52px na escala, por exemplo).

## 3. Uso em código

- **Preferido:** `className="bg-card text-card-foreground px-4 py-3 rounded-md font-sans text-body"` (exemplo ilustrativo; nomes finais seguem o tema).  
- **Evitar:** cores literais `bg-[#1a1a1a]` ou espaçamentos mágicos `mt-[13px]` em código de produto.  
- **Exceção temporária:** um ficheiro de “token preview” ou Story futuro pode listar swatches com valores para QA.

## 4. Gluestack

- Props como `color="$textLight900"` devem **convergir** para a mesma cor que o token semântico equivalente no Tailwind, ou ser substituídas por `className` quando possível.  
- Novos componentes em `src/components` devem preferir **NativeWind + primitivos Gluestack** com classes semânticas.

## 5. Acessibilidade

- Combinações default de texto/fundo para **formulários monetários** e **mensagens de erro** devem cumprir o baseline em `specs/001-project-foundation/contracts/a11y-baseline.md`.  
- Estados de **foco** visível: usar token `ring` ou equivalente documentado, distinguível do estado normal.

## 6. Governança

- **Fonte de discussão:** `docs/style-guide.md` (secção de governança + checklist de revisão) é o texto operacional para produto/UX; este contrato resume as mesmas regras para engenharia.
- **Novo token:** atualizar Figma **e** `specs/002-design-tokens-style-guide/exports/*.md` **e** `tailwind.config.js` **e** este contrato (ou tabela em `quickstart.md`) na mesma entrega sempre que possível.
- **Proposta:** descrever papel semântico, alternativas reutilizadas descartadas e impacto em ecrãs existentes antes de merge.
- **Deprecação:** manter o nome antigo como alias **pelo menos uma sprint ou versão de app** (o que for mais curto no calendário do time), listado no changelog da PR e, quando aplicável, uma linha em `docs/style-guide.md` até remoção.
- **Versão:** mudanças visíveis a tokens semânticos devem incrementar a versão no topo de `docs/style-guide.md` ou referenciar release notes acordadas pelo time.
