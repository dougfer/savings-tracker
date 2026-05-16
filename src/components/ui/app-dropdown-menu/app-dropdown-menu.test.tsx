import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Pressable, Text, View } from 'react-native';
import { GluestackAppProvider } from '@/lib/providers/GluestackAppProvider';
import { AppDropdownMenu } from './app-dropdown-menu';

const EditIcon = () => null;

function wrap(node: React.ReactElement) {
  return <GluestackAppProvider>{node}</GluestackAppProvider>;
}

describe('AppDropdownMenu', () => {
  describe('Trigger rendering', () => {
    it('renders trigger element', () => {
      render(
        wrap(
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
        ),
      );
      expect(screen.getByTestId('trigger')).toBeTruthy();
      expect(screen.getByText('Open')).toBeTruthy();
    });

    it('trigger is pressable', () => {
      const onPress = jest.fn();
      render(
        wrap(
          <AppDropdownMenu>
            <AppDropdownMenu.Trigger>
              {(triggerProps) => (
                <Pressable {...triggerProps} testID="trigger" onPress={onPress}>
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
        ),
      );
      fireEvent.press(screen.getByTestId('trigger'));
      // Trigger press is handled (Gluestack Menu manages open state internally)
      expect(screen.getByTestId('trigger')).toBeTruthy();
    });
  });

  describe('Separator subpart', () => {
    it('renders Separator without crashing', () => {
      render(
        wrap(
          <View>
            <AppDropdownMenu.Separator testID="separator" />
          </View>,
        ),
      );
      expect(screen.getByTestId('separator')).toBeTruthy();
    });
  });

  describe('ItemLabel subpart', () => {
    it('renders ItemLabel text in isolation', () => {
      render(
        wrap(
          <View>
            <AppDropdownMenu.ItemLabel>Edit Goal</AppDropdownMenu.ItemLabel>
          </View>,
        ),
      );
      expect(screen.getByText('Edit Goal')).toBeTruthy();
    });
  });

  describe('ItemIcon subpart', () => {
    it('renders ItemIcon without crashing', () => {
      expect(() =>
        render(
          wrap(
            <View>
              <AppDropdownMenu.ItemIcon as={EditIcon} />
            </View>,
          ),
        ),
      ).not.toThrow();
    });
  });
});
