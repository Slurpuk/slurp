import { render, screen } from '@testing-library/react';
import AddNewCardPage from '../__tests__/AddNewCardPage';

//No text to be tested yet though: General layout included for that included under:


test('AddNewCardPage shows AddNewCardPage text',() => {

    render(<AddNewCardPage />);

    const alert = screen.findByRole('alert');
    expect(alert).toHaveTextContent(
        'An unexpected error occured. Please try again later.'

    );
});