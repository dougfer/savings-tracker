# Data Model: Shared UI Components (API Contracts)

This document describes the **component API models** — the props, variants, states, and compound subparts for each shared component. These are not database entities; they define the public interface contract between the shared layer and consuming screens.

All visual values (colors, spacing, radius, typography) reference tokens from `tailwind.config.js` via NativeWind `className`. No hardcoded values.

## 1. AppButton

**Design source**: Pencil `app.pen` node `UpBXR` (Button — Primary / Secondary / Tertiary hierarchies).

### Props (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | Visual hierarchy from Pencil |
| `isDisabled` | `boolean` | `false` | Disables interaction; secondary/tertiary mute label to `neutral-400` |
| `isLoading` | `boolean` | `false` | Shows spinner, disables interaction |
| `onPress` | `() => void` | — | Press handler |
| `className` | `string?` | — | Additional NativeWind classes |
| `children` | `ReactNode` | — | Label string/number and/or compound subparts (icons as `children`, not a dedicated slot) |

### Children

- **String or number** — wrapped automatically in styled label text (preferred: `<AppButton>Save</AppButton>`).
- **Custom layout** — pass icons/elements as `children`; bare text nodes in the tree are auto-wrapped.
- **`AppButton.Text`** — optional explicit label (same styles as auto-wrapped text).
- **`AppButton.Spinner`** — loading indicator when `isLoading` is true.

### Layout (single size from Pencil)

| Property | Value |
|----------|--------|
| Min height | `48px` (`min-h-[48px]`) |
| Padding | `py-3` (12px); `px-5` primary/secondary, `px-4` tertiary |
| Gap | `gap-2.5` (10px) |
| Radius | `rounded-full` |
| Typography | `font-sans-medium text-body` (16px / 500) |

### States

| State | Visual | Behavioral |
|-------|--------|------------|
| Default | Variant-specific bg/text/border | Interactive |
| Hover (web) | Hierarchy-specific bg (e.g. primary → `bg-primary`) | Interactive |
| Pressed | `data-[active=true]:opacity-80` | Interactive |
| Focus visible | Orange + dark outer shadow (`#FF5722` / `#101010`) | Interactive |
| Disabled | Secondary/tertiary: `text-neutral-400` | Non-interactive |
| Loading | Spinner visible | Non-interactive |

### Token mapping (Pencil → NativeWind)

| Variant | Background | Text | Border / notes |
|---------|------------|------|----------------|
| primary | `bg-orange-400`, hover `bg-primary` | `text-neutral-900` | — |
| secondary | `bg-neutral-800`, hover `bg-neutral-700` | `text-neutral-0`, disabled `text-neutral-400` | `border-secondary` |
| tertiary | transparent, hover `bg-neutral-800`, focus `bg-neutral-900` | `text-neutral-0`, disabled `text-neutral-400` | — |

---

## 2. AppInput

### Props (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'outline' \| 'underlined' \| 'rounded'` | `'outline'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `isDisabled` | `boolean` | `false` | Disables the input |
| `isInvalid` | `boolean` | `false` | Error state |
| `isReadOnly` | `boolean` | `false` | Read-only mode |
| `isRequired` | `boolean` | `false` | Required field indicator |
| `className` | `string?` | — | Additional NativeWind classes |
| `children` | `ReactNode` | — | Compound subparts |

### Compound Subparts

| Subpart | Base Primitive | Purpose |
|---------|----------------|---------|
| `AppInput.Field` | Gluestack `InputField` | Text input area |
| `AppInput.Slot` | Gluestack `InputSlot` | Container for leading/trailing icons |
| `AppInput.Icon` | Gluestack `InputIcon` | Icon within a slot |
| `AppInput.Label` | Gluestack `FormControlLabelText` | Associated label |
| `AppInput.HelperText` | Gluestack `FormControlHelperText` | Helper/description text |
| `AppInput.ErrorText` | Gluestack `FormControlErrorText` | Error message |
| `AppInput.ErrorIcon` | Gluestack `FormControlErrorIcon` | Error icon |

### States

| State | Visual | Behavioral |
|-------|--------|------------|
| Default | Border `border-input` | Interactive |
| Focused | Ring `ring-ring` | Interactive, caret visible |
| Error | Border `border-destructive`, error text visible | Interactive |
| Disabled | Muted opacity | Non-interactive |
| Read-only | Subtle bg change | Non-editable but focusable |

---

## 3. AppCheckbox

### Props (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Form submission value |
| `isChecked` | `boolean` | `false` | Controlled checked state |
| `defaultIsChecked` | `boolean` | `false` | Uncontrolled initial state |
| `onChange` | `(checked: boolean) => void` | — | Change handler |
| `isDisabled` | `boolean` | `false` | Disables interaction |
| `isInvalid` | `boolean` | `false` | Error state |
| `isIndeterminate` | `boolean` | `false` | Indeterminate visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `className` | `string?` | — | Additional NativeWind classes |
| `children` | `ReactNode` | — | Compound subparts |

### Compound Subparts

