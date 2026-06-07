import { useRef } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { AppText } from '@/components/ui/app-text';

let gradientCounter = 0;

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
  const gradientId = useRef(`p${++gradientCounter}`).current;

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
        <View
          className="pointer-events-none absolute -bottom-24 -right-14"
          style={{ opacity: 0.03 }}
        >
          <Svg width={200} height={200} viewBox="0 0 200 200">
            <Defs>
              <LinearGradient id={gradientId} x1="200" y1="100" x2="0" y2="100">
                <Stop offset="0" stopColor="#FFFFFF" stopOpacity="1" />
                <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
              </LinearGradient>
            </Defs>
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M107.143 0H92.8571V82.7556L34.3401 24.2385L24.2386 34.3401L82.7556 92.8571H0V107.143H82.7555L24.2386 165.66L34.3401 175.761L92.8571 117.244V200H107.143V117.244L165.66 175.761L175.761 165.66L117.244 107.143H200V92.8571H117.244L175.761 34.34L165.66 24.2385L107.143 82.7555V0Z"
              fill={`url(#${gradientId})`}
            />
          </Svg>
        </View>
      )}
    </View>
  );
}
