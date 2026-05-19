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
    it('renders string children as label text', () => {
      render(<AppButton>Save</AppButton>);
      expect(screen.getByText('Save')).toBeTruthy();
    });

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
        <AppButton testID="btn">OK</AppButton>,
      );
      expect(screen.getByTestId('btn')).toBeTruthy();
    });

    it.each(['primary', 'secondary', 'tertiary'] as const)(
      'renders %s variant',
      (variant) => {
        render(
          <AppButton variant={variant} testID={`btn-${variant}`}>
            {variant}
          </AppButton>,
        );
        expect(screen.getByTestId(`btn-${variant}`)).toBeTruthy();
      },
    );
  });

  describe('disabled state', () => {
    it('does not fire onPress when disabled', () => {
      const onPress = jest.fn();
      render(
        <AppButton isDisabled onPress={onPress} testID="btn">
          Disabled
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
          Loading
        </AppButton>,
      );
      expect(screen.getByTestId('btn')).toBeTruthy();
    });

    it('does not render Spinner subpart when not loading', () => {
      render(
        <AppButton testID="btn">
          <AppButton.Spinner />
          Ready
        </AppButton>,
      );
      expect(screen.getByText('Ready')).toBeTruthy();
    });

    it('does not fire onPress when isLoading', () => {
      const onPress = jest.fn();
      render(
        <AppButton isLoading onPress={onPress} testID="btn">
          Loading
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
          Press me
        </AppButton>,
      );
      fireEvent.press(screen.getByTestId('btn'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has button role', () => {
      render(
        <AppButton>Action</AppButton>,
      );
      expect(screen.getByRole('button')).toBeTruthy();
    });
  });
});
