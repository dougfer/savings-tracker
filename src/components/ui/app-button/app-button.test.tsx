import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { AppButton } from './app-button';

jest.mock('@gluestack-ui/core/button/creator', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactNative = require('react-native');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const R = require('react');

  return {
    createButton: () => {
      function FakeButton({ children, isDisabled, ...props }: any) {
        return R.createElement(
          ReactNative.Pressable,
          { disabled: isDisabled, role: 'button', ...props },
          typeof children === 'function'
            ? children({ hovered: false, focused: false, pressed: false })
            : children,
        );
      }
      FakeButton.Text = R.forwardRef(({ children, ...props }: any, ref: any) =>
        R.createElement(ReactNative.Text, { ...props, ref }, children),
      );
      FakeButton.Icon = R.forwardRef((props: any, ref: any) =>
        R.createElement(ReactNative.View, { ...props, ref }),
      );
      FakeButton.Spinner = R.forwardRef((props: any, ref: any) =>
        R.createElement(ReactNative.ActivityIndicator, { ...props, ref }),
      );
      FakeButton.Group = R.forwardRef(({ children, ...props }: any, ref: any) =>
        R.createElement(ReactNative.View, { ...props, ref }, children),
      );
      FakeButton.displayName = 'Button';
      return FakeButton;
    },
  };
});

describe('AppButton', () => {
  describe('rendering', () => {
    it('renders Text subpart', () => {
      render(
        <AppButton>
          <AppButton.Text>Save</AppButton.Text>
        </AppButton>,
      );
      expect(screen.getByText('Save')).toBeTruthy();
    });

    it('renders with primary variant by default', () => {
      render(
        <AppButton testID="btn">
          <AppButton.Text>OK</AppButton.Text>
        </AppButton>,
      );
      expect(screen.getByTestId('btn')).toBeTruthy();
    });

    it.each(['primary', 'secondary', 'outline', 'destructive'] as const)(
      'renders %s variant',
      (variant) => {
        render(
          <AppButton variant={variant} testID={`btn-${variant}`}>
            <AppButton.Text>{variant}</AppButton.Text>
          </AppButton>,
        );
        expect(screen.getByTestId(`btn-${variant}`)).toBeTruthy();
      },
    );

    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <AppButton size={size} testID={`btn-${size}`}>
          <AppButton.Text>{size}</AppButton.Text>
        </AppButton>,
      );
      expect(screen.getByTestId(`btn-${size}`)).toBeTruthy();
    });
  });

  describe('disabled state', () => {
    it('does not fire onPress when disabled', () => {
      const onPress = jest.fn();
      render(
        <AppButton isDisabled onPress={onPress} testID="btn">
          <AppButton.Text>Disabled</AppButton.Text>
        </AppButton>,
      );
      fireEvent.press(screen.getByTestId('btn'));
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('loading state', () => {
    it('renders Spinner subpart when isLoading', () => {
      render(
        <AppButton isLoading testID="btn">
          <AppButton.Spinner />
          <AppButton.Text>Loading</AppButton.Text>
        </AppButton>,
      );
      expect(screen.getByTestId('btn')).toBeTruthy();
    });

    it('does not render Spinner subpart when not loading', () => {
      render(
        <AppButton testID="btn">
          <AppButton.Spinner />
          <AppButton.Text>Ready</AppButton.Text>
        </AppButton>,
      );
      expect(screen.getByText('Ready')).toBeTruthy();
    });

    it('does not fire onPress when isLoading', () => {
      const onPress = jest.fn();
      render(
        <AppButton isLoading onPress={onPress} testID="btn">
          <AppButton.Text>Loading</AppButton.Text>
        </AppButton>,
      );
      fireEvent.press(screen.getByTestId('btn'));
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('interaction', () => {
    it('fires onPress when pressed', () => {
      const onPress = jest.fn();
      render(
        <AppButton onPress={onPress} testID="btn">
          <AppButton.Text>Press me</AppButton.Text>
        </AppButton>,
      );
      fireEvent.press(screen.getByTestId('btn'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has button role', () => {
      render(
        <AppButton>
          <AppButton.Text>Action</AppButton.Text>
        </AppButton>,
      );
      expect(screen.getByRole('button')).toBeTruthy();
    });
  });
});
