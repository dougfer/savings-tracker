import { create } from 'zustand';

export type ThemePreference = 'light' | 'dark' | 'system';

type UiPreferencesState = {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
};

/** Non-domain UI preferences only (no financial data). */
export const useUiPreferencesStore = create<UiPreferencesState>((set) => ({
  theme: 'system',
  setTheme: (theme) => set({ theme }),
}));
