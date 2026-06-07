import { useWindowDimensions } from 'react-native';

const BREAKPOINT_TABLET = 768;
const BREAKPOINT_DESKTOP = 1024;

export function useResponsive() {
  const { width } = useWindowDimensions();

  return {
    isMobile: width < BREAKPOINT_TABLET,
    isTablet: width >= BREAKPOINT_TABLET && width < BREAKPOINT_DESKTOP,
    isDesktop: width >= BREAKPOINT_DESKTOP,
  } as const;
}
