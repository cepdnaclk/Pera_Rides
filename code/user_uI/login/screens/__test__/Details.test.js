import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Details from '../Details';

describe('Details component', () => {
    const mockNavigation = {
        goBack: jest.fn(),
    };

    const mockRoute = {
        params: {
            name: 'Station Name',
            img: require('../path/to/image.png'),
            status: 'Available',
            slots: 10,
            amount: 5,
            about: 'This is a station.',
        },
    };

    it('renders correctly', () => {
        render(<Details navigation={mockNavigation} route={mockRoute} />);
    });

    it('navigates back when arrow-back icon is pressed', () => {
        const { getByTestId } = render(<Details navigation={mockNavigation} route={mockRoute} />);
        const backButton = getByTestId('back-button');

        fireEvent.press(backButton);

        expect(mockNavigation.goBack).toHaveBeenCalled();
    });

    // Add more test cases as needed
});
