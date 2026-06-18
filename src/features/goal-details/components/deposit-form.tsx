import { View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { AppButton } from '@/components/ui/app-button';
import { AppCurrencyInput } from '@/components/ui/app-currency-input';
import { AppInput } from '@/components/ui/app-input';

import { depositSchema, type DepositFormValues } from '../schemas/deposit.schema';

interface DepositFormProps {
  onSubmit: (data: DepositFormValues) => void;
}

export function DepositForm({ onSubmit }: DepositFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    mode: 'onBlur',
    defaultValues: {
      amount: 0,
      description: '',
    },
  });

  const handleFormSubmit = async (data: DepositFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSubmit(data);
    reset();
  };

  return (
    <View className="gap-5">
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
            label="Deposit amount"
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput>
            <AppInput.Label>Description (optional)</AppInput.Label>
            <AppInput.Group>
              <AppInput.Field
                value={value ?? ''}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="e.g. Monthly savings"
                editable={!isSubmitting}
                accessibilityLabel="Deposit description"
              />
            </AppInput.Group>
          </AppInput>
        )}
      />

      <AppButton
        variant="primary"
        onPress={handleSubmit(handleFormSubmit)}
        isLoading={isSubmitting}
        accessibilityLabel="Add deposit"
      >
        Add deposit
      </AppButton>
    </View>
  );
}
