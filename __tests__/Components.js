import firestore from '@react-native-firebase/firestore';
import CustomButton from '../src/sub-components/CustomButton';
import renderer from 'react-test-renderer';
import React from 'react';
import GreenHeader from '../src/sub-components/GreenHeader';

describe('Custom sub-components', function () {
  describe('button', function () {
    it('should render correctly', function () {
      const tree = renderer.create(<CustomButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('green header', function () {
    it('should render correctly', function () {
      const tree = renderer.create(<GreenHeader />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
