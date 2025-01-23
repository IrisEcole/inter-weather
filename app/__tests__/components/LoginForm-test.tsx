import { render } from '@testing-library/react-native';

import { Loginform } from '@/app/components/loginForm';

describe('<LoginForm />', () => {
  test('Text renders correctly on LoginForm', async () => {
    const { getByText } = render(<Loginform/>);
    getByText('Username');
  });
});
