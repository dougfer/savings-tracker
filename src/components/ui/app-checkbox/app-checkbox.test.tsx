import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { AppCheckbox } from './app-checkbox';

// Minimal stand-in for CheckIcon in tests
const CheckIcon = () => null;

jest.mock('@gluestack-ui/core/checkbox/creator', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactNative = require('react-native');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const R = require('react');

  return {
    createCheckbox: () => {
      function FakeCheckbox({ children, isDisabled, isInvalid, isChecked, onChange, ...props }: any) {
        return R.createElement(
          ReactNative.Pressable,
          {
            role: 'checkbox',
            disabled: isDisabled,
            accessibilityState: { checked: !!isChecked, disabled: !!isDisabled },
            onPress: () => !isDisabled && onChange?.(!isChecked),
            ...props,
          },
          children,
        );
      }
      FakeCheckbox.Indicator = R.forwardRef(({ children, ...props }: any, ref: any) =>
        R.createElement(ReactNative.View, { ...props, ref }, children),
      );
      FakeCheckbox.Icon = R.forwardRef((props: any, ref: any) =>
        R.createElement(ReactNative.View, { ...props, ref }),
      );
      FakeCheckbox.Label = R.forwardRef(({ children, ...props }: any, ref: any) =>
        R.createElement(ReactNative.Text, { ...props, ref }, children),
      );
      FakeCheckbox.Group = R.forwardRef(({ children, ...props }: any, ref: any) =>
        R.createElement(ReactNative.View, { ...props, ref }, children),
      );
      FakeCheckbox.displayName = 'Checkbox';
      return FakeCheckbox;
    },
  };
});

describe('AppCheckbox', () => {
  describe('rendering', () => {
    it('renders Indicator and Label subparts', () => {
      render(
        <AppCheckbox value="terms">
          <AppCheckbox.Indicator>
            <AppCheckbox.Icon as={CheckIcon} />
          </AppCheckbox.Indicator>
          <AppCheckbox.Label>I agree</AppCheckbox.Label>
        </AppCheckbox>,
      );
      expect(screen.getByText('I agree')).toBeTruthy();
    });

    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <AppCheckbox value="test" size={size} testID={`cb-${size}`}>
          <AppCheckbox.Indicator>
            <AppCheckbox.Icon as={CheckIcon} />
          </AppCheckbox.Indicator>
          <AppCheckbox.Label>{size}</AppCheckbox.Label>
        </AppCheckbox>,
      );
      expect(screen.getByTestId(`cb-${size}`)).toBeTruthy();
    });
  });

  describe('checked state', () => {
    it('calls onChange when pressed', () => {
      const onChange = jest.fn();
      render(
        <AppCheckbox value="agree" onChange={onChange}>
          <AppCheckbox.Indicator>
            <AppCheckbox.Icon as={CheckIcon} />
          </AppCheckbox.Indicator>
          <AppCheckbox.Label>Agree</AppCheckbox.Label>
        </AppCheckbox>,
      );
      fireEvent.press(screen.getByRole('checkbox'));
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('reflects checked state via isChecked', () => {
      render(
        <AppCheckbox value="agree" isChecked>
          <AppCheckbox.Indicator>
            <AppCheckbox.Icon as={CheckIcon} />
          </AppCheckbox.Indicator>
          <AppCheckbox.Label>Checked</AppCheckbox.Label>
        </AppCheckbox>,
      );
      expect(screen.getByRole('checkbox').props.accessibilityState?.checked).toBe(true);
    });

    it('reflects unchecked state', () => {
      render(
        <AppCheckbox value="agree" isChecked={false}>
          <AppCheckbox.Indicator>
            <AppCheckbox.Icon as={CheckIcon} />
          </AppCheckbox.Indicator>
          <AppCheckbox.Label>Unchecked</AppCheckbox.Label>
        </AppCheckbox>,
      );
      expect(screen.getByRole('checkbox').props.accessibilityState?.checked).toBe(false);
    });
  });

  describe('disabled state', () => {
    it('does not fire onChange when isDisabled', () => {
      const onChange = jest.fn();
      render(
        <AppCheckbox value="agree" isDisabled onChange={onChange}>
          <AppCheckbox.Indicator>
            <AppCheckbox.Icon as={CheckIcon} />
          </AppCheckbox.Indicator>
          <AppCheckbox.Label>Disabled</AppCheckbox.Label>
        </AppCheckbox>,
      );
      fireEvent.press(screen.getByRole('checkbox'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('has disabled accessibilityState when isDisabled', () => {
      render(
        <AppCheckbox value="agree" isDisabled>
          <AppCheckbox.Indicator>
            <AppCheckbox.Icon as={CheckIcon} />
          </AppCheckbox.Indicator>
          <AppCheckbox.Label>Disabled</AppCheckbox.Label>
        </AppCheckbox>,
      );
      expect(screen.getByRole('checkbox').props.accessibilityState?.disabled).toBe(true);
    });
  });

  describe('invalid state', () => {
    it('renders without error when isInvalid', () => {
      render(
        <AppCheckbox value="agree" isInvalid>
          <AppCheckbox.Indicator>
            <AppCheckbox.Icon as={CheckIcon} />
          </AppCheckbox.Indicator>
          <AppCheckbox.Label>Invalid</AppCheckbox.Label>
        </AppCheckbox>,
      );
      expect(screen.getByText('Invalid')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('has checkbox role', () => {
      render(
        <AppCheckbox value="test">
          <AppCheckbox.Indicator>
            <AppCheckbox.Icon as={CheckIcon} />
          </AppCheckbox.Indicator>
          <AppCheckbox.Label>Accept</AppCheckbox.Label>
        </AppCheckbox>,
      );
      expect(screen.getByRole('checkbox')).toBeTruthy();
    });
  });
});
