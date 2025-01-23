import RegisterForm from '@/app/components/registerForm';
import { render } from '@testing-library/react-native';

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "",
  Icon: "",
  MaterialCommunityIcons: ""
}));

describe('<RegisterForm />', () => {
  test('Text renders correctly on RegisterForm', async () => {
    const { getByText } = render(<RegisterForm />);
    getByText('Name');
    getByText('Email');
    getByText('Password');
    getByText('Register');

  });
});
