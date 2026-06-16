import React from 'react';

import { Text } from 'react-native';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { AppModal } from './app-modal';

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
