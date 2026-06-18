import { View } from "react-native";

import { LoginForm } from "../components/login-form";
import { QuoteSection } from "../components/quote-section";

export default function LoginScreen() {
  return (
    <View className="flex-1 bg-neutral-900">
      <View className="w-full max-w-[1600px] flex-1 self-center flex-col items-center px-4 py-10 tablet:px-16 desktop:flex-row desktop:gap-20 desktop:p-10">
        <QuoteSection
          quote={"\"The goal isn't to be rich.\nIt's to have enough.\""}
          attribution="— Morgan Housel"
        />
        <View className="w-full desktop:max-w-screen-tablet desktop:shrink-0">
          <LoginForm />
        </View>
      </View>
    </View>
  );
}
