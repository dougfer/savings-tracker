# Especificação Técnica: Migração Gluestack v1 → v3

**Data**: 2026-05-17
**Status**: Pendente de execução
**Escopo**: Todos os componentes UI sob `src/components/ui/` e infraestrutura Gluestack

---

## 1. Contexto e Motivação

O projeto utiliza `@gluestack-ui/themed@^1.1.73` (v1 final, sem atualizações futuras) com temas stripados — o NativeWind já é a camada de estilo exclusiva. A migração para `@gluestack-ui/core@^3.0.20` + `@gluestack-ui/utils@^3.0.21` (v3) traz:

1. **State management via data-attributes** — os creators (`createInput`, `createButton`, etc.) propagam `data-focus`, `data-invalid`, `data-disabled`, `data-hover` automaticamente no Root, eliminando `useContext`/`useState` manuais para estados interativos.
2. **Styling declarativo** — usar `data-[focus=true]:border-orange-400` no className (funciona cross-platform: iOS, Android, Web).
3. **Alinhamento com shadcn pattern** — state via data attrs, não via JS prop drilling.
4. **Versão ativa** — v3 recebe manutenção; v1 está EOL.

---

## 2. Estado Atual do `package.json`

```json
{
  "@gluestack-ui/core": "^3.0.20",
  "@gluestack-ui/utils": "^3.0.21"
}
```

- `@gluestack-ui/themed` e `@gluestack-ui/config` já foram removidos.
- Pacotes v3 estão declarados, mas `npm install` precisa ser executado novamente para baixar as dependências.

**Ação necessária antes de qualquer implementação:**
```bash
npm install
```

---

## 3. Infraestrutura a Remover

| Arquivo | Motivo |
|---------|--------|
| `src/lib/gluestack/gluestack-ui.config.ts` | v3 não usa config global; styling é por className |
| `src/lib/gluestack/gluestack-css-interop.ts` | v3 faz `cssInterop` dentro de cada componente, não em bulk |
| `src/lib/providers/GluestackAppProvider.tsx` | v3 não precisa de `<GluestackUIProvider>` |

**Após remover:** Atualizar qualquer import/uso destes arquivos (ex: provider no layout raiz da app).

---

## 4. Arquitetura dos Componentes no v3

### 4.1 Componentes Interativos (usam creators)

Estes componentes se beneficiam dos creators porque ganham state management + data attributes + a11y automaticamente.

#### Padrão de implementação:

```tsx
// 1. Importar creator e utils
import { createInput } from '@gluestack-ui/core/input/creator';
import { withStyleContext, useStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { View, TextInput, Pressable } from 'react-native';
import { cssInterop } from 'nativewind';

// 2. Criar primitivo headless (define quais RN components usar)
const SCOPE = 'INPUT';
const UIInput = createInput({
  Root: withStyleContext(View, SCOPE),
  Icon: PrimitiveIcon,   // do @gluestack-ui/core/icon/creator
  Slot: Pressable,
  Input: TextInput,
});

// 3. Registrar cssInterop para os subcomponentes que usam className
cssInterop(UIInput, { className: { target: 'style' } });
cssInterop(UIInput.Input, { className: { target: 'style' } });
// etc.

// 4. Criar wrapper com estilos do projeto (compound component)
function AppInputGroup({ className, children, isInvalid, isDisabled }) {
  return (
    <UIInput
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      className={[
        'h-[54px] rounded-md bg-neutral-700 border border-neutral-500 px-4 items-center gap-3',
        'data-[focus=true]:border-orange-400',
        'data-[invalid=true]:border-destructive',
        'data-[disabled=true]:opacity-50',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </UIInput>
  );
}
```

**O que o creator faz internamente:**
- Quando `UIInput.Input` (TextInput) recebe foco → seta `data-focus="true"` no Root
- Quando `isInvalid={true}` → seta `data-invalid="true"` no Root
- Quando `isDisabled={true}` → seta `data-disabled="true"` no Root
- Quando hover (web) → seta `data-hover="true"` no Root

