# Feature Specification: Goal Details Page

**Feature Branch**: `014-goal-details-page`  
**Created**: 2026-06-16  
**Status**: Draft  
**Input**: User description: "Goal Details Page - Permitir que o usuário visualize todas as informações relacionadas a um objetivo financeiro específico, acompanhe sua evolução por meio dos depósitos realizados e registre novos depósitos enquanto o objetivo estiver em andamento."

Constituição do projeto (produto, UX, UI, conteúdo, mobile-first, a11y, performance, técnico): `.specify/memory/constitution.md`. Requisitos e critérios de sucesso DEVEM permanecer testáveis e alinhados a esses princípios.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View goal details and progress (Priority: P1)

A user selects a specific goal from the goals list and is taken to a dedicated details page. They immediately see all key information: the goal name, creation date, target date, total target amount, amount accumulated so far, percentage completed, and the goal status. A visual progress indicator shows how close they are to reaching their target.

**Why this priority**: This is the core value of the feature — without the ability to view goal details and progress, the user cannot track their savings journey for a specific goal. All other capabilities (deposit form, history) depend on this foundation.

**Independent Test**: Can be fully tested by navigating to the page with mock goal data and verifying all goal information fields are displayed correctly, the progress indicator reflects the ratio of accumulated to target amount, and the status label matches the progress percentage.

**Acceptance Scenarios**:

1. **Given** a goal with 0% progress, **When** the user views the goal details page, **Then** the page displays the goal name, creation date, target date, total target amount, accumulated amount ($0.00), 0% completed, status "In Progress", and a progress bar showing no fill.
2. **Given** a goal with 50% progress (e.g., $500 accumulated of $1,000 target), **When** the user views the goal details page, **Then** the page displays 50% completed, status "In Progress", and a progress bar filled to 50%.
3. **Given** a goal with 100% progress (e.g., $1,000 accumulated of $1,000 target), **When** the user views the goal details page, **Then** the page displays 100% completed, status "Completed", and a progress bar fully filled.
4. **Given** a goal with over 100% progress (e.g., $1,200 accumulated of $1,000 target), **When** the user views the goal details page, **Then** the page displays 100% completed, status "Completed", and a progress bar fully filled.

---

### User Story 2 - View deposit history (Priority: P2)

A user views the list of all deposits made toward a specific goal. Each deposit entry shows the deposited amount, the deposit date, and an optional description. The list adapts to any number of deposits, from zero to many.

**Why this priority**: The deposit history provides transparency and accountability — users need to see their contribution record to understand how they reached their current progress. It is independent from the progress display (P1) but adds critical detail.

**Independent Test**: Can be tested by viewing a goal that has a known set of mock deposits and verifying each deposit's amount, date, and description (when present) is displayed in chronological order.

**Acceptance Scenarios**:

1. **Given** a goal with multiple deposits, **When** the user views the deposit history section, **Then** all deposits are listed in chronological order (most recent first), each showing amount, date, and description (when available).
2. **Given** a goal with a deposit that has no description, **When** the user views the deposit history, **Then** the deposit entry shows amount and date without a description field.
3. **Given** a goal with no deposits yet, **When** the user views the deposit history section, **Then** the section is displayed but contains no deposit entries.

---

### User Story 3 - Register a new deposit (Priority: P3)

A user with an in-progress goal registers a new deposit by entering the deposit amount and an optional description. The form validates the input before allowing submission.

**Why this priority**: Deposits are the mechanism for making progress toward a goal, but the user must first be able to see their goal (P1) and their history (P2) before they can meaningfully add new deposits. The form is only available for goals still in progress.

**Independent Test**: Can be tested by viewing an in-progress goal, filling in the deposit form with valid data, and submitting. The form should accept the input and trigger a deposit registration action (mock in this phase).

**Acceptance Scenarios**:

1. **Given** a goal with status "In Progress", **When** the user views the goal details page, **Then** a deposit form is displayed with fields for amount (required) and description (optional), and a submit button.
2. **Given** the deposit form is visible, **When** the user enters a valid monetary amount greater than zero and clicks submit, **Then** the deposit is registered and the form is ready for another deposit entry.
3. **Given** the deposit form is visible, **When** the user enters a valid amount and an optional description, **Then** the description is accepted and registered along with the deposit.
4. **Given** the deposit form is visible, **When** the user attempts to submit with an empty amount field, **Then** a validation error is shown indicating the amount is required.
5. **Given** the deposit form is visible, **When** the user enters a value of zero or a negative amount, **Then** a validation error is shown indicating the amount must be greater than zero.
6. **Given** the deposit form is visible, **When** the user enters a non-numeric value in the amount field, **Then** a validation error is shown indicating the value must be a valid monetary amount.

---

### User Story 4 - Access goal actions (Priority: P4)

A user sees action buttons for editing and deleting the goal, regardless of the goal's status. These buttons are visually present but do not trigger any logic in this phase.

**Why this priority**: Action buttons provide clear entry points for future editing and deletion flows, but the core viewing, tracking, and depositing functionality (P1-P3) delivers immediate user value. The visual-only implementation is an intentional placeholder.

**Independent Test**: Can be tested by viewing any goal (in progress or completed) and verifying that Edit and Delete buttons, icons, or controls are visible on the page.

**Acceptance Scenarios**:

