import { Text, View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import XCloseIcon from '@/assets/icons/x-close.svg';
import { AppButton } from '@/components/ui/app-button';
import { AppCurrencyInput } from '@/components/ui/app-currency-input';
import { AppInput } from '@/components/ui/app-input';
import { AppModal } from '@/components/ui/app-modal';

import { createGoalSchema, type CreateGoalFormData } from '../schemas/create-goal.schema';

interface GoalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GoalFormModal({ isOpen, onClose }: GoalFormModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateGoalFormData>({
    resolver: zodResolver(createGoalSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      amount: 0,
      deadline: '',
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (_data: CreateGoalFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // TODO: persist data to goals list
    handleClose();
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnOverlayClick
      isKeyboardDismissable
    >
      <AppModal.Content className="max-w-[680px] w-full p-8">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="font-sans-semibold text-xl text-neutral-0">
            New goal
          </Text>
          <AppModal.CloseButton onPress={handleClose}>
            <XCloseIcon width={20} height={20} color="#898A8B" />
          </AppModal.CloseButton>
        </View>
        <View className="gap-5">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput>
                <AppInput.Label>Goal name</AppInput.Label>
                <AppInput.Group isInvalid={!!errors.name}>
                  <AppInput.Field
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="e.g. MacBook Pro M4"
                    autoCapitalize="sentences"
                    editable={!isSubmitting}
                    accessibilityLabel="Goal name"
                  />
                </AppInput.Group>
                {errors.name && (
                  <View accessibilityLiveRegion="assertive">
                    <AppInput.HelperText variant="error">
                      {errors.name.message}
                    </AppInput.HelperText>
                  </View>
                )}
              </AppInput>
            )}
          />

          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppCurrencyInput
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={!!errors.amount}
                editable={!isSubmitting}
                errorMessage={errors.amount?.message}
                label="Target amount"
              />
            )}
          />

          <Controller
            control={control}
            name="deadline"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput>
                <AppInput.Label>Deadline (optional)</AppInput.Label>
                <AppInput.Group isInvalid={!!errors.deadline}>
                  <AppInput.Slot name="calendar" />
                  <AppInput.Field
                    value={value ?? ''}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="YYYY-MM-DD"
                    editable={!isSubmitting}
                    accessibilityLabel="Deadline"
                  />
                </AppInput.Group>
                {errors.deadline && (
                  <View accessibilityLiveRegion="assertive">
                    <AppInput.HelperText variant="error">
                      {errors.deadline.message}
                    </AppInput.HelperText>
                  </View>
                )}
              </AppInput>
            )}
          />
        </View>

        <View className="flex-row justify-end gap-4 mt-6">
          <AppButton
            variant="secondary"
            onPress={handleClose}
            isDisabled={isSubmitting}
            accessibilityLabel="Cancel"
          >
            Cancel
          </AppButton>
          <AppButton
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            accessibilityLabel="Create goal"
          >
            Create goal
          </AppButton>
        </View>
      </AppModal.Content>
    </AppModal>
  );
}
