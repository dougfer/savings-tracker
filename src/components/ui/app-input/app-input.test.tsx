import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { GluestackAppProvider } from '@/lib/providers/GluestackAppProvider';
import { AppInput } from './app-input';

function wrap(node: React.ReactElement) {
  return <GluestackAppProvider>{node}</GluestackAppProvider>;
}

describe('AppInput', () => {
  describe('rendering', () => {
    it('renders the Field subpart', () => {
      render(
        wrap(
          <AppInput>
            <AppInput.Field testID="field" placeholder="Type here" />
          </AppInput>,
        ),
      );
      expect(screen.getByTestId('field')).toBeTruthy();
    });

    it('renders Label subpart', () => {
      render(
        wrap(
          <AppInput>
            <AppInput.Label>Goal Name</AppInput.Label>
            <AppInput.Field placeholder="Name" />
          </AppInput>,
        ),
      );
      expect(screen.getByText('Goal Name')).toBeTruthy();
    });

    it.each(['outline', 'underlined', 'rounded'] as const)('renders %s variant', (variant) => {
      render(
        wrap(
          <AppInput variant={variant}>
            <AppInput.Field testID={`field-${variant}`} placeholder={variant} />
          </AppInput>,
        ),
      );
      expect(screen.getByTestId(`field-${variant}`)).toBeTruthy();
    });

    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        wrap(
          <AppInput size={size}>
            <AppInput.Field testID={`field-${size}`} placeholder={size} />
          </AppInput>,
        ),
      );
      expect(screen.getByTestId(`field-${size}`)).toBeTruthy();
    });
  });

  describe('HelperText', () => {
    it('renders helper text', () => {
      render(
        wrap(
          <AppInput>
            <AppInput.Field placeholder="Name" />
            <AppInput.HelperText>Add a descriptive name</AppInput.HelperText>
          </AppInput>,
        ),
      );
      expect(screen.getByText('Add a descriptive name')).toBeTruthy();
    });
  });

  describe('error state', () => {
    it('renders ErrorText when isInvalid', () => {
      render(
        wrap(
          <AppInput isInvalid>
            <AppInput.Field placeholder="Name" />
            <AppInput.ErrorText>Name is required</AppInput.ErrorText>
          </AppInput>,
        ),
      );
      expect(screen.getByText('Name is required')).toBeTruthy();
    });
  });

  describe('required indicator', () => {
    it('marks field as required', () => {
      render(
        wrap(
          <AppInput isRequired testID="fc">
            <AppInput.Label>Email</AppInput.Label>
            <AppInput.Field testID="field" placeholder="email" />
          </AppInput>,
        ),
      );
      expect(screen.getByTestId('field')).toBeTruthy();
    });
  });

  describe('disabled state', () => {
    it('renders without error when isDisabled', () => {
      render(
        wrap(
          <AppInput isDisabled>
            <AppInput.Field testID="field" placeholder="Disabled" />
          </AppInput>,
        ),
      );
      // Gluestack sets accessibilityElementsHidden on disabled inputs; use includeHiddenElements
      expect(screen.getByTestId('field', { includeHiddenElements: true })).toBeTruthy();
    });
  });

  describe('read-only state', () => {
    it('renders without error when isReadOnly', () => {
      render(
        wrap(
          <AppInput isReadOnly>
            <AppInput.Field testID="field" placeholder="Read-only" />
          </AppInput>,
        ),
      );
      expect(screen.getByTestId('field')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('field is accessible by label', () => {
      render(
        wrap(
          <AppInput>
            <AppInput.Field placeholder="Search" testID="field" />
          </AppInput>,
        ),
      );
      // Gluestack InputField has aria-label="Input Field" by default
      expect(screen.getByLabelText('Input Field')).toBeTruthy();
    });
  });
});
