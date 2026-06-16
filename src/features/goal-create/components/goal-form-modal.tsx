import { useMemo } from 'react';

import { Text, View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import XCloseIcon from '@/assets/icons/x-close.svg';
import { AppButton, AppInput, AppModal } from '@/components/ui';

import { createGoalSchema, type CreateGoalFormData } from '../schemas/create-goal.schema';

interface GoalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CurrencyAmountFieldProps {
  value: number;
  onChange: (value: number) => void;
  onBlur: () => void;
  isInvalid: boolean;
  isSubmitting: boolean;
  errorMessage?: string;
}

const DECIMAL_PLACES = 2;

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: DECIMAL_PLACES,
  maximumFractionDigits: DECIMAL_PLACES,
});

function digitsToAmount(digits: string): number {
  const padded = digits.padStart(DECIMAL_PLACES + 1, '0');
  const intPart = padded.slice(0, -DECIMAL_PLACES);
  const decPart = padded.slice(-DECIMAL_PLACES);
  return parseFloat(`${intPart}.${decPart}`);
}

function digitsToDisplay(digits: string): string {
  if (digits.length === 0) return '';
  return formatter.format(digitsToAmount(digits));
}

function CurrencyAmountField({
  value,
  onChange,
  onBlur,
  isInvalid,
  isSubmitting,
  errorMessage,
}: CurrencyAmountFieldProps) {
  const rawDigits =
    value > 0 ? value.toFixed(DECIMAL_PLACES).replace('.', '') : '';

  const displayValue = useMemo(() => digitsToDisplay(rawDigits), [rawDigits]);

  const handleChangeText = (text: string) => {
    const digits = text.replace(/\D/g, '');
    onChange(digits.length > 0 ? digitsToAmount(digits) : 0);
  };

  return (
    <AppInput>
      <AppInput.Label>Target amount</AppInput.Label>
      <AppInput.Group isInvalid={isInvalid}>
        <AppInput.Slot name="currency-dollar" />
        <AppInput.Field
          value={displayValue}
          onChangeText={handleChangeText}
          keyboardType="decimal-pad"
          onBlur={onBlur}
          placeholder="0.00"
          editable={!isSubmitting}
          accessibilityLabel="Target amount"
        />
      </AppInput.Group>
      {errorMessage && (
        <View accessibilityLiveRegion="assertive">
          <AppInput.HelperText variant="error">
            {errorMessage}
          </AppInput.HelperText>
        </View>
      )}
    </AppInput>
  );
}

export function GoalFormModal({ isOpen, onClose }: GoalFormModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateGoalFormData>({
    resolver: zodResolver(createGoalSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      amount: 0,
      deadline: '',
    },
  });

  const handleClose = () => {
    reset({ name: '', amount: 0, deadline: '' });
    onClose();
  };

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    handleClose();
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnOverlayClick
      isKeyboardDismissable
    >
      <AppModal.Content className="max-w-[680px] w-full md:max-w-[680px] sm:max-w-[343px] p-8 md:p-8 sm:px-5 sm:py-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="font-sans-semibold text-xl md:text-xl sm:text-2xl text-neutral-0">
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
              <CurrencyAmountField
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={!!errors.amount}
                isSubmitting={isSubmitting}
                errorMessage={errors.amount?.message}
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
