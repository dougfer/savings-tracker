import { View } from 'react-native';

import { QuoteSection } from '@/components/ui/quote-section';

import { SignUpForm } from '../components/sign-up-form';

export default function SignUpScreen() {
  return (
    <View className="flex-1 w-full bg-neutral-900 flex-col items-center px-4 py-10 md:px-16 lg:flex-row lg:gap-20 lg:p-10">
      <QuoteSection
        quote={`"Do not save what is left after spending, but spend what \nis left after saving."`}
        attribution="– Warren Buffett"
      />
      <View className="w-full lg:max-w-screen-sm lg:shrink-0">
        <SignUpForm />
      </View>
    </View>
  );
}
