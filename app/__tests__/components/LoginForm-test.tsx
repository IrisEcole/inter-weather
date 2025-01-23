import Loginform from '@/app/components/loginForm';
import { render } from '@testing-library/react-native';

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "",
  Icon: "",
  MaterialCommunityIcons: ""
}));

describe('<LoginForm />', () => {
  test('Text renders correctly on LoginForm', async () => {
    const { getByText } = render(<Loginform />);
    getByText('Email');
    getByText('Password');
    getByText('Log in');

  });
});
