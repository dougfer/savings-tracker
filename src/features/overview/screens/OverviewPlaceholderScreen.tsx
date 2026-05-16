import { AppText } from '@/components/ui';
import { AppScreen } from '@/components/layout/AppScreen';
import { OverviewHint } from '@/features/overview/components/OverviewHint';

export default function OverviewPlaceholderScreen() {
  return (
    <AppScreen>
      <AppText fontSize="$xl" fontWeight="$bold" mb="$4" accessibilityRole="header">
        Savings Tracker — foundation
      </AppText>
      <AppText mb="$4" color="$textLight600">
        Structural shell only. Pick an area to open its placeholder route.
      </AppText>
      <OverviewHint />
    </AppScreen>
  );
}
