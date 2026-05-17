import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { GluestackAppProvider } from '@/lib/providers/GluestackAppProvider';

import { AppText } from './app-text';

function wrap(node: React.ReactElement) {
  return <GluestackAppProvider>{node}</GluestackAppProvider>;
}

describe('AppText', () => {
  it('renders children', () => {
    render(wrap(<AppText testID="t">Hello</AppText>));
    expect(screen.getByTestId('t')).toHaveTextContent('Hello');
  });
});
