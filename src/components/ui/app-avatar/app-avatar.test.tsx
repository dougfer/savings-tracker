import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { GluestackAppProvider } from '@/lib/providers/GluestackAppProvider';

import { AppAvatar } from './app-avatar';

function wrap(node: React.ReactElement) {
  return <GluestackAppProvider>{node}</GluestackAppProvider>;
}

describe('AppAvatar', () => {
  describe('rendering', () => {
    it('renders FallbackText subpart', () => {
      render(
        wrap(
          <AppAvatar>
            <AppAvatar.FallbackText>John Doe</AppAvatar.FallbackText>
          </AppAvatar>,
        ),
      );
      expect(screen.getByText('JD')).toBeTruthy();
    });

    it('renders Image subpart', () => {
      render(
        wrap(
          <AppAvatar testID="avatar">
            <AppAvatar.FallbackText>Jane Doe</AppAvatar.FallbackText>
            <AppAvatar.Image
              testID="avatar-image"
              source={{ uri: 'https://example.com/avatar.jpg' }}
              alt="Jane Doe"
            />
          </AppAvatar>,
        ),
      );
      expect(screen.getByTestId('avatar-image')).toBeTruthy();
    });

    it.each(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const)('renders %s size', (size) => {
      render(
        wrap(
          <AppAvatar size={size} testID={`avatar-${size}`}>
            <AppAvatar.FallbackText>AB</AppAvatar.FallbackText>
          </AppAvatar>,
        ),
      );
      expect(screen.getByTestId(`avatar-${size}`)).toBeTruthy();
    });
  });

  describe('Badge subpart', () => {
    it('renders Badge when provided', () => {
      render(
        wrap(
          <AppAvatar testID="avatar">
            <AppAvatar.FallbackText>AB</AppAvatar.FallbackText>
            <AppAvatar.Badge testID="badge" />
          </AppAvatar>,
        ),
      );
      expect(screen.getByTestId('badge')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('accepts accessibilityLabel', () => {
      render(
        wrap(
          <AppAvatar accessibilityLabel="User avatar" testID="avatar">
            <AppAvatar.FallbackText>AB</AppAvatar.FallbackText>
          </AppAvatar>,
        ),
      );
      expect(screen.getByTestId('avatar').props.accessibilityLabel).toBe('User avatar');
    });
  });
});
