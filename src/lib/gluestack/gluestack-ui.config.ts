import { config as baseConfig } from '@gluestack-ui/config';

/**
 * Gluestack theme aligned with `tailwind.config.js` (002): mesmos hex em `colors`
 * e famílias registadas via `expo-font` para corpo / título.
 */
export const appGluestackConfig = {
  ...baseConfig,
  tokens: {
    ...baseConfig.tokens,
    fonts: {
      ...baseConfig.tokens.fonts,
      body: 'Inter_400Regular',
      heading: 'BricolageGrotesque_600SemiBold',
    },
  },
};
