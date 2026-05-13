# Style Guide — Savings Tracker

**Versão:** 1.0.0 · **Data:** 2026-05-12 · **Branch de referência:** `002-design-tokens-style-guide`

Documento único para **cores semânticas**, **tipografia**, **espaçamento**, **raios**, **elevação/sombras** (estado), **toque e densidade** e **governança** de tokens. Os valores em código vivem em `tailwind.config.js`; a rastreabilidade Figma e notas de auditoria estão em `specs/002-design-tokens-style-guide/exports/` e `contracts/figma-source-map.md`.

---

## 1. Papéis semânticos de cor (FR-002)

Cada papel combina **intenção** + **chave Tailwind** (`bg-*`, `text-*`). Não usar hex literais em ecrãs de produto.

| Papel | Intenção | Chaves úteis |
|-------|----------|--------------|
| Fundo de ecrã | Base neutra, leitura longa | `bg-background`, `text-foreground` |
| Superfície de cartão | Agrupar informação relacionada | `bg-card`, `text-card-foreground` |
| Superfície secundária | Blocos menos importantes | `bg-muted`, `text-muted-foreground` |
| Borda / divisão | Separar sem gritar | `border-border` |
| Ação primária | CTA principal, progresso | `bg-primary`, `text-primary-foreground` |
| Ação secundária | Alternativas neutras | `bg-secondary`, `text-secondary-foreground` |
| Erro destrutivo | Validação falhou, ação irreversível | `bg-destructive`, `text-destructive-foreground` |
| Erro suave | Alerta inline sem ocupar paleta extra no Figma | `bg-muted` + `text-destructive` + `border-destructive` (ou opacidade acordada) |
| Sucesso / aviso | Feedback não bloqueante | `text-success` / `text-warning` sobre `bg-card` ou `bg-muted` conforme contraste |

**Aceitável:** `className="bg-card text-card-foreground border border-border"`.

**Evitar:** `className="bg-[#fcfcfc]"` ou cores de marca em campos de montante sem contraste validado.

**Tema único:** o primeiro envio assume **modo claro** documentado no Figma; modo escuro será extensão na governança quando existir paridade de frames.

---

## 2. Hierarquia tipográfica (FR-003)

| Estilo | Classe NativeWind | Quando usar |
|--------|---------------------|-------------|
| Display (desktop) | `text-display-lg` | 64px — Bricolage SemiBold (Preset 1) |
| Display (mobile) | `text-display-md` | 44px — Bricolage SemiBold |
| Título de ecrã | `text-heading-lg` | 32px — Inter Bold (Preset 2) |
| Secção / destaque | `text-heading-md` | 20px — Inter SemiBold (Presets 3–4) |
| Corpo | `text-body` (default `AppText`) | 16px — Inter Medium, Preset 5 |
| Corpo semi-negrito | `text-body-semibold` | 16px — Inter SemiBold, Preset 5 (SemiBold) |
| Secundário | `text-body-sm` + `text-muted-foreground` | 14px — Inter SemiBold, Preset 6 |
| Legenda | `text-caption` | 11px — Inter SemiBold, Preset 7 |
| Valor monetário | `text-amount` | 20px — Inter SemiBold (alinhado a Preset 3–4) |

**Famílias:** Inter (corpo / dados) e Bricolage Grotesque (títulos). No React Native cada peso corresponde a uma família registada (`Inter_600SemiBold`, etc.) — preferir tokens `text-*` que já embutem `fontFamily`.

**Componente partilhado:** `AppText` aplica `font-sans text-foreground text-body`; sobrescrever com `className` ou `color="$…"` quando necessário.

---

## 3. Escala de espaçamento (FR-004)

Consultar tabela completa em `specs/002-design-tokens-style-guide/exports/spacing-from-figma.md`.

| Situação | Convenção |
|----------|-----------|
| Padding interno de botão / input | `p-3`–`p-4` |
| Entre ícone e rótulo | `gap-3` (12px) mínimo recomendado |
| Margem horizontal de ecrã | `px-4` |
| Entre secções | `gap-6` ou `mt-8` conforme densidade |

---

## 4. Border radius (FR-005)

| Categoria | Classe | Valor |
|-----------|--------|-------|
| Controlo / chip de spec (Figma tipografia) | `rounded-md` | 8px |
| Swatch de cor (Figma cores) | `rounded-lg` | 10px |
| Cantos médios (spacing 12px) | `rounded-xl` | 12px |
| Pill / avatar | `rounded-full` | pill |

> **Radius `271-3317`:** até haver extração MCP bem-sucedida, a matriz completa de raios do frame dedicado pode diferir; ver `exports/radius-from-figma.md`.