#### Componentes e seus creators:

| Componente | Creator | Import |
|------------|---------|--------|
| AppInput | `createInput` | `@gluestack-ui/core/input/creator` |
| AppButton | `createButton` | `@gluestack-ui/core/button/creator` |
| AppCheckbox | `createCheckbox` | `@gluestack-ui/core/checkbox/creator` |
| AppModal | `createModal` | `@gluestack-ui/core/modal/creator` |
| AppDropdownMenu | `createMenu` | `@gluestack-ui/core/menu/creator` |

#### Utilities necessárias:

| Utility | Import | Uso |
|---------|--------|-----|
| `withStyleContext` | `@gluestack-ui/utils/nativewind-utils` | Wrapper do Root View para propagar estado via data attrs |
| `useStyleContext` | `@gluestack-ui/utils/nativewind-utils` | Hook para filhos lerem variant/size do parent (substitui useContext manual) |
| `tva` | `@gluestack-ui/utils/nativewind-utils` | Tailwind Variant Authority (equivalente ao `cva` do shadcn) |
| `PrimitiveIcon` / `UIIcon` | `@gluestack-ui/core/icon/creator` | Wrapper de ícones SVG com cssInterop |
| `cssInterop` | `nativewind` | Registrar className em componentes third-party |

---

### 4.2 Componentes Simples (RN puro + NativeWind)

Estes não precisam de creators — são thin wrappers visuais:

#### AppText
```tsx
// ANTES: import { Text } from '@gluestack-ui/themed';
// DEPOIS:
import { Text } from 'react-native';

export function AppText({ className, ...props }) {
  const cls = ['font-sans text-foreground text-body', className].filter(Boolean).join(' ');
  return <Text {...props} className={cls} />;
}
```

#### AppScreen
```tsx
// ANTES: import { Box } from '@gluestack-ui/themed';
// DEPOIS:
import { View } from 'react-native';

export function AppScreen({ children }) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <View className="flex-1 bg-background px-4 pt-4">
        {children}
      </View>
    </SafeAreaView>
  );
}
```

#### AppAvatar
```tsx
// Pencil M8Qbp — Pressable + withStates + tva; 48×48; Default/Hover/Focus
// Subparts: AppAvatar.Image, AppAvatar.FallbackText (sem Badge, sem size presets)
// Context: imageVisible para alternar fallback ↔ foto
```

#### AppProgressBar
```tsx
// ANTES: import { Progress, ProgressFilledTrack } from '@gluestack-ui/themed';
// DEPOIS:
import { View } from 'react-native';
// Compound com View + View (track container + filled track)
// a11y via accessibilityRole="progressbar" + aria-valuenow
```

---

## 5. Especificação por Componente

### 5.1 AppInput (Prioridade 1)

**Creator:** `createInput`
**Primitivos RN:** `View` (Root), `TextInput` (Input), `Pressable` (Slot)

**Data attributes disponíveis no Root:**
- `data-focus="true"` — quando TextInput está focado
- `data-hover="true"` — quando hover (web)
- `data-invalid="true"` — quando `isInvalid={true}`
- `data-disabled="true"` — quando `isDisabled={true}`

**Estilos do Pencil (design file):**

| Elemento | Classes NativeWind |
|----------|-------------------|
| Container (Group) | `h-[54px] rounded-md bg-neutral-700 border border-neutral-500 px-4 items-center gap-3` |
| Container focus | `data-[focus=true]:border-orange-400` |
| Container invalid | `data-[invalid=true]:border-destructive` |
| Container disabled | `data-[disabled=true]:opacity-50` |
| Label | `font-sans-medium text-body text-neutral-0` |
| Field text | `font-sans-medium text-body text-neutral-0 flex-1 border-0 outline-none ring-0 shadow-none` |
| Placeholder color | `placeholderTextColor="#B7B7B7"` (prop RN) |
| Icon (slot) | `w-5 h-5 color="#B7B7B7"` |
| HelperText default | `font-sans-medium text-body-sm text-neutral-300` |
| HelperText error | `font-sans-medium text-body-sm text-destructive` |

