import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import UpdateDetailsPage from '../src/screens/UpdateDetailsPage';
import {Alert} from 'react-native';

describe('Update details page', function () {
    const spyAlert = jest
        .spyOn(Alert, 'alert')
        //@ts-ignore
        .mockImplementation((title, message, callbackOrButtons) =>
            callbackOrButtons[1].onPress(),
        );

    afterEach(() => spyAlert.mockClear());

    describe('update details', function () {
        it('should raise alert on empty first name', async function () {
            const {getByText, getAllByPlaceholderText} = render(<UpdateDetailsPage />);

            const inputs = getAllByPlaceholderText('');

            expect(inputs[0]).toBeTruthy();
            expect(inputs[1]).toBeTruthy();


            fireEvent(getByText('Update details'), 'press');

            expect(spyAlert).toHaveBeenCalled();
            expect(spyAlert.mock.calls[0][0]).toBe('Empty First Name');
        });
        it('should raise alert on empty password', async function () {
            const {getByText, getAllByPlaceholderText} = render(<UpdateDetailsPage />);

            const inputs = getAllByPlaceholderText('');
            expect(inputs[0]).toBeTruthy();

            fireEvent.changeText(inputs[0], 'Jane');

            fireEvent(getByText('Update details'), 'press');

            expect(spyAlert).toHaveBeenCalled();
            expect(spyAlert.mock.calls[0][0]).toBe('Empty Password');
        });
        it('should not raise alert on valid data', async function () {
            const {getByText, getAllByPlaceholderText} = render(<UpdateDetailsPage />);

            const inputs = getAllByPlaceholderText('');
            expect(inputs[0]).toBeTruthy();

            fireEvent.changeText(inputs[0], 'Jane');
            fireEvent.changeText(inputs[2], 'Password123!');


            fireEvent(getByText('Update details'), 'press');

            expect(spyAlert).toHaveBeenCalledTimes(0);
        });
    });
});
