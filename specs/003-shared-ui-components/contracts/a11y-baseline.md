# Accessibility Baseline: Shared UI Components

**Version**: 1.0.0  
**Standard**: WCAG 2.1 AA  
**Platforms**: iOS (VoiceOver), Android (TalkBack), Web (screen readers + keyboard)

## Universal Requirements

Every shared component MUST meet these baseline criteria:

### 1. Semantic Roles

| Component | Expected Role | Notes |
|-----------|--------------|-------|
| AppButton | `button` | Native Pressable provides this |
| AppInput | `textbox` with `FormControl` context | Label association via `nativeID` or Gluestack auto-binding |
| AppCheckbox | `checkbox` | State announced: checked / unchecked / mixed |
| AppAvatar | `image` | Alt text via `accessibilityLabel` |
| AppProgressBar | `progressbar` | `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| AppDropdownMenu | `menu` (trigger: `button`) | Items: `menuitem` |
| AppModal | `dialog` | `aria-modal="true"`, `aria-labelledby` for heading |

### 2. Keyboard Navigation

| Action | Key | Components |
|--------|-----|------------|
| Activate | `Space` / `Enter` | Button, Checkbox, Menu items |
| Toggle | `Space` | Checkbox |
| Navigate items | `Arrow Up` / `Arrow Down` | Dropdown Menu |
| Dismiss | `Escape` | Modal, Dropdown Menu |
| Tab through | `Tab` / `Shift+Tab` | All focusable components |

### 3. Focus Management

- **Visible focus indicator**: All interactive components must show a visible focus ring on keyboard focus. Token: `ring-ring` from design tokens.
- **Focus trap**: Modal must trap focus within its content while open.
- **Focus restore**: Modal and Dropdown Menu must return focus to trigger element on close.
- **Tab order**: Components must follow logical document order.

### 4. Touch Targets

- Minimum touch target: **44x44 points** on iOS/Android
- Applies to: Button, Checkbox indicator, Dropdown trigger, Modal close button
- Larger targets preferred for primary actions per constitution (mobile-first principle)

### 5. Color Contrast

- Text on background: minimum **4.5:1** ratio (AA)
- Large text (>= 18pt or 14pt bold): minimum **3:1** ratio
- UI components and graphical objects: minimum **3:1** ratio against adjacent colors
- Design tokens from spec 002 have been validated against these ratios

### 6. State Announcements

| State Change | Announcement |
|-------------|-------------|
| Button disabled | "dimmed" / "disabled" |
| Button loading | "busy" |
| Checkbox toggled | "checked" / "unchecked" |
| Input error | Error message read with field |
| Input required | "required" announced |
| Progress updated | Value change announced (throttled) |
| Modal opened | Dialog role + title announced |
| Modal closed | Focus returns, no orphaned announcement |

### 7. Content Alternatives

- Icons used alongside text: decorative (`accessibilityElementsHidden` / `importantForAccessibility="no"`)
- Icon-only buttons: MUST have `accessibilityLabel`
- Avatar image: `accessibilityLabel` with user name
- ProgressBar: `accessibilityLabel` describing what the progress represents (e.g., "Goal progress: 60%")

## Per-Component Checklist

Used during implementation review:

- [ ] Correct semantic role assigned
- [ ] Keyboard operable on Web
- [ ] Focus indicator visible
- [ ] Touch target >= 44x44pt on native
- [ ] States announced to screen readers
- [ ] Color contrast meets AA
- [ ] No information conveyed by color alone
- [ ] Disabled state prevents interaction and is announced
- [ ] Error state is associated with the field (Input, Checkbox)
