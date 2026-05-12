import type { ReactNode } from 'react';

/** Reserved host for future toast/snackbar integration (cross-cutting feedback). */
export function ToastHost(_props: { children?: ReactNode }) {
  return null;
}
