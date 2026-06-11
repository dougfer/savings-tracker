import { useRef, useState } from 'react';
import { type LayoutChangeEvent, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { AppText } from '@/components/ui/app-text';
import { useResponsive } from '@/hooks/useResponsive';
import { formatCurrency } from '../utils/format-currency';

type TotalSavingsCardProps = {
  totalSavings: number;
};

let gradientCounter = 0;

export function TotalSavingsCard({ totalSavings }: TotalSavingsCardProps) {
  const { isDesktop } = useResponsive();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const gradientId = useRef(`totalSavingsGradient-${++gradientCounter}`).current;

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setSize({ width, height });
    }
  };

  return (
    <View
      className="relative flex-1 justify-center overflow-hidden rounded-2xl border border-white/30 p-5"
      onLayout={onLayout}
      accessibilityRole="summary"
      accessibilityLabel={`Total savings: ${formatCurrency(totalSavings)}`}
    >
      {size.width > 0 && (
        <Svg
          width={size.width}
          height={size.height}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <Defs>
            <LinearGradient
              id={gradientId}
              x1="1"
              y1="0"
              x2="0"
              y2="0"
            >
              <Stop offset="0" stopColor="#FF5722" stopOpacity="1" />
              <Stop offset="1" stopColor="#B92B09" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width={size.width}
            height={size.height}
            fill={`url(#${gradientId})`}
          />
        </Svg>
      )}
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
  );
}
