import Login from '@/app/(tabs)/login';
import { render } from '@testing-library/react-native';


jest.mock("@expo/vector-icons", () => ({
  Ionicons: "",
  Icon: "",
  MaterialCommunityIcons: ""
}));

describe('<Login />', () => {
  test('Text renders correctly on Account', async () => {
    const { getByText} = render(<Login />);
    getByText('Email');
    getByText('Password');
    getByText('Log in');
    getByText("Don't have an account ?");
    getByText('register');
  });
});