**Compound API final:**
```tsx
<AppInput isInvalid={hasError}>
  <AppInput.Label>Label</AppInput.Label>
  <AppInput.Group>
    <AppInput.Slot name="currency-dollar" />
    <AppInput.Field placeholder="Placeholder" />
  </AppInput.Group>
  <AppInput.HelperText variant={hasError ? 'error' : 'default'}>
    Message
  </AppInput.HelperText>
</AppInput>
```

**Nota:** `AppInput.Slot` recebe `name: IconName` e renderiza o ícone de `@/assets/icons/` via ICON_MAP.

---

### 5.2 AppButton (Prioridade 1)

**Creator:** `createButton`
**Design:** Pencil `app.pen` node `UpBXR` — variantes `primary` | `secondary` | `tertiary` apenas (sem `outline` / `destructive` / `size`).
**Primitivos RN:** `Pressable` (Root), `Text` (Text), `ActivityIndicator` (Spinner)

**Data attributes no Root:**
- `data-active="true"` — pressionado
- `data-hover="true"` — hover (web)
- `data-focus-visible="true"` — foco teclado (sombra laranja + escura do Pencil)
- `data-disabled="true"` — `isDisabled` ou `isLoading`

**Variantes (Pencil → NativeWind):**

| Variant | Root | Text |
|---------|------|------|
| primary | `bg-orange-400`, `data-[hover=true]:bg-primary` | `text-neutral-900` |
| secondary | `bg-neutral-800 border-secondary`, `data-[hover=true]:bg-neutral-700` | `text-neutral-0`, `data-[disabled=true]:text-neutral-400` |
| tertiary | `bg-transparent`, `data-[hover=true]:bg-neutral-800`, focus `bg-neutral-900` | `text-neutral-0`, `data-[disabled=true]:text-neutral-400` |

**Layout fixo:** `min-h-[48px] py-3`, `px-5` (primary/secondary), `px-4` (tertiary), `rounded-full`, `gap-2.5`, `text-body`.

**API:** label como `children` string (auto-wrap em `ButtonText`); ícones como `children`; `AppButton.Text` / `AppButton.Spinner` opcionais.

**Context:** `withStyleContext` + `useStyleContext('APP_BUTTON')` para `variant` nos subparts; variantes via `tva` (`appButtonRootVariants`, `appButtonTextVariants`).

---

### 5.3 AppCheckbox (Prioridade 2)

**Creator:** `createCheckbox`
**Primitivos RN:** `Pressable` (Root), `View` (Indicator), SVG (Icon), `Text` (Label)

**Data attributes disponíveis:**
- Root: `data-checked="true"`, `data-disabled="true"`, `data-invalid="true"`, `data-hover="true"`
- Indicator: `data-checked="true"`, `data-focus-visible="true"`

**Nota:** O componente atual já usa `data-[checked=true]:` no Indicator. A migração aqui é trocar o import source e remover o useContext manual.

---

### 5.4 AppModal (Prioridade 3)

**Creator:** `createModal`
**Primitivos RN:** `View` (Content, Header, Body, Footer), `Pressable` (Backdrop, CloseButton)

**Comportamento do creator:**
- Focus trap automático
- `data-open="true"` no Root quando aberto
- Keyboard dismiss (Escape)
- Inert background

**Context:** O Modal usa context para `size` (propaga para Content). Com `useStyleContext`, podemos continuar essa propagação sem nosso próprio context.

---

### 5.5 AppDropdownMenu (Prioridade 3)

**Creator:** `createMenu`
**Primitivos RN:** `View` (Root/Content), `Pressable` (Item, Trigger)

**Comportamento do creator:**
- `data-open="true"` no Root quando menu está aberto
- `data-highlighted="true"` no Item quando em foco/hover
- Keyboard navigation (Arrow keys, Enter, Escape)
- Auto-positioning (popover)

---

## 6. Ordem de Execução

