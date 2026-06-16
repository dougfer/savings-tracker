# Feature Specification: Create Goal Modal

**Feature Branch**: `013-create-goal-modal`  
**Created**: 2026-06-15  
**Status**: Draft  
**Input**: User description: "Adicionar Objetivo Financeiro - Permitir que o usuário crie um novo objetivo financeiro através de um formulário exibido em um modal reutilizável."

Constituição do projeto (produto, UX, UI, conteúdo, mobile-first, a11y, performance, técnico): `.specify/memory/constitution.md`. Requisitos e critérios de sucesso DEVEM permanecer testáveis e alinhados a esses princípios.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Open and submit new goal creation form (Priority: P1)

A user wants to track a new financial goal. They open a modal form, fill in the goal details, and submit it. The goal is then listed among their active goals.

**Why this priority**: This is the core functionality — without it, users cannot create goals at all. The entire feature hinges on this flow.

**Independent Test**: Can be fully tested by opening the modal via the "New Goal" button, filling all required fields with valid data, clicking "Create goal", and verifying the goal appears in the goals list.

**Acceptance Scenarios**:

1. **Given** the user is on the home page with goals visible, **When** they click the "New Goal" button in the topbar, **Then** the create goal modal opens with all fields empty and the submit button disabled.
2. **Given** the modal is open, **When** the user fills in a valid goal name and a target amount greater than zero, **Then** the "Create goal" button becomes enabled.
3. **Given** the modal is open with valid data filled, **When** the user clicks "Create goal", **Then** the modal closes and the new goal appears in the goals list.
4. **Given** the goals list is empty (no goals exist), **When** the user clicks "Create your first goal", **Then** the same create goal modal opens.

---

### User Story 2 - Form validation feedback (Priority: P2)

The user needs clear guidance when their input is invalid, so they can correct mistakes before submission.

**Why this priority**: Validation prevents data errors and improves user experience, but the core creation flow (P1) must exist first.

**Independent Test**: Can be tested by opening the modal and attempting to submit with empty required fields or invalid values, verifying that error messages appear and the submit button remains disabled.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user leaves "Goal name" empty and tries to interact with another field, **Then** an error message is displayed below the "Goal name" field indicating it is required.
2. **Given** the modal is open, **When** the user enters a target amount of zero or a negative value, **Then** an error message is displayed below the "Target amount" field indicating the value must be greater than zero.
3. **Given** the modal is open, **When** the user enters a deadline date that is today or in the past, **Then** an error message is displayed below the "Deadline" field indicating the date must be in the future.
4. **Given** any validation error is present, **When** the user checks the form state, **Then** the "Create goal" button remains disabled until all errors are resolved.

---

### User Story 3 - Cancel and close modal (Priority: P3)

The user needs to be able to dismiss the modal without creating a goal, discarding any data they may have entered.

**Why this priority**: This is a standard UX expectation for modals, but does not deliver primary value on its own.

**Independent Test**: Can be tested by opening the modal, filling in partial data, clicking "Cancel" or the close (X) button, and verifying the modal closes and no goal is created.

**Acceptance Scenarios**:

1. **Given** the modal is open with data filled in, **When** the user clicks the "Cancel" button, **Then** the modal closes and no goal is created.
2. **Given** the modal is open with data filled in, **When** the user clicks the close (X) icon, **Then** the modal closes and no goal is created.

---

### Edge Cases

- What happens when the user opens the modal, fills data, closes it, and reopens? Each opening should show a fresh, empty form.
- What happens when the user pastes non-numeric text into the target amount field? The field should reject or sanitize non-numeric input.
- What happens when the user submits with only whitespace in the goal name? Whitespace-only input should be treated as empty and trigger validation.
- What happens on very narrow screens? The modal should adapt responsively, maintaining usability on mobile devices.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a modal overlay when the user triggers the "New Goal" action.
- **FR-002**: The modal MUST contain a form with three fields: "Goal name" (text), "Target amount" (numeric), and "Deadline" (date, optional).
- **FR-003**: System MUST validate that "Goal name" is not empty (ignoring leading/trailing whitespace) before enabling submission.
- **FR-004**: System MUST validate that "Target amount" is a positive number greater than zero before enabling submission.
- **FR-005**: System MUST validate that "Deadline", when provided, is a date strictly greater than the current date.
- **FR-006**: System MUST disable the "Create goal" button when any validation error exists on a required field.
- **FR-007**: System MUST display inline error messages below each invalid field after the user interacts with it.
- **FR-008**: The "Cancel" button MUST close the modal and discard all entered data without creating a goal.
- **FR-009**: The close (X) icon MUST close the modal and discard all entered data without creating a goal.
- **FR-010**: Upon successful submission, the new goal MUST be added to the local goals list and the modal MUST close.
- **FR-011**: The modal MUST be reusable and triggerable from multiple entry points within the application (e.g., topbar "New Goal" button, empty state "Create your first goal" button).
- **FR-012**: System MUST NOT make any API calls or backend requests during the goal creation flow.

### Key Entities

- **Financial Goal**: Represents a savings target defined by the user. Composed of a name (text), a target amount (positive monetary value), and an optional deadline (future date). Does not persist to a backend in this feature.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can open the create goal modal, fill the form, and submit a new goal in under 30 seconds.
- **SC-002**: 100% of validation errors are surfaced to the user before the "Create goal" button becomes enabled.
- **SC-003**: The modal opens and closes without visual glitches or layout shifts on viewport widths from 320px to 1440px.
- **SC-004**: The form resets to its initial (empty) state every time the modal is opened, regardless of prior usage.
- **SC-005**: The same modal component is used via both entry points (topbar button and empty state button) without code duplication.

## Assumptions

- The application already has a goals list view on the home page where newly created goals will be displayed.
- Existing UI components (`app-input`, `app-modal`, `app-button`) are available and provide the necessary styling and behavior primitives.
- The "New Goal" button already exists in the topbar and references the correct component.
- The empty state view on the goals list with the "Create your first goal" button already exists or will be created as part of the broader goals grid feature.
- Monetary values are handled as numeric values without currency conversion or formatting logic in this feature.
- The design system uses the dark theme (`#1f1f1f` background, `#ff5722` accent) as shown in the design file.
