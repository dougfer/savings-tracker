import { useState } from 'react';

import { Pressable, Text, View } from 'react-native';

import { Link } from 'expo-router';

import { EyeOffIcon, EyeOnIcon, Logo } from '@/assets/icons';
import { AppButton, AppInput } from '@/components/ui';

export function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // No backend integration — placeholder action
  };

  return (
    <View className="w-full gap-8 p-0">
      <View className="gap-10">
        <View className="flex-row gap-2.5">
          <Logo />
        </View>

        <View className="gap-2">
          <Text className="font-sans-bold text-heading-lg text-neutral-0">
            Welcome back
          </Text>
          <Text className="font-sans-medium text-body text-neutral-300">
            Sign in to your account
          </Text>
        </View>
      </View>

      <View className="h-px bg-neutral-700 w-full" />

      <View className="gap-5">
        <AppInput>
          <AppInput.Label>Email address</AppInput.Label>
          <AppInput.Group>
            <AppInput.Slot name="mail-01" />
            <AppInput.Field
              value={email}
              onChangeText={setEmail}
              placeholder="Placeholder"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />
          </AppInput.Group>
        </AppInput>

        <View className="gap-3">
          <AppInput>
            <AppInput.Label>Password</AppInput.Label>
            <AppInput.Group>
              <AppInput.Slot name="lock" />
              <AppInput.Field
                value={password}
                onChangeText={setPassword}
                placeholder="Placeholder"
                secureTextEntry={!isPasswordVisible}
                autoComplete="password"
                textContentType="password"
              />
              <Pressable
                className="p-1"
                accessibilityRole="button"
                accessibilityLabel={
                  isPasswordVisible ? 'Hide password' : 'Show password'
                }
                onPress={() => setIsPasswordVisible((v) => !v)}
              >
                {isPasswordVisible ? (
                  <EyeOffIcon width={20} height={20} color="#B7B7B7" />
                ) : (
                  <EyeOnIcon width={20} height={20} color="#B7B7B7" />
                )}
              </Pressable>
            </AppInput.Group>
          </AppInput>

          <Link href="/forgot-password/index" asChild>
            <Pressable>
              <Text className="font-sans-medium text-body text-neutral-300 text-right">
                Forgot password?
              </Text>
            </Pressable>
          </Link>
        </View>

        <View className="pt-3">
          <AppButton
            variant="primary"
            className="w-full h-[54px]"
            onPress={handleSignIn}
          >
            Sign in
          </AppButton>
        </View>

        <View className="flex-row justify-center items-center gap-2">
          <Text className="font-sans-medium text-body text-neutral-300">
            Don&apos;t have an account?
          </Text>
          <Link href="/sign-up/index" asChild>
            <Pressable>
              <Text className="font-sans-semibold text-body text-orange-400">
                Create one
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
