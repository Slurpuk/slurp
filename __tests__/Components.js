import renderer from 'react-test-renderer';
import React from 'react';

import CustomButton from '../src/sub-components/CustomButton';
import GreenHeader from '../src/sub-components/GreenHeader';
import WhiteArrowButton from '../src/sub-components/WhiteArrowButton';
import Icon from 'react-native-vector-icons/Ionicons';

import {Alert} from 'react-native';

describe('Components', function () {
  const spyAlert = jest
    .spyOn(Alert, 'alert')
    //@ts-ignore
    .mockImplementation((title, message, callbackOrButtons) =>
      callbackOrButtons[1].onPress(),
    );

  afterEach(() => spyAlert.mockClear());

  describe('Custom sub-components', function () {
    describe('button', function () {
      it('should render correctly', function () {
        const tree = renderer.create(<CustomButton />).toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render correctly with number indicator', function () {
        const tree = renderer
          .create(<CustomButton optionalNumber={5} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
  describe('green header', function () {
    it('should render correctly', function () {
      const tree = renderer.create(<GreenHeader />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('white arrow button', function () {
    it('should render correctly', function () {
      const tree = renderer.create(<WhiteArrowButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

    it('Renders an icon', () => {
      const tree = renderer
        .create(<Icon name={'md-chevron-back-circle'} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly if the arrow points left', function () {
      const tree = renderer
        .create(<WhiteArrowButton direction={'left'} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly if the arrow points right', function () {
      const tree = renderer
        .create(<WhiteArrowButton direction={'right'} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly if the arrow points up', function () {
      const tree = renderer
        .create(<WhiteArrowButton direction={'up'} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly if the arrow points down', function () {
      const tree = renderer
        .create(<WhiteArrowButton direction={'down'} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    // it('should respond to a click', function () {
    //   const {getByTitle} = renderer.create(<WhiteArrowButton direction={'left'}/>).toJSON();
    //
    //   fireEvent(getByTitle(''), 'press');
    //   expect('handleBackButtonClick').toHaveBeenCalledTimes(1);
    //   // expect(spyAlert).toBeCalledTimes(0);
    // });
  });
});
