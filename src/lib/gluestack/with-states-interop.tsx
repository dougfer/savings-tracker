'use client';

import React, { useMemo, forwardRef } from 'react';

import { Platform } from 'react-native';

/**
 * Resolves NativeWind `data-[state=value]:className` patterns against a states map.
 *
 * On web the browser matches `data-*` attributes via CSS so this is a no-op;
 * on native there are no real data attributes, so we evaluate the conditions
 * in JS and emit only the classes that match.
 */
function extractDataClassName(
  className: string,
  states?: Record<string, boolean>,
): string {
  if (!states) return className;

  const parts = className.split(' ');
  const resolved: string[] = [];

  for (const part of parts) {
    const match = part.match(/^data-\[(\w+)=(\w+)\]:(.+)$/);
    if (match) {
      const [, state, value, cls] = match;
      if (states[state] === (value === 'true')) {
        if (cls.includes('data-')) {
          const inner = extractDataClassName(cls, states);
          if (inner) resolved.push(inner);
        } else {
          resolved.push(cls);
        }
      }
    } else {
      resolved.push(part);
    }
  }

  return resolved.join(' ');
}

type StatesMap = Record<string, boolean>;

/**
 * HOC that intercepts the `states` prop emitted by `@gluestack-ui/core` creators
 * and resolves `data-[xxx=true]:` utility classes for React Native (native).
 *
 * On web `className` is kept as-is because NativeWind generates CSS selectors
 * that match the `dataSet` HTML attributes set by the creators.
 */
export function withStates<T extends React.ComponentType<any>>(Component: T) {
  const Wrapped = forwardRef<
    React.ComponentRef<T>,
    React.ComponentPropsWithoutRef<T> & { states?: StatesMap }
  >(({ states, className, ...props }: any, ref) => {
    const resolvedClassName = useMemo(() => {
      if (!className) return className;
      if (Platform.OS === 'web') return className;
      return extractDataClassName(className, states);
    }, [className, states]);

    return <Component {...props} className={resolvedClassName} ref={ref} />;
  });

  Wrapped.displayName = `withStates(${
    (Component as any).displayName ?? (Component as any).name ?? 'Component'
  })`;

  return Wrapped as unknown as T;
}
