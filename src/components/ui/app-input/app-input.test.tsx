import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { AppInput } from './app-input';

jest.mock('@gluestack-ui/core/input/creator', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactNative = require('react-native');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const R = require('react');

  return {
    createInput: () => {
      function FakeInput({ children, ...props }: any) {
        return R.createElement(ReactNative.View, props, children);
      }
      FakeInput.Input = R.forwardRef(({ 'aria-label': ariaLabel = 'Input Field', ...props }: any, ref: any) =>
        R.createElement(ReactNative.TextInput, {
          accessible: true,
          accessibilityLabel: ariaLabel,
          'aria-label': ariaLabel,
          ...props,
          ref,
        }),
      );
      FakeInput.Slot = R.forwardRef(({ children, ...props }: any, ref: any) =>
        R.createElement(ReactNative.Pressable, { ...props, ref }, children),
      );
      FakeInput.Icon = R.forwardRef((props: any, ref: any) =>
        R.createElement(ReactNative.View, { ...props, ref }),
      );
      FakeInput.displayName = 'Input';
      return FakeInput;
    },
  };
});

describe('AppInput', () => {
  describe('rendering', () => {
    it('renders the Field subpart', () => {
      render(
        <AppInput>
          <AppInput.Group>
            <AppInput.Field testID="field" placeholder="Type here" />
          </AppInput.Group>
        </AppInput>,
      );
      expect(screen.getByTestId('field')).toBeTruthy();
    });

    it('renders Label subpart', () => {
      render(
        <AppInput>
          <AppInput.Label>Goal Name</AppInput.Label>
          <AppInput.Group>
            <AppInput.Field placeholder="Name" />
          </AppInput.Group>
        </AppInput>,
      );
      expect(screen.getByText('Goal Name')).toBeTruthy();
    });
  });

  describe('HelperText', () => {
    it('renders helper text', () => {
      render(
        <AppInput>
          <AppInput.Group>
            <AppInput.Field placeholder="Name" />
          </AppInput.Group>
          <AppInput.HelperText>Add a descriptive name</AppInput.HelperText>
        </AppInput>,
      );
      expect(screen.getByText('Add a descriptive name')).toBeTruthy();
    });

    it('renders error text', () => {
      render(
        <AppInput isInvalid>
          <AppInput.Group isInvalid>
            <AppInput.Field placeholder="Name" />
          </AppInput.Group>
          <AppInput.HelperText variant="error">Name is required</AppInput.HelperText>
        </AppInput>,
      );
      expect(screen.getByText('Name is required')).toBeTruthy();
    });
  });

  describe('disabled state', () => {
    it('renders without error when isDisabled', () => {
      render(
        <AppInput isDisabled>
          <AppInput.Group isDisabled>
            <AppInput.Field testID="field" placeholder="Disabled" />
          </AppInput.Group>
        </AppInput>,
      );
      expect(screen.getByTestId('field')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('field is accessible by label', () => {
      render(
        <AppInput>
          <AppInput.Group>
            <AppInput.Field placeholder="Search" testID="field" />
          </AppInput.Group>
        </AppInput>,
      );
      expect(screen.getByLabelText('Input Field')).toBeTruthy();
    });
  });
});
