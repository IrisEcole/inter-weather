import Login from '@/app/(tabs)/login';
import { render } from '@testing-library/react-native';

describe('<Login />', () => {
  test('Text renders correctly on Account', async () => {
    const { getByText} = render(<Login />);
    getByText('Your Account');
    getByText('Your Username:');

    getByText('Save Changes');
    getByText('Sign out');
  });
});
