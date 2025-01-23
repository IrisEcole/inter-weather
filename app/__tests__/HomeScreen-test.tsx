import { render } from '@testing-library/react-native';

import HomeApp from '@/app/(tabs)/index';

describe('<HomeApp />', () => {
  test('Text renders correctly on HomeScreen', async () => {
    const { getByText, getByTestId } = render(<HomeApp />);
    //To test fetch need to user polyfile: https://stackoverflow.com/questions/55498693/how-to-really-call-fetch-in-jest-test
    // const textInput = getByTestId("0");
    //   const user = userEvent.setup();
    // await user.type(textInput, "Paris", {submitEditing: true});

    getByText('Welcome !');
    // getByText('Paris');
  });
});
