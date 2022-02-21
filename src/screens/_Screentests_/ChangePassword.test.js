import { render, screen } from '@testing-library/react';
import ChangePassword from '../screens/ChangePassword';

//No text to be tested yet though: General layout included for that included under:


test('ChangePassword shows ChangePassword text',() => {

    render(<ChangePassword />);

    const alert = screen.findByRole('alert');
    expect(alert).toHaveTextContent(
        'An unexpected error occured. Please try again later.'

    );
});