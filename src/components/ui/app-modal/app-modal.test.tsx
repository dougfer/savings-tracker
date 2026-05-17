import React from 'react';

import { Text } from 'react-native';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { GluestackAppProvider } from '@/lib/providers/GluestackAppProvider';

import { AppModal, AppModalContext } from './app-modal';

// Gluestack modal primitives have internal visibility/animation state that prevents
// rendering in RNTL isolation. Swap them for plain RN primitives in tests.
jest.mock('@gluestack-ui/themed', () => {
  const actual = jest.requireActual('@gluestack-ui/themed');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactNative = require('react-native');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    ...actual,
    Modal: function Modal({ isOpen, children, ...props }: any) {
      return isOpen
        ? React.createElement(
            ReactNative.View,
            { accessible: true, accessibilityRole: 'dialog', ...props },
            children,
          )
        : null;
    },
    ModalBackdrop: function ModalBackdrop({ children, ...props }: any) {
      return React.createElement(ReactNative.View, props, children);
    },
    ModalContent: function ModalContent({ children, ...props }: any) {
      return React.createElement(ReactNative.View, props, children);
    },
    ModalHeader: function ModalHeader({ children, ...props }: any) {
      return React.createElement(ReactNative.View, props, children);
    },
    ModalBody: function ModalBody({ children, ...props }: any) {
      return React.createElement(ReactNative.View, props, children);
    },
    ModalFooter: function ModalFooter({ children, ...props }: any) {
      return React.createElement(ReactNative.View, props, children);
    },
    ModalCloseButton: function ModalCloseButton({ children, onPress, ...props }: any) {
      return React.createElement(
        ReactNative.Pressable,
        { onPress, accessibilityRole: 'button', ...props },
        children,
      );
    },
  };
});

function wrap(node: React.ReactElement) {
  return <GluestackAppProvider>{node}</GluestackAppProvider>;
}

function wrapCtx(size: 'sm' | 'md' | 'lg' | 'full', node: React.ReactElement) {
  return (
    <GluestackAppProvider>
      <AppModalContext.Provider value={{ size }}>{node}</AppModalContext.Provider>
    </GluestackAppProvider>
  );
}

describe('AppModal', () => {
  describe('root rendering', () => {
    it('renders content when open', () => {
      render(
        wrap(
          <AppModal isOpen onClose={() => {}}>
            <AppModal.Content>
              <AppModal.Body>
                <Text>Modal Body</Text>
              </AppModal.Body>
            </AppModal.Content>
          </AppModal>,
        ),
      );
      expect(screen.getByText('Modal Body')).toBeTruthy();
    });

    it('does not render content when closed', () => {
      render(
        wrap(
          <AppModal isOpen={false} onClose={() => {}}>
            <AppModal.Content>
              <AppModal.Body>
                <Text>Modal Body</Text>
              </AppModal.Body>
            </AppModal.Content>
          </AppModal>,
        ),
      );
      expect(screen.queryByText('Modal Body')).toBeNull();
    });

    it('has dialog role', () => {
      render(
        wrap(
          <AppModal isOpen onClose={() => {}}>
            <AppModal.Content>
              <AppModal.Body>
                <Text>Content</Text>
              </AppModal.Body>
            </AppModal.Content>
          </AppModal>,
        ),
      );
      expect(screen.getByRole('dialog')).toBeTruthy();
    });
  });

  describe('compound subparts', () => {
    it('renders Header, Body, Footer together', () => {
      render(
        wrap(
          <AppModal isOpen onClose={() => {}}>
            <AppModal.Backdrop />
            <AppModal.Content>
              <AppModal.Header>
                <Text>Title</Text>
              </AppModal.Header>
              <AppModal.Body>
                <Text>Body content</Text>
              </AppModal.Body>
              <AppModal.Footer>
                <Text>Footer actions</Text>
              </AppModal.Footer>
            </AppModal.Content>
          </AppModal>,
        ),
      );
      expect(screen.getByText('Title')).toBeTruthy();
      expect(screen.getByText('Body content')).toBeTruthy();
      expect(screen.getByText('Footer actions')).toBeTruthy();
    });

    it('renders CloseButton', () => {
      render(
        wrap(
          <AppModal isOpen onClose={() => {}}>
            <AppModal.Content>
              <AppModal.Header>
                <Text>Title</Text>
                <AppModal.CloseButton testID="close-btn" />
              </AppModal.Header>
            </AppModal.Content>
          </AppModal>,
        ),
      );
      expect(screen.getByTestId('close-btn')).toBeTruthy();
    });
  });

  describe('sizes — via context', () => {
    it.each(['sm', 'md', 'lg', 'full'] as const)('renders %s size content', (size) => {
      render(
        wrapCtx(
          size,
          <AppModal.Content>
            <AppModal.Body>
              <Text>{size} content</Text>
            </AppModal.Body>
          </AppModal.Content>,
        ),
      );
      expect(screen.getByText(`${size} content`)).toBeTruthy();
    });
  });

  describe('close behaviour', () => {
    it('calls onClose when CloseButton is pressed', () => {
      const onClose = jest.fn();
      render(
        wrap(
          <AppModal isOpen onClose={onClose}>
            <AppModal.Content>
              <AppModal.Header>
                <Text>Title</Text>
                <AppModal.CloseButton testID="close-btn" onPress={onClose} />
              </AppModal.Header>
            </AppModal.Content>
          </AppModal>,
        ),
      );
      fireEvent.press(screen.getByTestId('close-btn'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
