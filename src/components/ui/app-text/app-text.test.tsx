import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { AppText } from './app-text';

describe('AppText', () => {
  it('renders children', () => {
    render(<AppText testID="t">Hello</AppText>);
    expect(screen.getByTestId('t')).toHaveTextContent('Hello');
  });
});
