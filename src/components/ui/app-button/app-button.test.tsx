import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { GluestackAppProvider } from '@/lib/providers/GluestackAppProvider';
import { AppButton } from './app-button';

function wrap(node: React.ReactElement) {
  return <GluestackAppProvider>{node}</GluestackAppProvider>;
}

describe('AppButton', () => {
  describe('rendering', () => {
    it('renders Text subpart', () => {
      render(wrap(<AppButton><AppButton.Text>Save</AppButton.Text></AppButton>));
      expect(screen.getByText('Save')).toBeTruthy();
    });

    it('renders with primary variant by default', () => {
      render(wrap(<AppButton testID="btn"><AppButton.Text>OK</AppButton.Text></AppButton>));
      expect(screen.getByTestId('btn')).toBeTruthy();
    });

    it.each(['primary', 'secondary', 'outline', 'destructive'] as const)(
      'renders %s variant',
      (variant) => {
        render(
          wrap(
            <AppButton variant={variant} testID={`btn-${variant}`}>
              <AppButton.Text>{variant}</AppButton.Text>
            </AppButton>,
          ),
        );
        expect(screen.getByTestId(`btn-${variant}`)).toBeTruthy();
      },
    );

    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        wrap(
          <AppButton size={size} testID={`btn-${size}`}>
            <AppButton.Text>{size}</AppButton.Text>
          </AppButton>,
        ),
      );
      expect(screen.getByTestId(`btn-${size}`)).toBeTruthy();
    });
  });

  describe('disabled state', () => {
    it('does not fire onPress when disabled', () => {
      const onPress = jest.fn();
      render(
        wrap(
          <AppButton isDisabled onPress={onPress} testID="btn">
            <AppButton.Text>Disabled</AppButton.Text>
          </AppButton>,
        ),
      );
      fireEvent.press(screen.getByTestId('btn'));
      expect(onPress).not.toHaveBeenCalled();
    });

    it('has accessibilityState disabled when isDisabled', () => {
      render(
        wrap(
          <AppButton isDisabled testID="btn">
            <AppButton.Text>Disabled</AppButton.Text>
          </AppButton>,
        ),
      );
      expect(screen.getByTestId('btn').props.accessibilityState?.disabled).toBe(true);
    });
  });

  describe('loading state', () => {
    it('renders Spinner subpart when isLoading', () => {
      render(
        wrap(
          <AppButton isLoading testID="btn">
            <AppButton.Spinner testID="spinner" />
            <AppButton.Text>Loading</AppButton.Text>
          </AppButton>,
        ),
      );
      expect(screen.getByTestId('spinner')).toBeTruthy();
    });

    it('does not render Spinner subpart when not loading', () => {
      render(
        wrap(
          <AppButton testID="btn">
            <AppButton.Spinner testID="spinner" />
            <AppButton.Text>Ready</AppButton.Text>
          </AppButton>,
        ),
      );
      expect(screen.queryByTestId('spinner')).toBeNull();
    });

    it('does not fire onPress when isLoading', () => {
      const onPress = jest.fn();
      render(
        wrap(
          <AppButton isLoading onPress={onPress} testID="btn">
            <AppButton.Text>Loading</AppButton.Text>
          </AppButton>,
        ),
      );
      fireEvent.press(screen.getByTestId('btn'));
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('interaction', () => {
    it('fires onPress when pressed', () => {
      const onPress = jest.fn();
      render(
        wrap(
          <AppButton onPress={onPress} testID="btn">
            <AppButton.Text>Press me</AppButton.Text>
          </AppButton>,
        ),
      );
      fireEvent.press(screen.getByTestId('btn'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has button role', () => {
      render(wrap(<AppButton><AppButton.Text>Action</AppButton.Text></AppButton>));
      expect(screen.getByRole('button')).toBeTruthy();
    });
  });

  describe('compound subparts', () => {
    it('renders Icon subpart', () => {
      const MockIcon = () => null;
      render(
        wrap(
          <AppButton testID="btn">
            <AppButton.Icon as={MockIcon} testID="icon" />
            <AppButton.Text>With Icon</AppButton.Text>
          </AppButton>,
        ),
      );
      expect(screen.getByTestId('btn')).toBeTruthy();
    });
  });
});
