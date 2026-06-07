import { Pressable, Text, View } from 'react-native';

import { Link } from 'expo-router';

import { AppScreen } from '@/components/layout/AppScreen';
import { AppText, AppButton, AppInput, AppCheckbox, AppDropdownMenu } from '@/components/ui';

export default function OverviewPlaceholderScreen() {
  return (
    <AppScreen>
                <Link href="/sign-up" asChild>
            <Pressable>
              <Text className="font-sans-semibold text-body text-orange-400">
                Create one
              </Text>
            </Pressable>
          </Link>
    </AppScreen >
  );
}
