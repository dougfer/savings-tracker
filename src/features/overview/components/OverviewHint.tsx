import { AppText } from '@/components/ui';

/** Feature-local copy for Overview only — not reused across features (US2 boundary demo). */
export function OverviewHint() {
  return (
    <AppText fontSize="$sm" color="$textLight500" mt="$2">
      You are on the structural shell. Financial flows ship in later features.
    </AppText>
  );
}
