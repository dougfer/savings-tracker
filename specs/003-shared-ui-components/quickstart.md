# Quickstart: Shared UI Components

How to use the shared component library in the Savings Tracker application.

## Prerequisites

- Design tokens from spec 002 must be implemented in `tailwind.config.js`
- Gluestack UI provider configured (`GluestackAppProvider` wrapping the app)
- Fonts loaded via `expo-font` (Inter + Bricolage Grotesque)

## Import

All shared components are exported from the barrel:

```tsx
import {
  AppButton,
  AppInput,
  AppCheckbox,
  AppAvatar,
  AppProgressBar,
  AppDropdownMenu,
  AppModal,
} from '@/components/ui';
```

## Usage Examples

### Button

Variants follow Pencil (`primary`, `secondary`, `tertiary`). Pass the label as `children` (string) or compose icons + text:

```tsx
<AppButton variant="primary" onPress={handleSave}>
  Save Goal
</AppButton>

<AppButton variant="tertiary" isDisabled>
  <EditIcon width={20} height={20} color="#FFFFFF" />
  Edit
</AppButton>

<AppButton variant="secondary" isLoading>
  <AppButton.Spinner />
  Deleting…
</AppButton>
```

### Input (with form control)

```tsx
<AppInput variant="outline" isInvalid={!!errors.name} isRequired>
  <AppInput.Label>Goal Name</AppInput.Label>
  <AppInput.Field
    placeholder="e.g., Emergency Fund"
    value={name}
    onChangeText={setName}
  />
  <AppInput.HelperText>Give your savings goal a clear name</AppInput.HelperText>
  <AppInput.ErrorText>{errors.name?.message}</AppInput.ErrorText>
</AppInput>
```

### Checkbox

Pencil indicator (16×16 circle; orange inset dot when checked):

```tsx
<AppCheckbox value="terms" isChecked={agreed} onChange={setAgreed}>
  <AppCheckbox.Indicator />
  <AppCheckbox.Label>I agree to the terms</AppCheckbox.Label>
</AppCheckbox>
```

### Avatar

Pencil layout (48×48). Place `FallbackText` before `Image`:

```tsx
<AppAvatar accessibilityLabel="Jane Smith">
  <AppAvatar.FallbackText>AH</AppAvatar.FallbackText>
  <AppAvatar.Image source={{ uri: profileImageUrl }} />
</AppAvatar>
```

### ProgressBar

```tsx
<AppProgressBar value={60} size="md" variant="default">
  <AppProgressBar.Track />
</AppProgressBar>

<AppProgressBar value={100} variant="success">
  <AppProgressBar.Track />
  <AppProgressBar.Label>100% Complete!</AppProgressBar.Label>
</AppProgressBar>
```

### Dropdown Menu

```tsx
<AppDropdownMenu>
  <AppDropdownMenu.Trigger>
    {(triggerProps) => (
      <AppButton variant="tertiary" {...triggerProps}>
        <MoreHorizontalIcon width={20} height={20} color="#FFFFFF" />
      </AppButton>
    )}
  </AppDropdownMenu.Trigger>
  <AppDropdownMenu.Content>
    <AppDropdownMenu.Item onPress={handleEdit}>
      <AppDropdownMenu.ItemIcon as={EditIcon} />
      <AppDropdownMenu.ItemLabel>Edit Goal</AppDropdownMenu.ItemLabel>
    </AppDropdownMenu.Item>
    <AppDropdownMenu.Separator />
    <AppDropdownMenu.Item onPress={handleDelete}>
      <AppDropdownMenu.ItemIcon as={TrashIcon} />
      <AppDropdownMenu.ItemLabel>Delete Goal</AppDropdownMenu.ItemLabel>
    </AppDropdownMenu.Item>
  </AppDropdownMenu.Content>
</AppDropdownMenu>
```

### Modal

```tsx
const [showModal, setShowModal] = useState(false);

<AppButton variant="secondary" onPress={() => setShowModal(true)}>
  Delete Goal
</AppButton>

<AppModal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
  <AppModal.Backdrop />
  <AppModal.Content>
    <AppModal.Header>
      <Heading size="lg">Confirm Deletion</Heading>
      <AppModal.CloseButton>
        <Icon as={CloseIcon} />
      </AppModal.CloseButton>
    </AppModal.Header>
    <AppModal.Body>
      <Text>Are you sure you want to delete this goal? This action cannot be undone.</Text>
    </AppModal.Body>
    <AppModal.Footer>
      <AppButton variant="tertiary" onPress={() => setShowModal(false)}>
        Cancel
      </AppButton>
      <AppButton variant="primary" onPress={handleDelete}>
        Delete
      </AppButton>
    </AppModal.Footer>
  </AppModal.Content>
</AppModal>
```

## Extending Components

All components accept an optional `className` prop to add NativeWind utilities:

```tsx
<AppButton variant="primary" className="mt-4 w-full">
  Full-Width Button
</AppButton>
```

The `className` is **merged** with the component defaults, not replaced.

## Key Rules

1. Use **design tokens only** — no hardcoded hex, px, or font values
2. Follow **compound pattern** — compose with subparts, don't configure with prop lists
3. Keep components **presentation-only** — no business logic inside shared components
4. Test with **screen reader** on each platform before shipping a screen
