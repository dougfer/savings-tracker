import React, {
  createContext,
  type ReactElement,
  type ReactNode,
} from 'react';

import { Pressable, Text, View, type PressableProps, type TextProps, type ViewProps } from 'react-native';

import { createMenu } from '@gluestack-ui/core/menu/creator';
import { cssInterop } from 'nativewind';

// ---------------------------------------------------------------------------
// Headless UI primitive via v3 creator
// ---------------------------------------------------------------------------

const UIMenu = createMenu({
  Root: View,
  Item: Pressable,
  Label: Text,
  Backdrop: Pressable,
  Separator: View,
});

cssInterop(UIMenu, { className: 'style' } as any);
cssInterop(UIMenu.ItemLabel, { className: 'style' } as any);

// ---------------------------------------------------------------------------
// Context (no meaningful shared state yet; reserved for future extensions)
// ---------------------------------------------------------------------------

const AppDropdownMenuContext = createContext<Record<string, never> | null>(null);

// ---------------------------------------------------------------------------
// Compound components
// ---------------------------------------------------------------------------

type TriggerRenderFn = (
  triggerProps: Record<string, unknown>,
  state: { open: boolean },
) => ReactElement;

type AppDropdownMenuRootProps = {
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'bottom left' | 'bottom right';
  offset?: number;
  crossOffset?: number;
  onOpen?: () => void;
  onClose?: () => void;
  closeOnSelect?: boolean;
  className?: string;
  children: ReactNode;
};

function AppDropdownMenuRoot({ children, className, ...props }: AppDropdownMenuRootProps) {
  let triggerFn: TriggerRenderFn | null = null;
  const menuChildren: ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === AppDropdownMenuTrigger) {
      const typed = child as ReactElement<{ children: TriggerRenderFn }>;
      triggerFn = typed.props.children;
    } else {
      menuChildren.push(child);
    }
  });

  return (
    <AppDropdownMenuContext.Provider value={{}}>
      <UIMenu
        {...(props as any)}
        trigger={triggerFn ?? (() => <View />)}
        className={['rounded-xl border border-border bg-card py-1 shadow-md', className]
          .filter(Boolean)
          .join(' ')}
      >
        {menuChildren}
      </UIMenu>
    </AppDropdownMenuContext.Provider>
  );
}

function AppDropdownMenuTrigger(_props: { children: TriggerRenderFn }) {
  return null;
}

function AppDropdownMenuContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function AppDropdownMenuItem({
  className,
  children,
  textValue,
  ...props
}: PressableProps & { className?: string; textValue?: string; key?: string }) {
  const cls = ['flex-row items-center gap-2 px-3 py-2.5', className].filter(Boolean).join(' ');
  return (
    <UIMenu.Item {...(props as any)} textValue={textValue} className={cls}>
      {children}
    </UIMenu.Item>
  );
}

function AppDropdownMenuItemLabel({ className, ...props }: TextProps & { className?: string }) {
  const cls = ['text-body text-foreground', className].filter(Boolean).join(' ');
  return <UIMenu.ItemLabel {...(props as any)} className={cls} />;
}

type AppDropdownMenuItemIconProps = {
  as: React.ComponentType<{ size?: number; className?: string }>;
  className?: string;
};

function AppDropdownMenuItemIcon({ as: AsIcon, className }: AppDropdownMenuItemIconProps) {
  if (!AsIcon) return null;
  return (
    <AsIcon size={16} className={['text-muted-foreground', className].filter(Boolean).join(' ')} />
  );
}

function AppDropdownMenuSeparator({ className, ...props }: ViewProps & { className?: string }) {
  return (
    <UIMenu.Separator
      {...(props as any)}
      className={['mx-1 my-1 border-b border-border', className].filter(Boolean).join(' ')}
      accessibilityRole="separator"
    />
  );
}

// ---------------------------------------------------------------------------
// Display names & compound export
// ---------------------------------------------------------------------------

AppDropdownMenuRoot.displayName = 'AppDropdownMenu';
AppDropdownMenuTrigger.displayName = 'AppDropdownMenu.Trigger';
AppDropdownMenuContent.displayName = 'AppDropdownMenu.Content';
AppDropdownMenuItem.displayName = 'AppDropdownMenu.Item';
AppDropdownMenuItemLabel.displayName = 'AppDropdownMenu.ItemLabel';
AppDropdownMenuItemIcon.displayName = 'AppDropdownMenu.ItemIcon';
AppDropdownMenuSeparator.displayName = 'AppDropdownMenu.Separator';

export const AppDropdownMenu = Object.assign(AppDropdownMenuRoot, {
  Trigger: AppDropdownMenuTrigger,
  Content: AppDropdownMenuContent,
  Item: AppDropdownMenuItem,
  ItemLabel: AppDropdownMenuItemLabel,
  ItemIcon: AppDropdownMenuItemIcon,
  Separator: AppDropdownMenuSeparator,
});
