# Feature Specification: AppDropdownMenu Refactor

**Feature Branch**: `refactor/app-dropdown-menu`  
**Created**: 2026-05-24  
**Status**: Draft  
**Input**: User description: "Refatorar o componente AppDropdownMenu para garantir maior aderência ao design definido no Design System e melhor alinhamento com a stack e padrões arquiteturais adotados pelo projeto."

## Constitution Alignment

Constituição do projeto (produto, UX, UI, conteúdo, mobile-first, a11y, performance, técnico): `.specify/memory/constitution.md`. Requisitos e critérios de sucesso DEVEM permanecer testáveis e alinhados a esses princípios.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dropdown menu displays correctly (Priority: P1)

As a user, I want to see a properly styled dropdown menu that matches the design system so that I have a consistent experience across the application.

**Why this priority**: Visual consistency is foundational to user trust and accessibility.

**Independent Test**: Can be verified by visually inspecting the dropdown against design reference and running unit tests for component rendering.

**Acceptance Scenarios**:

1. **Given** a dropdown menu is rendered with items, **When** the menu is closed, **Then** only the trigger is visible with proper styling
2. **Given** a dropdown menu is rendered with items, **When** the user taps the trigger, **Then** the menu content appears with correct visual styling (rounded corners, background, shadow, border)
3. **Given** a dropdown menu is open, **When** the user selects an item or taps outside, **Then** the menu closes

---

### User Story 2 - Menu items are interactive (Priority: P1)

As a user, I want to interact with menu items that have proper visual feedback so that I can confidently select actions.

**Why this priority**: Core functionality - users must be able to select items and receive feedback.

**Independent Test**: Can be tested by rendering menu with items and verifying press interactions and visual states.

**Acceptance Scenarios**:

1. **Given** a menu item is displayed, **When** the user hovers over it (web), **Then** visual feedback indicates the interactive state
2. **Given** a menu item is displayed, **When** the user presses it, **Then** the item shows active state feedback
3. **Given** a menu item with textValue is pressed, **Then** the onValueChange callback fires with correct value

---

### User Story 3 - Compound components work correctly (Priority: P2)

As a developer, I want to use the compound component pattern consistently so that the API matches other components in the system.

**Why this priority**: Consistency with AppButton, AppModal pattern reduces cognitive load and improves developer experience.

**Independent Test**: Can be verified by testing each subcomponent (Trigger, Content, Item, ItemLabel, ItemIcon, Separator) renders and functions independently.

**Acceptance Scenarios**:

1. **Given** AppDropdownMenu is imported, **When** I use `<AppDropdownMenu.Trigger>`, **Then** it renders the trigger portion
2. **Given** AppDropdownMenu is imported, **When** I use `<AppDropdownMenu.Content>`, **Then** it renders the menu content wrapper
3. **Given** AppDropdownMenu is imported, **When** I use `<AppDropdownMenu.Item>` with ItemLabel child, **Then** the item renders with correct text styling
4. **Given** AppDropdownMenu is imported, **When** I use `<AppDropdownMenu.ItemIcon>`, **Then** the icon renders with correct size and color

---

### Edge Cases

- What happens when dropdown is rendered with no items? Menu renders empty but functional.
- How does system handle very long item text? Text truncates with ellipsis.
- How does the system handle rapid open/close cycles? Debouncing prevents flickering.
- What happens when all subcomponents are used outside AppDropdownMenu root? Components render null or with fallback behavior.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The component MUST support compound component pattern matching AppButton/AppModal structure (Trigger, Content, Item, ItemLabel, ItemIcon, Separator)
- **FR-002**: The component MUST use gluestack-ui core creators (createMenu) as the underlying headless primitive
- **FR-003**: The component MUST support placement options: top, bottom, left, right, bottom left, bottom right
- **FR-004**: The component MUST support offset and crossOffset positioning props
- **FR-005**: The component MUST support onOpen and onClose callbacks for state management
- **FR-006**: The component MUST support closeOnSelect behavior (configurable)
- **FR-007**: The component MUST support disabled state for items
- **FR-008**: The component MUST have consistent styling classes (no hardcoded design tokens, use tva pattern where applicable)
- **FR-009**: The component MUST support keyboard navigation (accessibility)
- **FR-010**: The component MUST have ItemIcon that renders icons at consistent 16px size with muted-foreground color

### Key Entities

- **AppDropdownMenu**: Root compound component container managing menu state and rendering trigger/menu
- **AppDropdownMenu.Trigger**: Wrapper for the element that opens the dropdown
- **AppDropdownMenu.Content**: Container for menu items with styling
- **AppDropdownMenu.Item**: Interactive menu item with press states
- **AppDropdownMenu.ItemLabel**: Text label within item with body/foreground styling
- **AppDropdownMenu.ItemIcon**: Icon component rendered before item label with muted color
- **AppDropdownMenu.Separator**: Visual divider between menu sections

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developers can use compound component pattern without reading implementation details
- **SC-002**: Dropdown menu renders consistently with design system visual tokens (border-radius, spacing, colors, shadows)
- **SC-003**: Menu responds to user interaction (open/close) within 100ms perceived latency
- **SC-004**: Accessibility: Focus management works correctly, screen reader announces menu state changes
- **SC-005**: Component API matches the architectural patterns of AppButton and AppModal for reduced cognitive load

## Assumptions

- The refactoring follows the pattern established by AppButton which uses `withStyleContext`, `withStates`, and `tva` (tiny variance) for variant styling
- The component will leverage the existing gluestack-ui/core/menu/creator primitive as currently implemented
- Styling will use Tailwind classes consistent with the design token system already in use
- The compound component structure (Trigger, Content, Item, etc.) will be preserved as it matches the expected API
- [NEEDS CLARIFICATION: Design system reference] There is assumed to be a Pencil design document (app.pen) that defines exact visual specifications for dropdown styling, but this document could not be accessed during spec creation. The assumption is that visual details align with the existing component's current design tokens and the patterns used in AppButton/AppModal.