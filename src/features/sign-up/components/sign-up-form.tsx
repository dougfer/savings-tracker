import { useState } from "react";

import { Pressable, Text, View } from "react-native";

import { Link } from "expo-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { EyeOffIcon, EyeOnIcon, Logo } from "@/assets/icons";
import { AppButton, AppInput } from "@/components/ui";
import { signUpSchema, type SignUpFormData } from "@/lib/schemas/sign-up.schema";

export function SignUpForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 2000);
  };

  return (
    <View className="w-full gap-8 p-0">
      <View className="gap-10">
        <View className="flex-row gap-2.5">
          <Logo />
        </View>

        <View className="gap-2">
          <Text className="font-sans-bold text-heading-lg text-neutral-0">Create your account</Text>
          <Text className="font-sans-medium text-body text-neutral-300">
            Start tracking your savings goals
          </Text>
        </View>
      </View>

      <View className="h-px w-full bg-neutral-700" />

      <View className="gap-5">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput>
              <AppInput.Label>Full name</AppInput.Label>
              <AppInput.Group isInvalid={!!errors.name}>
                <AppInput.Field
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                  autoComplete="name"
                  textContentType="name"
                  editable={!isSubmitting}
                  accessibilityLabel="Name"
                />
              </AppInput.Group>
              {errors.name && (
                <View accessibilityLiveRegion="assertive">
                  <AppInput.HelperText variant="error">{errors.name.message}</AppInput.HelperText>
                </View>
              )}
            </AppInput>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput>
              <AppInput.Label>E-mail address</AppInput.Label>
              <AppInput.Group isInvalid={!!errors.email}>
                <AppInput.Slot name="mail-01" />
                <AppInput.Field
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  editable={!isSubmitting}
                  accessibilityLabel="E-mail"
                />
              </AppInput.Group>
              {errors.email && (
                <View accessibilityLiveRegion="assertive">
                  <AppInput.HelperText variant="error">{errors.email.message}</AppInput.HelperText>
                </View>
              )}
            </AppInput>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput>
              <AppInput.Label>Password</AppInput.Label>
              <AppInput.Group isInvalid={!!errors.password}>
                <AppInput.Slot name="lock" />
                <AppInput.Field
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Minimum 8 characters"
                  secureTextEntry={!isPasswordVisible}
                  autoComplete="new-password"
                  textContentType="newPassword"
                  editable={!isSubmitting}
                  accessibilityLabel="Senha"
                />
                <Pressable
                  className="p-1"
                  accessibilityRole="button"
                  accessibilityLabel={isPasswordVisible ? "Hide password" : "Show password"}
                  onPress={() => setIsPasswordVisible((v) => !v)}
                >
                  {isPasswordVisible ? (
                    <EyeOffIcon width={20} height={20} color="#B7B7B7" />
                  ) : (
                    <EyeOnIcon width={20} height={20} color="#B7B7B7" />
                  )}
                </Pressable>
              </AppInput.Group>
              {errors.password && (
                <View accessibilityLiveRegion="assertive">
                  <AppInput.HelperText variant="error">
                    {errors.password.message}
                  </AppInput.HelperText>
                </View>
              )}
            </AppInput>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput>
              <AppInput.Label>Confirm password</AppInput.Label>
              <AppInput.Group isInvalid={!!errors.confirmPassword}>
                <AppInput.Slot name="lock" />
                <AppInput.Field
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!isConfirmPasswordVisible}
                  autoComplete="new-password"
                  textContentType="newPassword"
                  editable={!isSubmitting}
                  accessibilityLabel="Confirm password"
                />
                <Pressable
                  className="p-1"
                  accessibilityRole="button"
                  accessibilityLabel={isConfirmPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
                  onPress={() => setIsConfirmPasswordVisible((v) => !v)}
                >
                  {isConfirmPasswordVisible ? (
                    <EyeOffIcon width={20} height={20} color="#B7B7B7" />
                  ) : (
                    <EyeOnIcon width={20} height={20} color="#B7B7B7" />
                  )}
                </Pressable>
              </AppInput.Group>
              {errors.confirmPassword && (
                <View accessibilityLiveRegion="assertive">
                  <AppInput.HelperText variant="error">
                    {errors.confirmPassword.message}
                  </AppInput.HelperText>
                </View>
              )}
            </AppInput>
          )}
        />

        <View className="pt-3">
          <AppButton
            variant="primary"
            className="h-[54px] w-full"
            isLoading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            accessibilityLabel={isSuccess ? "Account created!" : "Create account"}
          >
            {isSuccess ? "Account created!" : "Create account"}
          </AppButton>
        </View>

        <View className="flex-row items-center justify-center gap-2">
          <Text className="font-sans-medium text-body text-neutral-300">
            Already have an account?
          </Text>
          <Link href="/login" asChild>
            <Pressable accessibilityRole="link" accessibilityLabel="Sign in, go to login screen">
              <Text className="font-sans-semibold text-body text-orange-400">Sign in</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
