import { AppText } from '@/components/ui';

/** Feature-local copy for Overview only — not reused across features (US2 boundary demo). */
export function OverviewHint() {
  return (
    <AppText className="mt-2 text-body-sm text-neutral-300">
      You are on the structural shell. Financial flows ship in later features.
    </AppText>
  );
}
