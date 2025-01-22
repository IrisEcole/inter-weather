import { render } from '@testing-library/react-native';

import HomeApp from '@/app/(tabs)/index';

describe('<HomeApp />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<HomeApp />);

    getByText('Welcome!');
  });
});
