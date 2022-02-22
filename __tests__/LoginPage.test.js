import { render, screen } from '@testing-library/react';
import SignUpPage from '../__tests__/LoginPage';

test('LoginPage shows Login text',() => {

    render(<LoginPage />);

    const alert = screen.findByRole('alert');
    expect(alert).toHaveTextContent(
        'An unexpected error occured. Please try again later.'

    );
});