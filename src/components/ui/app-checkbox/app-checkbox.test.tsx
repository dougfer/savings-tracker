import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { GluestackAppProvider } from '@/lib/providers/GluestackAppProvider';

import { AppCheckbox } from './app-checkbox';

// Minimal stand-in for CheckIcon in tests
const CheckIcon = () => null;

function wrap(node: React.ReactElement) {
  return <GluestackAppProvider>{node}</GluestackAppProvider>;
}

describe('AppCheckbox', () => {
  describe('rendering', () => {
    it('renders Indicator and Label subparts', () => {
      render(
        wrap(
          <AppCheckbox value="terms">
            <AppCheckbox.Indicator>
              <AppCheckbox.Icon as={CheckIcon} />
            </AppCheckbox.Indicator>
            <AppCheckbox.Label>I agree</AppCheckbox.Label>
          </AppCheckbox>,
        ),
      );
      expect(screen.getByText('I agree')).toBeTruthy();
    });

    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        wrap(
          <AppCheckbox value="test" size={size} testID={`cb-${size}`}>
            <AppCheckbox.Indicator>
              <AppCheckbox.Icon as={CheckIcon} />
            </AppCheckbox.Indicator>
            <AppCheckbox.Label>{size}</AppCheckbox.Label>
          </AppCheckbox>,
        ),
      );
      expect(screen.getByTestId(`cb-${size}`)).toBeTruthy();
    });
  });

  describe('checked state', () => {
    it('calls onChange when pressed', () => {
      const onChange = jest.fn();
      render(
        wrap(
          <AppCheckbox value="agree" onChange={onChange}>
            <AppCheckbox.Indicator>
              <AppCheckbox.Icon as={CheckIcon} />
            </AppCheckbox.Indicator>
            <AppCheckbox.Label>Agree</AppCheckbox.Label>
          </AppCheckbox>,
        ),
      );
      fireEvent.press(screen.getByRole('checkbox'));
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('reflects checked state via isChecked', () => {
      render(
        wrap(
          <AppCheckbox value="agree" isChecked>
            <AppCheckbox.Indicator>
              <AppCheckbox.Icon as={CheckIcon} />
            </AppCheckbox.Indicator>
            <AppCheckbox.Label>Checked</AppCheckbox.Label>
          </AppCheckbox>,
        ),
      );
      expect(screen.getByRole('checkbox').props.accessibilityState?.checked).toBe(true);
    });

    it('reflects unchecked state', () => {
      render(
        wrap(
          <AppCheckbox value="agree" isChecked={false}>
            <AppCheckbox.Indicator>
              <AppCheckbox.Icon as={CheckIcon} />
            </AppCheckbox.Indicator>
            <AppCheckbox.Label>Unchecked</AppCheckbox.Label>
          </AppCheckbox>,
        ),
      );
      expect(screen.getByRole('checkbox').props.accessibilityState?.checked).toBe(false);
    });
  });

  describe('disabled state', () => {
    it('does not fire onChange when isDisabled', () => {
      const onChange = jest.fn();
      render(
        wrap(
          <AppCheckbox value="agree" isDisabled onChange={onChange}>
            <AppCheckbox.Indicator>
              <AppCheckbox.Icon as={CheckIcon} />
            </AppCheckbox.Indicator>
            <AppCheckbox.Label>Disabled</AppCheckbox.Label>
          </AppCheckbox>,
        ),
      );
      fireEvent.press(screen.getByRole('checkbox'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('has disabled accessibilityState when isDisabled', () => {
      render(
        wrap(
          <AppCheckbox value="agree" isDisabled>
            <AppCheckbox.Indicator>
              <AppCheckbox.Icon as={CheckIcon} />
            </AppCheckbox.Indicator>
            <AppCheckbox.Label>Disabled</AppCheckbox.Label>
          </AppCheckbox>,
        ),
      );
      expect(screen.getByRole('checkbox').props.accessibilityState?.disabled).toBe(true);
    });
  });

  describe('invalid state', () => {
    it('renders without error when isInvalid', () => {
      render(
        wrap(
          <AppCheckbox value="agree" isInvalid>
            <AppCheckbox.Indicator>
              <AppCheckbox.Icon as={CheckIcon} />
            </AppCheckbox.Indicator>
            <AppCheckbox.Label>Invalid</AppCheckbox.Label>
          </AppCheckbox>,
        ),
      );
      expect(screen.getByText('Invalid')).toBeTruthy();
    });
  });

  describe('label association', () => {
    it('renders label text that is accessible', () => {
      render(
        wrap(
          <AppCheckbox value="terms">
            <AppCheckbox.Indicator>
              <AppCheckbox.Icon as={CheckIcon} />
            </AppCheckbox.Indicator>
            <AppCheckbox.Label>Terms and conditions</AppCheckbox.Label>
          </AppCheckbox>,
        ),
      );
      expect(screen.getByText('Terms and conditions')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('has checkbox role', () => {
      render(
        wrap(
          <AppCheckbox value="test">
            <AppCheckbox.Indicator>
              <AppCheckbox.Icon as={CheckIcon} />
            </AppCheckbox.Indicator>
            <AppCheckbox.Label>Accept</AppCheckbox.Label>
          </AppCheckbox>,
        ),
      );
      expect(screen.getByRole('checkbox')).toBeTruthy();
    });
  });
});
