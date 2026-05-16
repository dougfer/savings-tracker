import { AppText, AppButton } from '@/components/ui';
import { AppScreen } from '@/components/layout/AppScreen';
import { OverviewHint } from '@/features/overview/components/OverviewHint';

export default function OverviewPlaceholderScreen() {
  return (
    <AppScreen>
      <AppText fontSize="$xl" fontWeight="$bold" mb="$4" accessibilityRole="header">
        Savings Tracker — foundation
      </AppText>
      <AppText>
        Structural shell only. Pick an area to open its placeholder route.
      </AppText>
      <AppButton variant="primary" >
        <AppButton.Text>Open Overview</AppButton.Text>
      </AppButton>
      <OverviewHint />
    </AppScreen>
  );
}
