import { useMemo } from 'react';

import { View } from 'react-native';

import { AppInput } from '@/components/ui/app-input';

interface AppCurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  onBlur: () => void;
  isInvalid: boolean;
  editable?: boolean;
  errorMessage?: string;
  label: string;
}

const DECIMAL_PLACES = 2;

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: DECIMAL_PLACES,
  maximumFractionDigits: DECIMAL_PLACES,
});

function digitsToAmount(digits: string): number {
  const padded = digits.padStart(DECIMAL_PLACES + 1, '0');
  const intPart = padded.slice(0, -DECIMAL_PLACES);
  const decPart = padded.slice(-DECIMAL_PLACES);
  return parseFloat(`${intPart}.${decPart}`);
}

function digitsToDisplay(digits: string): string {
  if (digits.length === 0) return '';
  return formatter.format(digitsToAmount(digits));
}

export function AppCurrencyInput({
  value,
  onChange,
  onBlur,
  isInvalid,
  editable = true,
  errorMessage,
  label,
}: AppCurrencyInputProps) {
  const rawDigits =
    value > 0 ? value.toFixed(DECIMAL_PLACES).replace('.', '') : '';

  const displayValue = useMemo(() => digitsToDisplay(rawDigits), [rawDigits]);

  const handleChangeText = (text: string) => {
    const digits = text.replace(/\D/g, '');
    onChange(digits.length > 0 ? digitsToAmount(digits) : 0);
  };

  return (
    <AppInput>
      <AppInput.Label>{label}</AppInput.Label>
      <AppInput.Group isInvalid={isInvalid}>
        <AppInput.Slot name="currency-dollar" />
        <AppInput.Field
          value={displayValue}
          onChangeText={handleChangeText}
          keyboardType="decimal-pad"
          onBlur={onBlur}
          placeholder="0.00"
          editable={editable}
          accessibilityLabel={label}
        />
      </AppInput.Group>
      {errorMessage && (
        <View accessibilityLiveRegion="assertive">
          <AppInput.HelperText variant="error">
            {errorMessage}
          </AppInput.HelperText>
        </View>
      )}
    </AppInput>
  );
}

AppCurrencyInput.displayName = 'AppCurrencyInput';
