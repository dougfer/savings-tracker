import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { GluestackAppProvider } from '@/lib/providers/GluestackAppProvider';

import { AppProgressBar } from './app-progress-bar';

function wrap(node: React.ReactElement) {
  return <GluestackAppProvider>{node}</GluestackAppProvider>;
}

describe('AppProgressBar', () => {
  describe('rendering', () => {
    it('renders Track subpart', () => {
      render(
        wrap(
          <AppProgressBar value={50} testID="bar">
            <AppProgressBar.Track testID="track" />
          </AppProgressBar>,
        ),
      );
      expect(screen.getByTestId('track')).toBeTruthy();
    });

    it('renders Label with default value text', () => {
      render(
        wrap(
          <AppProgressBar value={60}>
            <AppProgressBar.Track />
            <AppProgressBar.Label testID="label" />
          </AppProgressBar>,
        ),
      );
      expect(screen.getByText('60%')).toBeTruthy();
    });

    it('renders Label with custom text', () => {
      render(
        wrap(
          <AppProgressBar value={100}>
            <AppProgressBar.Track />
            <AppProgressBar.Label>Complete!</AppProgressBar.Label>
          </AppProgressBar>,
        ),
      );
      expect(screen.getByText('Complete!')).toBeTruthy();
    });
  });

  describe('value clamping', () => {
    it('renders at 0% correctly', () => {
      render(
        wrap(
          <AppProgressBar value={0} testID="bar">
            <AppProgressBar.Track />
            <AppProgressBar.Label />
          </AppProgressBar>,
        ),
      );
      expect(screen.getByText('0%')).toBeTruthy();
    });

    it('renders at 100% correctly', () => {
      render(
        wrap(
          <AppProgressBar value={100} testID="bar">
            <AppProgressBar.Track />
            <AppProgressBar.Label />
          </AppProgressBar>,
        ),
      );
      expect(screen.getByText('100%')).toBeTruthy();
    });

    it('clamps value >100 to 100%', () => {
      render(
        wrap(
          <AppProgressBar value={150}>
            <AppProgressBar.Track />
            <AppProgressBar.Label testID="label" />
          </AppProgressBar>,
        ),
      );
      expect(screen.getByText('100%')).toBeTruthy();
    });
  });

  describe('variants', () => {
    it.each(['default', 'success', 'warning'] as const)('renders %s variant', (variant) => {
      render(
        wrap(
          <AppProgressBar value={50} variant={variant} testID={`bar-${variant}`}>
            <AppProgressBar.Track testID={`track-${variant}`} />
          </AppProgressBar>,
        ),
      );
      expect(screen.getByTestId(`track-${variant}`)).toBeTruthy();
    });
  });

  describe('sizes', () => {
    it.each(['xs', 'sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        wrap(
          <AppProgressBar value={50} size={size} testID={`bar-${size}`}>
            <AppProgressBar.Track />
          </AppProgressBar>,
        ),
      );
      expect(screen.getByTestId(`bar-${size}`)).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('has progressbar role', () => {
      render(
        wrap(
          <AppProgressBar value={40}>
            <AppProgressBar.Track />
          </AppProgressBar>,
        ),
      );
      expect(screen.getByRole('progressbar')).toBeTruthy();
    });

    it('exposes aria-valuenow', () => {
      render(
        wrap(
          <AppProgressBar value={75} testID="bar">
            <AppProgressBar.Track />
          </AppProgressBar>,
        ),
      );
      const bar = screen.getByTestId('bar');
      expect(bar.props['aria-valuenow']).toBe(75);
    });
  });
});
