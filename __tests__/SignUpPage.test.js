import { render, screen } from '@testing-library/react';
import SignUpPage from '../__tests__/SignUpPage';

test('SignUpPage shows signup text',() => {

    render(<SignUpPage />);

    const alert = screen.findByRole('alert');
    expect(alert).toHaveTextContent(
        'An unexpected error occured. Please try again later.'

    );
});