import { AppScreen } from '@/components/layout/AppScreen';
import { AppText, AppButton, AppInput, AppCheckbox } from '@/components/ui';
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
        <AppInput.Label>Amount</AppInput.Label>
        <AppInput.Group>
          <AppInput.Slot name="currency-dollar" />
          <AppInput.Field placeholder="0.00" />
        </AppInput.Group>
        <AppInput.HelperText variant="default">Hint</AppInput.HelperText>
      </AppInput>
      <AppCheckbox value="terms">
        <AppCheckbox.Indicator />
        <AppCheckbox.Label>I agree to the terms</AppCheckbox.Label>
      </AppCheckbox>
      <OverviewHint />
    </AppScreen>
  );
}
