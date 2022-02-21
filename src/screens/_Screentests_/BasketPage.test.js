import { render, screen } from '@testing-library/react';
import BasketPage from '../screens/BasketPage';

//No text to be tested yet though: General layout included for that included under:


test('BsektPage shows Basketpage text',() => {

    render(<BasketPage />);

    const alert = screen.findByRole('alert');
    expect(alert).toHaveTextContent(
        'An unexpected error occured. Please try again later.'

    );
});