| Subpart | Base Primitive | Purpose |
|---------|----------------|---------|
| `AppCheckbox.Indicator` | Gluestack `CheckboxIndicator` | The check box visual |
| `AppCheckbox.Icon` | Gluestack `CheckboxIcon` | Check mark icon |
| `AppCheckbox.Label` | Gluestack `CheckboxLabel` | Associated label text |

### States

| State | Visual | Behavioral |
|-------|--------|------------|
| Unchecked | Empty indicator, border visible | Interactive |
| Checked | Filled indicator with check icon | Interactive |
| Indeterminate | Dash/minus icon | Interactive |
| Focused | Ring indicator on indicator | Interactive |
| Disabled | Muted opacity | Non-interactive |
| Invalid | Error border color | Interactive |

---

## 4. AppAvatar

### Props (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Size preset |
| `className` | `string?` | — | Additional NativeWind classes |
| `children` | `ReactNode` | — | Compound subparts |

### Compound Subparts

| Subpart | Base Primitive | Purpose |
|---------|----------------|---------|
| `AppAvatar.Image` | Gluestack `AvatarImage` | User profile image |
| `AppAvatar.FallbackText` | Gluestack `AvatarFallbackText` | Initials when no image |
| `AppAvatar.Badge` | Gluestack `AvatarBadge` | Status indicator |

### Behavior

- When `AppAvatar.Image` source fails to load → falls back to `AppAvatar.FallbackText`
- `AppAvatar.FallbackText` receives full name; Gluestack extracts initials automatically
- Place `FallbackText` before `Image` in JSX for iOS compatibility (Gluestack recommendation)

---

## 5. AppProgressBar

### Props (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current progress (0-100) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Track height preset |
| `variant` | `'default' \| 'success' \| 'warning'` | `'default'` | Color variant for progress context |
| `className` | `string?` | — | Additional NativeWind classes |
| `children` | `ReactNode` | — | Compound subparts |

### Compound Subparts

| Subpart | Base Primitive | Purpose |
|---------|----------------|---------|
| `AppProgressBar.Track` | Gluestack `ProgressFilledTrack` | Filled portion of the bar |
| `AppProgressBar.Label` | Custom `Text` | Optional value label (e.g., "60%") |

### Behavior

- `value` is clamped to 0–100 for visual display
- Values > 100 are visually capped at 100% fill
- `variant` controls the fill color: `default` = primary, `success` = green, `warning` = orange
- Accessibility: `role="progressbar"`, `aria-valuenow`, `aria-valuemin=0`, `aria-valuemax=100`

---

## 6. AppDropdownMenu

### Props (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'bottom' \| 'top' \| 'left' \| 'right'` + corners | `'bottom left'` | Menu position relative to trigger |
| `isOpen` | `boolean?` | — | Controlled open state |
| `onOpen` | `() => void` | — | Open callback |
| `onClose` | `() => void` | — | Close callback |
| `closeOnSelect` | `boolean` | `true` | Close after item selection |
| `className` | `string?` | — | Additional NativeWind classes |
| `children` | `ReactNode` | — | Compound subparts |

### Compound Subparts

| Subpart | Base Primitive | Purpose |
|---------|----------------|---------|
| `AppDropdownMenu.Trigger` | Gluestack Menu `trigger` prop | Element that opens the menu |
| `AppDropdownMenu.Content` | Custom wrapper | Menu content container |
| `AppDropdownMenu.Item` | Gluestack `MenuItem` | Individual menu option |
| `AppDropdownMenu.ItemLabel` | Gluestack `MenuItemLabel` | Item text label |
| `AppDropdownMenu.ItemIcon` | Custom icon slot | Optional icon per item |
| `AppDropdownMenu.Separator` | Custom `View` | Visual divider between groups |

### Behavior

- Trigger opens/closes menu on press
- Keyboard: Arrow keys navigate items, Enter/Space selects, Escape closes
- Focus returns to trigger on close
- Menu repositions to stay within viewport bounds

---

## 7. AppModal

### Props (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Controls visibility |
| `onClose` | `() => void` | — | Close callback |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Content width preset |
| `closeOnOverlayClick` | `boolean` | `true` | Close when backdrop pressed |
| `avoidKeyboard` | `boolean` | `true` | Shift content above keyboard |
| `initialFocusRef` | `React.RefObject` | — | Element to focus on open |
| `finalFocusRef` | `React.RefObject` | — | Element to focus on close |
| `className` | `string?` | — | Additional NativeWind classes |
| `children` | `ReactNode` | — | Compound subparts |

### Compound Subparts

| Subpart | Base Primitive | Purpose |
|---------|----------------|---------|
| `AppModal.Backdrop` | Gluestack `ModalBackdrop` | Semi-transparent overlay |
| `AppModal.Content` | Gluestack `ModalContent` | Main content container |
| `AppModal.Header` | Gluestack `ModalHeader` | Title area |
| `AppModal.Body` | Gluestack `ModalBody` | Scrollable content area |
| `AppModal.Footer` | Gluestack `ModalFooter` | Action buttons area |
| `AppModal.CloseButton` | Gluestack `ModalCloseButton` | Dismiss control |

### Behavior

- Focus is trapped within modal when open
- Background content is inert (no interaction)
- Escape key / back gesture closes modal
- Focus returns to trigger element on close
- Scrollable body when content exceeds viewport
