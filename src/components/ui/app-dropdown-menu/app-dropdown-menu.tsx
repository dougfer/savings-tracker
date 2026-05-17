import React, {
  createContext,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from 'react';

import { View } from 'react-native';

import { Menu, MenuItem, MenuItemLabel } from '@gluestack-ui/themed';

const AppDropdownMenuContext = createContext<Record<string, never> | null>(null);

type TriggerRenderFn = (triggerProps: Record<string, unknown>) => ReactElement;

type AppDropdownMenuRootProps = Omit<ComponentProps<typeof Menu>, 'trigger' | 'children'> & {
  className?: string;
  children: ReactNode;
};

/**
 * Extracts `AppDropdownMenu.Trigger` from children and passes its render function
 * to Gluestack `Menu`'s `trigger` prop. Non-trigger children are passed as menu items.
 */
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
      <Menu
        {...props}
        trigger={triggerFn ?? (() => <View />)}
        className={['rounded-xl border border-border bg-card py-1 shadow-md', className]
          .filter(Boolean)
          .join(' ')}
      >
        {menuChildren}
      </Menu>
    </AppDropdownMenuContext.Provider>
  );
}

/**
 * Marker component — its `children` render function is extracted by `AppDropdownMenuRoot`
 * and passed to Gluestack Menu's trigger prop.
 *
 * Usage:
 * ```tsx
 * <AppDropdownMenu.Trigger>
 *   {(triggerProps) => <AppButton {...triggerProps}><AppButton.Text>Open</AppButton.Text></AppButton>}
 * </AppDropdownMenu.Trigger>
 * ```
 */
function AppDropdownMenuTrigger(_props: { children: TriggerRenderFn }) {
  // Consumed by AppDropdownMenuRoot via React.Children — never renders directly
  return null;
}

/**
 * Transparent wrapper so items can be grouped under a semantic Content node.
 * Renders a React Fragment so Gluestack Menu sees items directly.
 */
function AppDropdownMenuContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function AppDropdownMenuItem({ className, children, ...props }: ComponentProps<typeof MenuItem>) {
  const cls = ['flex-row items-center gap-2 px-3 py-2.5', className].filter(Boolean).join(' ');
  return (
    <MenuItem {...props} className={cls}>
      {children}
    </MenuItem>
  );
}

function AppDropdownMenuItemLabel({ className, ...props }: ComponentProps<typeof MenuItemLabel>) {
  const cls = ['text-body text-foreground', className].filter(Boolean).join(' ');
  return <MenuItemLabel {...props} className={cls} />;
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

function AppDropdownMenuSeparator({ className, ...props }: ComponentProps<typeof View>) {
  return (
    <View
      {...props}
      className={['mx-1 my-1 border-b border-border', className].filter(Boolean).join(' ')}
      accessibilityRole="separator"
    />
  );
}

// Copy react-stately collection node builders so Gluestack Menu can process our wrappers
type WithCollectionNode = { getCollectionNode?: unknown };
const MenuItemStatic = MenuItem as typeof MenuItem & WithCollectionNode;
if (MenuItemStatic.getCollectionNode) {
  (AppDropdownMenuItem as WithCollectionNode).getCollectionNode = MenuItemStatic.getCollectionNode;
}

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