```
1. npm install (garantir que node_modules está completo)
2. Migrar AppText e AppScreen (simples: trocar imports)
3. Migrar AppAvatar e AppProgressBar (simples: trocar para RN puro)
4. Migrar AppInput (creator: createInput, eliminar useState/context de focus)
5. Migrar AppButton (creator: createButton, manter variants)
6. Migrar AppCheckbox (creator: createCheckbox)
7. Migrar AppModal (creator: createModal)
8. Migrar AppDropdownMenu (creator: createMenu)
9. Remover arquivos de infra v1:
   - src/lib/gluestack/gluestack-ui.config.ts
   - src/lib/gluestack/gluestack-css-interop.ts
   - src/lib/providers/GluestackAppProvider.tsx
10. Remover referência ao GluestackAppProvider no layout raiz
11. Atualizar .cursor/rules/project-stack-versions.mdc
12. Atualizar .cursor/rules/ui-component-implementation.mdc
13. Rodar lint + testes
```

---

## 7. Checklist de Validação por Componente

Para cada componente migrado, validar:

- [ ] Compila sem erros TypeScript
- [ ] `data-[focus=true]:` funciona (testar em web via `expo start --web`)
- [ ] `data-[disabled=true]:` aplica opacity
- [ ] `data-[invalid=true]:` aplica borda de erro
- [ ] Não há useContext/useState para estados que o creator gerencia
- [ ] `displayName` setado em todos os subparts
- [ ] Export via `Object.assign` (compound pattern mantido)
- [ ] Sem imports de `@gluestack-ui/themed`
- [ ] Tests passam (se existentes)

---

## 8. Referência: Import Map (v1 → v3)

| v1 Import (`@gluestack-ui/themed`) | v3 Equivalente |
|-------------------------------------|----------------|
| `Button`, `ButtonText`, `ButtonIcon`, `ButtonSpinner` | `createButton` → `UIButton`, `UIButton.Text`, `UIButton.Icon`, `UIButton.Spinner` |
| `Input`, `InputField`, `InputSlot`, `InputIcon` | `createInput` → `UIInput`, `UIInput.Input`, `UIInput.Slot`, `UIInput.Icon` |
| `Checkbox`, `CheckboxIndicator`, `CheckboxIcon`, `CheckboxLabel` | `createCheckbox` → `UICheckbox`, `UICheckbox.Indicator`, `UICheckbox.Icon`, `UICheckbox.Label` |
| `Modal`, `ModalBackdrop`, `ModalContent`, `ModalHeader`, `ModalBody`, `ModalFooter`, `ModalCloseButton` | `createModal` → `UIModal`, `UIModal.Backdrop`, `UIModal.Content`, `UIModal.Header`, `UIModal.Body`, `UIModal.Footer`, `UIModal.CloseButton` |
| `Menu`, `MenuItem`, `MenuItemLabel` | `createMenu` → `UIMenu`, `UIMenu.Item`, `UIMenu.ItemLabel` |
| `Avatar`, `AvatarImage`, `AvatarFallbackText`, `AvatarBadge` | RN puro: `View`, `Image`, `Text` |
| `Progress`, `ProgressFilledTrack` | RN puro: `View` + `View` |
| `Text` | `Text` de `react-native` |
| `Box` | `View` de `react-native` |
| `FormControl`, `FormControlLabel`, etc. | `createFormControl` → ou incorporar lógica no compound root |

---

## 9. Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Creators v3 têm API diferente do esperado | Consultar Context7 (`/gluestack/gluestack-ui`) para cada creator antes de implementar |
| `cssInterop` não propaga data attrs em RN native | Testar em device/emulador antes de migrar todos; fallback: manter `let borderCls` condicional |
| Modal focus trap quebra em alguma plataforma | Manter v1 Modal como último a migrar; testar em iOS/Android/Web |
| `npm install` lento/trava | Usar `--prefer-offline` ou limpar cache com `npm cache clean --force` |
| Componentes que dependem de `FormControl` (isInvalid propagation) | v3 tem `createFormControl` ou incorporar a prop `isInvalid` diretamente no compound root e usar data-attrs |
