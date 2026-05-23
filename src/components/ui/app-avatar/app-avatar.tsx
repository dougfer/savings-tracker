/**
 * AppAvatar — Pencil `app.pen` node M8Qbp. Single 48×48 layout; subparts: `Image`, `FallbackText`.
 *
 * @example
 * <AppAvatar accessibilityLabel="Jane Smith">
 *   <AppAvatar.FallbackText>AH</AppAvatar.FallbackText>
 *   <AppAvatar.Image source={{ uri: profileImageUrl }} />
 * </AppAvatar>
 *
 * Focus ring uses `native:`/`web:` utilities for iOS, Android, and web.
 *
 * @see specs/003-shared-ui-components/quickstart.md — Avatar
 */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';

import {
  Image,
  Pressable,
  Text,
  type ImageProps,
  type PressableProps,
  type TextProps,
} from 'react-native';

import { useFocus, useFocusRing, useHover } from '@gluestack-ui/utils/aria';
import { composeEventHandlers } from '@gluestack-ui/utils/common';
import { tva } from '@gluestack-ui/utils/nativewind-utils';

import { pencilFocusRingClasses } from '@/lib/nativewind/pencil-focus-ring';
import { withStates } from '@/lib/gluestack/with-states-interop';

// ---------------------------------------------------------------------------
// Variants — Pencil node M8Qbp (Default / Hover / Focus)
// ---------------------------------------------------------------------------

export const appAvatarRootVariants = tva({
  base: [
    'relative h-12 w-12 shrink-0 overflow-hidden rounded-full',
    'items-center justify-center',
    'border border-neutral-500 bg-neutral-700',
    'data-[hover=true]:border-neutral-400 data-[hover=true]:bg-neutral-600',
    pencilFocusRingClasses,
  ].join(' '),
});

/** Fallback label styles (Pencil M8Qbp). */
export const appAvatarFallbackTextClassName = 'font-sans-medium text-body text-neutral-300';

const StyledRoot = withStates(Pressable);

type AppAvatarCtx = {
  imageVisible: boolean;
  setImageVisible: (visible: boolean) => void;
};

const AppAvatarContext = createContext<AppAvatarCtx | null>(null);

function useAppAvatarCtx(): AppAvatarCtx {
  const ctx = useContext(AppAvatarContext);
  if (!ctx) throw new Error('AppAvatar subcomponents must be used inside <AppAvatar>');
  return ctx;
}

// ---------------------------------------------------------------------------
// Compound components
// ---------------------------------------------------------------------------

type AppAvatarRootProps = Omit<PressableProps, 'children'> & {
  className?: string;
  children?: ReactNode;
};

function AppAvatarRoot({
  className,
  children,
  disabled,
  onHoverIn,
  onHoverOut,
  onFocus,
  onBlur,
  ...props
}: AppAvatarRootProps) {
  const [imageVisible, setImageVisible] = useState(false);
  const { isFocusVisible, focusProps: focusRingProps } = useFocusRing();
  const { isFocused, focusProps } = useFocus();
  const { isHovered, hoverProps } = useHover();
  const ringFocusProps = focusRingProps as {
    onFocus?: NonNullable<PressableProps['onFocus']>;
    onBlur?: NonNullable<PressableProps['onBlur']>;
  };

  const ctx = useMemo(
    () => ({ imageVisible, setImageVisible }),
    [imageVisible],
  );

  const cls = appAvatarRootVariants({ class: className });
  const interactive = !disabled;

  return (
    <AppAvatarContext.Provider value={ctx}>
      <StyledRoot
        {...({
          ...props,
          disabled,
          accessibilityRole: 'image',
          className: cls,
          states: {
            hover: interactive && isHovered,
            focus: interactive && isFocused,
            focusVisible: interactive && isFocusVisible,
          },
          dataSet: {
            hover: interactive && isHovered ? 'true' : 'false',
            focus: interactive && isFocused ? 'true' : 'false',
            focusVisible: interactive && isFocusVisible ? 'true' : 'false',
          },
          onHoverIn: composeEventHandlers(onHoverIn, hoverProps.onHoverIn),
          onHoverOut: composeEventHandlers(onHoverOut, hoverProps.onHoverOut),
          onFocus: composeEventHandlers(
            composeEventHandlers(onFocus, focusProps.onFocus),
            ringFocusProps.onFocus,
          ),
          onBlur: composeEventHandlers(
            composeEventHandlers(onBlur, focusProps.onBlur),
            ringFocusProps.onBlur,
          ),
        } as ComponentProps<typeof StyledRoot>)}
      >
        {children}
      </StyledRoot>
    </AppAvatarContext.Provider>
  );
}

type AppAvatarImageProps = ImageProps & { className?: string };

function AppAvatarImage({ className, onLoad, onError, source, ...props }: AppAvatarImageProps) {
  const { setImageVisible } = useAppAvatarCtx();

  if (source == null) return null;

  const cls = [
    'absolute inset-0 h-full w-full rounded-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Image
      {...props}
      source={source}
      className={cls}
      onLoad={(event) => {
        setImageVisible(true);
        onLoad?.(event);
      }}
      onError={(event) => {
        setImageVisible(false);
        onError?.(event);
      }}
    />
  );
}

type AppAvatarFallbackTextProps = TextProps & { className?: string };

function AppAvatarFallbackText({ className, ...props }: AppAvatarFallbackTextProps) {
  const { imageVisible } = useAppAvatarCtx();
  const cls = [
    appAvatarFallbackTextClassName,
    imageVisible ? 'opacity-0' : 'opacity-100',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Text {...props} className={cls} accessibilityElementsHidden={imageVisible} />;
}

// ---------------------------------------------------------------------------
// Display names & compound export
// ---------------------------------------------------------------------------

AppAvatarRoot.displayName = 'AppAvatar';
AppAvatarImage.displayName = 'AppAvatar.Image';
AppAvatarFallbackText.displayName = 'AppAvatar.FallbackText';

export const AppAvatar = Object.assign(AppAvatarRoot, {
  Image: AppAvatarImage,
  FallbackText: AppAvatarFallbackText,
});
