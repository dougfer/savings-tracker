# Feature Specification: Shared UI Components

**Feature Branch**: `003-shared-ui-components`  
**Created**: 2026-05-13  
**Status**: Draft  
**Input**: User description: "Criação de componentes reutilizáveis e compartilhados (Button, Input, Checkbox, Avatar, Dropdown-menu, ProgressBar, Modal) como camada base de UI da aplicação"

Constituição do projeto (produto, UX, UI, conteúdo, mobile-first, a11y, performance, técnico): `.specify/memory/constitution.md`. Requisitos e critérios de sucesso DEVEM permanecer testáveis e alinhados a esses princípios.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Developer Uses Base Action Components (Priority: P1)

A developer building any feature screen needs to trigger user actions (confirm, cancel, submit, navigate). They use the shared Button component with Pencil-aligned variants (`primary`, `secondary`, `tertiary`) and a single layout preset, ensuring every interactive action across the app looks and behaves consistently.

**Why this priority**: Buttons are the most fundamental interactive element. Every future feature (goals, deposits, settings) requires action triggers. Without a consistent Button, visual and behavioral fragmentation starts immediately.

**Independent Test**: Can be fully tested by rendering the Button in all variant/size combinations and verifying visual output, press feedback, disabled state, loading state, and accessibility labels.

**Acceptance Scenarios**:

1. **Given** a screen requires a primary action, **When** the developer renders a Button with the primary variant, **Then** the Button displays the correct design-system colors, typography, and spacing for the primary style.
2. **Given** a Button is in a loading state, **When** the user views the screen, **Then** the Button displays a loading indicator, disables interaction, and announces the busy state to assistive technologies.
3. **Given** a Button is disabled, **When** the user attempts to press it, **Then** no action is triggered, the Button appears visually muted, and assistive technologies announce it as disabled.
4. **Given** a screen is viewed on a small mobile device, **When** the Button renders, **Then** the touch target meets minimum sizing requirements and the label remains fully legible.

---

### User Story 2 - Developer Builds Forms with Input and Checkbox (Priority: P1)

A developer creating any form (goal creation, deposit entry, profile editing) needs text inputs and checkboxes that handle labels, placeholders, validation states (error, success), helper text, and required-field indicators consistently. They compose Input and Checkbox components to build forms that feel predictable and trustworthy.

**Why this priority**: Forms are the primary data-entry mechanism for the savings tracker. Inconsistent form elements erode the trust and clarity principles of the constitution. Goal creation and deposit registration are core flows.

**Independent Test**: Can be fully tested by rendering Input and Checkbox in all states (default, focused, error, disabled, read-only) and verifying label association, validation message display, keyboard interaction, and screen-reader announcements.

**Acceptance Scenarios**:

1. **Given** a form field has a validation error, **When** the Input renders in the error state, **Then** the error message is visible below the field, the field border changes to the error color, and the error is associated with the input for assistive technologies.
2. **Given** a Checkbox is unchecked, **When** the user taps/presses it, **Then** the Checkbox toggles to checked with appropriate visual feedback and state change is announced to assistive technologies.
3. **Given** a required Input is left empty, **When** the user attempts to submit the form, **Then** the Input displays the required-field indicator and the associated error message.
4. **Given** an Input has a helper text, **When** the field is rendered, **Then** the helper text is visible and programmatically linked to the field.

---

### User Story 3 - Developer Displays User Identity with Avatar (Priority: P2)

A developer building profile or social features needs to display a user representation. They use the Avatar component which shows an image when available, falls back to initials when no image is provided, and gracefully handles image loading failures.

**Why this priority**: User identity display appears in headers, profiles, and potentially in shared-goal features. It is important for personalization and trust but is not blocking core savings flows.

**Independent Test**: Can be fully tested by rendering Avatar with an image URL, with no image (initials fallback), with a broken image URL, and in different sizes, verifying the correct rendering in each case.

**Acceptance Scenarios**:

1. **Given** a user has a profile image, **When** the Avatar renders, **Then** the image is displayed in a circular frame at the specified size.
2. **Given** a user has no profile image but has a name, **When** the Avatar renders, **Then** the component displays the user's initials with a consistent background color.
3. **Given** the profile image fails to load, **When** the error occurs, **Then** the Avatar gracefully falls back to the initials display without layout shifts.

