import { type ReactNode } from 'react';

import { Modal, Pressable, View, type PressableProps, type ViewProps } from 'react-native';

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

type AppModalRootProps = {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  isKeyboardDismissable?: boolean;
  className?: string;
  children?: ReactNode;
};

function AppModalRoot({
  isOpen,
  onClose,
  closeOnOverlayClick = false,
  isKeyboardDismissable = true,
  className,
  children,
}: AppModalRootProps) {
  if (!isOpen) return null;

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      onRequestClose={isKeyboardDismissable ? onClose : undefined}
    >
      <View
        style={{ flex: 1 }}
        className={['items-center justify-center px-6', className].filter(Boolean).join(' ')}
      >
        <Pressable
          onPress={closeOnOverlayClick ? onClose : undefined}
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
          className="bg-neutral-900/90"
        />
        {children}
      </View>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Backdrop (explicit — for consumers that need it)
// ---------------------------------------------------------------------------

function AppModalBackdrop({ className, ...props }: PressableProps & { className?: string }) {
  const cls = ['absolute inset-0 bg-black/50', className].filter(Boolean).join(' ');
  return <Pressable {...props} className={cls} />;
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

function AppModalContent({ className, ...props }: ViewProps & { className?: string }) {
  const cls = [
    'bg-neutral-800 border border-neutral-600 rounded-2xl mx-4',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return <View {...props} className={cls} />;
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function AppModalHeader({ className, ...props }: ViewProps & { className?: string }) {
  const cls = ['px-6 pt-6 pb-4 flex-row items-center justify-between', className]
    .filter(Boolean)
    .join(' ');
  return <View {...props} className={cls} />;
}

// ---------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------

function AppModalBody({ className, ...props }: ViewProps & { className?: string }) {
  const cls = ['px-6 pb-4', className].filter(Boolean).join(' ');
  return <View {...props} className={cls} />;
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

function AppModalFooter({ className, ...props }: ViewProps & { className?: string }) {
  const cls = ['px-6 pb-6 flex-row gap-3', className].filter(Boolean).join(' ');
  return <View {...props} className={cls} />;
}

// ---------------------------------------------------------------------------
// CloseButton
// ---------------------------------------------------------------------------

function AppModalCloseButton({ className, ...props }: PressableProps & { className?: string }) {
  const cls = ['p-2 rounded-full', className].filter(Boolean).join(' ');
  return (
    <Pressable
      {...props}
      className={cls}
      accessibilityRole="button"
      accessibilityLabel="Close"
    />
  );
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
