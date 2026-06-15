import { Text, View } from 'react-native';

import { PlusIcon } from '@/assets/icons';
import { AppButton } from '@/components/ui/app-button';

export function EmptyState() {
  return (
    <View className="rounded-2xl border border-neutral-600">
      <View className="gap-8 px-0 py-10 md:px-0 md:py-10 items-center">
        <View className="gap-5 items-center">
          <View className="size-10 rounded-full bg-neutral-800 items-center justify-center">
            <PlusIcon width={24} height={24} color="#B7B7B7" />
          </View>
          <View className="gap-2 items-center">
            <Text className="font-sans-semibold text-heading-md text-white text-center">
              Você ainda não possui objetivos financeiros.
            </Text>
            <Text className="font-sans text-body-sm text-neutral-400 text-center max-w-[512px]">
              Crie seu primeiro objetivo para começar a acompanhar suas metas.
            </Text>
          </View>
        </View>

        <View>
          <AppButton variant="primary">
            <AppButton.Text>Create your first goal</AppButton.Text>
          </AppButton>
        </View>
      </View>
    </View>
  );
}
