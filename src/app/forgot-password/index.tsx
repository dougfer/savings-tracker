import { Text, View } from 'react-native';

import { Link } from 'expo-router';

export default function ForgotPasswordPlaceholderScreen() {
  return (
    <View className="flex-1 bg-neutral-900 items-center justify-center gap-4 px-6">
      <Text className="font-display text-display-md text-neutral-0 mb-2">
        Em breve
      </Text>
      <Text className="font-sans-medium text-body text-neutral-300 text-center">
        O fluxo de recuperação de senha será implementado em uma feature futura.
      </Text>
      <Link href="/login/index" asChild>
        <Text className="font-sans-semibold text-body text-orange-400">
          Voltar para o login
        </Text>
      </Link>
    </View>
  );
}
