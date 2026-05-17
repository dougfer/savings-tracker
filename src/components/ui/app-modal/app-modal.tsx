import { createContext, useContext, type ReactNode } from 'react';

import { Pressable, View, type PressableProps, type ViewProps } from 'react-native';

import { createModal } from '@gluestack-ui/core/modal/creator';
import { cssInterop } from 'nativewind';

// ---------------------------------------------------------------------------
// Headless UI primitive via v3 creator
// ---------------------------------------------------------------------------

const UIModal = createModal({
  Root: View,
  Content: View,
  CloseButton: Pressable,
  Header: View,
  Footer: View,
  Body: View,
  Backdrop: Pressable,
});

cssInterop(UIModal, { className: 'style' } as any);
cssInterop(UIModal.Content, { className: 'style' } as any);
cssInterop(UIModal.Backdrop, { className: 'style' } as any);
cssInterop(UIModal.CloseButton, { className: 'style' } as any);
cssInterop(UIModal.Header, { className: 'style' } as any);
cssInterop(UIModal.Body, { className: 'style' } as any);
cssInterop(UIModal.Footer, { className: 'style' } as any);

// ---------------------------------------------------------------------------
// Variant / size maps
// ---------------------------------------------------------------------------

type ModalSize = 'sm' | 'md' | 'lg' | 'full';

type AppModalCtx = { size: ModalSize };

/** @internal Exported so tests can wrap subparts without requiring a full Modal portal */
export const AppModalContext = createContext<AppModalCtx | null>(null);

function useAppModalCtx(): AppModalCtx {
  const ctx = useContext(AppModalContext);
  if (!ctx) throw new Error('AppModal subcomponents must be used inside <AppModal>');
  return ctx;
}

const sizeContentCls: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  full: 'w-full h-full rounded-none mx-0',
};

// ---------------------------------------------------------------------------
// Compound components
// ---------------------------------------------------------------------------

type AppModalRootProps = {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  isKeyboardDismissable?: boolean;
  avoidKeyboard?: boolean;
  useRNModal?: boolean;
  initialFocusRef?: React.RefObject<any>;
  finalFocusRef?: React.RefObject<any>;
  className?: string;
  children?: ReactNode;
};

function AppModalRoot({ size = 'md', className, children, ...props }: AppModalRootProps) {
  return (
    <UIModal {...(props as any)} className={className}>
      <AppModalContext.Provider value={{ size }}>{children}</AppModalContext.Provider>
    </UIModal>
  );
}

function AppModalBackdrop({ className, ...props }: PressableProps & { className?: string }) {
  const cls = ['bg-black/50', className].filter(Boolean).join(' ');
  return <UIModal.Backdrop {...(props as any)} className={cls} />;
}

function AppModalContent({ className, ...props }: ViewProps & { className?: string }) {
  const { size } = useAppModalCtx();
  const cls = ['bg-card border border-border rounded-2xl mx-4', sizeContentCls[size], className]
    .filter(Boolean)
    .join(' ');
  return <UIModal.Content {...(props as any)} className={cls} />;
}

function AppModalHeader({ className, ...props }: ViewProps & { className?: string }) {
  const cls = ['px-6 pt-6 pb-4 flex-row items-center justify-between', className]
    .filter(Boolean)
    .join(' ');
  return <UIModal.Header {...(props as any)} className={cls} />;
}

function AppModalBody({ className, ...props }: ViewProps & { className?: string }) {
  const cls = ['px-6 pb-4', className].filter(Boolean).join(' ');
  return <UIModal.Body {...(props as any)} className={cls} />;
}

function AppModalFooter({ className, ...props }: ViewProps & { className?: string }) {
  const cls = ['px-6 pb-6 flex-row gap-3', className].filter(Boolean).join(' ');
  return <UIModal.Footer {...(props as any)} className={cls} />;
}

function AppModalCloseButton({ className, ...props }: PressableProps & { className?: string }) {
  const cls = ['p-2 rounded-full data-[hover=true]:bg-muted', className].filter(Boolean).join(' ');
  return <UIModal.CloseButton {...(props as any)} className={cls} />;
}

// ---------------------------------------------------------------------------
// Display names & compound export
// ---------------------------------------------------------------------------

AppModalRoot.displayName = 'AppModal';
AppModalBackdrop.displayName = 'AppModal.Backdrop';
AppModalContent.displayName = 'AppModal.Content';
AppModalHeader.displayName = 'AppModal.Header';
AppModalBody.displayName = 'AppModal.Body';
AppModalFooter.displayName = 'AppModal.Footer';
AppModalCloseButton.displayName = 'AppModal.CloseButton';

export const AppModal = Object.assign(AppModalRoot, {
  Backdrop: AppModalBackdrop,
  Content: AppModalContent,
  Header: AppModalHeader,
  Body: AppModalBody,
  Footer: AppModalFooter,
  CloseButton: AppModalCloseButton,
});
