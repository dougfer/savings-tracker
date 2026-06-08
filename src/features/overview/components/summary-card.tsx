import { View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { VectorPatternIcon } from '@/assets/icons';

type SummaryCardProps = {
  label: string;
  value: number;
  valueColor: string;
  showPattern?: boolean;
};

export function SummaryCard({
  label,
  value,
  valueColor,
  showPattern = true,
}: SummaryCardProps) {
  const isEmpty = value === 0;
  const color = isEmpty ? '#B7B7B7' : valueColor;

  return (
    <View
      className="flex-1 justify-center overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-800 p-5"
      accessibilityRole="summary"
      accessibilityLabel={`${label}: ${value}`}
    >
      <AppText className="font-sans-semibold text-body text-white">{label}</AppText>
      <View className="mt-8">
        <AppText
          className="font-display-semibold text-display-lg leading-none"
          style={{ color }}
        >
          {String(value)}
        </AppText>
      </View>
      {showPattern && (
        <View className="pointer-events-none absolute -bottom-24 -right-14 opacity-[0.03]">
          <VectorPatternIcon width={200} height={200} color="#FFFFFF" />
        </View>
      )}
    </View>
  );
}
