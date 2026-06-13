import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { AppProgressBar } from './app-progress-bar';

describe('AppProgressBar', () => {
  describe('rendering', () => {
    it('renders the progress bar', () => {
      render(<AppProgressBar value={50} testID="bar" />);
      expect(screen.getByTestId('bar')).toBeTruthy();
    });

    it('renders label with default percentage text when label is true', () => {
      render(<AppProgressBar value={60} label />);
      expect(screen.getByText('60%')).toBeTruthy();
    });

    it('renders label with custom text', () => {
      render(<AppProgressBar value={100} variant="success" label="Complete!" />);
      expect(screen.getByText('Complete!')).toBeTruthy();
    });
  });

  describe('value clamping', () => {
    it('renders at 0% correctly', () => {
      render(<AppProgressBar value={0} label />);
      expect(screen.getByText('0%')).toBeTruthy();
    });

    it('renders at 100% correctly', () => {
      render(<AppProgressBar value={100} label />);
      expect(screen.getByText('100%')).toBeTruthy();
    });

    it('clamps value >100 to 100%', () => {
      render(<AppProgressBar value={150} label />);
      expect(screen.getByText('100%')).toBeTruthy();
    });
  });

  describe('variants', () => {
    it.each(['default', 'success', 'warning'] as const)('renders %s variant', (variant) => {
      render(<AppProgressBar value={50} variant={variant} testID={`bar-${variant}`} />);
      expect(screen.getByTestId(`bar-${variant}`)).toBeTruthy();
    });
  });

  describe('sizes', () => {
    it.each(['xs', 'sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(<AppProgressBar value={50} size={size} testID={`bar-${size}`} />);
      expect(screen.getByTestId(`bar-${size}`)).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('has progressbar role', () => {
      render(<AppProgressBar value={40} testID="bar" />);
      const bar = screen.getByTestId('bar');
      expect(bar.props.accessibilityRole).toBe('progressbar');
    });

    it('exposes aria-valuenow', () => {
      render(<AppProgressBar value={75} testID="bar" />);
      const bar = screen.getByTestId('bar');
      expect(bar.props['aria-valuenow']).toBe(75);
    });
  });
});
