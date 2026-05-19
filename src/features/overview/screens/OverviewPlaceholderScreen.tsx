import { AppScreen } from '@/components/layout/AppScreen';
import { AppText, AppButton, AppInput } from '@/components/ui';
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
      <AppInput>
        <AppInput.Label>Label</AppInput.Label>
        <AppInput.Group>
          <AppInput.Slot name="currency-dollar" />
          <AppInput.Field placeholder="Placeholder" />
        </AppInput.Group>
        <AppInput.HelperText>
          Helper text
        </AppInput.HelperText>
      </AppInput>
      <OverviewHint />
    </AppScreen>
  );
}
