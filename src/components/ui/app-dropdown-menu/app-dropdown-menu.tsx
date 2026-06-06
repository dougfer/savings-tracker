import React, { forwardRef, isValidElement } from 'react';

import { Pressable, View, type ViewStyle } from 'react-native';

import { createPopover } from '@gluestack-ui/core/popover/creator';
import { tva } from '@gluestack-ui/utils/nativewind-utils';
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import { Motion, AnimatePresence, type MotionComponentProps } from '@legendapp/motion';
import { cssInterop } from 'nativewind';

import { withStates } from '@/lib/gluestack/with-states-interop';

// ---------------------------------------------------------------------------
// Motion wrapper
// ---------------------------------------------------------------------------

type IMotionViewProps = React.ComponentProps<typeof View> &
  MotionComponentProps<typeof View, ViewStyle, unknown, unknown, unknown>;

const MotionView = Motion.View as React.ComponentType<IMotionViewProps>;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const rootStyle = tva({
  base: 'w-full h-full',
});

const backdropStyle = tva({
  base: 'absolute left-0 top-0 right-0 bottom-0 cursor-auto',
});

const contentStyle = tva({
  base: 'rounded-md bg-background-0 border border-outline-100 p-1 shadow-hard-5',
});

// ---------------------------------------------------------------------------
// Headless Popover primitive
// ---------------------------------------------------------------------------

const StyledRoot = withStates(View);
const StyledContent = withStates(MotionView);
const StyledBackdrop = withStates(Pressable);
const StyledPassThrough = withStates(View);
const StyledPassThroughPressable = withStates(Pressable);

const UIPopover = createPopover({
  Root: StyledRoot,
  Arrow: StyledPassThrough,
  Content: StyledContent,
  Header: StyledPassThrough,
  Footer: StyledPassThrough,
  Body: StyledPassThrough,
  Backdrop: StyledBackdrop,
  CloseButton: StyledPassThroughPressable,
  AnimatePresence,
});

cssInterop(MotionView, { className: 'style' });

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PopoverTriggerFn = (_props: Record<string, unknown>, state: { open: boolean }) => React.ReactElement;

type IContentProps = React.ComponentProps<typeof UIPopover.Content> &
  VariantProps<typeof contentStyle> & { className?: string };

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function AppDropdownMenuTrigger(_props: {
  children?: PopoverTriggerFn;
}): null {
  return null;
}
AppDropdownMenuTrigger.displayName = 'AppDropdownMenu.Trigger';

const AppDropdownMenuContent = forwardRef<
  React.ComponentRef<typeof UIPopover.Content>,
  IContentProps
>(function AppDropdownMenuContent({ className, ...props }, ref) {
  return (
    <UIPopover.Content
      ref={ref}
      className={contentStyle({ class: className })}
      {...props}
    />
  );
});
AppDropdownMenuContent.displayName = 'AppDropdownMenu.Content';

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

type IAppDropdownMenuProps = Omit<
  React.ComponentProps<typeof UIPopover>,
  'trigger'
> & {
  trigger?: PopoverTriggerFn;
};

function extractTrigger(
  children: React.ReactNode,
): PopoverTriggerFn | undefined {
  const arr = React.Children.toArray(children);
  for (const child of arr) {
    if (
      isValidElement(child) &&
      (child.type as { displayName?: string } | undefined)?.displayName ===
      'AppDropdownMenu.Trigger'
    ) {
      return (child.props as { children?: PopoverTriggerFn }).children;
    }
  }
  return undefined;
}

function filterNonTrigger(
  children: React.ReactNode,
): React.ReactNode[] {
  const arr = React.Children.toArray(children);
  return arr.filter((child) => {
    if (!isValidElement(child)) return true;
    const displayName = (child.type as { displayName?: string } | undefined)
      ?.displayName;
    return displayName !== 'AppDropdownMenu.Trigger';
  });
}

const AppDropdownMenuRoot = forwardRef<
  React.ComponentRef<typeof UIPopover>,
  IAppDropdownMenuProps
>(function AppDropdownMenuRoot(
  { children, trigger: triggerProp, className, ...props },
  ref,
) {
  const triggerFn = triggerProp ?? extractTrigger(children);
  const filteredChildren = filterNonTrigger(children);

  if (!triggerFn || typeof triggerFn !== 'function') {
    return null;
  }

  return (
    <UIPopover trigger={triggerFn} {...props} className={rootStyle({ class: className })} ref={ref}>
      <UIPopover.Backdrop className={backdropStyle({})} pointerEvents="auto" />
      {filteredChildren}
    </UIPopover>
  );
});
AppDropdownMenuRoot.displayName = 'AppDropdownMenu';

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const AppDropdownMenu = Object.assign(AppDropdownMenuRoot, {
  Trigger: AppDropdownMenuTrigger,
  Content: AppDropdownMenuContent,
});
