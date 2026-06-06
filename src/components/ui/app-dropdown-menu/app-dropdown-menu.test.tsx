import React from 'react';

import { Pressable, Text, View } from 'react-native';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { AppDropdownMenu } from './app-dropdown-menu';

jest.mock('@gluestack-ui/core/popover/creator', () => {
  const ReactNative = require('react-native');
  const R = require('react');

  return {
    createPopover: () => {
      function FakePopover({ trigger, children, ...props }: any) {
        return R.createElement(
          ReactNative.View,
          props,
          trigger?.({ onPress: () => {}, 'aria-expanded': false, 'aria-haspopup': true }, { open: false }),
          children,
        );
      }
      FakePopover.Content = R.forwardRef(({ children, ...props }: any, ref: any) =>
        R.createElement(ReactNative.View, { ...props, ref }, children),
      );
      FakePopover.Backdrop = R.forwardRef((props: any, ref: any) =>
        R.createElement(ReactNative.Pressable, { ...props, ref }),
      );
      FakePopover.displayName = 'Popover';
      FakePopover.Content.displayName = 'Popover.Content';
      FakePopover.Backdrop.displayName = 'Popover.Backdrop';
      return FakePopover;
    },
  };
});

describe('AppDropdownMenu', () => {
  describe('Trigger', () => {
    it('renders trigger element', () => {
      render(
        <AppDropdownMenu>
          <AppDropdownMenu.Trigger>
            {(triggerProps: Record<string, unknown>) => (
              <Pressable {...triggerProps} testID="trigger">
                <Text>Open</Text>
              </Pressable>
            )}
          </AppDropdownMenu.Trigger>
          <AppDropdownMenu.Content>
            <Text>Edit Goal</Text>
          </AppDropdownMenu.Content>
        </AppDropdownMenu>,
      );
      expect(screen.getByTestId('trigger')).toBeTruthy();
      expect(screen.getByText('Open')).toBeTruthy();
    });

    it('trigger is pressable', () => {
      render(
        <AppDropdownMenu>
          <AppDropdownMenu.Trigger>
            {(triggerProps: Record<string, unknown>) => (
              <Pressable {...triggerProps} testID="trigger">
                <Text>Open</Text>
              </Pressable>
            )}
          </AppDropdownMenu.Trigger>
          <AppDropdownMenu.Content>
            <Text>Edit</Text>
          </AppDropdownMenu.Content>
        </AppDropdownMenu>,
      );
      fireEvent.press(screen.getByTestId('trigger'));
      expect(screen.getByTestId('trigger')).toBeTruthy();
    });
  });

  describe('Content', () => {
    it('renders children inside Content', () => {
      render(
        <AppDropdownMenu>
          <AppDropdownMenu.Trigger>
            {(triggerProps: Record<string, unknown>) => (
              <Pressable {...triggerProps} testID="trigger">
                <Text>Open</Text>
              </Pressable>
            )}
          </AppDropdownMenu.Trigger>
          <AppDropdownMenu.Content>
            <Text>Edit Goal</Text>
            <Text>Delete Goal</Text>
          </AppDropdownMenu.Content>
        </AppDropdownMenu>,
      );
      expect(screen.getByText('Edit Goal')).toBeTruthy();
      expect(screen.getByText('Delete Goal')).toBeTruthy();
    });

    it('renders custom content inside Content', () => {
      render(
        <AppDropdownMenu>
          <AppDropdownMenu.Trigger>
            {(triggerProps: Record<string, unknown>) => (
              <Pressable {...triggerProps} testID="trigger">
                <Text>Open</Text>
              </Pressable>
            )}
          </AppDropdownMenu.Trigger>
          <AppDropdownMenu.Content>
            <View testID="custom-view">
              <Text>Custom Content</Text>
            </View>
          </AppDropdownMenu.Content>
        </AppDropdownMenu>,
      );
      expect(screen.getByTestId('custom-view')).toBeTruthy();
      expect(screen.getByText('Custom Content')).toBeTruthy();
    });
  });

  describe('Root', () => {
    it('returns null when no Trigger child is provided', () => {
      const { toJSON } = render(
        <AppDropdownMenu>
          <AppDropdownMenu.Content>
            <Text>Content without trigger</Text>
          </AppDropdownMenu.Content>
        </AppDropdownMenu>,
      );
      expect(toJSON()).toBeNull();
    });

    it('renders successfully with Trigger and Content', () => {
      const { toJSON } = render(
        <AppDropdownMenu>
          <AppDropdownMenu.Trigger>
            {(triggerProps: Record<string, unknown>) => (
              <Pressable {...triggerProps} testID="trigger">
                <Text>Open</Text>
              </Pressable>
            )}
          </AppDropdownMenu.Trigger>
          <AppDropdownMenu.Content>
            <Text>Content</Text>
          </AppDropdownMenu.Content>
        </AppDropdownMenu>,
      );
      expect(toJSON()).toBeTruthy();
      expect(screen.getByText('Open')).toBeTruthy();
      expect(screen.getByText('Content')).toBeTruthy();
    });
  });
});
