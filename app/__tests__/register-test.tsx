import { render } from '@testing-library/react-native';
import Register from '../(tabs)/register';


jest.mock("@expo/vector-icons", () => ({
  Ionicons: "",
  Icon: "",
  MaterialCommunityIcons: ""
}));

describe('<Login />', () => {
  test('Text renders correctly on Account', async () => {
    const { getByText} = render(<Register />);
    getByText('Join InterWeather');
    getByText('Name');
    getByText('Email');
    getByText('Password');
    getByText('Register');
    getByText("Already have an account ?");
    getByText('login');
  });
});
