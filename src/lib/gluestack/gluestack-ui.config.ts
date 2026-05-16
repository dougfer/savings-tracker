import { config as baseConfig } from '@gluestack-ui/config';

/**
 * Gluestack config stripped of component-level themes.
 *
 * All visual styling is handled by NativeWind `className` via `tailwind.config.js` (002).
 * Gluestack provides only structural behaviour (a11y, focus management, ARIA roles).
 * Keeping component themes would generate inline styles that override NativeWind classes.
 */
const { components: _componentThemes, ...configWithoutComponents } = baseConfig;

export const appGluestackConfig = {
  ...configWithoutComponents,
  tokens: {
    ...configWithoutComponents.tokens,
    fonts: {
      ...configWithoutComponents.tokens.fonts,
      body: 'Inter_400Regular',
      heading: 'BricolageGrotesque_600SemiBold',
    },
  },
};
