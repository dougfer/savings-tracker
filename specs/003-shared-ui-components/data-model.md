# Data Model: Shared UI Components (API Contracts)

This document describes the **component API models** — the props, variants, states, and compound subparts for each shared component. These are not database entities; they define the public interface contract between the shared layer and consuming screens.

All visual values (colors, spacing, radius, typography) reference tokens from `tailwind.config.js` via NativeWind `className`. No hardcoded values.

## 1. AppButton

### Props (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'destructive'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `isDisabled` | `boolean` | `false` | Disables interaction and mutes visuals |
| `isLoading` | `boolean` | `false` | Shows spinner, disables interaction |
| `onPress` | `() => void` | — | Press handler |
| `className` | `string?` | — | Additional NativeWind classes |
| `children` | `ReactNode` | — | Compound subparts |

### Compound Subparts

| Subpart | Base Primitive | Purpose |
|---------|----------------|---------|
| `AppButton.Text` | Gluestack `ButtonText` | Button label text |
| `AppButton.Icon` | Gluestack `ButtonIcon` | Leading or trailing icon |
| `AppButton.Spinner` | Gluestack `ButtonSpinner` | Loading indicator |

### States

| State | Visual | Behavioral |
|-------|--------|------------|
| Default | Variant-specific bg/text/border | Interactive |
| Hover (web) | Slightly darker bg | Interactive |
| Pressed | Darker bg | Interactive |
| Focused | Ring indicator | Interactive |
| Disabled | Muted opacity | Non-interactive, announced |
| Loading | Spinner visible, text optional | Non-interactive, busy announced |

### Token Mapping (to be finalized after Figma extraction)

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| primary | `bg-primary` | `text-primary-foreground` | — |
| secondary | `bg-secondary` | `text-secondary-foreground` | — |
| outline | `bg-transparent` | `text-foreground` | `border border-border` |
| destructive | `bg-destructive` | `text-destructive-foreground` | — |

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
