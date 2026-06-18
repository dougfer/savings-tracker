import { View } from 'react-native';

import { GradientContainer } from '@/components/ui';
import { AppText } from '@/components/ui/app-text';
import { useResponsive } from '@/hooks/useResponsive';

import { formatCurrency } from '../utils/format-currency';

type TotalSavingsCardProps = {
  totalSavings: number;
};

export function TotalSavingsCard({ totalSavings }: TotalSavingsCardProps) {
  const { isDesktop } = useResponsive();

  return (
    <GradientContainer
      viewProps={{
        accessibilityRole: 'summary',
        accessibilityLabel: `Total savings: ${formatCurrency(totalSavings)}`,
      }}
    >
      <View className="flex-1 justify-center p-5">
        <AppText className="font-sans-semibold text-body text-white">
          Total savings
        </AppText>
        <View className="mt-8">
          <AppText
            className={`font-display-semibold leading-none text-white ${
              isDesktop ? 'text-display-lg' : 'text-display-md'
            }`}
          >
            {formatCurrency(totalSavings)}
          </AppText>
        </View>
      </View>
    </GradientContainer>
  );
}
