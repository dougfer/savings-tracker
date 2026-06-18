import { View } from "react-native";

import { QuoteSection } from "@/components/ui/quote-section";

import { SignUpForm } from "../components/sign-up-form";

export default function SignUpScreen() {
  return (
    <View className="flex-1 bg-neutral-900">
      <View className="w-full max-w-[1600px] flex-1 self-center flex-col items-center px-4 py-10 tablet:px-16 desktop:flex-row desktop:gap-20 desktop:p-10">
        <QuoteSection
          quote={`"Do not save what is left after spending, but spend what \nis left after saving."`}
          attribution="– Warren Buffett"
        />
        <View className="w-full desktop:max-w-screen-tablet desktop:shrink-0">
          <SignUpForm />
        </View>
      </View>
    </View>
  );
}
