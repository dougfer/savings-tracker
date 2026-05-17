import type { FC } from 'react';

import { View } from 'react-native';

import type { SvgProps } from 'react-native-svg';

/** Jest stub for `*.svg` imports (Metro uses `react-native-svg-transformer` in app builds). */
const SvgMock: FC<SvgProps> = ({ testID }) => <View testID={testID} />;

export default SvgMock;