---

### User Story 4 - Developer Shows Goal Progress with ProgressBar (Priority: P2)

A developer building the savings dashboard or goal detail screen needs to visually communicate how much of a financial goal has been achieved. They use the ProgressBar component to display the current percentage, supporting different visual states (on track, behind, completed) and optional value labels.

**Why this priority**: Progress visualization is central to the constitution's principles of clarity, trust, and motivation. Users must perceive progress instantly. However, it depends on goal data being available, so it ranks after foundational form and action components.

**Independent Test**: Can be fully tested by rendering ProgressBar at various percentages (0%, 25%, 50%, 75%, 100%, and over 100%) and verifying the visual fill, value label, color states, and accessibility announcements.

**Acceptance Scenarios**:

1. **Given** a goal is 60% funded, **When** the ProgressBar renders, **Then** the fill visually represents 60% of the track and the value is announced to assistive technologies.
2. **Given** a goal is 100% funded, **When** the ProgressBar renders, **Then** the component displays a completed visual state with appropriate celebratory styling.
3. **Given** the progress value is 0%, **When** the ProgressBar renders, **Then** an empty track is visible and the zero-progress state is communicated clearly.

---

### User Story 5 - Developer Presents Contextual Options with Dropdown Menu (Priority: P2)

A developer building screens with contextual actions (edit goal, delete goal, sort list, filter) needs a menu that opens on trigger, displays a list of options, supports keyboard navigation, and closes predictably. They use the Dropdown Menu component for this.

**Why this priority**: Contextual actions are needed across goal management, list views, and settings. It reduces screen clutter by grouping secondary actions. However, primary flows can initially use direct buttons, so this is not P1.

**Independent Test**: Can be fully tested by opening the menu, navigating through items with keyboard/touch, selecting an item, dismissing the menu, and verifying focus management and screen-reader behavior.

**Acceptance Scenarios**:

1. **Given** a trigger element exists, **When** the user presses the trigger, **Then** the Dropdown Menu opens and focus moves to the first menu item.
2. **Given** the Dropdown Menu is open, **When** the user selects an item, **Then** the associated action is executed and the menu closes.
3. **Given** the Dropdown Menu is open, **When** the user taps outside the menu or presses Escape, **Then** the menu closes and focus returns to the trigger element.
4. **Given** the Dropdown Menu is open on a mobile device, **When** the user views it, **Then** the menu is positioned to remain fully visible within the viewport.

---

### User Story 6 - Developer Shows Critical Information in a Modal (Priority: P3)

A developer needs to present critical confirmations (delete a goal, confirm a large deposit), focused forms, or important informational messages that require user acknowledgment. They use the Modal component which overlays content, traps focus, and prevents background interaction.

**Why this priority**: Modals are important for destructive-action confirmations and focused workflows, but many core flows can initially function without modals (using inline patterns). Modals also carry higher complexity (focus trap, overlay, animation, scroll lock).

**Independent Test**: Can be fully tested by opening the Modal, verifying focus trap, attempting background interaction, closing via button and overlay press, and checking that focus returns to the trigger.

**Acceptance Scenarios**:

1. **Given** a destructive action is initiated, **When** the Modal opens, **Then** the overlay is visible, background content is inert, and focus is trapped within the Modal.
2. **Given** the Modal is open, **When** the user presses a close button or the overlay, **Then** the Modal closes and focus returns to the element that triggered it.
3. **Given** the Modal is open, **When** the user presses the Escape key (or back gesture on mobile), **Then** the Modal closes.
4. **Given** the Modal contains a form, **When** the user interacts with form elements inside, **Then** the form elements behave normally and focus remains within the Modal.

---

### Edge Cases

