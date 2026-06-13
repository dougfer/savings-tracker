import { Text, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';

type GoalsHeaderProps = {
  title: string;
};

export function GoalsHeader({ title }: GoalsHeaderProps) {
  return (
    <View className="flex-col items-center gap-5 md:flex-row md:justify-between">
      <Text className="font-display-semibold text-heading-lg text-white">
        {title}
      </Text>
      <View className="flex-row gap-4 md:w-auto w-full">
        <View className="flex-1 md:flex-none">
          <AppButton variant="tertiary" className="w-full justify-center border border-neutral-600 md:w-auto">
            <AppButton.Text>Filters</AppButton.Text>
          </AppButton>
        </View>
        <View className="flex-1 md:flex-none">
          <AppButton variant="tertiary" className="w-full justify-center border border-neutral-600 md:w-auto">
            <AppButton.Text>Sort By</AppButton.Text>
          </AppButton>
        </View>
      </View>
    </View>
  );
}
