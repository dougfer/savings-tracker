import { useState } from 'react';

import { View } from 'react-native';

import { Logo, LogoIcon, PlusIcon } from '@/assets/icons';
import { AppButton } from '@/components/ui/app-button';
import { GoalFormModal } from '@/features/goal-create';

export function Topbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <View className="flex-row w-full items-center justify-between border-b border-neutral-800 border-x-0 py-3 px-6 md:h-20 md:py-4 sm:px-4">
        <View
          className="flex-row items-center gap-2.5"
          accessibilityRole="header"
          accessibilityLabel="Savings Tracker"
        >
          <View className="md:hidden">
            <LogoIcon width={40} height={40} />
          </View>
          <View className="hidden md:flex">
            <Logo width={230} height={40} />
          </View>
        </View>

        <AppButton
          variant="primary"
          onPress={() => setIsModalOpen(true)}
          accessibilityLabel="New goal"
        >
          <PlusIcon width={20} height={20} color="#101010" />
          New goal
        </AppButton>
      </View>
      <GoalFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
