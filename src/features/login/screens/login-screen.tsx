import { View } from 'react-native';

import { LoginForm } from '../components/login-form';
import { QuoteSection } from '../components/quote-section';

export default function LoginScreen() {

  return (
    <View
      className="flex-1 w-full bg-neutral-900 flex-col items-center px-4 py-10 md:px-16 lg:flex-row lg:gap-20 lg:p-10"
    >
      <QuoteSection />
      <View className="w-full lg:max-w-screen-sm lg:shrink-0">
        <LoginForm />
      </View>
    </View>
  );
}
