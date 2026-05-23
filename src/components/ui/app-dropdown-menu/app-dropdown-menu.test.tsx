import React from 'react';

import { Pressable, Text, View } from 'react-native';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { AppDropdownMenu } from './app-dropdown-menu';

const EditIcon = () => null;

jest.mock('@gluestack-ui/core/menu/creator', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactNative = require('react-native');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const R = require('react');

  return {
    createMenu: () => {
      function FakeMenu({ trigger, children, ...props }: any) {
        return R.createElement(
          ReactNative.View,
          props,
          trigger?.({ onPress: () => {} }, { open: false }),
          children,
        );
      }
      FakeMenu.Item = R.forwardRef(({ children, ...props }: any, ref: any) =>
        R.createElement(ReactNative.Pressable, { ...props, ref }, children),
      );
      FakeMenu.ItemLabel = R.forwardRef(({ children, ...props }: any, ref: any) =>
        R.createElement(ReactNative.Text, { ...props, ref }, children),
      );
      FakeMenu.Separator = R.forwardRef((props: any, ref: any) =>
        R.createElement(ReactNative.View, { ...props, ref }),
      );
      FakeMenu.displayName = 'Menu';
      return FakeMenu;
    },
  };
});

describe('AppDropdownMenu', () => {
  describe('Trigger rendering', () => {
    it('renders trigger element', () => {
      render(
        <AppDropdownMenu>
          <AppDropdownMenu.Trigger>
            {(triggerProps) => (
              <Pressable {...triggerProps} testID="trigger">
                <Text>Open</Text>
              </Pressable>
            )}
          </AppDropdownMenu.Trigger>
          <AppDropdownMenu.Content>
            <AppDropdownMenu.Item key="edit" textValue="Edit">
              <AppDropdownMenu.ItemLabel>Edit Goal</AppDropdownMenu.ItemLabel>
            </AppDropdownMenu.Item>
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
            {(triggerProps) => (
              <Pressable {...triggerProps} testID="trigger">
                <Text>Open</Text>
              </Pressable>
            )}
          </AppDropdownMenu.Trigger>
          <AppDropdownMenu.Content>
            <AppDropdownMenu.Item key="edit" textValue="Edit">
              <AppDropdownMenu.ItemLabel>Edit</AppDropdownMenu.ItemLabel>
            </AppDropdownMenu.Item>
          </AppDropdownMenu.Content>
        </AppDropdownMenu>,
      );
      fireEvent.press(screen.getByTestId('trigger'));
      expect(screen.getByTestId('trigger')).toBeTruthy();
    });
  });

  describe('Separator subpart', () => {
    it('renders Separator without crashing', () => {
      render(
        <View>
          <AppDropdownMenu.Separator testID="separator" />
        </View>,
      );
      expect(screen.getByTestId('separator')).toBeTruthy();
    });
  });

  describe('ItemLabel subpart', () => {
    it('renders ItemLabel text in isolation', () => {
      render(
        <View>
          <AppDropdownMenu.ItemLabel>Edit Goal</AppDropdownMenu.ItemLabel>
        </View>,
      );
      expect(screen.getByText('Edit Goal')).toBeTruthy();
    });
  });

  describe('ItemIcon subpart', () => {
    it('renders ItemIcon without crashing', () => {
      expect(() =>
        render(
          <View>
            <AppDropdownMenu.ItemIcon as={EditIcon} />
          </View>,
        ),
      ).not.toThrow();
    });
  });
});
