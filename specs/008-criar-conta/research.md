# Research: Criar Conta

**Feature**: Criar Conta (Create Account)  
**Date**: 2026-06-06  
**Status**: Complete

## Research Topics

### 1. QuoteSection Extraction to Shared Component

**Decision**: Extract `QuoteSection` from `src/features/login/components/quote-section.tsx` to `src/components/ui/quote-section/` as a reusable component.

**Rationale**:
- The sign-up design (desktop variant `V2Cts`) includes a decorative quote panel identical in structure to the login's `QuoteSection`, differing only in text content (quote, author attribution) and dimensions.
- The login screen already uses this component; extracting it avoids duplication and follows DRY principles.
- Making text configurable via props (`quote`, `author`) aligns with the user's explicit instruction: "Poderá passar o componente @src\features\login\components\quote-section.tsx para a pasta de componentes globais, para que ele seja reaproveitado, deixando somente os textos como props."

**Alternatives considered**:
- Copy/paste a duplicate `QuoteSection` in sign-up feature — rejected due to code duplication.
- Inline the quote section in both screens — rejected due to poor separation of concerns.

**Implementation notes**:
- New path: `src/components/ui/quote-section/quote-section.tsx`
- Props: `quote: string`, `attribution: string`
- Login form updates to pass `"The goal isn't to be rich.\nIt's to have enough."` and `"— Morgan Housel"`
- Sign-up form passes `"Do not save what is left \nafter spending, but spend what \nis left after saving."` and `"– Warren Buffett"` per design node `V2Cts`
- SVG gradient and VectorPatternIcon decoration remain unchanged
- Responsive behavior (`hidden lg:flex`, `max-w-[45%]`, `rounded-2xl`) stays the same

---

### 2. Form State Management (react-hook-form + zod)

**Decision**: Use `react-hook-form` with `zod` validation via `@hookform/resolvers`.

**Rationale**:
- User explicitly requested: "Utilizar stacks já instaladas no repositório para o formulário, como zod e react-hook-form."
- `react-hook-form` and `zod` are already installed in the project (visible in the exploration results).
- This pattern is standard for performant, schema-driven form validation in React Native.
- Provides built-in support for: `useForm`, `Controller`, `formState.errors`, `handleSubmit`, `isSubmitting`.
- Zod schema enables runtime validation matching FR-003 through FR-008.

**Alternatives considered**:
- Manual `useState` + custom validation (as used in current `login-form.tsx`) — rejected because the user requested react-hook-form + zod for the sign-up form specifically.
- Formik — not installed, would add unnecessary dependency.

**Implementation notes**:
- Schema file: `src/lib/schemas/sign-up.schema.ts`
- Schema fields: `name` (min 1 char, required), `email` (RFC 5322 email validation), `password` (min 8 chars), `confirmPassword` (must match password)
- Form component uses `useForm<SignUpFormData>({ resolver: zodResolver(signUpSchema) })`
- Each field wrapped with `Controller` rendering `AppInput` components
- `handleSubmit` provides form state including `isSubmitting` for button loading state

---

### 3. Design-to-Code Mapping

**Decision**: Map the .pen design to code following established patterns from the login implementation.

**Rationale**:
- The three sign-up design variants (V2Cts desktop 1440x900, LY507 tablet 768x960, R2tpY7 mobile 375x812) establish the layout for each breakpoint.
- Desktop: side-by-side layout (QuoteSection left, Form right) with `gap: 80`, `padding: [40, 80, 40, 40]`, centered
- Tablet: vertical stacked layout, `padding: 64`, `gap: 48`, no QuoteSection (only form)
- Mobile: vertical stacked layout, `padding: [0, 16]`, no QuoteSection (only form)
- The login screen already implements this responsive pattern with `flex-col lg:flex-row`

**Alternatives considered**:
- Separate screen files per breakpoint — rejected; the project convention (login-screen.tsx) uses responsive classes for a single screen component.

**Implementation notes**:
- Screen layout: `className="flex-1 w-full bg-neutral-900 flex-col items-center px-4 py-10 md:px-16 lg:flex-row lg:gap-20 lg:p-10"` (matches login-screen)
- QuoteSection shown only on `lg:` breakpoints (matches login)
- Form width: `className="w-full lg:max-w-screen-sm lg:shrink-0"` (matches login)
- Form content: Logo at top, heading "Create account" / subtitle "Fill in your details to create an account", then the 4 input fields, button "Create account", link "Already have an account? Sign in"

---

### 4. Field Icons Configuration

**Decision**: Use appropriate icons per field type from the existing AppInput icon set.

**Rationale**:
- The design file shows generic icons (currency-dollar reused across all fields) — this appears to be a design artifact; actual implementation should use semantically appropriate icons.
- Login form precedent: email field uses `mail-01`, password field uses `lock` icon.
- Name field: `user` icon (available in icon set or can use `user-01` variant)
- Email field: `mail-01` (matches login)
- Password fields: `lock` (matches login pattern)
- Confirm password field: `lock` (same as password)

**Alternatives considered**:
- Follow the design literally with currency-dollar icons — rejected; semantically incorrect.
- No icons — rejected; reduces visual consistency with login.

---

### 5. Validation Rules (from Spec FRs)

**Decision**: Implement the following validation rules via zod schema:

| Field | Rule | Source |
|-------|------|--------|
| Name | Required, trim, min 1 char after trim | FR-004, FR-008 |
| Email | Required, RFC 5322 format, trim | FR-003, FR-008 |
| Password | Required, min 8 chars | FR-005 |
| Confirm Password | Required, must match password | FR-006 |

**Rationale**: Direct mapping from the approved specification. Password minimum of 8 characters was resolved in the clarifications session.

---

### 6. No External Dependencies Needed

**Decision**: No new packages required.

**Rationale**: All dependencies (Expo, React Native, NativeWind, Gluestack UI, react-hook-form, zod, @hookform/resolvers, react-native-svg) are already installed and used by existing features.
