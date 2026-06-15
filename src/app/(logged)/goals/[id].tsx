import { Text, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

export default function GoalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 bg-neutral-900 items-center justify-center gap-4">
      <Text className="text-white font-display-semibold text-heading-md">
        Goal Detail
      </Text>
      <Text className="text-neutral-400 font-sans text-body-sm">
        ID: {id}
      </Text>
      <Text className="text-neutral-500 font-sans text-caption mt-4">
        (Mock data — implementation pending)
      </Text>
    </View>
  );
}