Detalhe: `specs/002-design-tokens-style-guide/exports/radius-from-figma.md`.

---

## 5. Elevação e sombras (FR-006) — pendente

Não existe ainda **frame dedicado** de sombras no Figma com valores exportáveis. Até lá:

- **Não** introduzir `shadow-*` utilitários arbitrários em código de produto.
- Usar variantes Gluestack existentes (`hardShadow`, `softShadow`) apenas onde já houver padrão de componente — alinhar valores numa iteração futura com design.
- Quando o frame existir: atualizar `exports/` + `theme.extend.boxShadow` + esta secção com **escada ordenada** (nível 0 = sem sombra, níveis superiores = modal, toast, FAB, etc.).

Estado também registado em `contracts/figma-source-map.md`.

---

## 6. Toque, densidade e dimensionamento (FR-007)

- **Área mínima de toque:** ~44×44 pt (iOS) / 48×48 dp (Material) — usar `p-3`/`min-h` com `p-4` em controlos críticos quando o alvo visual for menor que a área.
- **Grade implícita:** múltiplos de 4px (espelhados na escala de spacing).
- **Listas e formulários (poupança):** preferir `gap-3` entre linhas relacionadas; `gap-6` entre grupos; evitar mais de uma primária por viewport.

---

## 7. Como design e desenvolvimento falam da mesma cor (FR-008)

1. Usar o **nome semântico** da primeira coluna deste guia (ex.: “foreground”, “primary”), não só o hex.
2. Em código, esse nome corresponde à chave em `tailwind.config.js` → classe `text-foreground`, `bg-primary`, etc.
3. Em Figma, anotar o **estilo** ou variável que alimenta o papel; cruzar com `contracts/figma-source-map.md`.

---

## 8. Checklist de revisão design–dev

Usar em PRs de UI. Cada item deve ser verificável no guia ou nos contratos.

- [ ] Cores mapeadas para **papéis semânticos** (secção 1), sem hex solto.
- [ ] Tipografia escolhida da **tabela de estilos** (secção 2).
- [ ] Espaçamentos apenas da **escala** (secção 3 / export).
- [ ] Raios coerentes com a **categoria** (secção 4).
- [ ] **Sombras:** só se já houver nível documentado; caso contrário abrir follow-up com design.
- [ ] **Contraste:** combinações de texto/fundo em formulários monetários e erros verificáveis contra `specs/001-project-foundation/contracts/a11y-baseline.md` (AA).
- [ ] **Foco:** estado de foco distinguível (`ring` / equivalente), sem depender só de hover na Web.

---

## 9. Governança de tokens (FR-009)

### Novo token vs reutilizar

| Critério | Criar novo | Reutilizar |
|----------|------------|------------|
| Mesmo papel visual que token existente | Não | Sim — alinhar nome com design |
| Novo estado de produto sem par Figma | Parar — abrir decisão | — |
| Ajuste fino (< 4px ou < 2% cor) | Evitar “token por pixel” | Derivar de escala existente |

### Fluxo de proposta

1. Abrir frame ou variável no Figma + linha em `exports/*.md`.
2. Atualizar `tailwind.config.js` na mesma entrega.
3. Se tokens `$` Gluestack forem usados, alinhar `src/lib/gluestack/gluestack-ui.config.ts`.
4. Referenciar esta secção e o contrato em `contracts/design-token-contract.md` na PR.

### Depreciação

- Manter **alias** com o nome antigo pelo menos **uma sprint** (ou versão acordada), listado no changelog da PR.
- Marcar no guia “substitui `X` → `Y`” até remoção.

---

## 10. Exemplos NativeWind — cartão e lista (FR-002 / FR-004)

**Cartão**

```tsx
<View className="rounded-lg border border-border bg-card p-4">
  <Text className="text-heading-sm text-card-foreground">Meta de emergência</Text>
  <Text className="mt-2 text-body-sm text-muted-foreground">Atualizado há 2 dias</Text>
</View>
```

**Lista com ritmo consistente**

```tsx
<View className="gap-3 px-4 py-2">
  {items.map((item) => (
    <View
      key={item.id}
      className="flex-row items-center justify-between rounded-md border border-border bg-card px-3 py-3"
    >
      <Text className="text-body text-card-foreground">{item.label}</Text>
      <Text className="text-amount text-card-foreground">{item.amount}</Text>
    </View>
  ))}
</View>
```

(Substituir `View`/`Text` por primitivos Gluestack se o ecrã já depender deles — manter as mesmas classes.)

---

## Leitura adicional

- `specs/002-design-tokens-style-guide/contracts/design-token-contract.md`
- `specs/002-design-tokens-style-guide/quickstart.md`
- `specs/001-project-foundation/contracts/a11y-baseline.md`
