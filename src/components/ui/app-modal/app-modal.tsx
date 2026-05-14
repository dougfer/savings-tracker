import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@gluestack-ui/themed';
import { createContext, useContext, type ComponentProps, type ReactNode } from 'react';

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

type AppModalRootProps = Omit<ComponentProps<typeof Modal>, 'size'> & {
  size?: ModalSize;
  className?: string;
  children?: ReactNode;
};

function AppModalRoot({ size = 'md', className, children, ...props }: AppModalRootProps) {
  return (
    <Modal {...props} className={className}>
      {/* Provider is inside Modal so context is accessible through Gluestack's portal */}
      <AppModalContext.Provider value={{ size }}>
        {children}
      </AppModalContext.Provider>
    </Modal>
  );
}

function AppModalBackdrop({ className, ...props }: ComponentProps<typeof ModalBackdrop>) {
  const cls = ['bg-black/50', className].filter(Boolean).join(' ');
  return <ModalBackdrop {...props} className={cls} />;
}

function AppModalContent({ className, ...props }: ComponentProps<typeof ModalContent>) {
  const { size } = useAppModalCtx();
  const cls = [
    'bg-card border border-border rounded-2xl mx-4',
    sizeContentCls[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return <ModalContent {...props} className={cls} />;
}

function AppModalHeader({ className, ...props }: ComponentProps<typeof ModalHeader>) {
  const cls = ['px-6 pt-6 pb-4 flex-row items-center justify-between', className]
    .filter(Boolean)
    .join(' ');
  return <ModalHeader {...props} className={cls} />;
}

function AppModalBody({ className, ...props }: ComponentProps<typeof ModalBody>) {
  const cls = ['px-6 pb-4', className].filter(Boolean).join(' ');
  return <ModalBody {...props} className={cls} />;
}

function AppModalFooter({ className, ...props }: ComponentProps<typeof ModalFooter>) {
  const cls = ['px-6 pb-6 flex-row gap-3', className].filter(Boolean).join(' ');
  return <ModalFooter {...props} className={cls} />;
}

function AppModalCloseButton({ className, ...props }: ComponentProps<typeof ModalCloseButton>) {
  const cls = ['p-2 rounded-full data-[hover=true]:bg-muted', className].filter(Boolean).join(' ');
  return <ModalCloseButton {...props} className={cls} />;
}

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
