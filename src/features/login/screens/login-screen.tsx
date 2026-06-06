import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { QuoteSection } from '../components/quote-section';
import { LoginForm } from '../components/login-form';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1 bg-neutral-900 flex-col items-center justify-center px-4 py-0 md:px-16 lg:flex-row lg:gap-20 lg:px-10 lg:py-10"
    >
      <QuoteSection />
      <View className="w-full lg:max-w-[640px] lg:flex-shrink-0">
        <LoginForm />
      </View>
    </View>
  );
}
