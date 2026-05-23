import React from 'react';

import { Text } from 'react-native';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { AppModal, AppModalContext } from './app-modal';

jest.mock('@gluestack-ui/core/modal/creator', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactNative = require('react-native');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const R = require('react');

  function FakeModal({ isOpen, children, ...props }: any) {
    return isOpen
      ? R.createElement(
          ReactNative.View,
          { accessible: true, accessibilityRole: 'dialog', ...props },
          children,
        )
      : null;
  }
  FakeModal.Content = ({ children, ...props }: any) =>
    R.createElement(ReactNative.View, props, children);
  FakeModal.Backdrop = ({ children, ...props }: any) =>
    R.createElement(ReactNative.View, props, children);
  FakeModal.Header = ({ children, ...props }: any) =>
    R.createElement(ReactNative.View, props, children);
  FakeModal.Body = ({ children, ...props }: any) =>
    R.createElement(ReactNative.View, props, children);
  FakeModal.Footer = ({ children, ...props }: any) =>
    R.createElement(ReactNative.View, props, children);
  FakeModal.CloseButton = ({ children, onPress, ...props }: any) =>
    R.createElement(
      ReactNative.Pressable,
      { onPress, accessibilityRole: 'button', ...props },
      children,
    );

  FakeModal.displayName = 'Modal';
  (FakeModal.Content as { displayName?: string }).displayName = 'Modal.Content';
  (FakeModal.Backdrop as { displayName?: string }).displayName = 'Modal.Backdrop';
  (FakeModal.Header as { displayName?: string }).displayName = 'Modal.Header';
  (FakeModal.Body as { displayName?: string }).displayName = 'Modal.Body';
  (FakeModal.Footer as { displayName?: string }).displayName = 'Modal.Footer';
  (FakeModal.CloseButton as { displayName?: string }).displayName = 'Modal.CloseButton';

  return {
    createModal: () => FakeModal,
  };
});

function wrapCtx(size: 'sm' | 'md' | 'lg' | 'full', node: React.ReactElement) {
  return <AppModalContext.Provider value={{ size }}>{node}</AppModalContext.Provider>;
}

describe('AppModal', () => {
  describe('root rendering', () => {
    it('renders content when open', () => {
      render(
        <AppModal isOpen onClose={() => {}}>
          <AppModal.Content>
            <AppModal.Body>
              <Text>Modal Body</Text>
            </AppModal.Body>
          </AppModal.Content>
        </AppModal>,
      );
      expect(screen.getByText('Modal Body')).toBeTruthy();
    });

    it('does not render content when closed', () => {
      render(
        <AppModal isOpen={false} onClose={() => {}}>
          <AppModal.Content>
            <AppModal.Body>
              <Text>Modal Body</Text>
            </AppModal.Body>
          </AppModal.Content>
        </AppModal>,
      );
      expect(screen.queryByText('Modal Body')).toBeNull();
    });

    it('has dialog role', () => {
      render(
        <AppModal isOpen onClose={() => {}}>
          <AppModal.Content>
            <AppModal.Body>
              <Text>Content</Text>
            </AppModal.Body>
          </AppModal.Content>
        </AppModal>,
      );
      expect(screen.getByRole('dialog')).toBeTruthy();
    });
  });

  describe('compound subparts', () => {
    it('renders Header, Body, Footer together', () => {
      render(
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
      );
      expect(screen.getByText('Title')).toBeTruthy();
      expect(screen.getByText('Body content')).toBeTruthy();
      expect(screen.getByText('Footer actions')).toBeTruthy();
    });

    it('renders CloseButton', () => {
      render(
        <AppModal isOpen onClose={() => {}}>
          <AppModal.Content>
            <AppModal.Header>
              <Text>Title</Text>
              <AppModal.CloseButton testID="close-btn" />
            </AppModal.Header>
          </AppModal.Content>
        </AppModal>,
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
        <AppModal isOpen onClose={onClose}>
          <AppModal.Content>
            <AppModal.Header>
              <Text>Title</Text>
              <AppModal.CloseButton testID="close-btn" onPress={onClose} />
            </AppModal.Header>
          </AppModal.Content>
        </AppModal>,
      );
      fireEvent.press(screen.getByTestId('close-btn'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