- What happens when a Button receives an extremely long label? The text should truncate or wrap gracefully without breaking layout.
- How does an Input behave when pasted content exceeds a maximum length? The component should enforce limits and provide feedback.
- What happens when a ProgressBar receives a value greater than 100%? The component should cap the visual fill at 100% and indicate the overflow state.
- How does the Modal behave when opened while another Modal is already open? The system should prevent or manage stacked modals to avoid focus-trap conflicts.
- What happens when a Dropdown Menu has too many items to fit on screen? The menu should scroll internally and remain within viewport bounds.
- How does Avatar handle non-Latin characters for initials? The component should extract initials correctly from any Unicode name.
- What happens when interactive components are nested inside disabled containers? Children should inherit the disabled state correctly.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a Button component supporting the three Pencil hierarchies (`primary`, `secondary`, `tertiary`), default/hover/focus/disabled/loading states, and label text via `children` (string) or optional `AppButton.Text`.
- **FR-002**: The Button component MUST support loading and disabled states with distinct visual and behavioral representations.
- **FR-003**: The system MUST provide an Input component supporting text entry with labels, placeholders, helper text, error messages, and required-field indicators.
- **FR-004**: The Input component MUST support states: default, focused, error, disabled, and read-only, with visually distinct presentations for each.
- **FR-005**: The system MUST provide a Checkbox component supporting checked, unchecked, and indeterminate states with label association.
- **FR-006**: The system MUST provide an Avatar component that displays a user image when available and falls back to initials derived from the user's name.
- **FR-007**: The Avatar component MUST handle image loading failures gracefully by falling back to the initials display without layout shifts.
- **FR-008**: The system MUST provide a ProgressBar component that visually represents a percentage value from 0% to 100%, capping the visual display at 100%.
- **FR-009**: The ProgressBar MUST support visual states for different progress contexts (e.g., on track, behind schedule, completed).
- **FR-010**: The system MUST provide a Dropdown Menu component with a trigger element, a list of selectable options, keyboard navigation, and automatic dismissal on selection or outside interaction.
- **FR-011**: The system MUST provide a Modal component that overlays content with a backdrop, traps focus within the modal, and prevents interaction with background content.
- **FR-012**: The Modal MUST be dismissible by close button, backdrop press, Escape key, and back gesture on mobile.
- **FR-013**: All components MUST follow the compound component pattern, exposing subparts as namespaced properties of a root component (e.g., `Button.Icon`, `Modal.Header`).
- **FR-014**: All components MUST have strong TypeScript typing for all props, with no use of `any` type.
- **FR-015**: All components MUST meet accessibility requirements: correct semantic roles, screen-reader announcements, keyboard operability, visible focus indicators, and sufficient color contrast.
- **FR-016**: All components MUST be mobile-first, with touch targets meeting minimum sizing requirements for comfortable one-handed use.
- **FR-017**: All components MUST follow the design system's spacing, typography, and color tokens.
- **FR-018**: All components MUST provide visual feedback for user interactions (press, hover, focus) consistent with the design system.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A developer can compose a complete form screen (with label, input, checkbox, button) using only the shared components in under 10 minutes, without custom styling.
- **SC-002**: All shared components pass accessibility audit: keyboard navigation, screen-reader labels, focus management, and contrast requirements are met.
- **SC-003**: Every shared component renders correctly across mobile screen sizes (320px to 428px width) without visual overflow or truncation issues.
- **SC-004**: The set of shared components covers at least 80% of the UI element needs for the savings tracker's core screens (dashboard, goal creation, goal detail, deposit entry).
- **SC-005**: No duplicate component implementations exist across the codebase — all screens use the shared components for the covered element types.
- **SC-006**: Each component can be used independently without importing or depending on other shared components (unless composing, e.g., Button inside Modal footer).
- **SC-007**: Developers report that adding a new screen feature takes less effort due to component reuse compared to building UI from scratch.

## Assumptions

- The design system tokens (colors, typography, spacing) defined in spec 002 (Design Tokens & Style Guide) are available and stable before component implementation begins.
- Components will be used exclusively within the Savings Tracker application; cross-project portability is not a goal for v1.
- Components follow the compound component pattern documented in the project rules, using React context for shared state between subparts.
- Components are styled using the project's existing NativeWind + Gluestack UI setup — no additional styling libraries are introduced.
- The initial component set (Button, Input, Checkbox, Avatar, Dropdown Menu, ProgressBar, Modal) covers the essential needs; additional components will be added as future features require them.
- All components target mobile-first usage with React Native, with web support via React Native Web as a secondary concern.
- Internationalization (i18n) of component labels and messages is the responsibility of the consuming screen, not the shared components themselves.
- Animation and transitions within components (e.g., Modal open/close, Dropdown appear/dismiss) use the project's existing Reanimated setup.
