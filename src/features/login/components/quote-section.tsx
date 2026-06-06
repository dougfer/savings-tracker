import { Text, View } from 'react-native';

import { VectorIcon } from '@/assets/icons';

export function QuoteSection() {
  return (
    <View className="flex-1 hidden lg:flex rounded-2xl border border-white/30 overflow-hidden bg-orange-400 py-5 px-10 justify-center relative">
      <View className="absolute right-0 bottom-0 opacity-15">
        <VectorIcon width={464} height={464} color="#FFFFFF" />
      </View>
      <View className="gap-8">
        <Text
          className="font-display text-display-lg text-neutral-0"
          style={{ lineHeight: 64 }}>
          &quot;The goal isn&apos;t to be rich.{'\n'}It&apos;s to have enough.&quot;
        </Text>
        <Text className="font-sans-semibold text-heading-sm text-neutral-0/80">
          — Morgan Housel
        </Text>
      </View>
    </View>
  );
}
