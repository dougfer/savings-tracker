import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { AppAvatar } from './app-avatar';

describe('AppAvatar', () => {
  describe('rendering', () => {
    it('renders FallbackText subpart', () => {
      render(
        <AppAvatar>
          <AppAvatar.FallbackText>JD</AppAvatar.FallbackText>
        </AppAvatar>,
      );
      expect(screen.getByText('JD')).toBeTruthy();
    });

    it('renders Image subpart', () => {
      render(
        <AppAvatar testID="avatar">
          <AppAvatar.FallbackText>JD</AppAvatar.FallbackText>
          <AppAvatar.Image
            testID="avatar-image"
            source={{ uri: 'https://example.com/avatar.jpg' }}
          />
        </AppAvatar>,
      );
      expect(screen.getByTestId('avatar-image')).toBeTruthy();
    });

    it.each(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const)('renders %s size', (size) => {
      render(
        <AppAvatar size={size} testID={`avatar-${size}`}>
          <AppAvatar.FallbackText>AB</AppAvatar.FallbackText>
        </AppAvatar>,
      );
      expect(screen.getByTestId(`avatar-${size}`)).toBeTruthy();
    });
  });

  describe('Badge subpart', () => {
    it('renders Badge when provided', () => {
      render(
        <AppAvatar testID="avatar">
          <AppAvatar.FallbackText>AB</AppAvatar.FallbackText>
          <AppAvatar.Badge testID="badge" />
        </AppAvatar>,
      );
      expect(screen.getByTestId('badge')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('accepts accessibilityLabel', () => {
      render(
        <AppAvatar accessibilityLabel="User avatar" testID="avatar">
          <AppAvatar.FallbackText>AB</AppAvatar.FallbackText>
        </AppAvatar>,
      );
      expect(screen.getByTestId('avatar').props.accessibilityLabel).toBe('User avatar');
    });
  });
});
