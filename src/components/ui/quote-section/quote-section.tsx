import { useRef, useState } from "react";

import { type LayoutChangeEvent, Text, View } from "react-native";

import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

import { VectorPatternIcon } from "@/assets/icons";

type QuoteSectionProps = {
  quote: string;
  attribution: string;
};

let gradientCounter = 0;

export function QuoteSection({ quote, attribution }: QuoteSectionProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const gradientId = useRef(`quoteGradient-${++gradientCounter}`).current;

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setSize({ width, height });
    }
  };

  return (
    <View
      className="relative hidden h-full max-w-[45%] flex-1 justify-center overflow-hidden rounded-2xl border border-white/30 px-10 py-5 lg:flex"
      onLayout={onLayout}
    >
      {size.width > 0 && (
        <Svg
          width={size.width}
          height={size.height}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <Defs>
            <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#B92B09" stopOpacity="1" />
              <Stop offset="1" stopColor="#FF5722" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width={size.width} height={size.height} fill={`url(#${gradientId})`} />
        </Svg>
      )}

      <View className="absolute bottom-[-100] right-[-100] opacity-15">
        <VectorPatternIcon width={464} height={464} color="#FFFFFF" />
      </View>

      <View className="flex-1 justify-center gap-8">
        <Text
          className="my-auto font-display text-display-lg text-neutral-0"
          style={{ lineHeight: 64 }}
        >
          {quote}
        </Text>
        <Text className="font-sans-semibold text-heading-sm text-neutral-0/80">{attribution}</Text>
      </View>
    </View>
  );
}
