# Quickstart: AppCheckbox

**Feature**: Refatoração do Componente AppCheckbox
**Date**: 2026-05-23

Guia rápido de uso do componente `AppCheckbox` após verificação de alinhamento com o Design System.

## Import

```tsx
import { AppCheckbox } from '@/components/ui';
```

## Usage

### Basic Usage

```tsx
function TermsSection() {
  const [agreed, setAgreed] = useState(false);

  return (
    <AppCheckbox value="terms" isChecked={agreed} onChange={setAgreed}>
      <AppCheckbox.Indicator />
      <AppCheckbox.Label>I agree to the terms and conditions</AppCheckbox.Label>
    </AppCheckbox>
  );
}
```

### With Multiple Checkboxes

```tsx
function PreferencesForm() {
  const [prefs, setPrefs] = useState({
    marketing: false,
    notifications: false,
  });

  const handleChange = (field: string) => (checked: boolean) => {
    setPrefs(prev => ({ ...prev, [field]: checked }));
  };

  return (
    <View>
      <AppCheckbox value="marketing" isChecked={prefs.marketing} onChange={handleChange('marketing')}>
        <AppCheckbox.Indicator />
        <AppCheckbox.Label>Receive marketing emails</AppCheckbox.Label>
      </AppCheckbox>

      <AppCheckbox value="notifications" isChecked={prefs.notifications} onChange={handleChange('notifications')}>
        <AppCheckbox.Indicator />
        <AppCheckbox.Label>Enable push notifications</AppCheckbox.Label>
      </AppCheckbox>
    </View>
  );
}
```

### Disabled State

```tsx
<AppCheckbox value="disabled" isDisabled>
  <AppCheckbox.Indicator />
  <AppCheckbox.Label>Cannot be changed</AppCheckbox.Label>
</AppCheckbox>
```

### Pre-checked State (Uncontrolled)

```tsx
<AppCheckbox value="default-on" defaultIsChecked>
  <AppCheckbox.Indicator />
  <AppCheckbox.Label>Checked by default</AppCheckbox.Label>
</AppCheckbox>
```

### With Invalid State

```tsx
<AppCheckbox value="terms" isInvalid>
  <AppCheckbox.Indicator />
  <AppCheckbox.Label>Please accept the terms</AppCheckbox.Label>
</AppCheckbox>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Form submission value |
| `isChecked` | `boolean` | `false` | Controlled checked state |
| `defaultIsChecked` | `boolean` | `false` | Uncontrolled initial state |
| `onChange` | `(checked: boolean) => void` | — | Callback when state changes |
| `isDisabled` | `boolean` | `false` | Disables interaction |
| `isInvalid` | `boolean` | `false` | Invalid state styling |
| `isIndeterminate` | `boolean` | `false` | Indeterminate state |
| `isReadOnly` | `boolean` | `false` | Read-only mode |
| `className` | `string` | — | Additional Tailwind classes |

## Compound Components

| Component | Purpose |
|-----------|---------|
| `AppCheckbox.Indicator` | Visual checkbox box (16×16 circle with border) |
| `AppCheckbox.Label` | Text label associated with the checkbox |

## Visual States

| State | Visual |
|-------|--------|
| Unchecked | Circle with `neutral-500` border |
| Checked | Circle with border + orange inset dot |
| Focus | Orange focus ring (`bg-neutral-900` + ring on native/web) |
| Disabled | `opacity-50`, non-interactive |
| Invalid | Passed to Gluestack (no distinct Pencil visual) |

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Indicator size | `h-4 w-4` (16px) | Checkbox box |
| Border | `border-neutral-500` | Indicator border |
| Checked dot | `bg-orange-400` (#FF5722) | When checked |
| Label color | `text-neutral-300` | Label text |
| Font | `font-sans-medium text-body` | Label typography |
| Focus ring (web) | `shadow-[0_0_0_4px_#FF5722,0_0_0_6px_#101010]` | Orange + dark |
| Focus ring (native) | `border-2 border-orange-400` | Orange border |

## Accessibility

- **Role**: `checkbox` (automatically from Gluestack)
- **State exposure**: `accessibilityState: { checked, disabled }`
- **Keyboard**: Tab to navigate, Enter/Space to toggle
- **Focus visible**: Orange focus ring on all platforms

## Extending with Custom Styles

```tsx
<AppCheckbox
  value="custom"
  className="mt-4"
>
  <AppCheckbox.Indicator />
  <AppCheckbox.Label className="text-lg">Custom styled</AppCheckbox.Label>
</AppCheckbox>
```

## Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react-native';

it('calls onChange when pressed', () => {
  const onChange = jest.fn();
  render(
    <AppCheckbox value="test" onChange={onChange}>
      <AppCheckbox.Indicator />
      <AppCheckbox.Label>Accept</AppCheckbox.Label>
    </AppCheckbox>,
  );

  fireEvent.press(screen.getByRole('checkbox'));
  expect(onChange).toHaveBeenCalledTimes(1);
});
```

## Migration Notes

The component is already aligned with the Design System (Pencil Q5Ei9). No API changes are required. Existing usages continue to work without modification.

**If upgrading from an older version**:
- Ensure you use compound pattern: `<AppCheckbox.Indicator />` and `<AppCheckbox.Label />`
- Props API is backward compatible
- No structural changes needed