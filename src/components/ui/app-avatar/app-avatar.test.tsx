import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { AppAvatar } from './app-avatar';

describe('AppAvatar', () => {
  describe('rendering', () => {
    it('renders FallbackText subpart', () => {
      render(
        <AppAvatar>
          <AppAvatar.FallbackText>AH</AppAvatar.FallbackText>
        </AppAvatar>,
      );
      expect(screen.getByText('AH')).toBeTruthy();
    });

    it('renders Image subpart', () => {
      render(
        <AppAvatar testID="avatar">
          <AppAvatar.FallbackText>AH</AppAvatar.FallbackText>
          <AppAvatar.Image
            testID="avatar-image"
            source={{ uri: 'https://example.com/avatar.jpg' }}
          />
        </AppAvatar>,
      );
      expect(screen.getByTestId('avatar-image')).toBeTruthy();
    });

    it('shows fallback after image load error', () => {
      render(
        <AppAvatar testID="avatar">
          <AppAvatar.FallbackText>AH</AppAvatar.FallbackText>
          <AppAvatar.Image
            testID="avatar-image"
            source={{ uri: 'https://example.com/broken.jpg' }}
          />
        </AppAvatar>,
      );

      fireEvent(screen.getByTestId('avatar-image'), 'error');
      expect(screen.getByText('AH')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('accepts accessibilityLabel', () => {
      render(
        <AppAvatar accessibilityLabel="User avatar" testID="avatar">
          <AppAvatar.FallbackText>AH</AppAvatar.FallbackText>
        </AppAvatar>,
      );
      expect(screen.getByTestId('avatar').props.accessibilityLabel).toBe('User avatar');
    });

    it('has image accessibility role on root', () => {
      render(
        <AppAvatar testID="avatar">
          <AppAvatar.FallbackText>AH</AppAvatar.FallbackText>
        </AppAvatar>,
      );
      expect(screen.getByTestId('avatar').props.accessibilityRole).toBe('image');
    });
  });
});
