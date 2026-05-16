import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '@gluestack-ui/themed';
import { createContext, useContext, type ComponentProps, type ReactNode } from 'react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type AppAvatarCtx = { size: AvatarSize };

const AppAvatarContext = createContext<AppAvatarCtx | null>(null);

function useAppAvatarCtx(): AppAvatarCtx {
  const ctx = useContext(AppAvatarContext);
  if (!ctx) throw new Error('AppAvatar subcomponents must be used inside <AppAvatar>');
  return ctx;
}

const sizeContainerCls: Record<AvatarSize, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
  '2xl': 'w-20 h-20',
};

const sizeFallbackTextCls: Record<AvatarSize, string> = {
  xs: 'text-caption',
  sm: 'text-caption',
  md: 'text-body-sm',
  lg: 'text-body',
  xl: 'text-body',
  '2xl': 'text-heading-sm',
};

type AppAvatarRootProps = Omit<ComponentProps<typeof Avatar>, 'size'> & {
  size?: AvatarSize;
  className?: string;
  children?: ReactNode;
};

function AppAvatarRoot({ size = 'md', className, children, ...props }: AppAvatarRootProps) {
  const cls = [
    'rounded-full bg-muted overflow-hidden items-center justify-center',
    sizeContainerCls[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <AppAvatarContext.Provider value={{ size }}>
      <Avatar {...props} size={size} className={cls}>
        {children}
      </Avatar>
    </AppAvatarContext.Provider>
  );
}

function AppAvatarImage({ className, ...props }: ComponentProps<typeof AvatarImage>) {
  const cls = ['w-full h-full rounded-full', className].filter(Boolean).join(' ');
  return <AvatarImage {...props} className={cls} />;
}

function AppAvatarFallbackText({ className, ...props }: ComponentProps<typeof AvatarFallbackText>) {
  const { size } = useAppAvatarCtx();
  const cls = ['text-muted-foreground font-sans-semibold', sizeFallbackTextCls[size], className]
    .filter(Boolean)
    .join(' ');
  return <AvatarFallbackText {...props} className={cls} />;
}

function AppAvatarBadge({ className, ...props }: ComponentProps<typeof AvatarBadge>) {
  const cls = ['bg-success rounded-full', className].filter(Boolean).join(' ');
  return <AvatarBadge {...props} className={cls} />;
}

AppAvatarRoot.displayName = 'AppAvatar';
AppAvatarImage.displayName = 'AppAvatar.Image';
AppAvatarFallbackText.displayName = 'AppAvatar.FallbackText';
AppAvatarBadge.displayName = 'AppAvatar.Badge';

export const AppAvatar = Object.assign(AppAvatarRoot, {
  Image: AppAvatarImage,
  FallbackText: AppAvatarFallbackText,
  Badge: AppAvatarBadge,
});
