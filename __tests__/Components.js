import renderer from 'react-test-renderer';
import React from 'react';

import CustomButton from '../src/sub-components/CustomButton';
import GreenHeader from '../src/sub-components/GreenHeader';
import WhiteArrowButton from '../src/sub-components/WhiteArrowButton';
import AnimatedCard from '../src/sub-components/AnimatedCard';
import { fireEvent, getByText, render } from "@testing-library/react";
import { Alert } from "react-native";


describe('Custom sub-components', function () {
  describe('button', function() {
    it('should render correctly', function() {
      const tree = renderer.create(<CustomButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should render correctly with number indicator', function() {
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

    it('should respond to a click', function() {
      const { getByText } = renderer.create(<WhiteArrowButton />).toJSON();

      fireEvent(getByText('up'), 'press');
    })
  });
