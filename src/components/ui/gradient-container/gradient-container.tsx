import { type ReactNode } from 'react';

import { View, type ViewProps } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { twMerge } from "tailwind-merge"

const DEFAULT_COLORS = ['#FF5722', '#B92B09'] as const;
const DEFAULT_START = { x: 0.5, y: 0 };
const DEFAULT_END = { x: 0.5, y: 1 };

type GradientContainerProps = {
  children?: ReactNode;

  /** Override as cores do gradiente (mínimo 2). Padrão: `['#FF5722', '#B92B09']`. */
  colors?: readonly [string, string, ...string[]];

  /** Ponto inicial do gradiente. Padrão: `{ x: 0.5, y: 0 }` (topo-centro). */
  start?: { x: number; y: number };

  /** Ponto final do gradiente. Padrão: `{ x: 0.5, y: 1 }` (base-centro). */
  end?: { x: number; y: number };

  /** Classes NativeWind para o container externo. */
  className?: string;

  /** Props repassadas ao View raiz. */
  viewProps?: Omit<ViewProps, 'children' | 'className'>;
};

/**
 * Container com gradiente linear padronizado do projeto.
 *
 * Cores padrão: `#FF5722` → `#B92B09` (orange-400 → orange-700).
 * Borda sutil em `#FFFFFF4D` e cantos `rounded-2xl` (16px).
 *
 * {@link https://docs.expo.dev/versions/latest/sdk/linear-gradient/ Expo LinearGradient docs}
 *
 * @example
 * <GradientContainer>
 *   <Text>Conteúdo aqui</Text>
 * </GradientContainer>
 */
export function GradientContainer({
  children,
  colors = DEFAULT_COLORS,
  start = DEFAULT_START,
  end = DEFAULT_END,
  className,
  viewProps,
}: GradientContainerProps) {
  return (
    <View
      {...viewProps}
      className={twMerge("overflow-hidden flex flex-1 rounded-2xl border border-[#FFFFFF4D]", className)}
    >
      <LinearGradient
        style={{ flex: 1 }}
        colors={colors as unknown as readonly [
          string,
          string,
          ...string[],
        ]}
        start={start}
        end={end}
      >
        {children}
      </LinearGradient>
    </View>
  );
}
