import { render, screen } from '@testing-library/react';
import LandingMapPage from '../screens/LandingMapPage';

test('LandingMapPage shows LandingMapPage text',() => {

    render(<LandingMapPage />);

    const alert = screen.findByRole('alert');
    expect(alert).toHaveTextContent(
        'An unexpected error occured. Please try again later.'

    );
});