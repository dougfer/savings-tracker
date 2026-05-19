import { AppScreen } from '@/components/layout/AppScreen';
import { AppText, AppButton, AppAvatar } from '@/components/ui';
import { OverviewHint } from '@/features/overview/components/OverviewHint';

export default function OverviewPlaceholderScreen() {
  return (
    <AppScreen>
      <AppText
        className="text-xl font-bold mb-4" accessibilityRole="header">
        Savings Tracker — foundation
      </AppText>
      <AppText>Structural shell only. Pick an area to open its placeholder route.</AppText>
      <AppButton variant="secondary">Open Overview</AppButton>
      <AppAvatar>
        <AppAvatar.FallbackText>AH</AppAvatar.FallbackText>
      </AppAvatar>
      <OverviewHint />
    </AppScreen>
  );
}
