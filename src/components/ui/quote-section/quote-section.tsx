import { Text, View } from "react-native";

import { VectorPatternIcon } from "@/assets/icons";
import { GradientContainer } from "@/components/ui/gradient-container";

type QuoteSectionProps = {
  quote: string;
  attribution: string;
};

export function QuoteSection({ quote, attribution }: QuoteSectionProps) {
  return (
    <GradientContainer className="hidden flex-1 h-full max-w-[45%] desktop:flex">
      <View className="absolute bottom-[-100] right-[-100] opacity-15">
        <VectorPatternIcon width={464} height={464} color="#FFFFFF" />
      </View>
      <View className="px-10 py-5 flex flex-1">

        <View className="flex-1 justify-center gap-8">
          <Text
            className="font-display text-display-md text-neutral-0"
            style={{ lineHeight: 64 }}
          >
            {quote}
          </Text>
        </View>

        <Text className="absolute bottom-10 left-10 font-sans-semibold text-heading-sm text-neutral-0/80">
          {attribution}
        </Text>
      </View>
    </GradientContainer>
  );
}