1. **Given** a goal with status "In Progress", **When** the user views the goal details page, **Then** an "Edit" action control and a "Delete" action control are visible.
2. **Given** a goal with status "Completed", **When** the user views the goal details page, **Then** an "Edit" action control and a "Delete" action control are visible.
3. **Given** the Edit or Delete control is visible, **When** the user interacts with it, **Then** no navigation, modal, or data change occurs (visual-only implementation).

---

### Edge Cases

- What happens when the accumulated amount exceeds the target amount (over-funding)? The progress indicator caps at 100%, and the status shows "Completed."
- What happens when the deposit history has a large number of entries? The list must be scrollable within its container without breaking the page layout.
- What happens when a deposit amount has many decimal places? The amount should be displayed formatted as currency (e.g., two decimal places) per locale conventions.
- What happens when the target amount or accumulated amount is zero? Progress percentage is 0% and the progress indicator shows no fill.
- What happens on narrow screens (mobile)? The layout must stack vertically, with goal information, progress indicator, deposit history, and deposit form arranged in a single-column scrollable layout.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST display the goal name prominently as the primary heading.
- **FR-002**: The page MUST display the goal creation date in a human-readable format.
- **FR-003**: The page MUST display the goal target date (deadline) in a human-readable format.
- **FR-004**: The page MUST display the total target amount formatted as currency.
- **FR-005**: The page MUST display the accumulated amount (sum of all deposits) formatted as currency.
- **FR-006**: The page MUST display the percentage of completion calculated as (accumulated amount / target amount) × 100, capped at 100%.
- **FR-007**: The page MUST display the goal status: "In Progress" when progress is below 100%, "Completed" when progress is 100% or higher.
- **FR-008**: The page MUST display a visual progress indicator that represents the ratio between accumulated amount and target amount.
- **FR-009**: The page MUST display a list of all deposits associated with the goal.
- **FR-010**: Each deposit entry MUST display the deposit amount formatted as currency.
- **FR-011**: Each deposit entry MUST display the deposit date.
- **FR-012**: Each deposit entry MUST display the deposit description when one was provided.
- **FR-013**: The deposit list MUST support a variable number of entries, from zero to many, with scrolling when content exceeds container height.
- **FR-014**: The page MUST display a deposit registration form when the goal status is "In Progress."
- **FR-015**: The deposit form MUST include a required amount field that accepts only valid monetary values greater than zero.
- **FR-016**: The deposit form MUST include an optional description (note) field.
- **FR-017**: The amount field MUST show a validation error when the value is empty, zero, negative, or non-numeric.
- **FR-018**: The deposit form MUST NOT be displayed when the goal status is "Completed."
- **FR-019**: The page MUST display an "Edit" action control, visible regardless of goal status.
- **FR-020**: The page MUST display a "Delete" action control, visible regardless of goal status.
- **FR-021**: The Edit and Delete controls MUST have no functional logic (navigation, data mutation, or otherwise) in this phase.
- **FR-022**: The page MUST be implemented with mock data only; no backend integration or local persistence is required.
- **FR-023**: The page structure MUST support future integration with APIs for goal data, deposit data, and deposit submission.
- **FR-024**: The page structure MUST support future implementation of loading states, error states, and empty states.

### Key Entities

- **Goal**: Represents a financial savings objective. Key attributes include name, creation date, target date, target amount, accumulated amount (derived from deposits), percentage completed (derived), and status (derived from percentage).
- **Deposit**: Represents a monetary contribution toward a goal. Key attributes include amount, date, and an optional description. Each deposit belongs to exactly one goal.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can view all goal information (name, dates, amounts, percentage, status) without scrolling past the initial viewport on desktop screens (above 1024px width).
- **SC-002**: The progress indicator accurately reflects the ratio of accumulated amount to target amount, with percentage calculation matching manual arithmetic within a 1% margin.
- **SC-003**: The deposit history list can display at least 50 entries without visual breakage or layout overflow.
- **SC-004**: The deposit form prevents submission of invalid amounts (empty, zero, negative, non-numeric) in 100% of attempts.
- **SC-005**: A user can distinguish between "In Progress" and "Completed" goals at a glance through visual differentiation of the progress indicator and status label.
- **SC-006**: On mobile devices (viewport width 375px), all sections (goal info, progress, history, deposit form or actions) are fully visible and operable in a single-column scrollable layout.
- **SC-007**: The page renders correctly and all data is displayed across all three breakpoints: mobile (375px), tablet (768px), and desktop (1440px).

## Assumptions

- The goal data (name, dates, amounts, deposits) is available through mock data at implementation time.
- Deposits in the history are displayed in reverse chronological order (most recent first) as a reasonable default for financial tracking.
- Currency formatting follows the US locale ($1,000.00) as the mock data format; locale-aware formatting will be addressed in future backend integration.
- Dates are displayed in a human-readable format (e.g., "Nov 15, 2025") as shown in the design references.
- The progress indicator is represented as a horizontal progress bar with fill proportional to the completion percentage.
- The page is accessed via navigation from the goals grid/page, though navigation itself is out of scope for this feature.
- A back button or navigation control is present to allow returning to the previous page, but its implementation is out of scope.
- The feature targets three responsive breakpoints: mobile (375px+), tablet (768px+), and desktop (1440px+), consistent with the existing project breakpoints.
