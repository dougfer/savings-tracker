# Data Model: Criar Conta

**Feature**: Criar Conta (Create Account)  
**Date**: 2026-06-06  
**Status**: Complete

## Overview

This feature is frontend-only — no backend integration, no data persistence. The data model is scoped to form state management within the React component lifecycle.

## Entities

### SignUpFormData

Represents the data captured by the sign-up form. Managed entirely by `react-hook-form` during the user session. Not persisted.

| Field | Type | Required | Validation | Default |
|-------|------|----------|------------|---------|
| `name` | `string` | Yes | Non-empty after trim | `""` |
| `email` | `string` | Yes | RFC 5322 email format, trim | `""` |
| `password` | `string` | Yes | Minimum 8 characters | `""` |
| `confirmPassword` | `string` | Yes | Must match `password` | `""` |

**Zod Schema** (`src/lib/schemas/sign-up.schema.ts`):

```typescript
import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório'),
  email: z.string().trim().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não conferem',
  path: ['confirmPassword'],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
```

### FormState

Represents the visual state of the form during user interaction. Derived from `react-hook-form` state.

| State | Description | Trigger |
|-------|-------------|---------|
| `idle` | Form ready for input, no errors visible (fields untouched) | Initial render |
| `editing` | User is actively typing in fields; validation shown on blur only | Field focus events |
| `validating` | Field-level validation running after blur | onBlur events |
| `submitting` | Form submitted; button shows loading spinner; all fields disabled | `handleSubmit` called with valid data |
| `success` | Submission completed; success feedback shown; fields re-enabled | After simulated submission delay |
| `error` | One or more fields have validation errors; inline messages visible | `formState.errors` populated |

**State transitions**:
```
idle → editing → (blur) → validating → editing or error
idle → (submit with empty fields) → error
editing → (submit valid data) → submitting → success
editing → (submit invalid data) → error
```

## Relationships

- No relationships to other entities — this feature is self-contained with no data persistence.
- The `SignUpFormData` entity is consumed only by the `SignUpForm` component and never persisted or transmitted.
- The `SignUpFormData` has no relationship to `Credenciais de Login` or `Sessão de Usuário` (those belong to the auth feature, out of scope for this feature).

## Data Flow

```
User Input → react-hook-form field state → zod validation → formState.errors (inline display)
                                                       → formState.isValid → handleSubmit → simulated submit → success feedback
```

No data is sent to any external service. The submit handler is a placeholder that:
1. Sets `isSubmitting = true` for ~1.5 seconds (simulated delay)
2. Shows success feedback on the button
3. Resets `isSubmitting = false`
